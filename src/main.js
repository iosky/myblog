import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css'
import JsCookie from 'js-cookie'
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
  Input,
  Form,
  Tabs,
  Button,
  Message,
  Modal,
  Tooltip,
  Comment
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
Vue.use(Avatar)
Vue.use(Form)
Vue.use(Tabs)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Comment)

Vue.prototype.$message = Message
Vue.prototype.$cookie = JsCookie
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
