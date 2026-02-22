export interface CreateDepositPayload {
  amount: number;
  utr: string;
  screenshotUrl?: string;
}

export interface Deposit {
  id: number;
  amount: number;
  utr: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}
