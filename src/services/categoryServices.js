import api from './index'

export function fetchCategorys() {
  return api.get(`category/`).then(res => res.data)
}

export function postCategory(val) {
  return api.post(`category/`).then(res => res.data)
}

export function delCategory(pk) {
  return api.delete(`category/${pk}`).then(res => res.data)
}

export default {
  fetchCategorys,
  postCategory,
  delCategory
}
