import { env } from '../config/env';
import { logger } from '../config/logger';
import { suspendExpiredServers } from '../services/servers/renewal.service';

let timer: NodeJS.Timeout | null = null;

export const runServerExpiryJobOnce = async (): Promise<void> => {
  try {
    const result = await suspendExpiredServers();
    logger.info(
      `Server expiry job complete: scanned=${result.scanned}, renewed=${result.renewed}, suspended=${result.suspended}, skipped=${result.skipped}, errors=${result.errors}`
    );

    for (const action of result.actions) {
      logger.info(
        `Server automation action: serverId=${action.serverId}, userId=${action.userId}, action=${action.action}, reason=${action.reason}`
      );
    }
  } catch (error) {
    logger.error('Server expiry job failed', error);
  }
};

export const startServerExpiryJob = (): void => {
  const intervalMs = env.SERVER_EXPIRY_CRON_INTERVAL_MS;
  void runServerExpiryJobOnce();
  timer = setInterval(() => {
    void runServerExpiryJobOnce();
  }, intervalMs);
};

export const stopServerExpiryJob = (): void => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};
