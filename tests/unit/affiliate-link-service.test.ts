import { describe, expect, it } from 'vitest';
import { AffiliateLinkService } from '../../apps/web/lib/services/affiliate-link-service';

describe('AffiliateLinkService', () => {
  it('injects marketplace tag', () => {
    const result = AffiliateLinkService.toAffiliateUrl('https://www.amazon.in/dp/B0ABC123', 'IN');
    expect(result).toContain('tag=');
  });

  it('blocks non-amazon domains', () => {
    expect(AffiliateLinkService.toAffiliateUrl('https://evil.com/item', 'US')).toBeNull();
  });
});
