export type DepositStatus = 'pending' | 'approved' | 'rejected';

export interface DepositRequestModel {
  id: number;
  deposit_ref: string;
  user_id: number;
  amount: number;
  utr: string;
  screenshot_url: string | null;
  status: DepositStatus;
  reviewed_by_admin_user_id: number | null;
  review_note: string | null;
  requested_at: string;
  approved_at: string | null;
  rejected_at: string | null;
}

export interface CreateDepositRequestInput {
  userId: number;
  amount: number;
  utr: string;
  screenshotUrl?: string;
}
