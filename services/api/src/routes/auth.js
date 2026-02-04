import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { sendMail } from '../lib/mailer.js';
import { authenticator } from 'otplib';
import { requireAuth } from '../utils/auth.js';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional()
});

authRouter.post('/register', async (req, res) => {
  const payload = registerSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: { email: payload.email, passwordHash, name: payload.name }
  });
  const verifyToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  const link = `${process.env.APP_URL}/auth/verify?token=${verifyToken}`;
  await sendMail({
    to: user.email,
    subject: 'Verify your OnyxCloud account',
    html: `<p>Verify your email: <a href="${link}">${link}</a></p>`
  });
  res.status(201).json({ message: 'Registered. Verify your email.' });
});

authRouter.post('/login', async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.session.userId = user.id;
  req.session.userRole = user.role;
  if (payload.rememberMe) {
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
  }
  res.json({ message: 'Logged in' });
});

authRouter.post('/logout', requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

authRouter.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.session.userId } });
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

authRouter.post('/verify-email', async (req, res) => {
  const schema = z.object({ token: z.string() });
  const { token } = schema.parse(req.body);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await prisma.user.update({
    where: { id: decoded.userId },
    data: { emailVerifiedAt: new Date() }
  });
  res.json({ message: 'Email verified' });
});

authRouter.post('/password/request', async (req, res) => {
  const schema = z.object({ email: z.string().email() });
  const { email } = schema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.json({ message: 'If the account exists, a reset email has been sent.' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const link = `${process.env.APP_URL}/auth/reset?token=${token}`;
  await sendMail({
    to: user.email,
    subject: 'Reset your password',
    html: `<p>Reset your password: <a href="${link}">${link}</a></p>`
  });
  res.json({ message: 'If the account exists, a reset email has been sent.' });
});

authRouter.post('/password/reset', async (req, res) => {
  const schema = z.object({ token: z.string(), password: z.string().min(8) });
  const { token, password } = schema.parse(req.body);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: decoded.userId },
    data: { passwordHash }
  });
  res.json({ message: 'Password updated' });
});

authRouter.post('/2fa/setup', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.session.userId } });
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(user.email, 'OnyxCloud', secret);
  await prisma.user.update({
    where: { id: user.id },
    data: { twoFactorSecret: secret }
  });
  res.json({ secret, otpauth });
});

authRouter.post('/2fa/verify', requireAuth, async (req, res) => {
  const schema = z.object({ token: z.string() });
  const { token } = schema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { id: req.session.userId } });
  if (!user.twoFactorSecret) {
    return res.status(400).json({ message: '2FA not enabled' });
  }
  const valid = authenticator.verify({ token, secret: user.twoFactorSecret });
  if (!valid) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  res.json({ message: '2FA verified' });
});
