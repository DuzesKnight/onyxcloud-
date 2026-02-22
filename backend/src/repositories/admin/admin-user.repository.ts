import { RowDataPacket } from 'mysql2/promise';
import { runQuery } from '../../config/db';

export interface AdminLoginRow {
  admin_user_id: number;
  user_id: number;
  email: string;
  full_name: string;
  password_hash: string;
  role: string;
  is_active: 0 | 1;
}

interface AdminLoginDataRow extends RowDataPacket, AdminLoginRow {}

interface UserListRow extends RowDataPacket {
  id: number;
  email: string;
  full_name: string;
  wallet_balance: number;
  is_active: 0 | 1;
  created_at: string;
}

export const findAdminByEmail = async (email: string): Promise<AdminLoginRow | null> => {
  const rows = await runQuery<AdminLoginDataRow[]>(
    `SELECT
      au.id AS admin_user_id,
      u.id AS user_id,
      u.email,
      u.full_name,
      u.password_hash,
      au.role,
      au.is_active
     FROM admin_users au
     INNER JOIN users u ON u.id = au.user_id
     WHERE u.email = :email
     LIMIT 1`,
    { email }
  );

  return rows[0] ?? null;
};

export const listUsers = async (): Promise<UserListRow[]> => {
  return runQuery<UserListRow[]>(
    `SELECT id, email, full_name, wallet_balance, is_active, created_at
       FROM users
      ORDER BY id DESC`
  );
};
