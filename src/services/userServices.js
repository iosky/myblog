import api from './index'

export function fetchUsers() {
  return api.get(`user/`).then((res) => res.data)
}

export function postUser(val) {
  return api.post(`user/`, val).then((res) => res.data)
}

export function delUser(pk) {
  return api.delete(`user/${pk}`).then((res) => res.data)
}

export function getUserByPk(pk) {
  return api.get(`user/${pk}`).then((res) => res.data)
}

export function updataUserByPk(pk, val) {
  return api.put(`user/${pk}/`, val).then((res) => res.data)
}

export default {
  fetchUsers,
  postUser,
  delUser,
  getUserByPk
}
