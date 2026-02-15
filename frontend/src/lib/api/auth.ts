import { AuthResponse, LoginPayload } from '../../types/auth';
import { ApiEnvelope, apiClient } from './client';

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiEnvelope<AuthResponse>>('/auth/login', payload);
  return response.data.data;
};
