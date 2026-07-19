import { useMutation } from '@tanstack/react-query'
import { type VisionUploadResponse } from '@/types/upload-response'
import { uploadVisionImage } from '@/routes/routesApi/upload-vision'

export function useVisionUpload() {
  return useMutation<VisionUploadResponse, Error, File>({
    mutationFn: (file) => uploadVisionImage(file),
  })
}
