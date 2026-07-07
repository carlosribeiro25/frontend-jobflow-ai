import { api } from '../../services/api'

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  newPassword: string
}

export interface MessageResponse {
  message: string
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<MessageResponse> {
  const { data } = await api.post<MessageResponse>('/forgot-password', payload)
  return data
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<MessageResponse> {
  const { data } = await api.post<MessageResponse>('/reset-password', payload)
  return data
}
