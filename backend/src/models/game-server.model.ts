export interface PlanModel {
  id: number;
  code: string;
  name: string;
  price_monthly: number;
  billing_cycle_days: number;
  cpu_limit: number;
  memory_mb: number;
  disk_mb: number;
  is_active: 0 | 1;
}

export interface GameServerModel {
  id: number;
  uuid: string;
  user_id: number;
  plan_id: number;
  pterodactyl_server_id: number;
  name: string;
  game: string;
  status: 'provisioning' | 'active' | 'suspended' | 'cancelled' | 'failed';
  billing_status: 'paid' | 'due' | 'overdue' | 'cancelled';
  next_billing_at: string;
  monthly_price: number;
  auto_renew: 0 | 1;
}
