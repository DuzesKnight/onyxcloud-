import { CreateDepositPayload, Deposit } from '../../types/deposits';
import { ApiEnvelope, apiClient } from './client';

export const createDepositApi = async (payload: CreateDepositPayload): Promise<Deposit> => {
  const response = await apiClient.post<ApiEnvelope<Deposit>>('/billing/deposits', payload);
  return response.data.data;
};
