import { useState } from "react";
import { QRCodeSVG } from 'qrcode.react'
import {
    useConnections, useCreateConnection, useStartConnection,
    useGroups, useSelectGroups, useDisconnect
} from '@/modules/auth/hooks/useWhatsapp'

import { useWhatsappEvents } from "@/modules/auth/hooks/useWhatsappEvents";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function WhatsappConnect() {
    const [activeConnectId, setActiveConnectId] = useState<number | null>(null)
    const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([])

    const { data: connections} = useConnections()
    const createConnection = useCreateConnection()
    const startConnection = useStartConnection()
    const disconnect = useDisconnect()

    const { status, qr} = useWhatsappEvents(activeConnectId)
    const isReady = status === 'ready'

    const { data: groups, isError: groupsError, refetch: refetchGroups } = useGroups(activeConnectId ?? 0, isReady && !!activeConnectId)
    const selectGroups = useSelectGroups(activeConnectId ?? 0)

    async function handleConnect() {
        const conn = await createConnection.mutateAsync()
        setActiveConnectId(conn.id)
        startConnection.mutate(conn.id)
    }

    function toggleGroup(id: number) {
        setSelectedGroupIds(prev => 
            prev.includes(id) ?prev.filter(g => g !== id) : [...prev, id]
        )
    }

    return (
        <div>
            <Button onClick={handleConnect} disabled={createConnection.isPending}>
                Conetar com o Whatsapp
            </Button>

            {connections?.map(conn => (
                <div key={conn.id}>
                    <span>{conn.phone ?? conn.clientKey}</span>
                    <span>{conn.status}</span>

                    <Button onClick={() => {
                        setActiveConnectId(conn.id)
                        startConnection.mutate(conn.id)
                    }}> Reconectar</Button>

                    <Button variant="destructive" onClick={() => disconnect.mutate(conn.id)}> Desconectar</Button>

                </div>
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
            {status === 'pending' && activeConnectId && <p>Aguardando QR...</p>}
            {isReady && <p>Conectado</p>}

            {/* Grupo e canais */}

            {isReady && groupsError && (
                <div>
                    <p>Erro ao carregar grupos. A sessão pode ter expirado.</p>
                    <Button variant="destructive" onClick={() => refetchGroups()}>Tentar novamente</Button>
                </div>
            )}

            {isReady && groups && (
                <div>
                    <h3>Selecione Grupos/canais</h3>
                    {groups.map(group => (
                        <Label key={group.id}>
                            <Input type="checkbox"
                            checked={selectedGroupIds.includes(group.id)}
                            onChange={() => toggleGroup(group.id)} />
                        {group.name}
                        </Label>
                    ))}

                    <Button onClick={() => selectGroups.mutate(selectedGroupIds)}>Salvar seleção</Button>
                </div>
            )}
        </div>
    )
}