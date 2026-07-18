import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

interface AlertErrorProps {
  message?: string
}

export default function AlertError({ message }: AlertErrorProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        {message ?? 'Credenciais inválidas,verfifque se o email ou senha estao corretos.'}
      </Alert>
    </Stack>
  )
}
