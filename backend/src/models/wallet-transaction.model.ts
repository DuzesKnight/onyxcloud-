export type WalletTxnType =
  | 'deposit_credit'
  | 'manual_adjustment_credit'
  | 'server_charge_debit'
  | 'refund_credit'
  | 'penalty_debit';

export interface WalletTransactionInput {
  userId: number;
  type: WalletTxnType;
  direction: 'credit' | 'debit';
  amount: number;
  openingBalance: number;
  closingBalance: number;
  description?: string;
  depositId?: number;
  serverId?: number;
  createdByAdminUserId?: number;
}
