import { AppError } from '../../utils/errors';
import { comparePassword } from '../auth/password.service';
import { issueAdminAccessToken } from '../auth/jwt.service';
import { findAdminByEmail, listUsers } from '../../repositories/admin/admin-user.repository';

export const adminLogin = async (input: {
  email: string;
  password: string;
}): Promise<{ token: string; admin: { userId: number; email: string; role: string } }> => {
  const normalizedEmail = input.email.trim().toLowerCase();
  const adminUser = await findAdminByEmail(normalizedEmail);

  if (!adminUser || !adminUser.is_active) {
    throw new AppError('Invalid admin credentials', 401);
  }

  const matched = await comparePassword(input.password, adminUser.password_hash);
  if (!matched) {
    throw new AppError('Invalid admin credentials', 401);
  }

  return {
    token: issueAdminAccessToken({
      userId: adminUser.user_id,
      email: adminUser.email,
      role: adminUser.role
    }),
    admin: {
      userId: adminUser.user_id,
      email: adminUser.email,
      role: adminUser.role
    }
  };
};

export const getAllUsersForAdmin = async () => listUsers();
