import axios from 'axios'
const url = import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
  baseURL: url,
})

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    config.headers['x-api-key'] = import.meta.env.VITE_API_KEY

    console.log(token, import.meta.env.VITE_API_KEY)
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
  function (response) {
    return response
  },
  function (error) {
    console.log('This is error', error)
    throw error.response?.data?.message || error.message || 'Something went wrong'

    // return Promise.reject(error)
  }
)

export default axiosClient
