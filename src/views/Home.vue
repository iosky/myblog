<template>
  <div class="home">
    <a-layout>
      <a-layout-header class="header">
        <a-row>
          <a-col :span="4">
            <router-link
              :to="{name: 'Home'}"
              id="logo"
            >
              <img
                alt="Iosky's Blog"
                src="../assets/logo.png"
              />
            </router-link>
          </a-col>
          <a-col :span="20">
            <search-box id="search-box"></search-box>
            <a-menu
              id="nav"
              mode="horizontal"
            >
              <a-sub-menu title="主题">
                <a-menu-item
                  :key="val.pk"
                  v-for="val in categorys"
                >{{val.name}}</a-menu-item>
              </a-sub-menu>
              <a-sub-menu title="标签">
                <a-menu-item
                  :key="val.pk"
                  v-for="val in tags"
                >{{val.name}}</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
        <a-layout-content></a-layout-content>
        <a-layout-sider></a-layout-sider>
      </a-layout>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    SearchBox
  },
  computed: {
    ...mapGetters('category', ['categorys']),
    ...mapGetters('tag', ['tags'])
  }
}
</script>

<style lang="less">
.header {
  width: 100%;
  height: 64px;
  // position: fixed;
  // z-index: 10;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
}
#logo {
  display: block;
  line-height: 64px;
  text-align: center;

  img {
    height: 32px;
  }
}

#nav.ant-menu-horizontal {
  float: right;
  margin-right: 25%;
  border: none;
  .ant-menu-submenu {
    height: 64px;
    line-height: 60px;
    min-width: 72px;
  }
}

#search-box {
  float: left;
}
</style>
