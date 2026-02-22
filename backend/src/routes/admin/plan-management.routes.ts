import { Router } from 'express';
import { adminAuthMiddleware } from '../../middleware/admin-auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';
import { validateMiddleware } from '../../middleware/validate.middleware';
import {
  createPlanController,
  deletePlanController,
  listPlansForAdminController,
  updatePlanController
} from '../../controllers/servers/plan.controller';
import { createPlanSchema, planIdParamSchema, updatePlanSchema } from '../../validations/plan.validation';

const planManagementRouter = Router();

planManagementRouter.get('/', adminAuthMiddleware, adminMiddleware, listPlansForAdminController);
planManagementRouter.post('/', adminAuthMiddleware, adminMiddleware, validateMiddleware(createPlanSchema), createPlanController);
planManagementRouter.put(
  '/:planId',
  adminAuthMiddleware,
  adminMiddleware,
  validateMiddleware(updatePlanSchema),
  updatePlanController
);
planManagementRouter.delete(
  '/:planId',
  adminAuthMiddleware,
  adminMiddleware,
  validateMiddleware(planIdParamSchema),
  deletePlanController
);

export { planManagementRouter };
