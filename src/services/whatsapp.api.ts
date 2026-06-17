import {type WhatsappGroup, type WhatsappConnection } from "@/types/whatsapp";
import { api } from "./api";

export const whatsappApi = {
    listConnections: () => 
        api.get<WhatsappConnection[]>('/whatsapp/connections').then(r => r.data),

    createConnection: () => 
        api.post<Pick<WhatsappConnection, 'id' | 'status' | 'clientKey'>>('/whatsapp/connections').then(r => r.data),

    startConnection: (id:number) => 
        api.post<{ status: string}>(`/whatsapp/connections/${id}/start`).then(r => r.data),

    getGroups: (id: number) => 
        api.get<WhatsappGroup[]>(`/whatsapp/connections/${id}/groups`).then(r => r.data),

    selectGroups: (id: number, gruposIds: number[]) =>
        api.post<{ success: boolean}>(`/whatsapp/connections/${id}/groups/select`, {gruposIds})
    .then(r => r.data),

    disconnect: (id: number) =>
        api.post<{ success: boolean}>(`/whatsapp/connections/${id}/disconnect`).then(r => r.data),
}