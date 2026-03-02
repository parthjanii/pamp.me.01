const ALLOWLIST = {
  IN: ['amazon.in', 'www.amazon.in'],
  US: ['amazon.com', 'www.amazon.com'],
  UK: ['amazon.co.uk', 'www.amazon.co.uk']
} as const;

const TAGS: Record<string, string> = {
  IN: process.env.AMAZON_TAG_IN ?? 'yourtag-21',
  US: process.env.AMAZON_TAG_US ?? 'yourtag-20',
  UK: process.env.AMAZON_TAG_UK ?? 'yourtag-21'
};

export class AffiliateLinkService {
  static validateAmazonUrl(url: string, marketplace: keyof typeof ALLOWLIST) {
    try {
      const parsed = new URL(url);
      return ALLOWLIST[marketplace].includes(parsed.hostname);
    } catch {
      return false;
    }
  }

  static normalize(url: string) {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.searchParams.delete('tag');
    return parsed.toString();
  }

  static toAffiliateUrl(url: string, marketplace: keyof typeof ALLOWLIST) {
    if (!this.validateAmazonUrl(url, marketplace)) return null;
    const parsed = new URL(this.normalize(url));
    parsed.searchParams.set('tag', TAGS[marketplace]);
    return parsed.toString();
  }
}
