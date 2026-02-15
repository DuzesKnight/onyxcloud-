import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';
import { AppError } from '../../utils/errors';
import { purchaseAndDeployServer } from '../../services/servers/deployment.service';

export const purchaseServerController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const result = await purchaseAndDeployServer({
      userId: Number(req.auth.userId),
      planId: req.body.planId,
      serverName: req.body.serverName,
      game: req.body.game
    });

    res.status(201).json({
      success: true,
      message: 'Server purchased and deployed successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
