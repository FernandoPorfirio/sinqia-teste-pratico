import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Sinqia Teste Prático
        </Typography>
      </Toolbar>
    </AppBar>
  );
}