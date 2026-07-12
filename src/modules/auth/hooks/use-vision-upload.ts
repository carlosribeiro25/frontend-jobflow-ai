import { useMutation } from "@tanstack/react-query";
import { uploadVisionImage, type VisionUploadResponse } from "@/types/upload-response";

export function useVisionUpload() {
    return useMutation<VisionUploadResponse, Error, File>({
        mutationFn: (file) => uploadVisionImage(file),
    })
}