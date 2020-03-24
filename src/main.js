import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  导入 ant-ui 组件
import { Col, Row, Layout } from 'ant-design-vue'

Vue.component(Col.name, Col)
Vue.component(Row.name, Row)
Vue.component(Layout.name, Layout)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
