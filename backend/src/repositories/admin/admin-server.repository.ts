import { RowDataPacket } from 'mysql2/promise';
import { runQuery } from '../../config/db';

interface AdminServerRow extends RowDataPacket {
  id: number;
  name: string;
  game: string;
  status: string;
  billing_status: string;
  monthly_price: number;
  next_billing_at: string;
  created_at: string;
  user_id: number;
  user_email: string;
  plan_id: number;
  plan_name: string;
}

export const listServersForAdmin = async (): Promise<AdminServerRow[]> => {
  return runQuery<AdminServerRow[]>(
    `SELECT
      s.id,
      s.name,
      s.game,
      s.status,
      s.billing_status,
      s.monthly_price,
      s.next_billing_at,
      s.created_at,
      u.id AS user_id,
      u.email AS user_email,
      p.id AS plan_id,
      p.name AS plan_name
    FROM servers s
    INNER JOIN users u ON u.id = s.user_id
    INNER JOIN plans p ON p.id = s.plan_id
    ORDER BY s.id DESC`
  );
};
