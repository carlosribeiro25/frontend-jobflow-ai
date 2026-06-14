import { api } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AlertError from '@/components/ui/Alert-error'
import AlertWarning from "@/components/ui/Alet-warning";
import Cookies from 'js-cookie'
import { useAuth } from "./AuthLogin"; 

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()
    const [ alertType, setAlertType ] = useState<'error' | 'warning' | null>(null)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const { data } = await api.post('/login', {
                email, password
            })

            login(data.token, {
                name: data.user.name,
                picture: data.user.picture,
                email: data.user.picture,
                phone: data.user.phone
            })

            Cookies.set('token', data.token)

            navigate('/dashboard')

        } catch (error: any) {
            console.error("Erro:", error.response?.data || error.message)
            if (error.response?.status === 400) {
                setAlertType('error')
            } else {
                setAlertType('warning')
            }
        }

    }
    return (
        <div className="">
            
            <section className="border-be-blue-950 rounded shadow flex flex-col w-80 m-auto justify-items-center justify-center px-2 py-4 mt-20">
                <h2 className="mt-1 font-bold text-lg justify-center sm:text-2xl flex justify-items-center py-2"> Jobflow AI</h2>

                <form className="px-1"
                 onSubmit={handleSubmit}>
                    {alertType === 'error' && <AlertError/>}
                    {alertType === 'warning' && <AlertWarning/>}
                <div className="flex flex-col">
                    <label className="py-2" htmlFor="email">Email </label>
                    
                    <input
                        className="px-2 py-2 outline-none bg-gray-200 rounded"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="Digite seu email*"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="py-2" htmlFor="password">Senha</label>
                    <input
                        className="px-2 py-2 outline-none bg-gray-200 rounded"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        placeholder="Digite sua senha*"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="justify-center justify-items-center">
                    <button className="text-amber-50 font-semibold bg-blue-500 w-full mt-3 rounded px-2 py-2" type="submit">Acessar</button>
                </div>

                <div className="flex justify-between mt-2 text-blue-600">
                    <Link to='/CadastroUsuario'>Ja tem cadastro?</Link>
                    <Link to='/esqucer-senha'>Esqueceu a senha?</Link>
                </div>

            </form>

            </section>
        </div>
    )
}



