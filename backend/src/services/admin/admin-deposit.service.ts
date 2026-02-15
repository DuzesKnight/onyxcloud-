import { listPendingDeposits } from '../../repositories/admin/admin-deposit.repository';
import { approveDeposit, rejectDeposit } from '../deposits/deposit-approval.service';

export const getPendingDepositsForAdmin = async () => listPendingDeposits();

export const approveDepositByAdmin = async (input: { depositId: number; reviewerUserId: number }) => {
  return approveDeposit(input);
};

export const rejectDepositByAdmin = async (input: { depositId: number; reviewerUserId: number; reason: string }) => {
  return rejectDeposit(input);
};
