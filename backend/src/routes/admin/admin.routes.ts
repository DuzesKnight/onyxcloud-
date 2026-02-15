import { Router } from 'express';
import { adminLoginController } from '../../controllers/admin/admin-auth.controller';
import { adminLoginSchema } from '../../validations/admin.validation';
import { validateMiddleware } from '../../middleware/validate.middleware';
import { loginRateLimit } from '../../middleware/rate-limit.middleware';
import { depositApprovalsRouter } from './deposit-approvals.routes';
import { userManagementRouter } from './user-management.routes';
import { serverManagementRouter } from './server-management.routes';

const adminRouter = Router();

adminRouter.post('/auth/login', loginRateLimit, validateMiddleware(adminLoginSchema), adminLoginController);
adminRouter.use('/deposits', depositApprovalsRouter);
adminRouter.use('/users', userManagementRouter);
adminRouter.use('/servers', serverManagementRouter);

export { adminRouter };
