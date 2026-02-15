import mysql, { Pool, PoolConnection, RowDataPacket } from 'mysql2/promise';
import { env } from './env';

export const dbPool: Pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: env.DB_CONN_LIMIT,
  namedPlaceholders: true
});

export const runQuery = async <T extends RowDataPacket[]>(
  sql: string,
  params: Record<string, unknown> = {}
): Promise<T> => {
  const [rows] = await dbPool.query<T>(sql, params);
  return rows;
};

export const withTransaction = async <T>(handler: (connection: PoolConnection) => Promise<T>): Promise<T> => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await handler(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const assertDbConnection = async (): Promise<void> => {
  const connection = await dbPool.getConnection();
  connection.release();
};
