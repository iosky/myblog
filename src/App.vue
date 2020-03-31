<template>
  <div id="app">
    <a-layout style="height: 64px">
      <a-layout-header class="header">
        <a-row>
          <a-col :span="4">
            <router-link
              :to="{name: 'Home'}"
              id="logo"
            >
              <img
                alt="Iosky's Blog"
                src="./assets/logo.png"
              />
            </router-link>
          </a-col>
          <a-col :span="20">
            <search-box id="search-box"></search-box>
            <a-menu
              id="nav"
              mode="horizontal"
            >
              <a-menu-item
                :key="val.pk"
                v-for="val in categorys"
              >
                <router-link :to="{name: 'Home', query:{ name: 'category', pk: val.pk}}">{{val.name}}</router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </a-layout-header>
    </a-layout>
    <router-view></router-view>
  </div>
</template>

<script>
import { fetchCategorys } from './services/categoryServices'
import Cookie from 'js-cookie'
import SearchBox from './components/SearchBox'
export default {
  name: 'app',
  data() {
    return {
      categorys: null
    }
  },
  components: {
    SearchBox
  },
  methods: {
    fetchCategorys() {
      // 获取所有分类信息
      fetchCategorys().then(data => {
        this.categorys = data
      })
    },
    filterByCategory(categoryPK) {
      Cookie.set('categoryPK', categoryPK)
    }
  },
  created() {
    // 默认显示所有主题下的文章
    Cookie.set('categoryPK', -1)
    this.fetchCategorys()
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
  background: #f0f2f5;
}

.header {
  width: 100%;
  height: 64px;

  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
}
#search-box {
  float: left;
}
#logo {
  display: block;
  line-height: 64px;
  text-align: center;

  img {
    height: 32px;
  }
}
</style>
