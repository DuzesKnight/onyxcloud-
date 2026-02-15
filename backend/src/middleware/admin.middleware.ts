import { NextFunction, Response } from 'express';
import { AppError } from '../utils/errors';
import { AdminAuthenticatedRequest } from './admin-auth.middleware';

export const adminMiddleware = (req: AdminAuthenticatedRequest, _res: Response, next: NextFunction): void => {
  if (!req.admin?.userId) {
    throw new AppError('Admin access required', 403);
  }

  next();
};
