import { z } from 'zod';

export const purchaseServerSchema = z.object({
  body: z.object({
    planId: z.coerce.number().int().positive(),
    serverName: z.string().trim().min(3).max(120),
    game: z.string().trim().min(2).max(80)
  })
});


export const renewServerSchema = z.object({
  body: z.object({
    serverId: z.coerce.number().int().positive()
  })
});
