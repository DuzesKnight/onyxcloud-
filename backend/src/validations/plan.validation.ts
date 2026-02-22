import { z } from 'zod';

const planBodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  price: z.coerce.number().positive().max(1000000),
  ram: z.coerce.number().int().positive().max(1048576),
  cpu: z.coerce.number().int().positive().max(1000),
  disk: z.coerce.number().int().positive().max(1048576),
  eggId: z.coerce.number().int().positive(),
  dockerImage: z.string().trim().min(3).max(255)
});

export const createPlanSchema = z.object({
  body: planBodySchema
});

export const updatePlanSchema = z.object({
  params: z.object({
    planId: z.coerce.number().int().positive()
  }),
  body: planBodySchema.extend({
    isActive: z.boolean().optional().default(true)
  })
});

export const planIdParamSchema = z.object({
  params: z.object({
    planId: z.coerce.number().int().positive()
  })
});
