import { NextFunction, Request, Response } from 'express';
import { adminLogin } from '../../services/admin/admin-user.service';

export const adminLoginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminLogin(req.body);
    res.status(200).json({ success: true, message: 'Admin login successful', data: result });
  } catch (error) {
    next(error);
  }
};
