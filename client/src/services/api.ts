import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://connections-api.goit.global',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
