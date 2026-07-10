import { api } from '@/services/api'
import { AxiosError } from 'axios'

const loginTimeoutMs = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 20000)

function isRetryableLoginError(error: unknown) {
  return (
    error instanceof AxiosError &&
    (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || !error.response)
  )
}

export async function login(email: string, password: string) {
  const payload = {
    email,
    password,
  }

  try {
    const response = await api.post('/login', payload, {
      timeout: loginTimeoutMs,
    })

    return response.data
  } catch (error) {
    if (!isRetryableLoginError(error)) {
      throw error
    }

    const retryResponse = await api.post('/login', payload, {
      timeout: loginTimeoutMs + 10000,
    })

    return retryResponse.data
  }
}
