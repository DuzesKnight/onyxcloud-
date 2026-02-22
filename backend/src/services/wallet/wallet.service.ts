import { PoolConnection } from 'mysql2/promise';
import { AppError } from '../../utils/errors';
import { createWalletTransaction } from '../../repositories/billing/ledger.repository';
import { findUserWalletByIdForUpdate, updateUserWalletBalance } from '../../repositories/billing/wallet.repository';

export const creditWalletForApprovedDeposit = async (
  connection: PoolConnection,
  input: {
    userId: number;
    amount: number;
    depositId: number;
    adminUserId: number;
  }
): Promise<{ openingBalance: number; closingBalance: number }> => {
  const wallet = await findUserWalletByIdForUpdate(connection, input.userId);

  if (!wallet) {
    throw new AppError('User wallet not found', 404);
  }

  const openingBalance = Number(wallet.wallet_balance);
  const closingBalance = Number((openingBalance + input.amount).toFixed(2));

  await updateUserWalletBalance(connection, input.userId, closingBalance);

  await createWalletTransaction(connection, {
    userId: input.userId,
    type: 'deposit_credit',
    direction: 'credit',
    amount: input.amount,
    openingBalance,
    closingBalance,
    description: 'Wallet credited from approved deposit',
    depositId: input.depositId,
    createdByAdminUserId: input.adminUserId
  });

  return { openingBalance, closingBalance };
};

export const debitWalletForServerPurchase = async (
  connection: PoolConnection,
  input: {
    userId: number;
    amount: number;
    description: string;
  }
): Promise<{ openingBalance: number; closingBalance: number }> => {
  const wallet = await findUserWalletByIdForUpdate(connection, input.userId);

  if (!wallet) {
    throw new AppError('User wallet not found', 404);
  }

  const openingBalance = Number(wallet.wallet_balance);

  if (openingBalance < input.amount) {
    throw new AppError('Insufficient wallet balance', 400);
  }

  const closingBalance = Number((openingBalance - input.amount).toFixed(2));
  await updateUserWalletBalance(connection, input.userId, closingBalance);

  return { openingBalance, closingBalance };
};
