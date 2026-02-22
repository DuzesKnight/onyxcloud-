import { PoolConnection } from 'mysql2/promise';
import { withTransaction } from '../../config/db';
import { AppError } from '../../utils/errors';
import { createWalletTransaction } from '../../repositories/billing/ledger.repository';
import { findUserWalletById } from '../../repositories/billing/wallet.repository';
import { debitWalletForServerPurchase } from '../wallet/wallet.service';
import {
  extendServerExpiry,
  findActivePlanById,
  findExpiredActiveServers,
  findServerByIdForUser,
  markServerSuspended
} from '../../repositories/servers/server.repository';
import { suspendPterodactylServer } from '../pterodactyl/server.service';

const renewServerWithConnection = async (connection: PoolConnection, input: {
  userId: number;
  serverId: number;
  serverName: string;
  amount: number;
  renewalDays: number;
  automated?: boolean;
}): Promise<void> => {
  const walletUpdate = await debitWalletForServerPurchase(connection, {
    userId: input.userId,
    amount: input.amount,
    description: `Server renewal for ${input.serverName}`
  });

  await extendServerExpiry(connection, {
    serverId: input.serverId,
    days: input.renewalDays
  });

  await createWalletTransaction(connection, {
    userId: input.userId,
    type: 'server_charge_debit',
    direction: 'debit',
    amount: input.amount,
    openingBalance: walletUpdate.openingBalance,
    closingBalance: walletUpdate.closingBalance,
    description: `${input.automated ? 'Auto' : 'Manual'} renewal: ${input.serverName}`,
    serverId: input.serverId
  });
};

export const renewServer = async (input: { userId: number; serverId: number }): Promise<{ serverId: number }> => {
  const server = await findServerByIdForUser(input.serverId, input.userId);
  if (!server) {
    throw new AppError('Server not found', 404);
  }

  const plan = await findActivePlanById(server.plan_id);
  if (!plan) {
    throw new AppError('Plan not available for renewal', 400);
  }

  await withTransaction(async (connection) => {
    await renewServerWithConnection(connection, {
      userId: input.userId,
      serverId: server.id,
      serverName: server.name,
      amount: Number(plan.price),
      renewalDays: server.renew_interval_days
    });
  });

  return { serverId: server.id };
};

export const suspendExpiredServers = async (): Promise<{
  scanned: number;
  renewed: number;
  suspended: number;
  skipped: number;
  errors: number;
  actions: Array<{ serverId: number; userId: number; action: 'renewed' | 'suspended' | 'skipped' | 'error'; reason: string }>;
}> => {
  const expiredServers = await findExpiredActiveServers();
  let renewed = 0;
  let suspended = 0;
  let skipped = 0;
  let errors = 0;
  const actions: Array<{ serverId: number; userId: number; action: 'renewed' | 'suspended' | 'skipped' | 'error'; reason: string }> = [];

  for (const server of expiredServers) {
    try {
      const plan = await findActivePlanById(server.plan_id);
      if (!plan) {
        await suspendPterodactylServer(server.pterodactyl_server_id);
        await markServerSuspended(server.id, 'Expired and no active plan for renewal');
        suspended += 1;
        actions.push({ serverId: server.id, userId: server.user_id, action: 'suspended', reason: 'plan_missing' });
        continue;
      }

      if (server.auto_renew === 1) {
        const wallet = await findUserWalletById(server.user_id);
        const renewalPrice = Number(plan.price);

        if (wallet && Number(wallet.wallet_balance) >= renewalPrice) {
          await withTransaction(async (connection) => {
            await renewServerWithConnection(connection, {
              userId: server.user_id,
              serverId: server.id,
              serverName: server.name,
              amount: renewalPrice,
              renewalDays: server.renew_interval_days,
              automated: true
            });
          });

          renewed += 1;
          actions.push({ serverId: server.id, userId: server.user_id, action: 'renewed', reason: 'auto_renew_success' });
          continue;
        }

        skipped += 1;
        actions.push({ serverId: server.id, userId: server.user_id, action: 'skipped', reason: 'insufficient_wallet_for_auto_renew' });
      }

      await suspendPterodactylServer(server.pterodactyl_server_id);
      await markServerSuspended(server.id, 'Expired due to non-renewal');
      suspended += 1;
      actions.push({ serverId: server.id, userId: server.user_id, action: 'suspended', reason: 'expired_non_renewed' });
    } catch {
      errors += 1;
      actions.push({ serverId: server.id, userId: server.user_id, action: 'error', reason: 'unexpected_job_error' });
    }
  }

  return { scanned: expiredServers.length, renewed, suspended, skipped, errors, actions };
};
