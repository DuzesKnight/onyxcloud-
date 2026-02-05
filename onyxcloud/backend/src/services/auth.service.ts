import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import { env } from '../utils/env';

export async function register(input: { email: string; password: string; fullName: string; ip: string; }) {
  const role = await prisma.role.upsert({ where: { name: 'user' }, create: { name: 'user' }, update: {} });
  const password_hash = await argon2.hash(input.password);
  const user = await prisma.user.create({ data: { email: input.email, full_name: input.fullName, password_hash, role_id: role.id } });
  const token = jwt.sign({ sub: user.id, role: 'user' }, env.jwtSecret, { expiresIn: '7d' });
  await prisma.session.create({ data: { user_id: user.id, token, ip_address: input.ip, expires_at: new Date(Date.now() + 7 * 86400000) } });
  return { user, token };
}

export async function login(input: { email: string; password: string; ip: string; rememberMe?: boolean }) {
  const user = await prisma.user.findUnique({ where: { email: input.email }, include: { role: true } });
  if (!user || !(await argon2.verify(user.password_hash, input.password))) throw new Error('Invalid credentials');
  const token = jwt.sign({ sub: user.id, role: user.role.name }, env.jwtSecret, { expiresIn: input.rememberMe ? '30d' : '1d' });
  await prisma.session.create({ data: { user_id: user.id, token, remember_me: !!input.rememberMe, ip_address: input.ip, expires_at: new Date(Date.now() + (input.rememberMe ? 30 : 1) * 86400000) } });
  return { user, token };
}
