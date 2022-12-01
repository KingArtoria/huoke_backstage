import axios from 'axios'
const service = axios.create({
  baseURL: 'https://nad.bdhuoke.com/admin',
  timeout: 10000,
  headers: { "Content-Type": 'application/x-www-form-urlencoded' }
})
service.interceptors.request.use(
  config => {
    config.headers['token'] = localStorage.getItem('token')
    return config
  },
)
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
)
export default service