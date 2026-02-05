import { Router } from 'express';
import { prisma } from '../prisma';
const router = Router();
router.get('/users', async (_req, res) => res.json(await prisma.user.findMany({ take: 100, include: { role: true } })));
router.get('/servers', async (_req, res) => res.json(await prisma.server.findMany({ include: { user: true } })));
router.get('/revenue', async (_req, res) => {
  const paid = await prisma.invoice.aggregate({ where: { status: 'paid' }, _sum: { amount_paise: true } });
  res.json({ totalRevenuePaise: paid._sum.amount_paise || 0 });
});
export default router;
