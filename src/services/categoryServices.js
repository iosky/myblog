import api from './index'

function fetchCategorys() {
  return api.get(`category/`).then(res => res.data)
}

function postCategory(val) {
  return api.post(`category/`).then(res => res.data)
}

function delCategory(pk) {
  return api.delete(`category/${pk}`).then(res => res.data)
}

export default {
  fetchCategorys,
  postCategory,
  delCategory
}
