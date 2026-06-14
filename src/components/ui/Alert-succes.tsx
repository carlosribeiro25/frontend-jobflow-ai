import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertSuccess() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">This is a success Alert.</Alert>
    </Stack>
  );
}