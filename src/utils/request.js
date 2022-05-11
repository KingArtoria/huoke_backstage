import axios from 'axios'
const service = axios.create({
  baseURL: 'http://nad.bdhuoke.com/admin',
  timeout: 10000,
  // headers: { "Content-Type": 'application/x-www-form-urlencoded' }
})
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
)
export default service