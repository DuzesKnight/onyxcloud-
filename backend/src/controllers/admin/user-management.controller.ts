import { NextFunction, Response } from 'express';
import { AdminAuthenticatedRequest } from '../../middleware/admin-auth.middleware';
import { getAllUsersForAdmin } from '../../services/admin/admin-user.service';

export const listUsersController = async (
  _req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsersForAdmin();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
