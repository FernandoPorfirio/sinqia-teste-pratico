import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Box,
} from "@mui/material";

export default function TabelaPontosTuristicos({
  rows,
  rowCount,
  loading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}) {
  // Adiciona handlers nas linhas
  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    cidadeNome: row.cidade?.nome,
    estadoSigla: row.cidade?.estado?.sigla,
    onEdit,
    onDelete,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : rowsWithHandlers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            ) : (
              rowsWithHandlers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.descricao}</TableCell>
                  <TableCell>{row.localizacao}</TableCell>
                  <TableCell>{row.cidadeNome}</TableCell>
                  <TableCell>{row.estadoSigla}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => onEdit(row)}>
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onDelete(row)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rowCount}
        page={page - 1}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) =>
          onPageSizeChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
}
