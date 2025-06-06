import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { listarRegioes } from "@/services/regioesService";
import { listarEstados } from "@/services/estadosService";
import { listarCidades } from "@/services/cidadesService";

export default function FiltrosPontosTuristicos({
  filtros,
  setFiltros,
  onAbrirModal,
}) {
  const [regioes, setRegioes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    listarRegioes().then((res) => setRegioes(res.data));
  }, []);

  useEffect(() => {
    if (filtros.regiaoId) {
      listarEstados(filtros.regiaoId).then((res) => setEstados(res.data));
    } else {
      listarEstados().then((res) => setEstados(res.data));
      setCidades([]);
      setFiltros((f) => ({ ...f, estadoId: "", cidadeId: "" }));
    }
  }, [filtros.regiaoId]);

  useEffect(() => {
    if (filtros.estadoId) {
      listarCidades(filtros.estadoId).then((res) => setCidades(res.data));
    } else {
      setCidades([]);
      setFiltros((f) => ({ ...f, cidadeId: "" }));
    }
  }, [filtros.estadoId]);

  const inputSx = {
    minWidth: 150,
    height: 40,
    "& .MuiInputBase-root": { height: 40 },
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
      <TextField
        label="Buscar"
        variant="outlined"
        size="small"
        value={filtros.search}
        onChange={(e) =>
          setFiltros((f) => ({ ...f, search: e.target.value, page: 1 }))
        }
        sx={{ minWidth: 220, ...inputSx }}
      />
      <TextField
        select
        label="Região"
        value={filtros.regiaoId}
        onChange={(e) =>
          setFiltros((f) => ({
            ...f,
            regiaoId: e.target.value,
            estadoId: "",
            cidadeId: "",
            page: 1,
          }))
        }
        sx={inputSx}
        size="small"
      >
        <MenuItem value="">Todas</MenuItem>
        {regioes.map((regiao) => (
          <MenuItem key={regiao.id} value={regiao.id}>
            {regiao.nome}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Estado"
        value={filtros.estadoId}
        onChange={(e) =>
          setFiltros((f) => ({
            ...f,
            estadoId: e.target.value,
            cidadeId: "",
            page: 1,
          }))
        }
        sx={inputSx}
        size="small"
      >
        <MenuItem value="">Todos</MenuItem>
        {estados.map((estado) => (
          <MenuItem key={estado.id} value={estado.id}>
            {estado.nome}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Cidade"
        value={filtros.cidadeId}
        onChange={(e) =>
          setFiltros((f) => ({
            ...f,
            cidadeId: e.target.value,
            page: 1,
          }))
        }
        sx={inputSx}
        size="small"
        disabled={!filtros.estadoId}
      >
        <MenuItem value="">Todas</MenuItem>
        {cidades.map((cidade) => (
          <MenuItem key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ height: 40, minWidth: 90 }}
          onClick={() => setFiltros((f) => ({ ...f, page: 1 }))}
        >
          Filtrar
        </Button>
        <Button
          variant="outlined"
          sx={{ height: 40, minWidth: 90 }}
          onClick={() =>
            setFiltros({
              regiaoId: "",
              estadoId: "",
              cidadeId: "",
              search: "",
              page: 1,
              limit: 10,
            })
          }
        >
          Limpar
        </Button>
      </Box>
      <Box sx={{ ml: "auto" }}>
        <Button
          variant="contained"
          color="success"
          sx={{ height: 40, minWidth: 120 }}
          onClick={onAbrirModal}
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}
