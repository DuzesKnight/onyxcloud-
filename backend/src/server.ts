import { app } from './app';
import { assertDbConnection } from './config/db';
import { env } from './config/env';
import { logger } from './config/logger';
import { startServerExpiryJob } from './jobs/server-expiry.job';

const startServer = async (): Promise<void> => {
  try {
    await assertDbConnection();
    logger.info('Database connection established');

    app.listen(env.PORT, () => {
      logger.info(`${env.APP_NAME} listening on port ${env.PORT}`);
      startServerExpiryJob();
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

void startServer();
