import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function FiltrosPontosTuristicos() {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField label="Buscar" variant="outlined" size="small" />
      <TextField select label="Estado" variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <MenuItem value="">Todos</MenuItem>
      </TextField>
      <TextField select label="Cidade" variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <MenuItem value="">Todas</MenuItem>
      </TextField>
      <TextField select label="Categoria" variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <MenuItem value="">Todas</MenuItem>
      </TextField>
      <Button variant="contained">Filtrar</Button>
      <Button variant="outlined">Limpar</Button>
    </Box>
  );
}