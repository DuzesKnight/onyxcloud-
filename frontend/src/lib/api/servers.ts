import { DeployServerPayload, GameServer, Plan } from '../../types/servers';
import { ApiEnvelope, apiClient } from './client';

export const listMyServersApi = async (): Promise<GameServer[]> => {
  const response = await apiClient.get<ApiEnvelope<GameServer[]>>('/servers/mine');
  return response.data.data;
};

export const deployServerApi = async (payload: DeployServerPayload): Promise<{ serverId: number }> => {
  const response = await apiClient.post<ApiEnvelope<{ serverId: number }>>('/servers/deployments/purchase', payload);
  return response.data.data;
};


export const listAvailablePlansApi = async (): Promise<Plan[]> => {
  const response = await apiClient.get<ApiEnvelope<Plan[]>>('/servers/plans');
  return response.data.data;
};
