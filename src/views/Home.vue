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
            ></a-menu>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout class="content-wrapper">
        <a-layout-content
          :style="{minHeight: `${contentMinHeight}px`}"
          id="content"
        >
          <a-list
            :dataSource="articles"
            itemLayout="vertical"
            size="large"
          >
            <div
              slot="footer"
              style="textAlign: center"
              v-if="!articlesLoading"
            >
              <b>我们也是有底线的！！！</b>
            </div>
            <a-list-item
              key="item.pk"
              slot="renderItem"
              slot-scope="item,index"
            >
              <img
                alt="logo"
                slot="extra"
                src="../assets/articlelogo.jpg"
                v-if="!articlesLoading"
                width="272"
              />
              <a-skeleton
                :loading="articlesLoading"
                active
                avatar
              >
                <a-list-item-meta>
                  <template slot="description">
                    <span>{{item.excerpt}}</span>
                  </template>
                  <router-link
                    :to="{name: 'ArticleDetail', params: {pk: item.pk}}"
                    slot="title"
                  >{{item.title}}</router-link>
                  <a-avatar
                    slot="avatar"
                    src="../assets/articlelogo.jpg"
                  ></a-avatar>
                </a-list-item-meta>
              </a-skeleton>
            </a-list-item>
          </a-list>
        </a-layout-content>
        <a-layout-sider></a-layout-sider>
      </a-layout>
      <a-layout-footer :style="{textAlign: 'center'}">Iosky's Blog ©2020 Created by Iosky</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox'
import { fetchArticles } from '../services/articleServices'
export default {
  name: 'Home',
  data() {
    return {
      contentMinHeight: 0,
      articles: [1, 2, 3],
      articlesLoading: true
    }
  },
  components: {
    SearchBox
  },
  computed: {},
  methods: {
    getAllArticles() {
      fetchArticles().then(data => {
        this.articles = data
        this.articlesLoading = false
      })
    }
  },
  beforeMount() {
    // 获取屏幕高度，设置content的最小高度
    let bodyHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.contentMinHeight = bodyHeight - 173

    // 获取所有文章信息
    this.getAllArticles()
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
    padding: 0 20px;

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
