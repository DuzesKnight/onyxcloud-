import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';

const router = Router();

router.post('/flow', async (req, res) => {
  const body = z.object({ planId: z.string(), productType: z.string(), eggId: z.string() }).parse(req.body);
  const userId = (req as any).user.sub as string;
  const plan = await prisma.plan.findUnique({ where: { id: body.planId } });
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  const subscription = await prisma.subscription.create({ data: { user_id: userId, plan_id: plan.id, next_billing_date: new Date(Date.now() + 30*86400000), grace_period_days: plan.grace_period_days } });
  const invoice = await prisma.invoice.create({ data: { user_id: userId, subscription_id: subscription.id, amount_paise: plan.price_paise, due_date: new Date(Date.now() + 86400000), qr_payload: `upi://pay?pa=${process.env.UPI_VPA}&am=${plan.price_paise/100}&cu=INR&tn=${subscription.id}` } });
  res.status(201).json({ sequence: ['select-product','select-plan','configure-options','billing-details','invoice-generated','payment-pending'], subscription, invoice });
});

export default router;
