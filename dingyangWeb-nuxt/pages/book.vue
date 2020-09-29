<template>
  <div class="markdown contain">
    <vue-markdown :source="article"></vue-markdown>
  </div>
</template>
<style lang="sass">
@import '~assets/style/markdown.scss'
</style>
<style scoped>
@media screen and (max-width: 1368px) {
  .contain {
    padding: 0 6vw;
  }
}
@media screen and (max-width: 699px) {
  .contain {
    padding: 0;
  }
}
</style>
<script>
import VueMarkdown from "vue-markdown";
import axios from "~/plugins/axios";
export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      article: ""
    };
  },
  async asyncData(params) {
    const books = await axios.get(params.app.host + "/api/dingyang/book");
    return {
      article: books.data.result[0].content
    };
  }
};
</script>