import { api } from '@/services/api'

export async function getVagasId(id: number) {
  const response = await api.get(`/vagas/${id}`)

  return response.data
}
