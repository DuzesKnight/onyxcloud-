import crypto from 'crypto';
import { withTransaction } from '../../config/db';
import { AppError } from '../../utils/errors';
import { findUserById } from '../../repositories/auth/user.repository';
import { createWalletTransaction } from '../../repositories/billing/ledger.repository';
import { createServerRecord, findActivePlanById } from '../../repositories/servers/server.repository';
import { debitWalletForServerPurchase } from '../wallet/wallet.service';
import { createPterodactylServer, deletePterodactylServer } from '../pterodactyl/server.service';
import { createPterodactylUser, getPterodactylUserByExternalId } from '../pterodactyl/user.service';

export const purchaseAndDeployServer = async (input: {
  userId: number;
  planId: number;
  serverName: string;
  game: string;
}): Promise<{ serverId: number; pterodactylServerId: number }> => {
  const user = await findUserById(input.userId);
  if (!user || !user.is_active) {
    throw new AppError('User not found or inactive', 404);
  }

  const plan = await findActivePlanById(input.planId);
  if (!plan) {
    throw new AppError('Selected plan not found', 404);
  }

  let pterodactylServerId: number | null = null;

  try {
    return await withTransaction(async (connection) => {
      const walletUpdate = await debitWalletForServerPurchase(connection, {
        userId: input.userId,
        amount: Number(plan.price_monthly),
        description: `Server purchase for plan ${plan.code}`
      });

      let pterodactylUser = await getPterodactylUserByExternalId(input.userId);
      if (!pterodactylUser) {
        const [firstName, ...rest] = user.full_name.trim().split(' ');
        pterodactylUser = await createPterodactylUser({
          externalUserId: input.userId,
          email: user.email,
          username: user.email.split('@')[0].slice(0, 32),
          firstName: firstName || 'User',
          lastName: rest.join(' ') || 'OnyxCloud',
          password: crypto.randomUUID()
        });
      }

      const pterodactylServer = await createPterodactylServer({
        externalServerId: `onyx-${crypto.randomUUID()}`,
        pterodactylUserId: pterodactylUser.id,
        name: input.serverName.trim(),
        memoryMb: plan.memory_mb,
        diskMb: plan.disk_mb,
        cpuLimit: plan.cpu_limit
      });
      pterodactylServerId = pterodactylServer.id;

      const serverId = await createServerRecord(connection, {
        userId: input.userId,
        planId: plan.id,
        pterodactylServerId,
        name: input.serverName.trim(),
        game: input.game.trim(),
        monthlyPrice: Number(plan.price_monthly),
        renewIntervalDays: plan.billing_cycle_days
      });

      await createWalletTransaction(connection, {
        userId: input.userId,
        type: 'server_charge_debit',
        direction: 'debit',
        amount: Number(plan.price_monthly),
        openingBalance: walletUpdate.openingBalance,
        closingBalance: walletUpdate.closingBalance,
        description: `Server deployed: ${input.serverName}`,
        serverId
      });

      return {
        serverId,
        pterodactylServerId
      };
    });
  } catch (error) {
    if (pterodactylServerId) {
      try {
        await deletePterodactylServer(pterodactylServerId);
      } catch {
        // Best-effort compensation for partial failures after remote provisioning.
      }
    }
    throw error;
  }
};
