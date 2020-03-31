<template>
  <div class="home">
    <a-layout>
      <a-layout class="content-wrapper">
        <a-layout-content id="content">
          <a-list
            :dataSource="articles"
            :split="false"
            itemLayout="vertical"
            size="large"
          >
            <a-list-item
              class="article-card"
              key="item.pk"
              slot="renderItem"
              slot-scope="item,index"
            >
              <template slot="extra">
                <div class="img-box">
                  <router-link :to="{name: 'ArticleDetail', params: {Apk: item.pk}}">
                    <img
                      alt="logo"
                      src="../assets/articlelogo.jpg"
                      v-if="!articlesLoading"
                      width="264"
                    />
                  </router-link>
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
                  <router-link
                    :to="{name: 'ArticleDetail', params: {Apk: item.pk}}"
                    slot="title"
                  >{{item.title}}</router-link>
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
import AppVue from '../App.vue'
export default {
  name: 'Home',
  data() {
    return {
      articles: [1, 2, 3],
      allArticles: [1, 2, 3],
      articlesLoading: true,
      filterName: null,
      filterPk: null
    }
  },
  components: {
    SearchBox
  },
  watch: {
    /**
     * 监控路由变化
     */
    $route(to, from) {
      let flag = this.judgeFilter()
      if (flag) {
        this.articles = this.allArticles.filter(val => val[this.filterName] === this.filterPk)
      }
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
    }
  },

  created() {
    this.fetchArticles()
  }
}
</script>

<style lang="less">
@fontColor: rgba(0, 0, 0, 0.65);
@fontColorA: #1890ff;

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
  }
  .img-box {
    border-radius: 6px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transform: rotate(0deg);
    img {
      transition: all 0.5s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
