import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { useResetPaasword } from '@/modules/auth/hooks/useResetPassword'
import { Card, CardContent, CardHeader, CardTitle } from '@/@/components/ui/card'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useToast } from '@/modules/auth/hooks/useToast'
import { ToastContainer } from '@/@/components/ui/toast-container'
import { Input } from '@/@/components/ui/input'
import { Label } from '@/@/components/ui/label'
import { Button } from '@/@/components/ui/button'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const hasToken = Boolean(token)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmShowPassword, setConfirmShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const { mutate, isPending, isSuccess, isError, error } = useResetPaasword()
  const { toasts, addToast, removeToast } = useToast()
  const invalidTokenToastShown = useRef(false)

  useEffect(() => {
    if (!hasToken && !invalidTokenToastShown.current) {
      addToast({
        type: 'warning',
        message: 'Token inválido ou expirado',
        duration: 4000,
      })
      invalidTokenToastShown.current = true
    }
  }, [hasToken, addToast])

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    setLocalError(null)

    if (!hasToken) {
      addToast({
        type: 'error',
        message: 'Token inválido ou expirado',
        duration: 4000,
      })
      return
    }

    if (newPassword !== confirmPassword) {
      addToast({
        type: 'error',
        message: 'As senhas nao coincidem',
        duration: 3000,
      })
      return
    }

    if (newPassword.length < 6) {
      addToast({
        type: 'warning',
        message: 'A senha deve ter no minimo 6 caracteres',
        duration: 3000,
      })

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
    <div className="flex min-h-screen items-center justify-center">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {isSuccess ? (
        <div>
          <Card>
            <CardContent>
              <div>
                <p>Senha redefinida com sucesso 🎉🎉.</p>
                <Link className="text-blue-600" to="/login">
                  Faça login na sua conta
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="box-content w-90 m-auto">
          <CardHeader>
            <CardTitle className="text-center md:text-2xl ">
              <h1 className='text-lg xs:text-xs md:text-sm '>Redefina sua senha</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2 relative ">
                <Label className="mb-1" htmlFor="newPaasword">
                  Nova senha
                </Label>
                <Input
                  className="py-4 px-2"
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Mínimo 6 caracteres*"
                />
                <Button
                variant={'ghost'}
                  type="button"
                  className="absolute right-0 mt-5 text-gray-500 "
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </Button>
              </div>

              <div className="mt-2 flex relative flex-col">
                <Label htmlFor="confirPassword " className="mb-1">
                  Confirmar senha
                </Label>
                <Input
                  className="py-4 px-2 outline-none"
                  type={confirmShowPassword ? 'text' : 'password'}
                  name="confirPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repita a senha*"
                />

                <Button
                  type="button"
                  variant={'ghost'}
                  className="absolute right-0 mt-5 text-gray-500"
                  onClick={() => setConfirmShowPassword((prev) => !prev)}
                >
                  {confirmShowPassword ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </Button>
              </div>
              {displayError && <p role="alert">{displayError}</p>}

              <Button
                type="submit"
                className="py-2 mt-4 px-2 w-full"
                disabled={isPending}
              >
                {' '}
                {isPending ? 'Salvando...' : 'Redefinir senha'}
              </Button>

              <div className="text-blue-400 text-center mt-2">
                <Link className="" to="/login">
                  Voltar para login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
