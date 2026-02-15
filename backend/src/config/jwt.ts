import jwt from 'jsonwebtoken';
import { env } from './env';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AdminTokenPayload {
  sub: string;
  email: string;
  role: string;
  tokenType: 'admin';
}

export const signAccessToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    issuer: env.APP_NAME,
    audience: 'onyxcloud-client'
  });
};

export const verifyAccessToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: env.APP_NAME,
    audience: 'onyxcloud-client'
  }) as AuthTokenPayload;
};

export const signAdminAccessToken = (payload: AdminTokenPayload): string => {
  return jwt.sign(payload, env.ADMIN_JWT_ACCESS_SECRET, {
    expiresIn: env.ADMIN_JWT_ACCESS_EXPIRES_IN,
    issuer: env.APP_NAME,
    audience: 'onyxcloud-admin'
  });
};

export const verifyAdminAccessToken = (token: string): AdminTokenPayload => {
  return jwt.verify(token, env.ADMIN_JWT_ACCESS_SECRET, {
    issuer: env.APP_NAME,
    audience: 'onyxcloud-admin'
  }) as AdminTokenPayload;
};
