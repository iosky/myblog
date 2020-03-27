import Vue from 'vue'
import App from './App.vue'
import router from './router'

//  导入 ant-ui 组件
import {
  Col,
  Row,
  Layout,
  Menu,
  Select,
  Icon,
  Card,
  List,
  Skeleton,
  Avatar
} from 'ant-design-vue'

Vue.use(Col)
Vue.use(Row)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Card)
Vue.use(List)
Vue.use(Skeleton)
Vue.use(Avatar)

// 自定义icon组件
import IconFont from './components/IconFont'
Vue.component('IconFont', IconFont)

// 引入markdown

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
