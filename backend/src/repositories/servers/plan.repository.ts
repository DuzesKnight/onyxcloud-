import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { runQuery, dbPool } from '../../config/db';

interface PlanRow extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  ram: number;
  cpu: number;
  disk: number;
  egg_id: number;
  docker_image: string;
  is_active: 0 | 1;
}

export interface PlanView {
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

const toPlanView = (row: PlanRow): PlanView => ({
  id: row.id,
  name: row.name,
  price: Number(row.price),
  ram: row.ram,
  cpu: row.cpu,
  disk: row.disk,
  eggId: row.egg_id,
  dockerImage: row.docker_image,
  isActive: row.is_active === 1
});

export const listActivePlans = async (): Promise<PlanView[]> => {
  const rows = await runQuery<PlanRow[]>(
    `SELECT id, name, price, ram, cpu, disk, egg_id, docker_image, is_active
       FROM plans
      WHERE is_active = 1
      ORDER BY price ASC`
  );

  return rows.map(toPlanView);
};

export const listPlansForAdmin = async (): Promise<PlanView[]> => {
  const rows = await runQuery<PlanRow[]>(
    `SELECT id, name, price, ram, cpu, disk, egg_id, docker_image, is_active
       FROM plans
      ORDER BY id DESC`
  );

  return rows.map(toPlanView);
};

export const findPlanById = async (planId: number): Promise<PlanView | null> => {
  const rows = await runQuery<PlanRow[]>(
    `SELECT id, name, price, ram, cpu, disk, egg_id, docker_image, is_active
       FROM plans
      WHERE id = :planId
      LIMIT 1`,
    { planId }
  );

  return rows[0] ? toPlanView(rows[0]) : null;
};

export const createPlan = async (input: {
  name: string;
  price: number;
  ram: number;
  cpu: number;
  disk: number;
  eggId: number;
  dockerImage: string;
}): Promise<number> => {
  const [result] = await dbPool.execute<ResultSetHeader>(
    `INSERT INTO plans (code, name, description, price_monthly, billing_cycle_days, cpu_limit, memory_mb, disk_mb, price, ram, cpu, disk, egg_id, docker_image, is_active)
     VALUES (?, ?, NULL, ?, 30, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    [
      `plan_${Date.now()}`,
      input.name,
      input.price,
      input.cpu,
      input.ram,
      input.disk,
      input.price,
      input.ram,
      input.cpu,
      input.disk,
      input.eggId,
      input.dockerImage
    ]
  );

  return result.insertId;
};

export const updatePlan = async (
  planId: number,
  input: {
    name: string;
    price: number;
    ram: number;
    cpu: number;
    disk: number;
    eggId: number;
    dockerImage: string;
    isActive: boolean;
  }
): Promise<void> => {
  await dbPool.execute(
    `UPDATE plans
        SET name = ?,
            price_monthly = ?,
            memory_mb = ?,
            cpu_limit = ?,
            disk_mb = ?,
            price = ?,
            ram = ?,
            cpu = ?,
            disk = ?,
            egg_id = ?,
            docker_image = ?,
            is_active = ?
      WHERE id = ?`,
    [
      input.name,
      input.price,
      input.ram,
      input.cpu,
      input.disk,
      input.price,
      input.ram,
      input.cpu,
      input.disk,
      input.eggId,
      input.dockerImage,
      input.isActive ? 1 : 0,
      planId
    ]
  );
};

export const deactivatePlan = async (planId: number): Promise<void> => {
  await dbPool.execute(
    `UPDATE plans
        SET is_active = 0
      WHERE id = ?`,
    [planId]
  );
};
