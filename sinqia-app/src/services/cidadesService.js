import axios from "axios";

const API_URL = `http://localhost:5101/api/cidade`;

export const listarCidades = (estadoId) =>
  axios.get(`${API_URL}/estado/${estadoId}`);