'use client';

import { trackOutboundClick } from '@pamperme/api-client';
import type { WishlistItemDTO } from '@pamperme/types';

export function WishlistCard({ item, slug }: { item: WishlistItemDTO; slug: string }) {
  const onGift = async () => {
    trackOutboundClick({ wishlistItemId: item.id, wishlistSlug: slug, marketplace: item.marketplace }).catch(() => null);
    window.location.href = `/r/${item.id}`;
  };

  return (
    <article className="rounded-xl border p-4" aria-label={item.title}>
      <h3 className="font-semibold">{item.title}</h3>
      {item.description && <p>{item.description}</p>}
      <p className="text-sm">Priority: {item.priority}</p>
      <button className="mt-2 rounded bg-amber-600 px-3 py-2 text-white" onClick={onGift} aria-label="Gift via Amazon">Gift via Amazon</button>
    </article>
  );
}
