<template>
  <div id="app">
    <div class="page-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('tag/getTags')
    this.$store.dispatch('category/getCategorys')
  }
}
</script>

<style lang="less">
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.page-wrapper {
  overflow: hidden;
  width: 100%;
}
</style>
