import axios from 'axios';
import { tokenStorage } from '../auth/token-storage';

export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1'
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
