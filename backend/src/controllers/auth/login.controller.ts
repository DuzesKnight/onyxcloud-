import { NextFunction, Request, Response } from 'express';
import { loginUser } from '../../services/auth/auth.service';

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
