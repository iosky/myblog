import Axios from 'axios'
import Cookie from 'js-cookie'

const api = Axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookie.get('csrftoken')
  }
})

export default api
