import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[A-Z]/, 'Password must include at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must include at least 1 lowercase letter')
  .regex(/[0-9]/, 'Password must include at least 1 number')
  .regex(/[^A-Za-z0-9]/, 'Password must include at least 1 special character');

export const registerSchema = z.object({
  body: z.object({
    email: z.string().trim().email().max(255),
    fullName: z.string().trim().min(2).max(120),
    password: passwordSchema
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email().max(255),
    password: z.string().min(8).max(128)
  })
});
