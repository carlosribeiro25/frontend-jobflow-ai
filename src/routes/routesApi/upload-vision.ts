import { api } from '@/services/api'
import type { VisionUploadResponse } from '@/types/upload-response'
import { AxiosError } from 'axios'

export async function uploadVisionImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post<VisionUploadResponse>('/vision/test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>

    if (axiosError.response?.status === 400) {
      const message =
        axiosError.response?.data?.message ??
        axiosError.response?.data?.error ??
        'Nenhum arquivo foi enviado'
      throw new Error(message, { cause: error })
    }

    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.data?.error ??
      'Erro ao enviar imagem'

    throw new Error(message, { cause: error })
  }
}
