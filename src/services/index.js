import Axios from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

const api = Axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookie.get('csrftoken')
  }
})

// api.interceptors.request.use(
//   (config) => {
//     if (config.type == 'formData' || config.method != 'post') {
//       return config
//     }
//     config.data = qs.stringify(config.data)
//     console.log(config.data)
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

export default api
