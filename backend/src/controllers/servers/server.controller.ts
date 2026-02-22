import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';
import { AppError } from '../../utils/errors';
import { getMyServers } from '../../services/servers/server-query.service';

export const listMyServersController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.auth?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const servers = await getMyServers(Number(req.auth.userId));
    res.status(200).json({ success: true, data: servers });
  } catch (error) {
    next(error);
  }
};
