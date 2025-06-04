import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.200', mt: 'auto' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Pontos Turísticos
      </Typography>
    </Box>
  );
}