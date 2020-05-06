<template>
  <div id="user-manage">
    <a-tabs
      :defaultActiveKey="activeKey"
      @change="callback"
      class="content"
    >
      <a-tab-pane
        key="1"
        tab="登录"
      >
        <login></login>
      </a-tab-pane>
      <a-tab-pane
        forceRender
        key="2"
        tab="注册"
      >
        <register></register>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Login from '../components/Login'
import Register from '../components/Register'
export default {
  data() {
    return {
      activeKey: this.$route.params.UMpk
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    callback(key) {
      console.log(key)
    }
  }
}
</script>

<style lang="less">
#user-manage {
  padding: 10% 30%;
  .content {
    margin-bottom: 10px;
    background: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  }
}
</style>
