import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import ArticleDetail from '../views/ArticleDetail'
import PageNotFound from '../views/PageNotFound'
import UserManage from '../views/UserManage'
import UserDetail from '../views/UserDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/usermanage/:UMpk',
    name: 'UserManage',
    component: UserManage
  },
  {
    path: '/article/:Apk',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/user/:Upk',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // 设置404页面路由
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
