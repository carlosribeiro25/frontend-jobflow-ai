import { isAxiosError } from 'axios'
import { api } from './api'
import type { Vaga } from '@/types/vaga'

const LIMIT = 12

interface VagasApiResponse {
  vagas: Vaga[]
  hasMore: boolean
  total: number
  page: number
}

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

function notFound(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404
}

export async function fetchVagas(page: number): Promise<VagasResult> {
  try {
    const { data } = await api.get<VagasApiResponse>('/vagas', {
      params: { page, limit: LIMIT },
    })
    return data
  } catch (error) {
    if (notFound(error)) {
      return { vagas: [], total: 0, hasMore: false, page }
    }
    throw error
  }
}

export async function searchVagas(q: string, page: number): Promise<VagasResult> {
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
