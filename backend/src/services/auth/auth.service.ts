import crypto from 'crypto';
import { AppError } from '../../utils/errors';
import { createUser, findUserByEmail } from '../../repositories/auth/user.repository';
import { comparePassword, hashPassword } from './password.service';
import { issueAccessToken } from './jwt.service';
import { toAuthUser } from '../../models/user.model';

export const registerUser = async (input: {
  email: string;
  fullName: string;
  password: string;
}): Promise<{ token: string; user: ReturnType<typeof toAuthUser> }> => {
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);

  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const passwordHash = await hashPassword(input.password);
  const userId = await createUser({
    uuid: crypto.randomUUID(),
    email: normalizedEmail,
    fullName: input.fullName.trim(),
    passwordHash
  });

  const createdUser = await findUserByEmail(normalizedEmail);
  if (!createdUser) {
    throw new AppError('Could not load created user', 500);
  }

  return {
    token: issueAccessToken({ userId, email: normalizedEmail, role: 'user' }),
    user: toAuthUser(createdUser)
  };
};

export const loginUser = async (input: {
  email: string;
  password: string;
}): Promise<{ token: string; user: ReturnType<typeof toAuthUser> }> => {
  const normalizedEmail = input.email.trim().toLowerCase();
  const user = await findUserByEmail(normalizedEmail);

  if (!user || !user.is_active) {
    throw new AppError('Invalid credentials', 401);
  }

  const matched = await comparePassword(input.password, user.password_hash);
  if (!matched) {
    throw new AppError('Invalid credentials', 401);
  }

  return {
    token: issueAccessToken({ userId: user.id, email: user.email, role: 'user' }),
    user: toAuthUser(user)
  };
};
