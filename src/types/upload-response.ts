export interface VisionUploadResponse {
  success: boolean
  data?: {
    title?: string | null
    description?: string | null
    company?: string | null
    category?: string | null
    requirements?: string | null
    modality?: string | null
    salary?: string | number | null
    benefits?: string | null
    contact?: string | null
    link?: string | null
    location?: string | null
    mensagem?: string | null
    texto_extraido?: string | null
    tipo_vaga?: string | null
    is_job?: boolean
  }
  message?: string
}
