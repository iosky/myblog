import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css'
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
  Avatar,
  Divider,
  Input
} from 'ant-design-vue'

Vue.use(Col)
Vue.use(Row)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Card)
Vue.use(List)
Vue.use(Skeleton)
Vue.use(Divider)
Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
