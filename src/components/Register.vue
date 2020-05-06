<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="register-form"
    id="register"
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
        placeholder="Password"
        type="password"
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码！' }] },
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
        class="register-form-button"
        html-type="submit"
        type="primary"
      >{{text}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { postUser } from '../services/userServices'
export default {
  data() {
    return {
      loading: false,
      text: '注册'
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleSubmit(e) {
      this.loading = true
      this.text = '正在注册，请等待'
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          postUser(values)
            .then(data => {
              this.loading = false
              this.text = '注册'
              this.$message.success(`恭喜！${data.username}，注册成功`)
              this.$cookie.set('pk', data.pk)
              this.$router.push({ name: 'UserDetail', params: { Upk: data.pk } })
            })
            .reject(err => {
              this.$message.error('注册失败，请重新输入相关信息')
            })
        }
      })
    }
  }
}
</script>
<style>
#register .register-form {
  max-width: 300px;
}
#register .register-form-forgot {
  float: right;
}
#register .register-form-button {
  width: 100%;
}
</style>