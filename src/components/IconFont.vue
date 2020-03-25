<template>
  <div>
    <svg
      aria-hidden="true"
      class="icon"
    >
      <use :xlink:href="iconTag" />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
// import '../assets/iconfont/iconfont.js'
import '../assets/iconfont.js'

export default {
  name: 'IconFont',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconTag() {
      return `#blog-${this.name}`
    }
  }
}
</script>

<style lang="less">
.icon {
  width: 20px;
  height: 20px;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
  margin-right: 4px;
}
</style>