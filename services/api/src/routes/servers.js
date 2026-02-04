import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../utils/auth.js';
import { createPteroUser, provisionServer, controlServer, listCatalog } from '../services/ptero-client.js';

export const serverRouter = Router();

serverRouter.get('/catalog', async (_req, res) => {
  const catalog = await listCatalog();
  res.json(catalog);
});

serverRouter.get('/', requireAuth, async (req, res) => {
  const servers = await prisma.server.findMany({ where: { userId: req.session.userId } });
  res.json({ servers });
});

serverRouter.post('/provision', requireAuth, async (req, res) => {
  const schema = z.object({
    planCode: z.string(),
    serviceType: z.string(),
    name: z.string(),
    billingInvoiceId: z.string()
  });
  const payload = schema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { id: req.session.userId } });

  const pteroUser = await createPteroUser({
    email: user.email,
    username: user.email.split('@')[0],
    firstName: user.name?.split(' ')[0] || 'Onyx',
    lastName: user.name?.split(' ')[1] || 'User'
  });

  const server = await provisionServer({
    planCode: payload.planCode,
    serviceType: payload.serviceType,
    name: payload.name,
    pteroUserId: pteroUser.id
  });

  const record = await prisma.server.create({
    data: {
      userId: user.id,
      name: payload.name,
      serviceType: payload.serviceType,
      planCode: payload.planCode,
      status: 'ACTIVE',
      pteroServerId: server.id,
      pteroNode: server.node,
      ipAddress: server.ip,
      port: server.port,
      credentials: server.credentials,
      expiresAt: server.expiresAt ? new Date(server.expiresAt) : null
    }
  });

  res.status(201).json({ server: record });
});

serverRouter.post('/:id/power', requireAuth, async (req, res) => {
  const schema = z.object({ action: z.enum(['start', 'stop', 'restart']) });
  const { action } = schema.parse(req.body);
  const server = await prisma.server.findFirst({
    where: { id: req.params.id, userId: req.session.userId }
  });
  if (!server) {
    return res.status(404).json({ message: 'Server not found' });
  }
  const result = await controlServer(server.pteroServerId, action);
  res.json(result);
});

