<template>
  <div class="article">
    <a-layout class="content-wrapper">
      <a-layout-content class="article-detail">
        <div
          id="skeleton-wrapper"
          v-if="loading"
        >
          <a-skeleton
            :key="item"
            active
            v-for="item in [1,2,3,4,5]"
          ></a-skeleton>
        </div>
        <vue-markdown v-else>{{article.content}}</vue-markdown>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import { getArticleByPk } from '../services/articleServices'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      pk: null,
      article: {},
      loading: true
    }
  },
  components: {
    VueMarkdown
  },
  methods: {
    getArticleByPk() {
      this.pk = this.$route.params.Apk
      getArticleByPk(this.pk).then(data => {
        this.article = data
        this.loading = false
      })
    }
  },

  beforeMount() {
    this.getArticleByPk()
  }
}
</script>

<style lang="less">
.article-detail {
  background: #fff;
  padding: 10px 20px;
}
</style>