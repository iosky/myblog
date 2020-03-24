import categoryService from '../../services/categoryServices'

const state = {
  categorys: []
}

const getters = {
  categorys: state => {
    return state.categorys
  }
}

const mutations = {
  setCategorys(state, categorys) {
    state.categorys = categorys
  },
  addCategory(state, category) {
    state.categorys.push(category)
  },
  delCategory(state, pk) {
    state.categorys = state.categorys.filter(obj => obj.pk != pk)
  }
}

const actions = {
  getCategorys({ commit }) {
    categoryService.fetchCategorys().then(categorys => {
      commit('setCategorys', categorys)
    })
  },
  addCategory({ commit }, category) {
    categoryService.postCategory(category).then(() => {
      commit('addCategory')
    })
  },
  delCategory({ commit }, pk) {
    categoryService.delCategory(pk)
    commit('delCategory', pk)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
