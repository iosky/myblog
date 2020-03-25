<template>
  <div class="article-detial">
    <a-layout class="content-wrapper">
      <a-layout-content>
        <vue-markdown>{{article.content}}</vue-markdown>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      pk: null,
      article: null
    }
  },
  components: {
    VueMarkdown
  },
  mounted() {
    this.pk = this.$route.params.pk
    this.article = this.$store.getters.getArticleByPk(this.pk)
  }
}
</script>