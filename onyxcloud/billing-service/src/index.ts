import express from 'express';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/invoices/:id/qr', async (req, res) => {
  const invoice = await prisma.invoice.findUnique({ where: { id: req.params.id } });
  if (!invoice) return res.status(404).json({ message: 'not found' });
  res.json({ qrPayload: invoice.qr_payload });
});

app.post('/webhooks/payment', async (req, res) => {
  const sig = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  const expected = crypto.createHmac('sha256', process.env.PAYMENT_WEBHOOK_SECRET || '').update(payload).digest('hex');
  if (sig !== expected) return res.status(401).json({ message: 'bad signature' });

  const { invoiceId, paymentRef, amountPaise, success } = req.body;
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }, include: { subscription: true } });
  if (!invoice) return res.status(404).json({ message: 'invoice missing' });

  await prisma.transaction.create({ data: { invoice_id: invoice.id, txn_ref: paymentRef, payload: req.body } });
  if (success && amountPaise === invoice.amount_paise) {
    await prisma.payment.create({ data: { user_id: invoice.user_id, invoice_id: invoice.id, amount_paise: amountPaise, gateway_ref: paymentRef, status: 'paid', verified_at: new Date() } });
    await prisma.invoice.update({ where: { id: invoice.id }, data: { status: 'paid' } });
    await prisma.subscription.update({ where: { id: invoice.subscription_id }, data: { status: 'active', next_billing_date: new Date(Date.now() + 30*86400000) } });
    await axios.post(`${process.env.PROVISIONING_URL}/provision`, { invoiceId: invoice.id, subscriptionId: invoice.subscription_id, userId: invoice.user_id });
  } else {
    await prisma.invoice.update({ where: { id: invoice.id }, data: { status: 'failed' } });
  }
  res.json({ ok: true });
});

app.listen(4010, () => console.log('billing-service :4010'));
