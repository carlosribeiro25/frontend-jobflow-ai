import { createContext, useContext } from 'react'

export interface AuthUserData {
  email: string
  name: string
  phone?: string
  picture?: string
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
