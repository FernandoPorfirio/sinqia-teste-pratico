import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/regiao`;

export const listarRegioes = () => axios.get(API_URL);