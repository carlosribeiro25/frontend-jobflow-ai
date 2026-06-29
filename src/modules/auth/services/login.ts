import { api } from '@/services/api'
import { AxiosError } from 'axios'

export async function login(email: string, password: string) {
  try {
    const response = await api.post(
      '/login',
      {
        email,
        password,
      },
      {
        timeout: 20000,
      }
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.code === 'ECONNABORTED') {
      const retryResponse = await api.post(
        '/login',
        {
          email,
          password,
        },
        {
          timeout: 45000,
        }
      )

      return retryResponse.data
    }

    throw error
  }
}
