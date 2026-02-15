import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { dbPool, runQuery } from '../../config/db';
import { CreateUserInput, UserModel } from '../../models/user.model';

interface UserRow extends RowDataPacket, UserModel {}

export const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  const rows = await runQuery<UserRow[]>(
    `SELECT id, uuid, email, full_name, password_hash, wallet_balance, is_active, created_at, updated_at
     FROM users
     WHERE email = :email
     LIMIT 1`,
    { email }
  );

  return rows[0] ?? null;
};

export const findUserById = async (id: number): Promise<UserModel | null> => {
  const rows = await runQuery<UserRow[]>(
    `SELECT id, uuid, email, full_name, password_hash, wallet_balance, is_active, created_at, updated_at
     FROM users
     WHERE id = :id
     LIMIT 1`,
    { id }
  );

  return rows[0] ?? null;
};

export const createUser = async (input: CreateUserInput): Promise<number> => {
  const [result] = await dbPool.execute<ResultSetHeader>(
    `INSERT INTO users (uuid, email, full_name, password_hash)
     VALUES (?, ?, ?, ?)`,
    [input.uuid, input.email, input.fullName, input.passwordHash]
  );

  return result.insertId;
};
