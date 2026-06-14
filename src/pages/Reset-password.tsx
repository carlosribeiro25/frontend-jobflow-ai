import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { isAxiosError } from "axios"
import { useResetPaasword } from "@/modules/auth/hooks/useResetPassword"


export function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') ?? ''

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
            setLocalError('Asenha de ter no minimo 6 caracteres')
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
            <h1> Redefinir senha</h1>
            {isSuccess ? (
                <p>Senha redefinida com sucesso.</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newPaasword">Nova senha</label>
                    <input type="password"
                     name="newPassword"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     required
                     placeholder="Mínimo 6 caracteres"/>

                     <label htmlFor="confirPassword">Confirmar senha</label>
                     <input type="password" name="confirPassword"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     required
                     placeholder="Repita a senha*"/>

                     { displayError && <p role="alert">{displayError}</p>}

                     <button type="submit" disabled={isPending}> {isPending ? 'Salvando...' : 'Redefinir senha'}</button>
                </form>
            )}
        </div>
    )
}