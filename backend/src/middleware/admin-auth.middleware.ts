import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { verifyAdminAccessToken } from '../config/jwt';
import { AppError } from '../utils/errors';

export interface AdminAuthenticatedRequest extends Request {
  admin?: {
    userId: string;
    email: string;
    role: string;
    tokenType: 'admin';
  };
}

export const adminAuthMiddleware = (req: AdminAuthenticatedRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Missing or invalid authorization header', 401);
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = verifyAdminAccessToken(token);

    if (payload.tokenType !== 'admin') {
      throw new AppError('Invalid admin token', 401);
    }

    req.admin = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      tokenType: payload.tokenType
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
      throw new AppError('Invalid or expired admin token', 401);
    }
    throw error;
  }
};
