import articleService from '../../services/articleServices'

const state = {
  articles: []
}

const getters = {
  articles: state => {
    return state.articles
  },
  getArticleByPk: state => pk => {
    return state.articles.find(article => pk === article.pk)
  }
}

const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  addArticle(state, article) {
    state.articles.push(article)
  },
  delArticle(state, pk) {
    state.articles = state.articles.filter(obj => obj.pk != pk)
  }
}

const actions = {
  getArticles({ commit }) {
    articleService.fetchArticles().then(articles => {
      commit('setArticles', articles)
    })
  },
  addArticle({ commit }, article) {
    articleService.postArticle(article).then(() => {
      commit('addArticle')
    })
  },
  delArticle({ commit }, pk) {
    articleService.delArticle(pk)
    commit('delArticle', pk)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
