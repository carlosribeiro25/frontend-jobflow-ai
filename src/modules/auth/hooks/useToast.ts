import { useCallback, useEffect, useRef, useState } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

export interface AddToastParams {
  message: string
  type?: ToastType
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeoutIdsRef = useRef<number[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    ({ message, type = 'info', duration = 3000 }: AddToastParams) => {
      const id = Date.now() + Math.floor(Math.random() * 1000)

      setToasts((prev) => [...prev, { id, message, type }])

      const timeoutId = window.setTimeout(() => {
        removeToast(id)
      }, duration)

      timeoutIdsRef.current.push(timeoutId)
    },
    [removeToast]
  )

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      timeoutIdsRef.current = []
    }
  }, [])

  return { toasts, addToast, removeToast }
}
