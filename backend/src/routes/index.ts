import { Router } from 'express';
import { authRouter } from './auth/auth.routes';
import { authMiddleware } from '../middleware/auth.middleware';
import { billingRouter } from './billing/billing.routes';
import { adminRouter } from './admin/admin.routes';
import { serverRouter } from './servers/server.routes';

const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'API healthy' });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/billing', billingRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/servers', serverRouter);

apiRouter.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, data: (req as any).auth });
});

export { apiRouter };
