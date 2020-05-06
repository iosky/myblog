<template>
  <div
    id="user-detail"
    style="padding: 10px 20%;"
  >
    <a-button type="primary">
      <router-link :to="{name: 'Home'}">回到首页</router-link>
    </a-button>
    <a-tabs
      class="content"
      defaultActiveKey="1"
    >
      <a-tab-pane
        key="1"
        tab="个人信息"
      >
        <a-form
          :form="form"
          @submit="handleSubmit"
          class="infor-form"
          id="infor"
        >
          <a-form-item>
            <a-input
              placeholder="Username"
              v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入用户名！' }] },
        ]"
            >
              <a-icon
                slot="prefix"
                style="color: rgba(0,0,0,.25)"
                type="user"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              placeholder="请输入新密码"
              type="password"
              v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入新密码！' }] },
        ]"
            >
              <a-icon
                slot="prefix"
                style="color: rgba(0,0,0,.25)"
                type="lock"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="loading"
              class="infor-form-button"
              html-type="submit"
              type="primary"
            >更新个人信息</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane
        forceRender
        key="2"
        tab="评论"
      >
        <a-list
          :dataSource="comments"
          :split="false"
          itemLayout="vertical"
          size="large"
        >
          <a-list-item
            class="article-card"
            key="item.pk"
            slot="renderItem"
            slot-scope="item, index"
          >
            <a-button
              @click="showModal"
              style="marginRight: 10px"
              type="primary"
            >编辑</a-button>
            <a-modal
              :confirmLoading="confirmLoading"
              :visible="visible"
              @cancel="handleCancel"
              @ok="commentEdit(index, item)"
              title="修改评论"
            >
              <a-textarea
                :rows="4"
                v-model="commentContent[index]"
              />
            </a-modal>
            <a-button
              @click="commentDel(item.pk)"
              type="danger"
            >删除</a-button>

            <a-list-item-meta>
              <router-link
                :to="{name: 'ArticleDetail', params: {Apk: item.article}}"
                slot="title"
              >{{item.content}}</router-link>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane
        forceRender
        key="3"
        tab="文章收藏"
      >
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
            slot-scope="item"
          >
            <a-button
              @click="delArticle(item.pk)"
              type="danger"
            >删除</a-button>
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
                      width="200"
                    />
                  </router-link>
                </template>
              </div>
            </template>
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
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getUserByPk, updataUserByPk } from '../services/userServices'
import { getArticleByPk, delArticle } from '../services/articleServices'
import { fetchComments, delComment, updataCommentByPk } from '../services/commentSevices'
export default {
  data() {
    return {
      user: null,
      pk: -1,
      username: '',
      password: '',
      loading: false,
      articles: [],
      comments: [],
      visible: false,
      confirmLoading: false,
      commentContent: []
    }
  },
  methods: {
    handleSubmit(e) {
      this.loading = true
      this.text = '正在更新，请等待'
      e.preventDefault()
      this.form.validateFields((err, values) => {
        updataUserByPk(this.pk, values)
          .then(data => {
            this.loading = false
            this.text = '更新个人信息'
            this.$message.success(`恭喜！${data.username}，更新成功`)
            this.form.setFieldsValue({
              username: data.username
            })
          })
          .reject(() => {})
      })
      this.loading = false
      this.text = '更新个人信息'
    },
    getData() {
      getUserByPk(this.pk).then(data => {
        this.form.setFieldsValue({
          username: data.username
        })
        console.log(data)
        this.password = data.password
        this.username = data.username
        data.articles.forEach(val => {
          getArticleByPk(val).then(data => {
            this.articles.push(data)
          })
        })
      })
      fetchComments().then(data => {
        this.comments = data.filter(val => val.user == this.pk)
        data.forEach(val => {
          this.commentContent.push(val.content)
        })
        // console.log(data)
      })
    },
    delArticle(articlePk) {
      this.articles = this.articles.filter(val => val.pk !== articlePk)
      let user = {
        username: this.username,
        password: this.password,
        articles: this.articles
      }
      updataUserByPk(this.pk, user).then(data => {
        this.$message.success('删除成功')
      })
    },
    commentDel(pk) {
      this.comments = this.comments.filter(val => val.pk !== pk)
      delComment(pk).then(data => {
        this.$message.success('删除成功')
      })
    },
    commentEdit(index, comment) {
      let content = this.commentContent[index]
      comment.content = content
      this.visible = false
      updataCommentByPk(comment.pk, comment).then(data => {
        this.$message.success('修改成功')
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    showModal() {
      this.visible = true
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'info' })
  },
  created() {
    // 获取个人信息
    this.pk = this.$cookie.get('pk')
    this.getData()
  }
}
</script>
<style>
</style>
