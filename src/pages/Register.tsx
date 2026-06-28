import { api } from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import React, { useState } from "react"
import { useToast, } from "@/modules/auth/hooks/useToast"
import { ToastContainer } from "@/@/components/ui/toast-container"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/@/components/ui/card"
import { Label } from "@/@/components/ui/label"
import { Input } from "@/@/components/ui/input"
import { Button } from "@/@/components/ui/button"
import { Link } from "react-router-dom"

interface RegisterUserPayload {
    email: string
    name: string
    password: string
    phone: string
}

interface RegisterUserResponse {
    message?: string
}

interface RegisterErrorResponse {
    duplicate?: string
    message?: string
}

const registerUser = async (users: RegisterUserPayload) => {
    const { data } = await api.post<RegisterUserResponse>('/registerUser', users)
    console.log(data)
    return data;
}

const getErrorMessage = (data: unknown, fallback: string) => {
    if (typeof data === 'string') return data

    if (data && typeof data === 'object') {
        const payload = data as Record<string, unknown>
        if (typeof payload.message === 'string') return payload.message
        if (typeof payload.duplicate === 'string') return payload.duplicate
    }
    return fallback;
}

export function RegisterUser() {
    const queryClient = useQueryClient()
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)
    const { toasts, addToast, removeToast } = useToast()

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const mutation = useMutation({

        mutationFn: registerUser,

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setForm({ name: '', email: '', password: '', phone: '', confirmPassword: '' })
            addToast({
                type: 'success',
                message: data.message || 'Cadastro realizado com sucesso 🎉🎉',
                duration: 3000
            })
        },
        onError: (error: unknown) => {
            const apiError = error instanceof AxiosError
                ? error as AxiosError<RegisterErrorResponse>
                : null

            if (apiError?.response?.status === 400) {
                addToast({
                    type: 'error',
                    message: getErrorMessage(apiError.response?.data, 'Dados invalidos ou malformados.'),
                    duration: 3000
                })
            } else if (apiError?.response?.status === 409) {
                addToast({
                    type: 'warning',
                    message: getErrorMessage(apiError.response?.data, 'Este email ja esta cadastrado, tente com outro email.'),
                    duration: 4000
                })
            } else {
                addToast({
                    type: 'error',
                    message: 'Nao foi possivel concluir o cadastro agora. Tente novamente.',
                    duration: 4000
                })
            }
            return;
        }
    })

    const formatarTelefone = (valor: string) => {
        const numeros = valor.replace(/\D/g, "").slice(0, 11);

        if (numeros.length <= 10) {
            return numeros
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }
        return numeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const formatFone = name === "phone" ? formatarTelefone(value) : value;
        setForm((prev) => ({ ...prev, [name]: formatFone }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            addToast({
                type: "error",
                message: "As senhas nao coincidem",
                duration: 3000
            })
            return;
        }

        mutation.mutate({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password
        })
    }

    return (
        <div className="md:w-sm overflow-hidden p-10 md:p-12 lg:w-md justify-center m-auto min-h-screen  items-center">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <Card >
                <CardHeader>
                    <CardTitle>Faça seu cadastro</CardTitle>
                    <CardDescription>Informe seus dados para criar sua conta</CardDescription>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div >
                                <Label className="py-1" htmlFor="name">Nome</Label>
                                <Input
                                    className="py-1"
                                    type="text"
                                    value={form.name}
                                    name="name"
                                    placeholder="Digite seu nome"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <div>
                                    <Label className="py-1" htmlFor="email">Email</Label>
                                    <Input
                                        className="outline-none py-4"
                                        type="email"
                                        value={form.email}
                                        name="email"
                                        placeholder="Digite seu email*"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div>
                                    <Label className="py-1" htmlFor="phone">Telefone</Label>
                                    <Input
                                        type="tel"
                                        maxLength={15}
                                        value={form.phone}
                                        onChange={handleChange}
                                        name="phone"
                                        placeholder="Informe seu telefone*"
                                    />
                                </div>

                                <div className="relative">
                                    <Label className="py-1" htmlFor="password">Senha</Label>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        name="password"
                                        placeholder="Crie sua senha*"
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                    />
                                    <button type="button" className=" absolute right-2 mt-2 text-gray-400 "
                                        onClick={() => setShowPassword(prev => !prev)}
                                    >
                                        {showPassword ? (
                                            <VisibilityIcon fontSize="small" />
                                        ) : (
                                            <VisibilityOffIcon fontSize="small" />
                                        )}
                                    </button>
                                </div>

                                <div className="relative">
                                    <Label className="py-1" htmlFor="confirmPassword">Confirmar senha</Label>
                                    <Input
                                        type={confirmShowPassword ? "text" : "password"}
                                        value={form.confirmPassword}
                                        name="confirmPassword"
                                        placeholder="Confirme sua senha*"
                                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                        required
                                    />
                                    <button type="button" className="absolute right-2 mt-2 text-gray-400"
                                        onClick={() => setConfirmShowPassword(prev => !prev)}
                                    >
                                        {confirmShowPassword ? (
                                            <VisibilityIcon fontSize="small" />
                                        ) : (
                                            <VisibilityOffIcon fontSize="small" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-2"> Enviar Cadastro</Button>
                    </form>
                    <Link className="text-blue-300 justify-center flex mt-2" to='/login'>Voltar</Link>
                </CardContent>
            </Card>
        </div>
    )
}