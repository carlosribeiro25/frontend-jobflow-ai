import axios from 'axios'
import { api } from '@/services/api'
import type { SearchVagasResponse } from '@/types/vaga'

interface SearchVagasParam {
  q: string
  page?: number
  limit?: number
}

export async function searchVagas({
  q,
  page = 1,
  limit = 10,
}: SearchVagasParam): Promise<SearchVagasResponse> {
  try {
    const response = await api.get<SearchVagasResponse>('/search', {
      params: { q, page, limit },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { vagas: [], total: 0 }
    }

    throw error
  }
}
