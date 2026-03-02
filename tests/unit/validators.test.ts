import { describe, expect, it } from 'vitest';
import { outboundClickSchema } from '../../apps/web/lib/validation/schemas';

describe('outboundClickSchema', () => {
  it('accepts valid payload', () => {
    expect(outboundClickSchema.safeParse({ wishlistItemId: 'x', wishlistSlug: 's', marketplace: 'IN' }).success).toBe(true);
  });
});
