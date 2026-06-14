import { useMutation } from '@tanstack/react-query'
import { forgotPassword, type ForgotPasswordPayload } from '@/services/auth'

export function useForgotPassword() {
    return useMutation({
        mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    })
}