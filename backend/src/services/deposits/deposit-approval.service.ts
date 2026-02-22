import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { withTransaction } from '../../config/db';
import { AppError } from '../../utils/errors';
import {
  findPendingDepositByIdForUpdate,
  markDepositApproved,
  markDepositRejected
} from '../../repositories/billing/deposit.repository';
import { creditWalletForApprovedDeposit } from '../wallet/wallet.service';

interface AdminUserRow extends RowDataPacket {
  id: number;
}

const findAdminUserIdByUserId = async (connection: PoolConnection, userId: number): Promise<number | null> => {
  const [rows] = await connection.query<AdminUserRow[]>(
    `SELECT id FROM admin_users WHERE user_id = ? AND is_active = 1 LIMIT 1`,
    [userId]
  );

  return rows[0]?.id ?? null;
};

export const approveDeposit = async (input: { depositId: number; reviewerUserId: number }) => {
  return withTransaction(async (connection) => {
    const adminUserId = await findAdminUserIdByUserId(connection, input.reviewerUserId);
    if (!adminUserId) {
      throw new AppError('Active admin profile not found', 403);
    }

    const deposit = await findPendingDepositByIdForUpdate(connection, input.depositId);
    if (!deposit) {
      throw new AppError('Pending deposit not found', 404);
    }

    await creditWalletForApprovedDeposit(connection, {
      userId: deposit.user_id,
      amount: Number(deposit.amount),
      depositId: deposit.id,
      adminUserId
    });

    await markDepositApproved(connection, {
      depositId: deposit.id,
      adminUserId
    });

    return { depositId: deposit.id, status: 'approved' as const };
  });
};

export const rejectDeposit = async (input: { depositId: number; reviewerUserId: number; reason: string }) => {
  return withTransaction(async (connection) => {
    const adminUserId = await findAdminUserIdByUserId(connection, input.reviewerUserId);
    if (!adminUserId) {
      throw new AppError('Active admin profile not found', 403);
    }

    const deposit = await findPendingDepositByIdForUpdate(connection, input.depositId);
    if (!deposit) {
      throw new AppError('Pending deposit not found', 404);
    }

    await markDepositRejected(connection, {
      depositId: deposit.id,
      adminUserId,
      reason: input.reason.trim()
    });

    return { depositId: deposit.id, status: 'rejected' as const };
  });
};
