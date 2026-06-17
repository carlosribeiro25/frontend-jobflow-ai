export type WhatsappConnection = {
    id: number
    userId: number
    status: 'pending' | 'qr' | 'ready' | 'disconnected'
    phone: string | null
    clientKey: string
}

export type WhatsappGroup = {
    id: number
    name: string
    whatsappId: string
    selected: boolean
}

export type WhatsappSeeEvent = 
| { type: 'status'; payload: { status: string; qr: string | null}}
| { type: 'qr'; payload: { qr: string }}
| { type: 'error'; payload: { message: string}}
