import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { getWalletSummaryController } from '../../controllers/billing/wallet.controller';

const walletRouter = Router();

walletRouter.get('/summary', authMiddleware, getWalletSummaryController);

export { walletRouter };
