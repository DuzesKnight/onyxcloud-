import { Request } from 'express';
import rateLimit from 'express-rate-limit';

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : 'unknown-email';
    return `${req.ip}:${email}`;
  },
  message: {
    success: false,
    message: 'Too many login attempts. Please wait before trying again.'
  }
});
