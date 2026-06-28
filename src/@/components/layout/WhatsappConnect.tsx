import { useState } from "react";
import { QRCodeSVG } from 'qrcode.react'
import {
    useConnections, useCreateConnection, useStartConnection,
    useGroups, useSelectGroups, useDisconnect, useDeleteConnection
} from '@/modules/auth/hooks/useWhatsapp'

const statusConfig: Record<string,
    { label: string; color: ChipProps['color'] }> = {
    pending: { label: 'Pendente', color: 'warning' },
    qr_ready: { label: 'QR code pronto', color: 'info' },
    authenticated: { label: 'Autenticado', color: 'success' },
    ready: { label: 'Pronto', color: 'primary' },
    disconnect: { label: 'Desconectado', color: 'primary' },
    failed: { label: 'Falha', color: 'error' }
};

import { useWhatsappEvents } from "@/modules/auth/hooks/useWhatsappEvents";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import Chip, { type ChipProps } from "@mui/material/Chip";
import { TrashIcon } from "lucide-react";

export function WhatsappConnect() {
    const [activeConnectId, setActiveConnectId] = useState<number | null>(null)
    const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([])
    const { data: connections } = useConnections()
    const createConnection = useCreateConnection()
    const startConnection = useStartConnection()
    const disconnect = useDisconnect()
    const deleteConnection = useDeleteConnection()
    const { status, qr } = useWhatsappEvents(activeConnectId)
    const isReady = status === 'ready'
    const statusView = status ? statusConfig[status] : undefined;
    const { data: groups, isError: groupsError, refetch: refetchGroups } = useGroups(activeConnectId ?? 0, isReady && !!activeConnectId)
    const selectGroups = useSelectGroups(activeConnectId ?? 0)

    async function handleDelete(id: number) {
        try {
            await deleteConnection.mutateAsync(id)
            if (activeConnectId === id) {
                setActiveConnectId(null)
            }
        } catch (error) {
            console.error('Erro ao deletar conexão:', error)
        }
    }

    async function handleConnect() {
        const conn = await createConnection.mutateAsync()
        setActiveConnectId(conn.id)
        startConnection.mutate(conn.id)
    }

    function toggleGroup(id: number) {
        setSelectedGroupIds(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        )
    }

    return (
        <>
            <div className="m-auto flex ml-10 mt-4 items-center justify-center ">
                <Button onClick={handleConnect} disabled={createConnection.isPending}>
                    Conetar com o Whatsapp
                </Button>
            </div>

            <div className="w-md p-10 space-y-3 grid lg:grid-cols-2 lg:w-4xl  m-auto gap-4">

                {connections?.map((conn) => (
                    <Card key={conn.id}>

                        <CardContent className="space-y-4 p-5">
                            <div>
                                <CardAction>
                                    <Button type="button"
                                        variant="destructive"
                                        onClick={() => handleDelete(conn.id)}
                                        disabled={deleteConnection.isPending}>
                                        <TrashIcon />
                                    </Button>
                                </CardAction>
                                <p className="font-semibold">Clientkey:</p>

                                <span> {conn.phone ?? conn.clientKey}</span>

                            </div>

                            <div className="flex gap-2 items-center">
                                <p className="font-semibold ">Status </p>
                                {statusView && <Chip label={statusView.label} color={statusView.color} size="small" />}
                            </div>

                            <div className="flex gap-1 mt-2 py-2">

                                <Button onClick={() => {
                                    setActiveConnectId(conn.id)
                                    startConnection.mutate(conn.id)
                                }}> Reconectar</Button>

                                <Button variant="destructive" onClick={() => disconnect.mutate(conn.id)}> Desconectar</Button>

                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* qr code */}
                {status === 'qr' && qr && (
                    <div>
                        <p>Escaneie o QR code no Whatsapp</p>
                        {qr.startsWith('data:image') ? (
                            <img src={qr} alt="QR Code WhatsApp" width={256} height={256} />
                        ) : (
                            <QRCodeSVG value={qr} size={256} level="H" marginSize={2} />
                        )}
                    </div>
                )}

                {/* status feedback */}
                {status === 'pending' && activeConnectId && <p>Aguardando QR code...</p>}
                {isReady && <p className="text-green-500">Conectado com sucesso!</p>}

                {/* Grupo e canais */}

                {isReady && groupsError && (
                    <Card>
                        <CardContent>
                            <p className="mb-2">Erro ao carregar grupos. A sessão pode ter expirado.</p>
                            <Button variant="destructive" onClick={() => refetchGroups()}>Tentar novamente</Button>
                        </CardContent>
                    </Card>
                )}

                {isReady && groups && (
                    <Card className="">
                        <CardHeader>
                            <h3 className="font-semibold">Selecione Grupos/canais</h3>
                        </CardHeader>

                        <CardContent className="w-full flex flex-col">
                            {groups.map(group => (
                                <div className="py-2 w-full flex gap-1 space-y-1  items-center " key={group.id}>
                                    <input type="checkbox"
                                        checked={selectedGroupIds.includes(group.id)}
                                        onChange={() => toggleGroup(group.id)} />
                                    <span>{group.name}</span>
                                </div>
                            ))}
                        <Button type="submit" onClick={() => selectGroups.mutate(selectedGroupIds)}>Salvar seleção</Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    )
}