<template>
  <div class="article">
    <a-layout class="content-wrapper">
      <a-layout>
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
        <a-layout-sider
          class="article-detail-sider"
          theme="light"
        >
          <a-tooltip>
            <template
              slot="title"
              v-if="!flagLogin"
            >请先登录</template>
            <template
              slot="title"
              v-else-if="isLike"
            >已收藏</template>
            <a-button
              :disabled="!flagLogin || isLike"
              @click="likeArticle"
              icon="like-o"
              type="primary"
            >{{siderText}}</a-button>
          </a-tooltip>
        </a-layout-sider>
      </a-layout>
      <a-layout-footer>
        <a-list
          :dataSource="comments"
          :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
          itemLayout="horizontal"
          v-if="comments.length"
        >
          <a-list-item
            class="article-card"
            slot="renderItem"
            slot-scope="item"
          >
            <a-comment
              :author="item.user"
              :content="item.content"
            ></a-comment>
          </a-list-item>
        </a-list>
        <a-comment>
          <div slot="content">
            <a-form-item>
              <a-textarea
                :rows="4"
                :value="value"
                @change="handleChange"
              ></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="submitting"
                @click="handleSubmit"
                htmlType="submit"
                type="primary"
              >增加评论</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import { getArticleByPk, updataArticleByPk } from '../services/articleServices'
import { updataUserByPk, getUserByPk } from '../services/userServices'
import { fetchComments, postComment } from '../services/commentSevices'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      pk: null,
      article: {},
      loading: true,
      siderText: '收藏文章',
      user: null,
      userPk: -1,
      flagLogin: false,
      isLike: false,
      comments: [],
      submitting: false,
      value: ''
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
    },
    likeArticle() {
      this.article.like++
      updataArticleByPk(this.pk, this.article)
      getUserByPk(this.userPk).then(data => {
        this.user = data
        this.user.articles.push(this.pk)
        updataUserByPk(this.user.pk, this.user).then(data => {
          this.$message.success('文章收藏成功')
        })
      })
    },
    judgeLogin() {
      this.userPk = this.$cookie.get('pk')
      if (this.userPk && this.userPk !== -1) {
        this.flagLogin = true
      }
    },
    judgeLike() {
      if (this.flagLogin) {
        getUserByPk(this.userPk).then(data => {
          this.user = data
          this.isLike = this.user.articles.indexOf(Number(this.pk)) !== -1
        })
      }
    },
    getComments() {
      fetchComments().then(data => {
        this.comments = data.filter(val => val.article === this.pk)
        getUserByPk(this.userPk).then(data => {
          let name = data.username
          this.comments.forEach(val => (val.user = name))
        })
      })
    },
    handleSubmit() {
      if (!this.value) {
        return
      }
      this.submitting = true
      if (this.flagLogin) {
        let comment = {
          content: this.value,
          user: this.userPk,
          article: this.pk
        }

        postComment(comment).then(data => {
          this.$message.success('评论成功')
          this.submitting = false
          this.value = ''
          this.comments = [
            {
              content: this.value,
              user: this.user.username,
              article: this.pk
            },
            ...this.comments
          ]
        })
      } else {
        this.$message.error('请先登录')
        this.submitting = false
      }
    },
    handleChange(e) {
      this.value = e.target.value
    }
  },

  created() {
    this.getArticleByPk()
    this.judgeLogin()
    this.judgeLike()
    this.getComments()
  }
}
</script>

<style lang="less">
.article-detail {
  background: #fff;
  padding: 10px 20px;
  box-shadow: -12px -3px 15px 0px rgba(0, 0, 0, 0.05);
}
.article-detail-sider {
  margin-left: 20px;
  position: fixed;
  height: 200px;
  right: 0;
  background: transparent;
}
</style>