import React, { useState } from 'react'
import { useVisionUpload } from '@/modules/auth/hooks/use-vision-upload'
import { Input } from '@/@/components/ui/input'
import { Button } from '@/@/components/ui/button'
import AlertError from '@/@/components/ui/alert-error'
import { ToastContainer } from '@/@/components/ui/toast-container'
import { useToast } from '@/modules/auth/hooks/useToast'

export function VisionUpload() {
  const { mutate, isPending, data, error } = useVisionUpload()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const { toasts, addToast, removeToast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    setLocalError(null)
  }

  const handleSubmit = () => {
    if (!selectedFile) {
      addToast({
        message: 'Selecione um arquivo antes de enviar',
        type: 'warning',
        duration: 4000,
      })
      return
    }
    setLocalError(null)
    mutate(selectedFile)
  }

  const errorMessage = localError ?? error?.message ?? null

  return (
    <div className="relative">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Input
        type="file"
        className="h-14 p-4 cursor-pointer"
        accept="image/*"
        onChange={handleFileChange}
      />

      <Button type="button" onClick={handleSubmit} className="mt-2">
        Enviar Arquivo
      </Button>

      {isPending && <p>Enviando imagem...</p>}
      {errorMessage && <AlertError message={errorMessage} />}

      {data?.success && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
