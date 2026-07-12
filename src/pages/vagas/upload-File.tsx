import React from "react";
import { useVisionUpload } from "@/modules/auth/hooks/use-vision-upload";
import { Input } from "@/@/components/ui/input";

export function VisionUpload() {
    const { mutate, isPending, data, error } = useVisionUpload()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        mutate(file)
    }

    return (
        <div className="relative">
            <Input type="file" className="h-14 p-4 cursor-pointer" accept="image/*" onChange={handleFileChange}
            />
            
            { isPending && <p>Enviando imagem...</p>}
            { error && <p>{error.message}</p>}

            {data?.success && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    )
}