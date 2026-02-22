import { NextFunction, Response } from 'express';
import { AppError } from '../../utils/errors';
import { AdminAuthenticatedRequest } from '../../middleware/admin-auth.middleware';
import {
  approveDepositByAdmin,
  getPendingDepositsForAdmin,
  rejectDepositByAdmin
} from '../../services/admin/admin-deposit.service';

export const listPendingDepositsController = async (
  _req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deposits = await getPendingDepositsForAdmin();
    res.status(200).json({ success: true, data: deposits });
  } catch (error) {
    next(error);
  }
};

export const approveDepositController = async (
  req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.admin?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const result = await approveDepositByAdmin({
      depositId: Number(req.params.depositId),
      reviewerUserId: Number(req.admin.userId)
    });

    res.status(200).json({ success: true, message: 'Deposit approved', data: result });
  } catch (error) {
    next(error);
  }
};

export const rejectDepositController = async (
  req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.admin?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const result = await rejectDepositByAdmin({
      depositId: Number(req.params.depositId),
      reviewerUserId: Number(req.admin.userId),
      reason: req.body.reason ?? 'Rejected by admin'
    });

    res.status(200).json({ success: true, message: 'Deposit rejected', data: result });
  } catch (error) {
    next(error);
  }
};
