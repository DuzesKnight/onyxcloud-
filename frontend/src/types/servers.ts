export interface GameServer {
  id: number;
  name: string;
  game: string;
  status: string;
  billingStatus: string;
  monthlyPrice: number;
  nextBillingAt: string;
}

export interface DeployServerPayload {
  planId: number;
  serverName: string;
  game: string;
}
