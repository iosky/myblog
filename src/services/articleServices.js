import api from './index'

function fetchArticles() {
  return api.get(`article/`).then(res => res.data)
}

function postArticle(val) {
  return api.post(`article/`).then(res => res.data)
}

function delArticle(pk) {
  return api.delete(`article/${pk}`).then(res => res.data)
}

export default {
  fetchArticles,
  postArticle,
  delArticle
}