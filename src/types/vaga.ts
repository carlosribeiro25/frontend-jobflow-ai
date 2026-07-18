export type Modality = 'Remoto' | 'Hibrido' | 'Presencial' | 'Home Office'

export interface Vaga {
  id: number
  title: string | null
  message?: string | null
  tipo_vaga?: string | null
  description?: string | null
  category?: string | null
  requirements?: string | null
  company: string | null
  modality?: Modality | null
  salary?: number | null
  benefits?: string | null
  contact?: string | null
  link?: string | null
  location?: string | null
  publisheAt: string | null
}

export interface SearchVagasResponse {
  vagas: Vaga[]
  total: number
}
