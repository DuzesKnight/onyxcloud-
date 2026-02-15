import { AppError } from '../../utils/errors';
import {
  createDepositRequest,
  findDepositByUtr,
  listDepositsByUser
} from '../../repositories/billing/deposit.repository';

export const createUserDepositRequest = async (input: {
  userId: number;
  amount: number;
  utr: string;
  screenshotUrl?: string;
}): Promise<{ depositId: number; status: 'pending' }> => {
  if (input.amount <= 0) {
    throw new AppError('Amount must be greater than 0', 400);
  }

  const normalizedUtr = input.utr.trim().toUpperCase();
  const existing = await findDepositByUtr(normalizedUtr);

  if (existing) {
    throw new AppError('UTR already submitted', 409);
  }

  const depositId = await createDepositRequest({
    userId: input.userId,
    amount: Number(input.amount.toFixed(2)),
    utr: normalizedUtr,
    screenshotUrl: input.screenshotUrl?.trim()
  });

  return { depositId, status: 'pending' };
};

export const getMyDeposits = async (userId: number) => {
  return listDepositsByUser(userId);
};
