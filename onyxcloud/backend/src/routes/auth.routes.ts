import { Router } from 'express';
import { z } from 'zod';
import { login, register } from '../services/auth.service';
const router = Router();

const serializeUser = (user: { id: string; email: string; full_name: string; role_id?: string; role?: { id: string; name: string } | null; created_at?: Date; updated_at?: Date }) => ({
  id: user.id,
  email: user.email,
  fullName: user.full_name,
  roleId: user.role_id,
  role: user.role ? { id: user.role.id, name: user.role.name } : undefined,
  createdAt: user.created_at,
  updatedAt: user.updated_at
});


router.post('/register', async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(8), fullName: z.string().min(2) }).parse(req.body);
  const data = await register({ ...body, ip: req.ip || 'unknown' });
  res.cookie('session_token', data.token, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.status(201).json({ user: serializeUser(data.user) });
});

router.post('/login', async (req, res) => {
  try {
    const body = z.object({ email: z.string().email(), password: z.string(), rememberMe: z.boolean().optional() }).parse(req.body);
    const data = await login({ ...body, ip: req.ip || 'unknown' });
    res.cookie('session_token', data.token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ user: serializeUser(data.user) });
  } catch {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
