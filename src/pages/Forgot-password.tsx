import { useState } from "react"
import { useForgotPassword } from "@/modules/auth/hooks/useForgotPassword"
import { isAxiosError } from "axios"

export function ForgotPassword() {

    const [email, setEmail] = useState('')
    const { mutate, isPending, isSuccess, isError, error } = useForgotPassword()

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        mutate({ email })
    }

    const errorMessage = isError
        ? isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : 'Ocorreu um erro. Tente novamente'
        : null

    return (
        <div>
            <h1> Esqueci a senha</h1>

            { isSuccess ? (
                <p>Se o email existir em nossa base, voce receberá as instruções em breve</p>

            ): (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email"> E-mail</label>
                    <input
                    value={email}
                    type="email" name="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Digite seu email*"/>

                    { errorMessage && <p role="alert">{errorMessage}</p>}

                    <button type="submit" disabled={isPending}>{ isPending ? 'Enviando...' : 'Enviar instruções'}</button>
                </form>
            )}
        </div>
    )
}