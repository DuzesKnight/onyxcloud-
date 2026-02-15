import { NextFunction, Response } from 'express';
import { AdminAuthenticatedRequest } from '../../middleware/admin-auth.middleware';
import { getAllServersForAdmin } from '../../services/admin/admin-server.service';

export const listServersController = async (
  _req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const servers = await getAllServersForAdmin();
    res.status(200).json({ success: true, data: servers });
  } catch (error) {
    next(error);
  }
};
