import { Router } from 'express';
import { depositRouter } from './deposit.routes';
import { walletRouter } from './wallet.routes';

const billingRouter = Router();

billingRouter.use('/deposits', depositRouter);
billingRouter.use('/wallet', walletRouter);

export { billingRouter };
