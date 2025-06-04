import axios from "axios";

const API_URL = `http://localhost:5101/api/estado`;

export const listarEstados = (regiaoId) => {
  if (regiaoId) {
    return axios.get(`${API_URL}/regiao/${regiaoId}`);
  }
  return axios.get(API_URL);
};