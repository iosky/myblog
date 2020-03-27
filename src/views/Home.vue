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
      <a-layout class="content-wrapper">
        <a-layout-content
          :style="{minHeight: `${contentMinHeight}px`}"
          id="content"
        >
          <a-card
            :bordered="false"
            :hoverable="true"
            :key="val.pk"
            class="article-card"
            v-for="val in articles"
          >
            <template slot="title">{{val.title}}</template>
            <template slot="extra">
              <router-link :to="{name: 'ArticleDetail' ,params: {pk: val.pk}}">阅读全文</router-link>
            </template>
            <template slot="actions">
              <icon-font name="Fire">{{val.views}}</icon-font>
              <icon-font name="date">{{val.created_time.substring(0,9)}}</icon-font>
            </template>
            <a-card-meta>
              <template slot="description">{{val.excerpt}}</template>
            </a-card-meta>
          </a-card>
        </a-layout-content>
        <a-layout-sider></a-layout-sider>
      </a-layout>
      <a-layout-footer :style="{textAlign: 'center'}">Iosky's Blog ©2020 Created by Iosky</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox'
export default {
  name: 'Home',
  data() {
    return {
      contentMinHeight: 0
    }
  },
  components: {
    SearchBox
  },
  computed: {},
  beforeMount() {
    // 获取屏幕高度，设置content的最小高度
    let bodyHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.contentMinHeight = bodyHeight - 173
  }
}
</script>

<style lang="less">
@fontColor: rgba(0, 0, 0, 0.65);
@fontColorA: #1890ff;
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

.content-wrapper {
  padding: 20px 15%;

  #content {
    background: #fff;
    margin-right: 20px;

    .article-card {
      margin-bottom: 10px;
      a {
        color: @fontColor;
        &:hover,
        &:active {
          color: @fontColorA;
        }
      }

      .ant-card-actions {
        display: flex;
        flex-direction: row-reverse;
        background: #fff;
        border: none;
        padding-left: 75%;

        li {
          border: none;
          width: auto;
        }
      }
    }
  }
}
</style>
