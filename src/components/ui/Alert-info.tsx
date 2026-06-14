import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertInfo() {
  return (
    <Stack sx={{ width: '80%' }} spacing={2}>
      <Alert severity="info">This is an info Alert.</Alert>
    </Stack>
  );
}