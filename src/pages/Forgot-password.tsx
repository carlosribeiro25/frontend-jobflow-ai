import { useState } from "react"
import { useForgotPassword } from "@/modules/auth/hooks/useForgotPassword"
import { isAxiosError } from "axios"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/@/components/ui/card";
import { Input } from "@/@/components/ui/input";
import { Button } from "@/@/components/ui/button";
import Alert from '@mui/material/Alert';


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

            {isSuccess ? (
                <Alert severity="info">Voçe receberá as instruções no seu email</Alert>
            ) : (
                <Card className="w-90 md:w-lg  m-auto mt-8">
                    <CardHeader>
                        <CardTitle>Recupere sua senha</CardTitle>
                        <CardDescription>Informe seu email para receber as intruções.</CardDescription>

                    </CardHeader>
                    <CardContent >    
                            <form onSubmit={handleSubmit}>
                                <div className="flex gap-1">
                                    <Input
                                        className="outline-none sm:text-base"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Digite seu email aqui..."
                                    />
                                    <CardAction>
                                        <Button type="submit" disabled={isPending}>{isPending ? 'Enviando...' : 'Enviar'}</Button>
                                    </CardAction>

                                </div>


                                {errorMessage && <p role="alert">{errorMessage}</p>}

                            </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}