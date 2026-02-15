import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { dbPool, runQuery } from '../../config/db';
import { CreateDepositRequestInput, DepositRequestModel } from '../../models/deposit-request.model';

interface DepositRow extends RowDataPacket, DepositRequestModel {}

export const findDepositByUtr = async (utr: string): Promise<DepositRequestModel | null> => {
  const rows = await runQuery<DepositRow[]>(
    `SELECT id, deposit_ref, user_id, amount, utr, screenshot_url, status, reviewed_by_admin_user_id,
            review_note, requested_at, approved_at, rejected_at
       FROM deposits
      WHERE utr = :utr
      LIMIT 1`,
    { utr }
  );

  return rows[0] ?? null;
};

export const createDepositRequest = async (input: CreateDepositRequestInput): Promise<number> => {
  const depositRef = `DEP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const [result] = await dbPool.execute<ResultSetHeader>(
    `INSERT INTO deposits (deposit_ref, user_id, amount, utr, screenshot_url, status)
     VALUES (?, ?, ?, ?, ?, 'pending')`,
    [depositRef, input.userId, input.amount, input.utr, input.screenshotUrl ?? null]
  );

  return result.insertId;
};

export const listDepositsByUser = async (userId: number): Promise<DepositRequestModel[]> => {
  return runQuery<DepositRow[]>(
    `SELECT id, deposit_ref, user_id, amount, utr, screenshot_url, status, reviewed_by_admin_user_id,
            review_note, requested_at, approved_at, rejected_at
       FROM deposits
      WHERE user_id = :userId
      ORDER BY id DESC`,
    { userId }
  );
};

export const findPendingDepositByIdForUpdate = async (
  connection: PoolConnection,
  depositId: number
): Promise<DepositRequestModel | null> => {
  const [rows] = await connection.query<DepositRow[]>(
    `SELECT id, deposit_ref, user_id, amount, utr, screenshot_url, status, reviewed_by_admin_user_id,
            review_note, requested_at, approved_at, rejected_at
       FROM deposits
      WHERE id = ? AND status = 'pending'
      FOR UPDATE`,
    [depositId]
  );

  return rows[0] ?? null;
};

export const markDepositApproved = async (
  connection: PoolConnection,
  input: { depositId: number; adminUserId: number }
): Promise<void> => {
  await connection.execute(
    `UPDATE deposits
        SET status = 'approved',
            approved_at = CURRENT_TIMESTAMP,
            reviewed_by_admin_user_id = ?,
            review_note = NULL
      WHERE id = ?`,
    [input.adminUserId, input.depositId]
  );
};

export const markDepositRejected = async (
  connection: PoolConnection,
  input: { depositId: number; adminUserId: number; reason: string }
): Promise<void> => {
  await connection.execute(
    `UPDATE deposits
        SET status = 'rejected',
            rejected_at = CURRENT_TIMESTAMP,
            reviewed_by_admin_user_id = ?,
            review_note = ?
      WHERE id = ?`,
    [input.adminUserId, input.reason, input.depositId]
  );
};
