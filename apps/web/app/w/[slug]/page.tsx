import Image from 'next/image';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { AffiliateLinkService, type SupportedMarketplace } from '@/lib/services/affiliate-link-service';
import { WishlistCard } from '@/components/wishlist-card';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Pamper Me | ${params.slug}`,
    description: 'Gift me through Amazon on my public pamper page.',
    openGraph: { title: `Pamper Me | ${params.slug}`, description: 'A warm, easy gifting experience through Amazon.' },
    twitter: { card: 'summary_large_image', title: `Pamper Me | ${params.slug}` }
  };
}

export default async function WishlistPage({ params }: { params: { slug: string } }) {
  const wishlist = await prisma.wishlist.findUnique({
    where: { slug: params.slug },
    include: { user: true, items: { where: { isActive: true } } }
  });

  if (!wishlist) return <main className="p-8">Not found</main>;

  const items = wishlist.items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? undefined,
    imageUrl: item.imageUrl ?? undefined,
    marketplace: item.marketplace as SupportedMarketplace,
    priceDisplay: item.priceDisplay ?? undefined,
    priority: item.priority as 'low' | 'medium' | 'high',
    affiliateUrl: AffiliateLinkService.toAffiliateUrl(item.amazonUrl, item.marketplace as SupportedMarketplace) ?? item.amazonUrl
  }));

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
        {wishlist.user.avatarUrl ? (
          <Image src={wishlist.user.avatarUrl} alt={`${wishlist.user.displayName} avatar`} width={72} height={72} className="mb-4 rounded-full" />
        ) : null}
        <h1 className="text-4xl font-bold">{wishlist.user.displayName}</h1>
        <p className="mt-2 text-stone-600">{wishlist.user.bio}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">How gifting works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Pick a gift from the list.</li>
          <li>Click <strong>Gift via Amazon</strong>.</li>
          <li>Checkout securely on Amazon.</li>
        </ol>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <WishlistCard key={item.id} item={item} slug={wishlist.slug} />
        ))}
      </section>

      <section className="mt-10 rounded-xl bg-white p-5">
        <h2 className="text-xl font-semibold">Social proof</h2>
        <p className="mt-2 text-stone-600">“A lovely way to send thoughtful gifts globally.”</p>
      </section>

      <section className="mt-8 rounded-xl bg-white p-5">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <details className="mt-3">
          <summary className="cursor-pointer">Where is payment completed?</summary>
          <p className="mt-2">Payment is completed securely on Amazon.</p>
        </details>
      </section>

      <footer className="mt-10 text-sm text-stone-600">
        Purchase is completed securely on Amazon. As an Amazon Associate, we may earn from qualifying purchases.
      </footer>
    </main>
  );
}
