import { api } from '@/services/api'
import type { Vaga } from '@/types/vaga'

export async function getVagasId(id: number): Promise<Vaga> {
  const response = await api.get<Vaga>(`/vagas/${id}`)

  return response.data
}
