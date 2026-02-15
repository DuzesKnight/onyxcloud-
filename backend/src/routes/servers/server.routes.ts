import { Router } from 'express';
import { deploymentRouter } from './deployment.routes';
import { authMiddleware } from '../../middleware/auth.middleware';
import { listMyServersController } from '../../controllers/servers/server.controller';

const serverRouter = Router();

serverRouter.use('/deployments', deploymentRouter);
serverRouter.get('/mine', authMiddleware, listMyServersController);

export { serverRouter };
