import { RowDataPacket } from 'mysql2/promise';
import { runQuery } from '../../config/db';
import { findUserWalletById } from '../../repositories/billing/wallet.repository';
import { AppError } from '../../utils/errors';

interface TransactionRow extends RowDataPacket {
  id: number;
  type: string;
  direction: 'credit' | 'debit';
  amount: number;
  description: string | null;
  created_at: string;
}

export const getWalletSummary = async (userId: number): Promise<{
  balance: number;
  transactions: Array<{
    id: number;
    type: string;
    direction: 'credit' | 'debit';
    amount: number;
    description: string | null;
    createdAt: string;
  }>;
}> => {
  const wallet = await findUserWalletById(userId);
  if (!wallet) {
    throw new AppError('User wallet not found', 404);
  }

  const rows = await runQuery<TransactionRow[]>(
    `SELECT id, type, direction, amount, description, created_at
       FROM transactions
      WHERE user_id = :userId
      ORDER BY created_at DESC
      LIMIT 10`,
    { userId }
  );

  return {
    balance: Number(wallet.wallet_balance),
    transactions: rows.map((row) => ({
      id: row.id,
      type: row.type,
      direction: row.direction,
      amount: Number(row.amount),
      description: row.description,
      createdAt: row.created_at
    }))
  };
};
