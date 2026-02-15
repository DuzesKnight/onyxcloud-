import { signAccessToken, signAdminAccessToken } from '../../config/jwt';

export const issueAccessToken = (input: { userId: number; email: string; role?: 'user' | 'admin' }): string => {
  return signAccessToken({
    sub: String(input.userId),
    email: input.email,
    role: input.role ?? 'user'
  });
};

export const issueAdminAccessToken = (input: { userId: number; email: string; role: string }): string => {
  return signAdminAccessToken({
    sub: String(input.userId),
    email: input.email,
    role: input.role,
    tokenType: 'admin'
  });
};
