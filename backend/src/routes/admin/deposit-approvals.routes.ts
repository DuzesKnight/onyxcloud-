import { Router } from 'express';
import {
  approveDepositController,
  listPendingDepositsController,
  rejectDepositController
} from '../../controllers/admin/deposit-approval.controller';
import { adminAuthMiddleware } from '../../middleware/admin-auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';
import { validateMiddleware } from '../../middleware/validate.middleware';
import { adminDepositDecisionSchema } from '../../validations/admin.validation';

const depositApprovalsRouter = Router();

depositApprovalsRouter.get('/pending', adminAuthMiddleware, adminMiddleware, listPendingDepositsController);

depositApprovalsRouter.patch(
  '/:depositId/approve',
  adminAuthMiddleware,
  adminMiddleware,
  validateMiddleware(adminDepositDecisionSchema),
  approveDepositController
);

depositApprovalsRouter.patch(
  '/:depositId/reject',
  adminAuthMiddleware,
  adminMiddleware,
  validateMiddleware(adminDepositDecisionSchema),
  rejectDepositController
);

export { depositApprovalsRouter };
