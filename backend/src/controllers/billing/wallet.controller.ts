import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';
import { AppError } from '../../utils/errors';
import { getWalletSummary } from '../../services/wallet/wallet-query.service';

export const getWalletSummaryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const summary = await getWalletSummary(Number(req.auth.userId));
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};
