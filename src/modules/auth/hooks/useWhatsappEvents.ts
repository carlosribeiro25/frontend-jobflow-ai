import { useEffect, useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import Cookies from 'js-cookie'

type SseState = {
  status: string
  qr: string | null
}

export function useWhatsappEvents(connectionId: number | null) {
  const [state, setState] = useState<SseState>({ status: 'pending', qr: null })

  useEffect(() => {
    if (!connectionId) return

    const BASE_URL = import.meta.env.DEV
      ? '/api'
      : (import.meta.env.VITE_API_URL as string).replace(/\/$/, '')
    const url = `${BASE_URL}/whatsapp/connections/${connectionId}/events`
    const controller = new AbortController()

    fetchEventSource(url, {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }),
      signal: controller.signal,
      async onopen(response) {
        if (!response.ok) {
          setState((prev) => ({ ...prev, status: 'error' }))
        }
      },
      onmessage(e) {
        if (e.event === 'status') {
          const payload = JSON.parse(e.data) as { status: string; qr?: string }
          setState({ status: payload.status, qr: payload.qr ?? null })
        } else if (e.event === 'qr') {
          const { qr } = JSON.parse(e.data)
          setState((prev) => ({ ...prev, status: 'qr', qr }))
        } else if (e.event === 'error') {
          setState((prev) => ({ ...prev, status: 'error' }))
        }
      },
      onerror(err) {
        setState((prev) => ({ ...prev, status: 'error' }))
        throw err // stop retrying
      },
    })

    return () => controller.abort()
  }, [connectionId])

  return state
}
