import axios from 'axios';

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
  const token = `Bearer ${localStorage.getItem('accessKey')}`;
  config.headers.Authorization = token;
  return config;
});
