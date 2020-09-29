<template>
  <div class="contain">
    <div class="top">
      <div>
        <h2>dy.tcualhp.cn</h2>
        <h2>新增视频</h2>
      </div>
      <button
        :disabled="(videoFilename && coverFilename) ? null : 'disbaled'"
        @click="post"
      >发布</button>
    </div>
    <div class="new-video">
      <div class="editor col-md-7 col-">
        <div class="item title">
          <h3>标题</h3>
          <input
            type="text"
            v-model="title"
          >
        </div>
        <div class="item cover">
          <h3>封面</h3>
          <input
            id="cover"
            type="file"
            accept="image/*"
            @change="changeCover"
          >
          <label for="cover">
            <img :src="coverUrl">
          </label>
        </div>
      </div>
      <div class="item video col-md-5">
        <h3>视频文件</h3>
        <button
          class="c-btn"
          @click="changeVideo"
        >更换封面</button>
        <input
          style="display:none"
          id="video"
          type="file"
          accept="video/*"
          @change="changeFile"
          ref="changeFile"
        >
        <label for="video">
          <video
            controls
            :src="videoUrl"
          ></video>
        </label>
      </div>
    </div>
    <div
      class="tip"
      v-show="showTip"
    >
      <h3>{{tip}}</h3>
    </div>
    <div
      class="show-crop"
      v-show="cropper"
    >
      <h3>请按规定比例裁剪</h3>
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :fixedBox="option.fixedBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :high="option.high"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          :limitMinSize="option.limitMinSize"
        ></vueCropper>
      </div>
      <div class="enssure"><button @click="cropperCover">确定</button></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../assets/style/video.scss';
</style>

<script>
import axios from "axios";
import Cos from "cos-js-sdk-v5";
import { VueCropper } from "vue-cropper";

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      coverFilename: "add.png",
      cropper: false,
      videoFilename: "",
      title: "",
      showTip: false,
      tip: "",
      option: {
        //img的路径自行修改
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 733,
        autoCropHeight: 440,
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [400, 240], //截图框的宽高比例
        centerBox: false,
        high: false,
        cropData: {},
        enlarge: 1,
        mode: "contain",
        maxImgSize: 2000,
        limitMinSize: [100, 120]
      }
    };
  },
  computed: {
    coverUrl() {
      return this.host + "/uploads/covers/" + this.coverFilename;
    },
    videoUrl() {
      return this.host + "/uploads/videos/" + this.videoFilename;
    }
  },
  methods: {
    changeCover(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      this.coverFile = files[0];
      var render = new FileReader();
      render.readAsDataURL(this.coverFile);
      render.onload = () => {
        this.option.img = render.result;
      };
      this.cropper = true;
    },

    cropperCover() {
      var filename = Date.now() + ".jpg"; 
      var that = this;
      this.$refs.cropper.getCropBlob(data => {
        var file = new window.File([data], filename, {
          type: data.type
        });
        let formData = new FormData();
        formData.append("file", file, file.name);
        const fileUrl = this.host + "/api/cover/upload";
        axios
          .post(fileUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            console.log("upload success");
            this.cropper = false;
            this.coverFilename = filename;
          });

        //腾讯云cos对象存储
        // const cos = new Cos({
        //   SecretId: "******************",
        //   SecretKey: "*******************"
        // });
        // cos.putObject(
        //   {
        //     Bucket: "**********" /* 必须 */,
        //     Region: "ap-guangzhou" /* 必须 */,
        //     Key: "coverImg/" + filename /* 必须 */,
        //     StorageClass: "STANDARD",
        //     Body: file // 上传文件对象
        //   },
        //   function(err, data) {
        //     that.coverUrl = "https://" + data.Location;
        //     that.cropper = false;
        //     alert("图片上传成功");
        //   }
        // );
      });
    },

    changeVideo() {
      this.$refs.changeFile.dispatchEvent(new MouseEvent("click"));
    },

    changeFile(e) {
      const files = e.target.files;
      if (!files) {
        return;
      }
      var file = files[0];
      var filename = Date.now() + ".mp4";
      let formData = new FormData();
      formData.append("file", file, filename);
      const postUrl = this.host + "/api/video/upload";
      axios
        .post(postUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log("upload success");
          this.videoFilename = filename;
          alert("视频上传成功");
        });

      // const cos = new Cos({
      //   SecretId: "AKID2yVkjaEMJ0b25XqZ3HlynLbbOuhEcyrT",
      //   SecretKey: "1mHVUCLMzNUKl2SbLpBk3wZpojES9Zrj"
      // });
      // var that = this;
      // cos.putObject(
      //   {
      //     Bucket: "dingyang-admin-1301593316" /* 必须 */,
      //     Region: "ap-guangzhou" /* 必须 */,
      //     Key: "videos/" + filename /* 必须 */,
      //     StorageClass: "STANDARD",
      //     Body: file // 上传文件对象
      //   },
      //   function(err, data) {
      //     that.videoUrl = "https://" + data.Location;
      //     alert("视频上传成功");
      //   }
      // );
    },

    async post() {
      let data = {
        title: this.title,
        coverUrl: this.coverFilename,
        url: this.videoFilename
      };

      this.showTip = true;
      this.tip = "正在编译，请稍等...";

      const url = this.host + "/api/dingyang/video/add";
      var that = this;
      await axios
        .post(url, JSON.stringify(data), {
          headers: {
            "content-type": "application/json; charset=UTF-8"
          }
        })
        .then(function(response) {
          that.tip = "保存成功";
          setTimeout(function() {
            that.tipCard = false;
            Object.assign(that.$data, that.$options.data());
          }, 500);
        });
    }
  }
};
</script>