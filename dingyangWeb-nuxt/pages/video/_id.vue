<template>
    <div class="video-view">
      <section class="video-play" v-if="current">
        <div class="header">
          <h1>{{current.title}}</h1>
          <div class="time">{{current.date}}</div>
        </div>
        <video :src="preUrl + '/uploads/videos/' + current.url" controls></video>
      </section>
      <section>
        <div class="header"><div class="dot">往期回顾</div></div>
        <div class="other-videos">
          <a v-for="v of otherVideos" class="other-video" :key="v.id" @click="changeVideo(v)">
            <div class="cover"><img :src="preUrl + '/uploads/covers/' + v.coverUrl"></div>
            <h1>{{v.title}}</h1>
            <div class="time">{{v.date}}</div>
          </a>
        </div>
      </section>
    </div>
</template>
<style lang="sass">
@import '~assets/style/video-view.scss'
</style>
<script>
import axios from "~/plugins/axios";
export default {
    data() {
        return {
            id: this.idInit || 1,
            videos: [],
            preUrl: ''
            }
    },
    props: ['idInit'],
    created(){
      this.preUrl = this.host
    },
    computed:{
      videoUrl(currentUrl){
        return this.host + '/uploads/videos/' + currentUrl
      }
    },
    async asyncData (params) {
      const result = await axios.get(params.app.host + "/api/dingyang/video");
      return {
        videos: result.data.result.list
      }
    },
    methods: {
        changeVideo(video){
            this.$router.push('/video/'+ video.id);
            this.id = video.id;
        }
    },
    computed: {
        current(){
            if(this.id) {
                return this.videos.find((v)=>v.id === this.id)
            }
            return videos[0];
        },
        otherVideos() {
            if(this.id) {
                return this.videos.filter((v)=>v.id !== this.id)
            }
            return this.video.slice(1);
        }   
    }
}
</script>