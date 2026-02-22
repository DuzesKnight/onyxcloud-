import crypto from 'crypto';
import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { runQuery } from '../../config/db';
import { PlanModel } from '../../models/game-server.model';

interface PlanRow extends RowDataPacket, PlanModel {}

interface ServerRow extends RowDataPacket {
  id: number;
  name: string;
  game: string;
  status: string;
  billing_status: string;
  monthly_price: number;
  next_billing_at: string;
  expiry_date: string;
  plan_id: number;
  user_id: number;
  pterodactyl_server_id: number;
  renew_interval_days: number;
  auto_renew: 0 | 1;
}

export const findActivePlanById = async (planId: number): Promise<PlanModel | null> => {
  const rows = await runQuery<PlanRow[]>(
    `SELECT id, code, name, price_monthly, billing_cycle_days, cpu_limit, memory_mb, disk_mb, egg_id, docker_image, price, ram, cpu, disk, is_active
       FROM plans
      WHERE id = :planId AND is_active = 1
      LIMIT 1`,
    { planId }
  );

  return rows[0] ?? null;
};

export const createServerRecord = async (
  connection: PoolConnection,
  input: {
    userId: number;
    planId: number;
    pterodactylServerId: number;
    name: string;
    game: string;
    monthlyPrice: number;
    renewIntervalDays: number;
  }
): Promise<number> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO servers (
      uuid,
      user_id,
      plan_id,
      pterodactyl_server_id,
      name,
      game,
      status,
      billing_status,
      next_billing_at,
      expiry_date,
      renew_interval_days,
      monthly_price,
      auto_renew
    ) VALUES (?, ?, ?, ?, ?, ?, 'active', 'paid', DATE_ADD(NOW(), INTERVAL ? DAY), DATE_ADD(NOW(), INTERVAL ? DAY), ?, ?, 1)`,
    [
      crypto.randomUUID(),
      input.userId,
      input.planId,
      input.pterodactylServerId,
      input.name,
      input.game,
      input.renewIntervalDays,
      input.renewIntervalDays,
      input.renewIntervalDays,
      input.monthlyPrice
    ]
  );

  return result.insertId;
};

export const listServersByUserId = async (
  userId: number
): Promise<
  Array<{
    id: number;
    name: string;
    game: string;
    status: string;
    billingStatus: string;
    monthlyPrice: number;
    nextBillingAt: string;
    expiryDate: string;
  }>
> => {
  const rows = await runQuery<ServerRow[]>(
    `SELECT id, name, game, status, billing_status, monthly_price, next_billing_at, expiry_date
       FROM servers
      WHERE user_id = :userId
      ORDER BY created_at DESC`,
    { userId }
  );

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    game: row.game,
    status: row.status,
    billingStatus: row.billing_status,
    monthlyPrice: Number(row.monthly_price),
    nextBillingAt: row.next_billing_at,
    expiryDate: row.expiry_date
  }));
};


export const findExpiredActiveServers = async (): Promise<ServerRow[]> => {
  return runQuery<ServerRow[]>(
    `SELECT id, user_id, plan_id, pterodactyl_server_id, name, game, status, billing_status, monthly_price, next_billing_at, expiry_date, renew_interval_days, auto_renew
       FROM servers
      WHERE status = 'active'
        AND expiry_date <= NOW()`
  );
};

export const markServerSuspended = async (serverId: number, reason: string): Promise<void> => {
  await runQuery<RowDataPacket[]>(
    `UPDATE servers
        SET status = 'suspended',
            billing_status = 'overdue',
            suspended_reason = :reason
      WHERE id = :serverId`,
    { serverId, reason }
  );
};

export const findServerByIdForUser = async (serverId: number, userId: number): Promise<ServerRow | null> => {
  const rows = await runQuery<ServerRow[]>(
    `SELECT id, user_id, plan_id, pterodactyl_server_id, name, game, status, billing_status, monthly_price, next_billing_at, expiry_date, renew_interval_days, auto_renew
       FROM servers
      WHERE id = :serverId
        AND user_id = :userId
      LIMIT 1`,
    { serverId, userId }
  );

  return rows[0] ?? null;
};

export const extendServerExpiry = async (
  connection: PoolConnection,
  input: { serverId: number; days: number }
): Promise<void> => {
  await connection.execute(
    `UPDATE servers
        SET expiry_date = DATE_ADD(CASE WHEN expiry_date > NOW() THEN expiry_date ELSE NOW() END, INTERVAL ? DAY),
            next_billing_at = DATE_ADD(CASE WHEN expiry_date > NOW() THEN expiry_date ELSE NOW() END, INTERVAL ? DAY),
            billing_status = 'paid',
            status = 'active',
            suspended_reason = NULL
      WHERE id = ?`,
    [input.days, input.days, input.serverId]
  );
};
