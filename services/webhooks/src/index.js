import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json({ limit: '2mb' }));

app.post('/stripe', async (req, res) => {
  console.log('Stripe webhook received', req.body.type);
  res.json({ received: true });
});

app.post('/paypal', async (req, res) => {
  console.log('PayPal webhook received', req.body.event_type);
  res.json({ received: true });
});

app.post('/razorpay', async (req, res) => {
  console.log('Razorpay webhook received', req.body.event);
  res.json({ received: true });
});

app.post('/pterodactyl', async (req, res) => {
  console.log('Pterodactyl webhook received', req.body.event);
  res.json({ received: true });
});

const port = process.env.WEBHOOKS_PORT || 4200;
app.listen(port, () => {
  console.log(`Webhooks running on :${port}`);
});
