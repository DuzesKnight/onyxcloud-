import { Router } from 'express';
import { listUsersController } from '../../controllers/admin/user-management.controller';
import { adminAuthMiddleware } from '../../middleware/admin-auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';

const userManagementRouter = Router();

userManagementRouter.get('/', adminAuthMiddleware, adminMiddleware, listUsersController);

export { userManagementRouter };
