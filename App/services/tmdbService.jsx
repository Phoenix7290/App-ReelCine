import axios from 'axios';
import config from "../../env/config.js";

const API_KEY = config.tmdbApiKey;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};
