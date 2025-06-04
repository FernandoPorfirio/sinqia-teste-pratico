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
  let url = API_URL;

  if (regiaoId && estadoId && cidadeId) {
    url += `/regiao/${regiaoId}/estado/${estadoId}/cidade/${cidadeId}/search/${search}/page/${page}/limit/${limit}`;
  } else if (regiaoId && estadoId) {
    url += `/regiao/${regiaoId}/estado/${estadoId}/search/${search}/page/${page}/limit/${limit}`;
  } else if (regiaoId) {
    url += `/regiao/${regiaoId}/search/${search}/page/${page}/limit/${limit}`;
  } else {
    url += `/search/${search}/page/${page}/limit/${limit}`;
  }

  return axios.get(url);
};

export const buscarPontoTuristico = (id) =>
  axios.get(`${API_URL}/${id}`);

export const criarPontoTuristico = (dados) =>
  axios.post(API_URL, dados);

export const atualizarPontoTuristico = (id, dados) =>
  axios.put(`${API_URL}/${id}`, dados);

export const removerPontoTuristico = (id) =>
  axios.delete(`${API_URL}/${id}`);