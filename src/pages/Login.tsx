import { api } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Cookies from 'js-cookie'
import { useAuth } from "./AuthLogin";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useToast } from "@/modules/auth/hooks/useToast";
import { ToastContainer } from "@/@/components/ui/toast-container";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/@/components/ui/card";
import { Button } from "@/@/components/ui/button";
import { Label } from "@/@/components/ui/label";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const { toasts, addToast, removeToast } = useToast();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const { data } = await api.post('/login', {
                email, password
            })

            login(data.token, {
                name: data.user.name,
                picture: data.user.picture,
                email: data.user.email,
                phone: data.user.phone
            })

            Cookies.set('token', data.token)
            if (data.refreshToken) {
                Cookies.set('refreshToken', data.refreshToken)
            }

            navigate('/')

        } catch (error: any) {
            console.error("Erro:", error.response?.data || error.message)
            if (error.response?.status === 400) {
                addToast({
                    message: error.response?.data?.message || 'Credenciais invalidas, verifique se o email ou senha estão corretos',
                    type: 'error',
                    duration: 4000
                })
            } else {
                addToast({
                    message: error.response?.data?.message || 'Não foi possivel fazer login agora, tente novamente.',
                    type: 'warning',
                    duration: 4000
                })
            }

        }

    }
    return (
        <div className="md:w-sm overflow-hidden p-10 md:p-12 lg:w-md justify-center m-auto  items-center">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <Card >
                <h1 className="mt-1 font-bold text-lg justify-center sm:text-2xl flex justify-items-center text-fuchsia-700 py-2"> Jobflow AI</h1>
                <CardHeader >
                    <CardTitle>Faça login na sua conta</CardTitle>

                    <CardDescription>Insira seu e-mail e senha para acessar sua conta.</CardDescription>
                    <CardAction>
                        <Link className="text-blue-700 " to="/CadastroUsuario">Cadastre-se</Link>
                    </CardAction>

                </CardHeader>
                <CardContent>
                    <form className="px-1"
                        onSubmit={handleSubmit}>

                        <div className="flex flex-col">
                            <Label className="py-1" htmlFor="email">Email </Label>

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

                        <div className="flex flex-col relative">
                            <div className="flex justify-between ">
                                <Label className="py-2" htmlFor="password">Senha</Label>
                                <Link className="mt-2 text-blue-500" to='/esquecer-senha'>Esqueceu a senha?</Link>
                            </div>
                            <input
                                className="px-2 py-2 outline-none bg-gray-200 rounded"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={password}
                                placeholder="Digite sua senha*"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" className=" absolute right-2 mt-10 text-gray-400 "
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? (
                                    <VisibilityIcon fontSize="small" />
                                ) : (
                                    <VisibilityOffIcon fontSize="small" />
                                )}
                            </button>
                        </div>

                        <div className="justify-center justify-items-center">
                            <Button className="font-semibold w-full mt-3  px-2 py-2" type="submit">Conecte-se</Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
            {/* <section className="border-be-blue-950 bg-gray-100 rounded shadow flex flex-col w-80 m-auto justify-items-center justify-center px-2 py-4">
                

                

            </section> */}
        </div>
    )
}



