import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AffiliateLinkService } from '@/lib/services/affiliate-link-service';

export async function GET(req: Request, { params }: { params: { itemId: string } }) {
  const item = await prisma.wishlistItem.findUnique({ where: { id: params.itemId }, include: { wishlist: true } });
  if (!item) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Item not found' } }, { status: 404 });

  const affiliateUrl = AffiliateLinkService.toAffiliateUrl(item.amazonUrl, item.marketplace as 'IN'|'US'|'UK');
  if (!affiliateUrl) return NextResponse.json({ error: { code: 'INVALID_URL', message: 'Unsafe redirect blocked' } }, { status: 400 });

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
