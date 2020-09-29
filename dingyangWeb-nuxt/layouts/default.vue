<template>
  <div>
    <nav-header />
      <div class="container">
        <nuxt />
      </div>
    <nav-footer />
  </div>
</template>

<style>
.container {
  background-color: white;
  padding-top: 136px;
}
body {
  font-size: 16px;
}
</style>
<script>
import NavHeader from '~/components/NavHeader.vue'
import NavFooter from "~/components/NavFooter"

export default {
  components: {
    NavHeader,
    NavFooter
  }
}
</script>