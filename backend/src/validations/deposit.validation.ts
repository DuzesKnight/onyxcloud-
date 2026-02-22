import { z } from 'zod';

export const createDepositSchema = z.object({
  body: z.object({
    amount: z.number().positive().max(1000000),
    utr: z.string().trim().min(6).max(32),
    screenshotUrl: z.string().trim().url().max(1000).optional()
  })
});

export const depositDecisionSchema = z.object({
  params: z.object({
    depositId: z.coerce.number().int().positive()
  }),
  body: z.object({
    reason: z.string().trim().min(3).max(255).optional()
  })
});
