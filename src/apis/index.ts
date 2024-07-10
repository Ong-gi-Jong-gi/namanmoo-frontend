import axios from 'axios';
import { getCookie } from '../utils/cookie';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authorizedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authorizedApi.interceptors.request.use((config) => {
  const token = `Bearer ${getCookie('authorization')}`;
  config.headers.Authorization = token;
  return config;
});
