import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const requestUrl = originalRequest?.url as string | undefined

    if (requestUrl === '/login') {
      return Promise.reject(error)
    }

    if (requestUrl === '/refresh') {
      Cookies.remove('token')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await api.post('/refresh')
        const newAccessToken = response.data?.accessToken ?? response.data?.token

        if (!newAccessToken) {
          Cookies.remove('token')
          window.location.href = '/login'
          return Promise.reject(error)
        }

        Cookies.set('token', newAccessToken)
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        Cookies.remove('token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
