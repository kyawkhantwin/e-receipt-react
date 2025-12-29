import axios from 'axios'
import { store } from '../redux/store'
import { clearAuthData } from '../redux/slices/authSlice'
const url = import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
  baseURL: url,
})

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')

    config.headers['x-api-key'] = import.meta.env.VITE_API_KEY
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(clearAuthData())
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default axiosClient
