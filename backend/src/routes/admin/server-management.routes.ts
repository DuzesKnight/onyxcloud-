import { Router } from 'express';
import { listServersController } from '../../controllers/admin/server-management.controller';
import { adminAuthMiddleware } from '../../middleware/admin-auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';

const serverManagementRouter = Router();

serverManagementRouter.get('/', adminAuthMiddleware, adminMiddleware, listServersController);

export { serverManagementRouter };
