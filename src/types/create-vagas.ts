import type { Modality } from '@/types/vaga'

export interface RegisterVagaPayload {
  title: string
  message?: string | null
  tipo_vaga: string
  description: string
  category: string
  company: string
  requirements: string
  modality: Modality | null
  salary: number | null
  benefits: string
  contact: string
  link: string
  location: string
}

export interface RegisterVagaResponse {
  message: string
  error: string
}
