import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { isAxiosError } from "axios"
import { useResetPaasword } from "@/modules/auth/hooks/useResetPassword"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/@/components/ui/card"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') ?? ''
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [localError, setLocalError] = useState<string | null>(null)
    const { mutate, isPending, isSuccess, isError, error } = useResetPaasword()

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        setLocalError(null)

        if (!token) {
            setLocalError('Token inválido ou ausente.')
            return
        }

        if (newPassword.length < 6) {
            setLocalError('A senha de ter no minimo 6 caracteres')
            return
        }

        mutate({ token, newPassword })
    }

    const serverError = isError
        ? isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : 'Ocorreu um erro. Tente novamente'
        : null
    const displayError = localError ?? serverError

    return (
        <div>

            {isSuccess ? (
                <p>Senha redefinida com sucesso.</p>
            ) : (
                <Card className="box-content w-90 m-auto mt-2">
                    <CardHeader>
                        <CardTitle className="text-center sm:text-2xl ">
                            <h1>Redefina sua senha</h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-2 relative ">
                                <label className="mb-1" htmlFor="newPaasword">Nova senha</label>
                                <input
                                    className="py-2 px-2 rounded outline-none bg-gray-100"
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Mínimo 6 caracteres*" />
                                <button className=" absolute right-2 mt-8 text-gray-500 "
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? (
                                        <VisibilityIcon fontSize="small" />
                                    ) : (
                                        <VisibilityOffIcon fontSize="small" />
                                    )}
                                </button>
                            </div>

                            <div className="mt-2 flex relative flex-col">
                                <label htmlFor="confirPassword " className="mb-1">Confirmar senha</label>
                                <input
                                    className="bg-gray-100 rounded py-2 px-2 outline-none"
                                    type={confirmShowPassword ? "text" : "password"}
                                    name="confirPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Repita a senha*" />

                                <button className="absolute right-2 mt-8 text-gray-500"
                                    onClick={() => setConfirmShowPassword(prev => !prev)}
                                >
                                    {confirmShowPassword ? (
                                        <VisibilityIcon fontSize="small" />
                                    ) : (
                                        <VisibilityOffIcon fontSize="small" />
                                    )}
                                </button>

                            </div>
                            {displayError && <p role="alert">{displayError}</p>}

                            <button type="submit"
                                className="py-2 mt-2 text-amber-50 px-2 bg-blue-400 w-full rounded"
                                disabled={isPending}> {isPending ? 'Salvando...' : 'Redefinir senha'}</button>
                        </form>

                    </CardContent>
                </Card>

            )}
        </div>
    )
}