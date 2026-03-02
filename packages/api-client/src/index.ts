import type { PublicWishlistDTO } from '@pamperme/types';

export async function getWishlist(slug: string): Promise<PublicWishlistDTO> {
  const res = await fetch(`/api/wishlist/${slug}`);
  if (!res.ok) throw new Error('Failed to load wishlist');
  return res.json();
}

export async function trackOutboundClick(payload: Record<string, unknown>) {
  return fetch('/api/outbound-click', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
}
