import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pontoturistico`;

export const listarPontosTuristicos = (filtros) =>
  axios.get(API_URL, { params: filtros });

export const buscarPontoTuristico = (id) =>
  axios.get(`${API_URL}/${id}`);

export const criarPontoTuristico = (dados) =>
  axios.post(API_URL, dados);

export const atualizarPontoTuristico = (id, dados) =>
  axios.put(`${API_URL}/${id}`, dados);

export const removerPontoTuristico = (id) =>
  axios.delete(`${API_URL}/${id}`);