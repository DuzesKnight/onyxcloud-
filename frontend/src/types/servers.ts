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


export interface Plan {
  id: number;
  name: string;
  price: number;
  ram: number;
  cpu: number;
  disk: number;
  eggId: number;
  dockerImage: string;
  isActive: boolean;
}
