import type { Modality, Vaga } from './vaga'

export interface FilteredVagasPayload {
  category?: string | null
  tipo_vaga?: string | null
  modality?: Modality | null
  location?: string | null
  publisheAt: string | null
  page?: number
}

export interface FiltersVagasResponse {
  vagas: Vaga[]
  hasMore: boolean
  total: number
  page: number
  totalPages?: number
}
