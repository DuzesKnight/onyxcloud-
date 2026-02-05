import { Router } from 'express';
import { z } from 'zod';
import { login, register } from '../services/auth.service';
const router = Router();

router.post('/register', async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(8), fullName: z.string().min(2) }).parse(req.body);
  const data = await register({ ...body, ip: req.ip || 'unknown' });
  res.cookie('session_token', data.token, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.status(201).json({ user: data.user });
});

router.post('/login', async (req, res) => {
  try {
    const body = z.object({ email: z.string().email(), password: z.string(), rememberMe: z.boolean().optional() }).parse(req.body);
    const data = await login({ ...body, ip: req.ip || 'unknown' });
    res.cookie('session_token', data.token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ user: data.user });
  } catch {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
