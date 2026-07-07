import type { Vaga } from '@/types/vaga'
import { api } from '@/services/api'

const LIMIT = 12

interface SearchApiResponse {
  vagas: Vaga[]
  total: number
}

export interface VagasResult {
  vagas: Vaga[]
  total: number
  hasMore: boolean
  page: number
}

export async function getSearchVagas(q: string, page: number): Promise<VagasResult> {
  const { data } = await api.get<SearchApiResponse>('/search', {
    params: { q, page, limit: LIMIT },
  })

  return {
    vagas: data.vagas,
    total: data.total,
    hasMore: page * LIMIT < data.total,
    page,
  }
}
