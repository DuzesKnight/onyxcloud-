import { Router } from 'express';
import { purchaseServerController } from '../../controllers/servers/deployment.controller';
import { renewServerController } from '../../controllers/servers/renewal.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateMiddleware } from '../../middleware/validate.middleware';
import { purchaseServerSchema, renewServerSchema } from '../../validations/server.validation';

const deploymentRouter = Router();

deploymentRouter.post('/purchase', authMiddleware, validateMiddleware(purchaseServerSchema), purchaseServerController);
deploymentRouter.post('/renew', authMiddleware, validateMiddleware(renewServerSchema), renewServerController);

export { deploymentRouter };
