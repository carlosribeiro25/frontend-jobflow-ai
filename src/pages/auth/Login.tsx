import { useAuth } from '@/modules/auth/context/auth-context'
import { login as loginRequest } from '@/modules/auth/services/login'
import { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useToast } from '@/modules/auth/hooks/useToast'
import { ToastContainer } from '@/@/components/ui/toast-container'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/@/components/ui/card'
import { Button } from '@/@/components/ui/button'
import { Label } from '@/@/components/ui/label'
import { Input } from '@/@/components/ui/input'

interface LoginResponse {
  token?: string
  accessToken?: string
  user: {
    email: string
    name: string
    phone?: string
    picture?: string
  }
}

interface ApiErrorResponse {
  message?: string
  error?: string
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const { toasts, addToast, removeToast } = useToast()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmittingRef.current) {
      return
    }

    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      const data = (await loginRequest(email, password)) as LoginResponse

      const accessToken = data.accessToken ?? data.token

      if (!accessToken) {
        addToast({
          message: 'Resposta de autenticacao invalida. Tente novamente.',
          type: 'error',
          duration: 4000,
        })
        return
      }

      login(accessToken, {
        name: data.user.name,
        picture: data.user.picture,
        email: data.user.email,
        phone: data.user.phone,
      })

      Cookies.set('token', accessToken)

      navigate('/')
    } catch (error: unknown) {
      const apiError =
        error instanceof AxiosError
          ? error
          : new AxiosError<ApiErrorResponse>('Erro inesperado no login')

      const isConnectionFailure =
        apiError.code === 'ECONNABORTED' || apiError.code === 'ERR_NETWORK' || !apiError.response

      if (isConnectionFailure) {
        console.warn('Falha de conexao no login:', apiError.message)
      } else {
        console.error('Erro:', apiError.response?.data || apiError.message)
      }

      if (apiError.code === 'ECONNABORTED' || apiError.code === 'ERR_NETWORK') {
        addToast({
          message:
            'A API demorou para responder ou não está disponível no momento. Verifique a conexão e tente novamente.',
          type: 'warning',
          duration: 5000,
        })
      } else if (!apiError.response) {
        addToast({
          message: 'Nao foi possivel conectar ao servidor de login. Verifique a API e sua rede.',
          type: 'warning',
          duration: 5000,
        })
      } else if (apiError.response?.status === 400) {
        addToast({
          message:
            apiError.response?.data?.message ||
            'Credenciais invalidas, verifique se o email ou senha estão corretos',
          type: 'error',
          duration: 4000,
        })
      } else {
        addToast({
          message:
            apiError.response?.data?.message ||
            'Não foi possivel fazer login agora, tente novamente.',
          type: 'warning',
          duration: 4000,
        })
      }
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }
  return (
    <div className="w-full min-h-screen  md:w-md overflow-hidden p-10 md:p-12 lg:w-md justify-center m-auto  items-center">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Card>
        <h1 className="mt-1 font-bold text-lg justify-center sm:text-2xl flex justify-items-center text-fuchsia-700 py-2">
          {' '}
          Jobflow AI
        </h1>
        <CardHeader>
          <CardTitle>Faça login na sua conta</CardTitle>
          <CardDescription>Insira seu e-mail e senha para acessar sua conta.</CardDescription>
          <CardAction>
            <Link className="text-blue-400 " to="/CadastroUsuario">
              Cadastre-se
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form className="px-1 pb-3 " onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Label className="py-1 pb-2" htmlFor="email">
                Email{' '}
              </Label>

              <Input
                className="px-2 py-4 lg:py-4.5 outline-none "
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Digite seu email*"
                required
                disabled={isSubmitting}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col relative">
              <div className="flex justify-between ">
                <Label className="py-2" htmlFor="password">
                  Senha
                </Label>
                <Link className="mt-2 text-blue-400" to="/esquecer-senha">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                className="px-2 py-4 lg:py-4.5 outline-none  "
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                placeholder="Digite sua senha*"
                required
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className=" absolute right-2 mt-9 lg:mt-10 text-gray-400 "
                disabled={isSubmitting}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </button>
            </div>

            <div className="justify-center justify-items-center">
              <Button
                className="font-semibold w-full mt-3  px-2 py-4 lg:py-5 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Conectando...' : 'Conecte-se'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
