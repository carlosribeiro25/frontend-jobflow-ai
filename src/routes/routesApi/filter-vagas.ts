import { isAxiosError } from 'axios'
import { api } from '@/services/api'
import type { FilteredVagasPayload } from '@/types/filters-vagas'
import type { FiltersVagasResponse } from '@/types/filters-vagas'

export const FilteredVagas = async (
  filters: FilteredVagasPayload
): Promise<FiltersVagasResponse> => {
  const params: Record<string, string> = {}

  if (filters.category) params.category = filters.category
  if (filters.modality) params.modality = filters.modality
  if (filters.location) params.location = filters.location
  if (filters.tipo_vaga) params.tipo_vaga = filters.tipo_vaga
  if (filters.publisheAt) {
    params.publisheAt = filters.publisheAt
  }
  if (filters.page) params.page = String(filters.page)

  try {
    const { data } = await api.get<FiltersVagasResponse>(`/vagas/filtros`, { params })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return {
        vagas: [],
        hasMore: false,
        total: 0,
        page: 1,
      }
    }
    throw error
  }
}
