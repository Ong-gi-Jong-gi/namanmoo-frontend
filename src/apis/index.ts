import axios from 'axios';
import { tokenRefresh } from './auth/token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.config.url.includes('refresh-token')) {
      const errorMessage = error.response?.data?.message || '';

      if (errorMessage.includes('No refresh token provided')) {
        localStorage.removeItem('accessKey');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export const authorizedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authorizedApi.interceptors.request.use((config) => {
  const token = `Bearer ${localStorage.getItem('accessKey')}`;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

authorizedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || '';

      if (errorMessage.includes('Access token is invalid or missing')) {
        await tokenRefresh();
        const newToken = localStorage.getItem('accessKey');
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return authorizedApi(originalRequest); // 재요청
        }
      }

      if (errorMessage.includes('Invalid refresh token')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);
