import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { whatsappApi } from '@/routes/routesApi/whatsapp.api'

export const whatsappKeys = {
  connections: ['whatsapp', 'connections'] as const,
  groups: (id: number) => ['whatsapp', 'connections', id, 'groups'] as const,
}

export function useConnections() {
  return useQuery({
    queryKey: whatsappKeys.connections,
    queryFn: whatsappApi.listConnections,
  })
}

export function useCreateConnection() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: whatsappApi.createConnection,
    onSuccess: () => qc.invalidateQueries({ queryKey: whatsappKeys.connections }),
  })
}

export function useDeleteConnection() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => whatsappApi.deleteConection(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: whatsappKeys.connections }),
  })
}

export function useStartConnection() {
  return useMutation({
    mutationFn: (id: number) => whatsappApi.startConnection(id),
  })
}

export function useGroups(connectionId: number, enabled: boolean) {
  return useQuery({
    queryKey: whatsappKeys.groups(connectionId),
    queryFn: () => whatsappApi.getGroups(connectionId),
    enabled,
    retry: 1,
  })
}

export function useSelectGroups(connectionId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (groupsIds: number[]) => whatsappApi.selectGroups(connectionId, groupsIds),
    onSuccess: () => qc.invalidateQueries({ queryKey: whatsappKeys.groups(connectionId) }),
  })
}

export function useDisconnect() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => whatsappApi.disconnect(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: whatsappKeys.connections }),
  })
}
