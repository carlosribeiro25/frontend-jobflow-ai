import axios from 'axios'
import Cookies from 'js-cookie'

const configuredApiUrl = (import.meta.env.VITE_API_URL ?? '').trim()
const normalizedBaseUrl = configuredApiUrl ? configuredApiUrl.replace(/\/$/, '') : '/api'
const timeoutMs = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 20000)

export const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : normalizedBaseUrl,
  withCredentials: true,
  timeout: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 20000,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
  for (const { resolve, reject } of failedQueue) {
    if (error) {
      reject(error)
    } else {
      resolve(token!)
    }
  }
  failedQueue = []
}

function redirectToLogin() {
  Cookies.remove('token')
  Cookies.remove('user')
  window.location.href = '/login'
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const requestUrl = originalRequest?.url as string | undefined

    if (requestUrl === '/login') {
      return Promise.reject(error)
    }

    if (requestUrl === '/refresh') {
      processQueue(error, null)
      isRefreshing = false
      redirectToLogin()
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const response = await api.post('/refresh')
        const newAccessToken = response.data?.accessToken ?? response.data?.token

        if (!newAccessToken) {
          processQueue(new Error('No token in refresh response'), null)
          isRefreshing = false
          redirectToLogin()
          return Promise.reject(error)
        }

        Cookies.set('token', newAccessToken)
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        processQueue(null, newAccessToken)
        isRefreshing = false

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        isRefreshing = false
        redirectToLogin()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
