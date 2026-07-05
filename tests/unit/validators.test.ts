import { describe, expect, it } from 'vitest';
import { outboundClickSchema, slugSchema } from '../../apps/web/lib/validation/schemas';

describe('validation schemas', () => {
  it('accepts valid outbound click payload', () => {
    expect(outboundClickSchema.safeParse({ wishlistItemId: 'x', wishlistSlug: 's', marketplace: 'IN' }).success).toBe(true);
  });

  it('rejects invalid country code', () => {
    expect(outboundClickSchema.safeParse({ wishlistItemId: 'x', wishlistSlug: 's', marketplace: 'IN', metadata: { countryCode: 'IND' } }).success).toBe(false);
  });

  it('accepts kebab-case slug', () => {
    expect(slugSchema.safeParse({ slug: 'parth-pamper-list' }).success).toBe(true);
  });
});
