import { api } from "@/services/api";
import type { RegisterVagaResponse } from "@/types/create-vagas";
import type { RegisterVagaPayload } from "@/types/create-vagas";

export const registerVaga = async (vagas: RegisterVagaPayload): Promise<RegisterVagaResponse> => {
    const { data } = await api.post<RegisterVagaResponse>(`/register`, vagas)
    console.log(data)
    return data
}

