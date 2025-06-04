import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cidade`;

export const listarCidades = (estadoId) =>
  axios.get(`${API_URL}/estado/${estadoId}`);