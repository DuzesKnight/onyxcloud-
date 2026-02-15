import { Router } from 'express';
import { purchaseServerController } from '../../controllers/servers/deployment.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateMiddleware } from '../../middleware/validate.middleware';
import { purchaseServerSchema } from '../../validations/server.validation';

const deploymentRouter = Router();

deploymentRouter.post('/purchase', authMiddleware, validateMiddleware(purchaseServerSchema), purchaseServerController);

export { deploymentRouter };
