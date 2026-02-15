import { Router } from 'express';
import { createDepositController, listMyDepositsController } from '../../controllers/billing/deposit.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateMiddleware } from '../../middleware/validate.middleware';
import { createDepositSchema } from '../../validations/deposit.validation';

const depositRouter = Router();

depositRouter.post('/', authMiddleware, validateMiddleware(createDepositSchema), createDepositController);
depositRouter.get('/mine', authMiddleware, listMyDepositsController);

export { depositRouter };
