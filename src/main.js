import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  导入 ant-ui 组件
import { Col, Row, Layout, Menu, Select, Icon } from 'ant-design-vue'

Vue.use(Col)
Vue.use(Row)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
