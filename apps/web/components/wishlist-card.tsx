'use client';

import Image from 'next/image';
import { trackOutboundClick } from '@pamperme/api-client';
import type { WishlistItemDTO } from '@pamperme/types';

export function WishlistCard({ item, slug }: { item: WishlistItemDTO; slug: string }) {
  const onGift = async () => {
    trackOutboundClick({ wishlistItemId: item.id, wishlistSlug: slug, marketplace: item.marketplace }).catch(() => null);
    window.location.href = `/r/${item.id}`;
  };

  return (
    <article className="rounded-xl border border-amber-100 bg-white p-4" aria-label={item.title}>
      {item.imageUrl ? <Image src={item.imageUrl} alt={item.title} width={640} height={360} className="mb-3 h-40 w-full rounded-lg object-cover" /> : null}
      <h3 className="font-semibold">{item.title}</h3>
      {item.description && <p className="mt-1 text-sm text-stone-600">{item.description}</p>}
      <div className="mt-2 flex items-center gap-2 text-sm">
        {item.priceDisplay ? <span>{item.priceDisplay}</span> : null}
        <span className="rounded-full bg-amber-100 px-2 py-0.5">{item.priority}</span>
      </div>
      <button className="mt-3 rounded bg-amber-600 px-3 py-2 text-white" onClick={onGift} aria-label="Gift via Amazon">
        Gift via Amazon
      </button>
    </article>
  );
}
