import crypto from 'crypto';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { WalletTransactionInput } from '../../models/wallet-transaction.model';

interface WalletTransactionRow extends RowDataPacket {
  id: number;
  type: string;
  direction: 'credit' | 'debit';
  amount: number;
  description: string | null;
  created_at: string;
}

export const createWalletTransaction = async (
  connection: PoolConnection,
  input: WalletTransactionInput
): Promise<void> => {
  const txnRef = `TXN-${crypto.randomUUID()}`;

  await connection.execute(
    `INSERT INTO transactions (
      txn_ref,
      user_id,
      type,
      direction,
      amount,
      opening_balance,
      closing_balance,
      status,
      description,
      deposit_id,
      server_id,
      created_by_admin_user_id,
      posted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'posted', ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [
      txnRef,
      input.userId,
      input.type,
      input.direction,
      input.amount,
      input.openingBalance,
      input.closingBalance,
      input.description ?? null,
      input.depositId ?? null,
      input.serverId ?? null,
      input.createdByAdminUserId ?? null
    ]
  );
};

export const listRecentWalletTransactions = async (
  connection: PoolConnection,
  userId: number,
  limit = 10
): Promise<WalletTransactionRow[]> => {
  const [rows] = await connection.query<WalletTransactionRow[]>(
    `SELECT id, type, direction, amount, description, created_at
       FROM transactions
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?`,
    [userId, limit]
  );

  return rows;
};
