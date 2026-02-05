import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env';
export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.session_token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try { (req as any).user = jwt.verify(token, env.jwtSecret); next(); } catch { res.status(401).json({ message: 'Invalid token' }); }
}
export function admin(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}
