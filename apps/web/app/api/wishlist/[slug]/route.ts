import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AffiliateLinkService, type SupportedMarketplace } from '@/lib/services/affiliate-link-service';
import { apiError, slugSchema } from '@/lib/validation/schemas';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const parsedSlug = slugSchema.safeParse({ slug: params.slug });
  if (!parsedSlug.success) {
    return NextResponse.json(apiError('Invalid wishlist slug'), { status: 400 });
  }

  const wishlist = await prisma.wishlist.findUnique({
    where: { slug: parsedSlug.data.slug },
    include: { user: true, items: { where: { isActive: true } } }
  });

  if (!wishlist || !wishlist.isPublic) {
    return NextResponse.json(apiError('Wishlist not found', 'NOT_FOUND'), { status: 404 });
  }

  return NextResponse.json({
    slug: wishlist.slug,
    title: wishlist.title,
    owner: {
      displayName: wishlist.user.displayName,
      username: wishlist.user.username,
      bio: wishlist.user.bio,
      avatarUrl: wishlist.user.avatarUrl
    },
    items: wishlist.items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      marketplace: item.marketplace,
      priceDisplay: item.priceDisplay,
      priority: item.priority,
      affiliateUrl: AffiliateLinkService.toAffiliateUrl(item.amazonUrl, item.marketplace as SupportedMarketplace) ?? item.amazonUrl
    }))
  });
}
