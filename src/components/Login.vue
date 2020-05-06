<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="login-form"
    id="login"
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
        class="login-form-button"
        html-type="submit"
        type="primary"
      >登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { fetchUsers } from '../services/userServices'
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          fetchUsers().then(data => {
            let flag = false
            let pk = -1
            data.forEach(val => {
              if (val.username == values.username && val.password == values.password) {
                flag = true
                pk = val.pk
              }
            })
            if (flag) {
              this.$message.success(`${values.username}！登录成功`)
              this.$cookie.set('pk', pk)
              this.$router.push({ name: 'UserDetail', params: { Upk: pk } })
            } else {
              this.$message.error(`密码或用户名错误`)
            }
          })
        }
      })
    }
  }
}
</script>
<style>
#login .login-form {
  max-width: 300px;
}
#login .login-form-forgot {
  float: right;
}
#login .login-form-button {
  width: 100%;
}
</style>