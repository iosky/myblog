<template>
  <div class="home">
    <a-layout>
      <a-layout-header class="header">
        <a-row>
          <a-col :span="4">
            <router-link
              :to="{name: 'Home'}"
              @click.prevent="showAllArticles"
              id="logo"
            >
              <img
                alt="Iosky's Blog"
                src="~@/assets/logo.png"
              />
            </router-link>
          </a-col>
          <a-col :span="20">
            <search-box
              @filterArticle="setFilterArticle"
              id="search-box"
            ></search-box>
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

      <a-layout
        :style="{minHeight: `${contentMinHeight}px`, marginTop: '64px'}"
        class="content-wrapper"
      >
        <a-layout-content id="content">
          <a-list
            :class="{fadeIn: listFadeI, fadeOut: listFadeO}"
            :dataSource="articles"
            :split="false"
            class="animated faster"
            itemLayout="vertical"
            size="large"
          >
            <a-list-item
              class="article-card"
              key="item.pk"
              slot="renderItem"
              slot-scope="item"
            >
              <template slot="extra">
                <div class="img-box">
                  <template v-if="item">
                    <router-link
                      :to="{name: 'ArticleDetail', params: {Apk: item.pk}}"
                      slot="title"
                    >
                      <img
                        alt="logo"
                        src="~@/assets/articlelogodefault.png"
                        v-if="!articlesLoading"
                        width="200"
                      />
                    </router-link>
                  </template>
                </div>
              </template>
              <a-skeleton
                :loading="articlesLoading"
                active
              >
                <a-list-item-meta>
                  <template slot="description">
                    <span>{{item.description}}</span>
                  </template>
                  <template v-if="item">
                    <router-link
                      :to="{name: 'ArticleDetail', params: {Apk: item.pk}}"
                      slot="title"
                    >{{item.title}}</router-link>
                  </template>
                </a-list-item-meta>
              </a-skeleton>
            </a-list-item>
          </a-list>
        </a-layout-content>
        <a-layout-sider
          :style="{background: 'transparent', height: 'auto'}"
          width="300"
        >
          <home-sider></home-sider>
        </a-layout-sider>
      </a-layout>

      <a-layout-footer :style="{textAlign: 'center'}">Iosky's Blog ©2020 Created by Iosky</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { fetchCategorys } from '../services/categoryServices'
import { fetchArticles } from '../services/articleServices'

import SearchBox from '../components/SearchBox'
import HomeSider from '../components/HomeSider'
export default {
  name: 'Home',
  data() {
    return {
      contentMinHeight: 0,
      articles: [1, 2, 3],
      allArticles: [1, 2, 3],
      articlesLoading: true,
      filterName: null,
      filterPk: null,
      categorys: null,
      articleNum: 123,
      effectNum: 345,
      listFadeI: true,
      listFadeO: false
    }
  },
  components: {
    SearchBox,
    HomeSider
  },
  watch: {
    /**
     * 监控路由变化
     */
    $route(to, from) {
      let flag = this.judgeFilter()
      // 路由变化之后，开始过滤信息, list消失
      this.listFadeO = true
      setTimeout(() => {
        if (flag) {
          this.articles = this.allArticles.filter(val => val[this.filterName] === this.filterPk)
        } else {
          this.articles = this.allArticles
        }
        this.listFadeI = true
        this.listFadeO = false
      }, 500)
    }
  },
  methods: {
    /**
     * 判断过滤信息是否有效
     */
    judgeFilter() {
      this.filterName = this.$route.query.name
      this.filterPk = Number(this.$route.query.pk)
      let nameFlag = ['tag', 'category'].indexOf(this.filterName) !== -1
      // 判断是否为正整数
      let pkReg = new RegExp(/^[1-9]\d*$/)
      let pkFlag = pkReg.test(this.filterPk)
      return nameFlag && pkFlag
    },
    /**
     * 通过分类选择获取相关文章
     */
    fetchArticles() {
      let flag = this.judgeFilter()
      fetchArticles().then(data => {
        this.allArticles = data
        if (flag) {
          this.articles = data.filter(val => val[this.filterName] === this.filterPk)
        } else {
          this.articles = data
        }
        this.articlesLoading = false
      })
    },
    /**
     * 获取所有的主题信息
     */
    fetchCategorys() {
      fetchCategorys().then(data => {
        this.categorys = data
      })
    },
    //  显示过滤后的文件
    setFilterArticle(articles) {
      this.articles = articles
    },
    // 显示所有文章
    showAllArticles() {
      this.articles = this.allArticles
    }
  },
  created() {
    this.fetchCategorys()
    this.fetchArticles()
  },
  mounted() {
    // 获取屏幕高度，设置content的最小高度
    let bodyHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.contentMinHeight = bodyHeight - 173
  }
}
</script>

<style lang="less">
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
    height: 55px;
  }
}
#nav.ant-menu-horizontal {
  margin-right: 25%;
  border: none;
  line-height: 64px;
  .ant-menu-submenu {
    height: 64px;
    line-height: 60px;
    min-width: 72px;
  }
}

.content-wrapper {
  padding: 20px 15%;
  #content {
    margin-right: 20px;
    min-height: calc(100% - 64px);
  }
}
.article-card {
  margin-bottom: 10px;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);

  span {
    cursor: default;
  }
}
</style>
