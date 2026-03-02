export const AMAZON_ALLOWLIST = {
  IN: ['amazon.in', 'www.amazon.in'],
  US: ['amazon.com', 'www.amazon.com'],
  UK: ['amazon.co.uk', 'www.amazon.co.uk']
} as const;

export type SupportedMarketplace = keyof typeof AMAZON_ALLOWLIST;

const MARKETPLACE_TAG_ENV: Record<SupportedMarketplace, string> = {
  IN: 'AMAZON_TAG_IN',
  US: 'AMAZON_TAG_US',
  UK: 'AMAZON_TAG_UK'
};

const DEFAULT_MARKETPLACE_TAGS: Record<SupportedMarketplace, string> = {
  IN: 'yourtag-21',
  US: 'yourtag-20',
  UK: 'yourtag-21'
};

function getTagForMarketplace(marketplace: SupportedMarketplace) {
  const envKey = MARKETPLACE_TAG_ENV[marketplace];
  const configuredTag = process.env[envKey];
  return configuredTag && configuredTag.trim().length > 0 ? configuredTag : DEFAULT_MARKETPLACE_TAGS[marketplace];
}

export class AffiliateLinkService {
  static validateAmazonUrl(url: string, marketplace: SupportedMarketplace) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' && AMAZON_ALLOWLIST[marketplace].includes(parsed.hostname);
    } catch {
      return false;
    }
  }

  static normalize(url: string) {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.searchParams.delete('tag');
    parsed.searchParams.delete('ascsubtag');
    return parsed.toString();
  }

  static toAffiliateUrl(url: string, marketplace: SupportedMarketplace) {
    if (!this.validateAmazonUrl(url, marketplace)) return null;
    const parsed = new URL(this.normalize(url));
    parsed.searchParams.set('tag', getTagForMarketplace(marketplace));
    return parsed.toString();
  }
}
