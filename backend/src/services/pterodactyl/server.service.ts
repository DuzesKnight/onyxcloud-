import { pterodactylConfig } from '../../config/pterodactyl';
import { pterodactylRequest, unwrapPterodactylAttributes } from './client.service';
import { PterodactylServer } from '../../types/pterodactyl.types';

export interface CreatePterodactylServerInput {
  externalServerId: string;
  pterodactylUserId: number;
  name: string;
  memoryMb: number;
  diskMb: number;
  cpuLimit: number;
}

export const createPterodactylServer = async (input: CreatePterodactylServerInput): Promise<PterodactylServer> => {
  const body = {
    name: input.name,
    user: input.pterodactylUserId,
    external_id: input.externalServerId,
    egg: pterodactylConfig.eggId,
    docker_image: pterodactylConfig.defaultDockerImage,
    startup: pterodactylConfig.defaultStartup,
    environment: {},
    limits: {
      memory: input.memoryMb,
      swap: 0,
      disk: input.diskMb,
      io: 500,
      cpu: input.cpuLimit,
      threads: null,
      oom_disabled: false
    },
    feature_limits: {
      databases: 2,
      allocations: 1,
      backups: 2
    },
    deploy: {
      locations: [pterodactylConfig.defaultLocationId],
      dedicated_ip: false,
      port_range: [] as string[]
    },
    allocation: pterodactylConfig.defaultAllocationId ? { default: pterodactylConfig.defaultAllocationId } : undefined
  };

  const payload = await pterodactylRequest<{ object: string; attributes: PterodactylServer }>(
    '/api/application/servers',
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  );

  return unwrapPterodactylAttributes(payload);
};

export const deletePterodactylServer = async (pterodactylServerId: number): Promise<void> => {
  await pterodactylRequest<unknown>(`/api/application/servers/${pterodactylServerId}`, {
    method: 'DELETE'
  });
};
