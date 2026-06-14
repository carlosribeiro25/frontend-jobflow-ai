import { api } from "@/services/api";
import { createContext, useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthContextType {
    user: any;
    login: (token: string, userData: any) => void;
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({children} : { children: React.ReactNode}) {
    const [ user, setUser ] = useState(() => {
        const token = Cookies.get('token');
        const userData = JSON.parse(Cookies.get('user') || "{}")
        return token ? { token ,userData} : null;
    })

    const navigate = useNavigate()

    const login = useCallback((token: string, userData: any) => {
        Cookies.set('token', token)
        Cookies.set('user', JSON.stringify(userData))
        setUser( { token, userData})
    }, []);

    const logout = useCallback(async () => {

        try {
            await api.post('/logout')

        } catch (error: any) {
           console.warn('Erro ao invalidar token') 
        } finally{
            Cookies.remove('token')
            Cookies.remove('user')
            sessionStorage.clear()
            setUser(null)
            navigate('/login', { replace: true})
        }
    }, [navigate])

    return ( 
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
       throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}