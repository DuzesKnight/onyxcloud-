import { env } from './env';

export const pterodactylConfig = {
  baseUrl: env.PTERODACTYL_BASE_URL,
  apiKey: env.PTERODACTYL_API_KEY,
  nestId: env.PTERODACTYL_NEST_ID,
  eggId: env.PTERODACTYL_EGG_ID,
  defaultNodeId: env.PTERODACTYL_DEFAULT_NODE_ID,
  defaultLocationId: env.PTERODACTYL_DEFAULT_LOCATION_ID,
  defaultAllocationId: env.PTERODACTYL_DEFAULT_ALLOCATION_ID,
  defaultDockerImage: env.PTERODACTYL_DEFAULT_DOCKER_IMAGE,
  defaultStartup: env.PTERODACTYL_DEFAULT_STARTUP
};
