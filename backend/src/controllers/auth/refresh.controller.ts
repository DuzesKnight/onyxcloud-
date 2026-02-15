import { Request, Response } from 'express';

export const refreshController = async (_req: Request, res: Response): Promise<void> => {
  res.status(501).json({
    success: false,
    message: 'Refresh token flow not implemented yet.'
  });
};
