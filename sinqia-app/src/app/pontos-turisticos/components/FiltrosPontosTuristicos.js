import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

export default function FiltrosPontosTuristicos({ filtros, setFiltros }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Buscar"
        variant="outlined"
        size="small"
        value={filtros.search}
        onChange={e => setFiltros(f => ({ ...f, search: e.target.value, page: 1 }))}
        sx={{ minWidth: 600 }}
      />
      <Button variant="contained" onClick={() => setFiltros(f => ({ ...f, page: 1 }))}>
        Filtrar
      </Button>
      <Button variant="outlined" onClick={() => setFiltros({
        regiaoId: "",
        estadoId: "",
        cidadeId: "",
        search: "",
        page: 1,
        limit: 10,
      })}>
        Limpar
      </Button>
    </Box>
  );
}