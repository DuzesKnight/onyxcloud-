import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';
import { AppError } from '../../utils/errors';
import { renewServer } from '../../services/servers/renewal.service';

export const renewServerController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const result = await renewServer({
      userId: Number(req.auth.userId),
      serverId: req.body.serverId
    });

    res.status(200).json({
      success: true,
      message: 'Server renewed successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
