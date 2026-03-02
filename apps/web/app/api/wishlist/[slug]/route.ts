import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AffiliateLinkService } from '@/lib/services/affiliate-link-service';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const wishlist = await prisma.wishlist.findUnique({ where: { slug: params.slug }, include: { user: true, items: { where: { isActive: true } } } });
  if (!wishlist || !wishlist.isPublic) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Wishlist not found' } }, { status: 404 });

  return NextResponse.json({
    slug: wishlist.slug,
    title: wishlist.title,
    owner: { displayName: wishlist.user.displayName, username: wishlist.user.username, bio: wishlist.user.bio, avatarUrl: wishlist.user.avatarUrl },
    items: wishlist.items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      marketplace: item.marketplace,
      priceDisplay: item.priceDisplay,
      priority: item.priority,
      affiliateUrl: AffiliateLinkService.toAffiliateUrl(item.amazonUrl, item.marketplace as 'IN'|'US'|'UK') ?? item.amazonUrl
    }))
  });
}
