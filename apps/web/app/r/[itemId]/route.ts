import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AffiliateLinkService, type SupportedMarketplace } from '@/lib/services/affiliate-link-service';
import { apiError } from '@/lib/validation/schemas';

export async function GET(req: Request, { params }: { params: { itemId: string } }) {
  const item = await prisma.wishlistItem.findUnique({ where: { id: params.itemId }, include: { wishlist: true } });
  if (!item) return NextResponse.json(apiError('Item not found', 'NOT_FOUND'), { status: 404 });

  const affiliateUrl = AffiliateLinkService.toAffiliateUrl(item.amazonUrl, item.marketplace as SupportedMarketplace);
  if (!affiliateUrl) return NextResponse.json(apiError('Unsafe redirect blocked', 'INVALID_URL'), { status: 400 });

  prisma.outboundClickEvent.create({
    data: {
      wishlistItemId: item.id,
      wishlistSlug: item.wishlist.slug,
      marketplace: item.marketplace,
      referrer: req.headers.get('referer') ?? undefined,
      userAgent: req.headers.get('user-agent') ?? undefined
    }
  }).catch(() => null);

  return NextResponse.redirect(affiliateUrl, { status: 302 });
}
