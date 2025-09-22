import axios from 'axios';
import type { AxiosInstance } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
