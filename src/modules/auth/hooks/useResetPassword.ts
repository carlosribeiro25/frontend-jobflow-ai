import { useMutation } from "@tanstack/react-query";
import { resetPassword, type ResetPasswordPayload } from "@/services/auth";

export function useResetPaasword() {
    return useMutation({
        mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload)
    })
}