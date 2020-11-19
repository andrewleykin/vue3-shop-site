import axios from 'axios'
import router from '@/router'

axios.defaults.headers['content-type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.response.use(null, (error) => {
  // eslint-disable-next-line no-console
  console.error(error)

  if (error.status === 401) {
    router.push({ name: 'CatalogPage' })
  }
  return Promise.reject(error)
})
