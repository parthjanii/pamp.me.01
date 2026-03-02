import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { username: 'parth' },
    update: {},
    create: {
      username: 'parth',
      displayName: 'Parth',
      bio: 'A cozy wishlist for thoughtful gifts'
    }
  });

  const wishlist = await prisma.wishlist.upsert({
    where: { slug: 'parth-pamper-list' },
    update: {},
    create: { userId: user.id, title: 'Pamper Me', slug: 'parth-pamper-list', isPublic: true }
  });

  await prisma.wishlistItem.createMany({
    data: [
      {
        wishlistId: wishlist.id,
        title: 'Aromatherapy Candle Set',
        amazonUrl: 'https://www.amazon.in/dp/B0TEST123',
        marketplace: 'IN',
        priority: 'high',
        priceDisplay: '₹1,299'
      }
    ],
    skipDuplicates: true
  });
}
main().finally(() => prisma.$disconnect());
