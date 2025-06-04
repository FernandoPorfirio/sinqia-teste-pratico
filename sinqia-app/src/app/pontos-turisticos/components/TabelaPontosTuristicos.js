import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome", width: 200 },
  { field: "cidade", headerName: "Cidade", width: 150 },
  { field: "estado", headerName: "Estado", width: 100 },
  { field: "categoria", headerName: "Categoria", width: 150 },
  {
    field: "acoes",
    headerName: "Ações",
    width: 180,
    renderCell: (params) => (
      <>
        <Button size="small" onClick={params.row.onEdit}>Editar</Button>
        <Button size="small" color="error" onClick={params.row.onDelete}>Excluir</Button>
      </>
    ),
    sortable: false,
    filterable: false,
  },
];

const rows = [
  { id: 1, nome: "Cristo Redentor", cidade: "Rio de Janeiro", estado: "RJ", categoria: "Monumento" },
  // ...adicione mais dados fictícios
];

export default function TabelaPontosTuristicos({ onEdit, onDelete }) {
  // Adiciona handlers nas linhas
  const rowsWithHandlers = rows.map(row => ({
    ...row,
    onEdit: () => onEdit(row),
    onDelete: () => onDelete(row),
  }));

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsWithHandlers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}