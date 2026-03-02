import { describe, expect, it } from 'vitest';
import { AffiliateLinkService } from '../../apps/web/lib/services/affiliate-link-service';

describe('AffiliateLinkService', () => {
  it('injects marketplace tag', () => {
    const result = AffiliateLinkService.toAffiliateUrl('https://www.amazon.in/dp/B0ABC123', 'IN');
    expect(result).toContain('tag=');
  });

  it('normalizes existing amazon tracking tag before reinjecting', () => {
    const result = AffiliateLinkService.toAffiliateUrl('https://www.amazon.in/dp/B0ABC123?tag=oldtag-21', 'IN');
    expect(result).not.toContain('oldtag-21');
  });

  it('blocks non-amazon domains', () => {
    expect(AffiliateLinkService.toAffiliateUrl('https://evil.com/item', 'US')).toBeNull();
  });

  it('blocks non-https amazon url', () => {
    expect(AffiliateLinkService.toAffiliateUrl('http://www.amazon.com/dp/B0ABC123', 'US')).toBeNull();
  });
});
