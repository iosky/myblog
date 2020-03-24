import Vue from 'vue'
import Vuex from 'vuex'
import tag from './modules/tag'
import category from './modules/category'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    tag,
    category
  }
})
