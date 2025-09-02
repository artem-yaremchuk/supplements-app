import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://f6084644-e458-4a55-9311-3f2f03bb63f6.mock.pstmn.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
