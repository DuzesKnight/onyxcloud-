import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { runQuery } from '../../config/db';

interface WalletRow extends RowDataPacket {
  id: number;
  wallet_balance: number;
}

export const findUserWalletById = async (userId: number): Promise<WalletRow | null> => {
  const rows = await runQuery<WalletRow[]>(
    `SELECT id, wallet_balance
       FROM users
      WHERE id = :userId
      LIMIT 1`,
    { userId }
  );

  return rows[0] ?? null;
};

export const findUserWalletByIdForUpdate = async (
  connection: PoolConnection,
  userId: number
): Promise<WalletRow | null> => {
  const [rows] = await connection.query<WalletRow[]>(
    `SELECT id, wallet_balance
       FROM users
      WHERE id = ?
      FOR UPDATE`,
    [userId]
  );

  return rows[0] ?? null;
};

export const updateUserWalletBalance = async (
  connection: PoolConnection,
  userId: number,
  nextBalance: number
): Promise<void> => {
  await connection.execute(
    `UPDATE users
        SET wallet_balance = ?
      WHERE id = ?`,
    [nextBalance, userId]
  );
};
