import axios from "axios";

const API_URL = `http://localhost:5101/api/regiao`;

export const listarRegioes = () => axios.get(API_URL);