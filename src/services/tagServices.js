import api from './index'

function fetchTags() {
  return api.get(`tag/`).then(res => res.data)
}

function postTag(val) {
  return api.post(`tag/`).then(res => res.data)
}

function delTag(pk) {
  return api.delete(`tag/${pk}`).then(res => res.data)
}

export default {
  fetchTags,
  postTag,
  delTag
}
