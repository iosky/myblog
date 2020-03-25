import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  导入 ant-ui 组件
import { Col, Row, Layout, Menu, Select, Icon, Card } from 'ant-design-vue'

Vue.use(Col)
Vue.use(Row)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Card)

// 自定义icon组件
import IconFont from './components/IconFont'
Vue.component('IconFont', IconFont)

// 引入markdown

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
