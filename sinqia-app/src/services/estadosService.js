import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/estado`;

export const listarEstados = (regiaoId) =>
  axios.get(API_URL, { params: { regiaoId } });