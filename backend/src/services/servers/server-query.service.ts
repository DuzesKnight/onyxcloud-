import { listServersByUserId } from '../../repositories/servers/server.repository';

export const getMyServers = async (userId: number) => listServersByUserId(userId);
