import { z } from 'zod';

export const outboundClickSchema = z.object({
  wishlistItemId: z.string().min(1),
  wishlistSlug: z.string().min(1),
  marketplace: z.enum(['IN', 'US', 'UK']),
  metadata: z.object({
    referrer: z.string().optional(),
    userAgent: z.string().optional(),
    countryCode: z.string().max(3).optional()
  }).optional()
});

export function apiError(message: string, code = 'BAD_REQUEST') {
  return { error: { code, message } };
}
