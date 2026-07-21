import { createContext, useContext } from 'react'
import type { UserRole } from '@/types/type-user'

export interface AuthUserData {
  id: number
  email: string
  name: string
  phone?: string
  picture?: string
  role: UserRole
}

export interface AuthSession {
  token: string
  userData: AuthUserData
}

export interface AuthContextType {
  user: AuthSession | null
  login: (token: string, userData: AuthUserData) => void
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
