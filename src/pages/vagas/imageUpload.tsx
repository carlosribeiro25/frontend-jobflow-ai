import React, { useState, useRef } from 'react'
import { useVisionUpload } from '@/modules/auth/hooks/use-vision-upload'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import AlertError from '@/@/components/ui/alert-error'
import { ToastContainer } from '@/@/components/ui/toast-container'
import { useToast } from '@/modules/auth/hooks/useToast'
import { Input } from '@/@/components/ui/input'
import { Button } from '@/@/components/ui/button'

export type ImageUploadProps = {
  file: File | null
  onChange: (file: File | null) => void
}

export function ImageUpload({ file, onChange }: ImageUploadProps) {
  const { mutate, isPending, data, error } = useVisionUpload()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const { toasts, addToast, removeToast } = useToast()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedFile(file)
    onChange(file)
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

  function handleRemove() {
    onChange(null)
    setSelectedFile(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const errorMessage = localError ?? error?.message ?? null

  return (
    <div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {isPending && <p>Enviando imagem...</p>}
      {errorMessage && <AlertError message={errorMessage} />}

      {data?.success && <pre>{JSON.stringify(data, null, 2)}</pre>}

      <section className="rounded-lg border p-2 space-y-2">
        {!file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-20 w-full flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors hover:bg-muted"
          >
            <Upload className="mb-3 mt-1 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">Clique para selecionar uma imagem</p>

            <p className="text-sm text-muted-foreground">PNG, JPG ou WEBP</p>
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-md border p-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <ImageIcon className="h-5 w-5 shrink-0" />

              <div className="overflow-hidden">
                <p className="truncate font-medium">{file.name}</p>

                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
                Trocar
              </Button>

              <Button type="button" variant="destructive" size="icon" onClick={handleRemove}>
                <X className="h-4 w-4" />
              </Button>

              <Button type="button" onClick={handleSubmit} className=" cursor-pointer">
                Enviar
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
