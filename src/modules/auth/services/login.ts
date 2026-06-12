import { api } from "@/services/api";

export async function login(email: string, password: string) {
    const response = await api.post('/login', {
        email, password
    })

    return response.data
}