import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireAdmin } from '../utils/auth.js';
import { z } from 'zod';

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });
  res.json({ users });
});

adminRouter.patch('/users/:id', async (req, res) => {
  const schema = z.object({
    role: z.enum(['USER', 'ADMIN']).optional(),
    emailVerifiedAt: z.string().datetime().optional()
  });
  const payload = schema.parse(req.body);
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      role: payload.role,
      emailVerifiedAt: payload.emailVerifiedAt ? new Date(payload.emailVerifiedAt) : undefined
    }
  });
  res.json({ user });
});

adminRouter.get('/servers', async (_req, res) => {
  const servers = await prisma.server.findMany();
  res.json({ servers });
});

adminRouter.get('/billing', async (_req, res) => {
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ invoices });
});

