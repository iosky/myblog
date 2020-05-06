import api from './index'

export function fetchArticles() {
  return api.get(`article/`).then((res) => res.data)
}

export function getArticleByPk(pk) {
  return api.get(`article/${pk}`).then((res) => res.data)
}

export function postArticle(val) {
  return api.post(`article/`).then((res) => res.data)
}

export function delArticle(pk) {
  return api.delete(`article/${pk}`).then((res) => res.data)
}

export function filterArticle(title) {
  return api.get(`/article/?title__icontains=${title}`).then((res) => res.data)
}

export function updataArticleByPk(pk, val) {
  return api.put(`article/${pk}/`, val).then((res) => res.data)
}

export default {
  fetchArticles,
  getArticleByPk,
  postArticle,
  delArticle,
  filterArticle
}
