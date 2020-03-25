import tagService from '../../services/tagServices'

const state = {
  tags: []
}

const getters = {
  tags: state => {
    return state.tags
  }
}

const mutations = {
  setTags(state, tags) {
    state.tags = tags
  },
  addTag(state, tag) {
    state.tags.push(tag)
  },
  delTag(state, pk) {
    state.tags = state.tags.filter(obj => obj.pk != pk)
  }
}

const actions = {
  getTags({ commit }) {
    tagService.fetchTags().then(tags => {
      commit('setTags', tags)
    })
  },
  addTag({ commit }, tag) {
    tagService.postTag(tag).then(() => {
      commit('addTag')
    })
  },
  delTag({ commit }, pk) {
    tagService.delTag(pk)
    commit('delTag', pk)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
