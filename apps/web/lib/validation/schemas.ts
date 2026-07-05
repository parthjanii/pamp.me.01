import { z } from 'zod';

export const marketplaceSchema = z.enum(['IN', 'US', 'UK']);

export const slugSchema = z.object({
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/)
});

export const outboundClickSchema = z.object({
  wishlistItemId: z.string().min(1),
  wishlistSlug: z.string().min(1),
  marketplace: marketplaceSchema,
  metadata: z.object({
    referrer: z.string().url().optional(),
    userAgent: z.string().optional(),
    countryCode: z.string().length(2).optional()
  }).optional()
});

export function apiError(message: string, code = 'BAD_REQUEST') {
  return { error: { code, message } };
}
