import { Router } from 'express';
import { deploymentRouter } from './deployment.routes';
import { authMiddleware } from '../../middleware/auth.middleware';
import { listMyServersController } from '../../controllers/servers/server.controller';
import { planRouter } from './plan.routes';

const serverRouter = Router();

serverRouter.use('/deployments', deploymentRouter);
serverRouter.use('/plans', planRouter);
serverRouter.get('/mine', authMiddleware, listMyServersController);

export { serverRouter };
