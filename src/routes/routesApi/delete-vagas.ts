import { api } from '@/services/api'
import type { DeleteVagasResponse } from '@/types/type-delete'

export async function deleteVagaByID(id: number): Promise<DeleteVagasResponse> {
  const response = await api.delete<DeleteVagasResponse>(`/vagas/${id}`)

  return response.data
}
