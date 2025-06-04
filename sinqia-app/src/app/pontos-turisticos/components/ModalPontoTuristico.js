import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { listarRegioes } from "@/services/regioesService";
import { listarEstados } from "@/services/estadosService";
import { listarCidades } from "@/services/cidadesService";
import {
  criarPontoTuristico,
  atualizarPontoTuristico,
} from "@/services/pontosTuristicosService";

export default function ModalPontoTuristico({
  open,
  onClose,
  onSuccess,
  ponto,
}) {
  const isEdit = Boolean(ponto && ponto.id);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    localizacao: "",
    regiaoId: "",
    estadoId: "",
    cidadeId: "",
  });
  const [errors, setErrors] = useState({});
  const [regioes, setRegioes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listarRegioes().then((res) => setRegioes(res.data));
  }, []);

  useEffect(() => {
    if (form.regiaoId) {
      listarEstados(form.regiaoId).then((res) => setEstados(res.data));
    } else {
      setEstados([]);
    }
    setForm((f) => ({ ...f, estadoId: "", cidadeId: "" }));
    setCidades([]);
  }, [form.regiaoId]);

  useEffect(() => {
    if (form.estadoId) {
      listarCidades(form.estadoId).then((res) => setCidades(res.data));
    } else {
      setCidades([]);
    }
    setForm((f) => ({ ...f, cidadeId: "" }));
  }, [form.estadoId]);

  useEffect(() => {
    if (open && ponto) {
      setForm({
        nome: ponto.nome || "",
        descricao: ponto.descricao || "",
        localizacao: ponto.localizacao || "",
        regiaoId: ponto.regiaoId || "",
        estadoId: ponto.estadoId || "",
        cidadeId: ponto.cidadeId || "",
      });
    } else if (open) {
      setForm({
        nome: "",
        descricao: "",
        localizacao: "",
        regiaoId: "",
        estadoId: "",
        cidadeId: "",
      });
    }
  }, [open, ponto]);

  const validate = () => {
    const newErrors = {};
    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    else if (form.nome.length > 100) newErrors.nome = "Máximo 100 caracteres";
    if (!form.descricao) newErrors.descricao = "Descrição é obrigatória";
    else if (form.descricao.length > 100)
      newErrors.descricao = "Máximo 100 caracteres";
    if (!form.localizacao) newErrors.localizacao = "Localização é obrigatória";
    else if (form.localizacao.length > 100)
      newErrors.localizacao = "Máximo 100 caracteres";
    if (!form.regiaoId) newErrors.regiaoId = "Região é obrigatória";
    if (!form.estadoId) newErrors.estadoId = "Estado é obrigatório";
    if (!form.cidadeId) newErrors.cidadeId = "Cidade é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEdit) {
        await atualizarPontoTuristico(ponto.id, { ...form, id: ponto.id });
      } else {
        await criarPontoTuristico(form);
      }
      onSuccess && onSuccess();
      onClose();
    } catch (e) {
      alert("Erro ao salvar ponto turístico.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? "Editar Ponto Turístico" : "Cadastrar Ponto Turístico"}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth
          error={!!errors.nome}
          helperText={errors.nome}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
          error={!!errors.descricao}
          helperText={errors.descricao}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          label="Localização"
          name="localizacao"
          value={form.localizacao}
          onChange={handleChange}
          fullWidth
          error={!!errors.localizacao}
          helperText={errors.localizacao}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          select
          label="Região"
          name="regiaoId"
          value={form.regiaoId}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">Selecione</MenuItem>
          {regioes.map((regiao) => (
            <MenuItem key={regiao.id} value={regiao.id}>
              {regiao.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Estado"
          name="estadoId"
          value={form.estadoId}
          onChange={handleChange}
          fullWidth
          disabled={!form.regiaoId}
        >
          <MenuItem value="">Selecione</MenuItem>
          {estados.map((estado) => (
            <MenuItem key={estado.id} value={estado.id}>
              {estado.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Cidade"
          name="cidadeId"
          value={form.cidadeId}
          onChange={handleChange}
          fullWidth
          disabled={!form.estadoId}
        >
          <MenuItem value="">Selecione</MenuItem>
          {cidades.map((cidade) => (
            <MenuItem key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            loading ||
            !form.nome ||
            !form.descricao ||
            !form.localizacao ||
            !form.regiaoId ||
            !form.estadoId ||
            !form.cidadeId
          }
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
