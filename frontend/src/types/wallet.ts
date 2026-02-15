export interface WalletTransaction {
  id: number;
  type: string;
  direction: 'credit' | 'debit';
  amount: number;
  description: string | null;
  createdAt: string;
}

export interface WalletSummary {
  balance: number;
  transactions: WalletTransaction[];
}
