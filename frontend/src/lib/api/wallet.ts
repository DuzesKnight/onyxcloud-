import { WalletSummary } from '../../types/wallet';
import { ApiEnvelope, apiClient } from './client';

export const getWalletSummaryApi = async (): Promise<WalletSummary> => {
  const response = await apiClient.get<ApiEnvelope<WalletSummary>>('/billing/wallet/summary');
  return response.data.data;
};
