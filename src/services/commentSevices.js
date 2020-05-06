import api from './index'

export function fetchComments() {
  return api.get(`comment/`).then((res) => res.data)
}

export function postComment(val) {
  return api.post(`comment/`, val).then((res) => res.data)
}

export function delComment(pk) {
  return api.delete(`comment/${pk}`).then((res) => res.data)
}

export function getCommentByPk(pk) {
  return api.get(`comment/${pk}`).then((res) => res.data)
}

export function updataCommentByPk(pk, val) {
  return api.put(`comment/${pk}/`, val).then((res) => res.data)
}

export default {
  fetchComments,
  postComment,
  delComment,
  getCommentByPk
}
