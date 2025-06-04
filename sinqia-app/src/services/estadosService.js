import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/estado`;

export const listarEstados = (regiaoId) => {
  if (regiaoId) {
    return axios.get(`${API_URL}/regiao/${regiaoId}`);
  }
  return axios.get(API_URL);
};