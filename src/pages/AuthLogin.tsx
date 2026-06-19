import { AuthContext, type AuthSession, type AuthUserData } from "@/modules/auth/context/auth-context"
import { api } from "@/services/api"
import Cookies from "js-cookie"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

const getStoredSession = (): AuthSession | null => {
    const token = Cookies.get('token')
    const storedUser = Cookies.get('user')

    if (!token || !storedUser) {
        return null
    }

    try {
        return {
            token,
            userData: JSON.parse(storedUser) as AuthUserData,
        }
    } catch {
        Cookies.remove('user')
        return null
    }
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthSession | null>(getStoredSession)
    const navigate = useNavigate()

    const login = useCallback((token: string, userData: AuthUserData) => {
        Cookies.set('token', token)
        Cookies.set('user', JSON.stringify(userData))
        setUser({ token, userData })
    }, [])

    const logout = useCallback(async () => {
        try {
            await api.post('/logout')
        } catch {
            console.warn('Erro ao invalidar token')
        } finally {
            Cookies.remove('token')
            Cookies.remove('user')
            sessionStorage.clear()
            setUser(null)
            navigate('/login', { replace: true })
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}