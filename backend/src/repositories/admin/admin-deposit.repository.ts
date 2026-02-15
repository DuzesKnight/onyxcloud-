import { RowDataPacket } from 'mysql2/promise';
import { runQuery } from '../../config/db';

interface PendingDepositRow extends RowDataPacket {
  id: number;
  deposit_ref: string;
  user_id: number;
  user_email: string;
  amount: number;
  utr: string;
  screenshot_url: string | null;
  status: 'pending';
  requested_at: string;
}

export const listPendingDeposits = async (): Promise<PendingDepositRow[]> => {
  return runQuery<PendingDepositRow[]>(
    `SELECT
      d.id,
      d.deposit_ref,
      d.user_id,
      u.email AS user_email,
      d.amount,
      d.utr,
      d.screenshot_url,
      d.status,
      d.requested_at
    FROM deposits d
    INNER JOIN users u ON u.id = d.user_id
    WHERE d.status = 'pending'
    ORDER BY d.id ASC`
  );
};
