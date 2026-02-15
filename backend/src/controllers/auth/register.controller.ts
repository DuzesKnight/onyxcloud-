import { NextFunction, Request, Response } from 'express';
import { registerUser } from '../../services/auth/auth.service';

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
