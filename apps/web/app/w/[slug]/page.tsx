import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { AffiliateLinkService } from '@/lib/services/affiliate-link-service';
import { WishlistCard } from '@/components/wishlist-card';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Pamper Me | ${params.slug}`,
    description: 'Gift me through Amazon on my public pamper page.',
    openGraph: { title: `Pamper Me | ${params.slug}` },
    twitter: { card: 'summary_large_image' }
  };
}

export default async function WishlistPage({ params }: { params: { slug: string } }) {
  const wishlist = await prisma.wishlist.findUnique({
    where: { slug: params.slug },
    include: { user: true, items: { where: { isActive: true } } }
  });
  if (!wishlist) return <main className="p-8">Not found</main>;

  const items = wishlist.items.map((item) => ({
    ...item,
    affiliateUrl: AffiliateLinkService.toAffiliateUrl(item.amazonUrl, item.marketplace as 'IN' | 'US' | 'UK') ?? item.amazonUrl
  }));

  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="mb-8">
        <h1 className="text-4xl font-bold">{wishlist.user.displayName}</h1>
        <p>{wishlist.user.bio}</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">How gifting works</h2>
        <ol><li>Pick an item.</li><li>Tap Gift via Amazon.</li><li>Complete checkout on Amazon.</li></ol>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {items.map((item) => <WishlistCard key={item.id} item={item as any} slug={wishlist.slug} />)}
      </section>
      <section className="mt-8"><h2>Testimonials</h2><p>“So easy to send thoughtful gifts!”</p></section>
      <section className="mt-8"><h2>FAQ</h2><p>Q: Where do I pay? A: On Amazon.</p></section>
      <footer className="mt-10 text-sm text-stone-600">Purchase is completed securely on Amazon. As an Amazon Associate, we may earn from qualifying purchases.</footer>
    </main>
  );
}
