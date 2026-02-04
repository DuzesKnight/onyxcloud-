import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../utils/auth.js';
import { createCheckoutSession } from '../services/payments.js';

export const billingRouter = Router();

billingRouter.post('/checkout', requireAuth, async (req, res) => {
  const schema = z.object({
    amount: z.number().int().positive(),
    currency: z.string().default('USD'),
    provider: z.enum(['stripe', 'paypal', 'razorpay']),
    planCode: z.string()
  });
  const payload = schema.parse(req.body);
  const invoice = await prisma.invoice.create({
    data: {
      userId: req.session.userId,
      amount: payload.amount,
      currency: payload.currency,
      provider: payload.provider
    }
  });
  const session = await createCheckoutSession({
    provider: payload.provider,
    amount: payload.amount,
    currency: payload.currency,
    customerId: req.session.userId
  });
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { providerRef: session.sessionId }
  });
  res.json({ checkoutUrl: session.checkoutUrl, invoiceId: invoice.id });
});

billingRouter.get('/history', requireAuth, async (req, res) => {
  const invoices = await prisma.invoice.findMany({
    where: { userId: req.session.userId },
    orderBy: { createdAt: 'desc' }
  });
  res.json({ invoices });
});

