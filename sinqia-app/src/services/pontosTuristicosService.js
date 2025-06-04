import axios from "axios";

const API_URL = `http://localhost:5101/api/pontoturistico`;

export const listarPontosTuristicos = ({
  regiaoId,
  estadoId,
  cidadeId,
  search = "",
  page = 1,
  limit = 10,
}) => {
  const params = {};

  if (regiaoId) params.regiaoId = regiaoId;
  if (estadoId) params.estadoId = estadoId;
  if (cidadeId) params.cidadeId = cidadeId;
  if (search && search.trim() !== "") params.search = search;
  params.page = page;
  params.limit = limit;

  return axios.get(`${API_URL}/search`, { params });
};

export const buscarPontoTuristico = (id) => axios.get(`${API_URL}/${id}`);

export const criarPontoTuristico = (dados) => axios.post(API_URL, dados);

export const atualizarPontoTuristico = (id, dados) =>
  axios.put(`${API_URL}/${id}`, dados);

export const removerPontoTuristico = (id) => axios.delete(`${API_URL}/${id}`);
