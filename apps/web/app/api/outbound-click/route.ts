import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { allowRequest } from '@/lib/rate-limit/memory';
import { apiError, outboundClickSchema } from '@/lib/validation/schemas';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!allowRequest(ip)) return NextResponse.json(apiError('Rate limit exceeded', 'RATE_LIMITED'), { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = outboundClickSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError('Invalid payload'), { status: 400 });

  const payload = parsed.data;
  await prisma.outboundClickEvent.create({
    data: {
      wishlistItemId: payload.wishlistItemId,
      wishlistSlug: payload.wishlistSlug,
      marketplace: payload.marketplace,
      referrer: payload.metadata?.referrer,
      userAgent: payload.metadata?.userAgent,
      countryCode: payload.metadata?.countryCode
    }
  });

  return NextResponse.json({ ok: true });
}
