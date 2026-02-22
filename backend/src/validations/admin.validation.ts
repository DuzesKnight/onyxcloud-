import { z } from 'zod';

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().trim().email().max(255),
    password: z.string().min(8).max(128)
  })
});

export const adminDepositDecisionSchema = z.object({
  params: z.object({
    depositId: z.coerce.number().int().positive()
  }),
  body: z.object({
    reason: z.string().trim().min(3).max(255).optional()
  })
});
