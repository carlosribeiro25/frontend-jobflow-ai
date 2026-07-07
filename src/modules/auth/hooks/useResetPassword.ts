import { useMutation } from '@tanstack/react-query'
import { resetPassword, type ResetPasswordPayload } from '@/routes/routesApi/auth'

export function useResetPaasword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  })
}
