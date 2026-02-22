import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';
import { createUserDepositRequest, getMyDeposits } from '../../services/deposits/deposit.service';
import { AppError } from '../../utils/errors';

export const createDepositController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const result = await createUserDepositRequest({
      userId: Number(req.auth.userId),
      amount: req.body.amount,
      utr: req.body.utr,
      screenshotUrl: req.body.screenshotUrl
    });

    res.status(201).json({
      success: true,
      message: 'Deposit request created',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const listMyDepositsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const deposits = await getMyDeposits(Number(req.auth.userId));
    res.status(200).json({ success: true, data: deposits });
  } catch (error) {
    next(error);
  }
};
