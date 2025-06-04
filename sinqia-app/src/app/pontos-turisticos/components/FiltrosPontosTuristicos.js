import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { listarRegioes } from "@/services/regioesService";
import { listarEstados } from "@/services/estadosService";
import { listarCidades } from "@/services/cidadesService";

export default function FiltrosPontosTuristicos({ filtros, setFiltros }) {
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
      setEstados([]);
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

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
        sx={{ minWidth: 150 }}
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
        sx={{ minWidth: 150 }}
        disabled={!filtros.regiaoId}
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
        sx={{ minWidth: 150 }}
        disabled={!filtros.estadoId}
      >
        <MenuItem value="">Todas</MenuItem>
        {cidades.map((cidade) => (
          <MenuItem key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Buscar"
        variant="outlined"
        size="small"
        value={filtros.search}
        onChange={(e) =>
          setFiltros((f) => ({ ...f, search: e.target.value, page: 1 }))
        }
        sx={{ minWidth: 300 }}
      />
      <Button
        variant="contained"
        onClick={() => setFiltros((f) => ({ ...f, page: 1 }))}
      >
        Filtrar
      </Button>
      <Button
        variant="outlined"
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
  );
}
