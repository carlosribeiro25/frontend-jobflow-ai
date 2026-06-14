import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertError() {
  return (
    <Stack sx={{ width: '80%' }} spacing={2}>
      <Alert  severity="error">Credenciais inválidas, verifique se o email ou senha estao corretos.</Alert>
    </Stack>
  );
}