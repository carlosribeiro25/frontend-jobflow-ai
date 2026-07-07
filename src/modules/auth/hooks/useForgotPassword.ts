import { useMutation } from '@tanstack/react-query'
import { forgotPassword, type ForgotPasswordPayload } from '@/routes/routesApi/auth'

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  })
}
