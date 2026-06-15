import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertWarning() {
  return (
    <Stack sx={{ width: '80%' }} spacing={2}>
      <Alert severity="warning">This is a warning Alert.</Alert>
    </Stack>
  );
}