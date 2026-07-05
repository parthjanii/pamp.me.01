-- CreateEnum
CREATE TYPE "Marketplace" AS ENUM ('IN', 'US', 'UK');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "bio" TEXT,
  "avatarUrl" TEXT,
  "locale" TEXT NOT NULL DEFAULT 'en',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "isPublic" BOOLEAN NOT NULL DEFAULT true,
  "theme" TEXT NOT NULL DEFAULT 'warm',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
  "id" TEXT NOT NULL,
  "wishlistId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "imageUrl" TEXT,
  "amazonUrl" TEXT NOT NULL,
  "affiliateUrl" TEXT,
  "marketplace" "Marketplace" NOT NULL,
  "priceDisplay" TEXT,
  "priority" "Priority" NOT NULL DEFAULT 'medium',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutboundClickEvent" (
  "id" TEXT NOT NULL,
  "wishlistItemId" TEXT NOT NULL,
  "wishlistSlug" TEXT NOT NULL,
  "marketplace" "Marketplace" NOT NULL,
  "referrer" TEXT,
  "userAgent" TEXT,
  "countryCode" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OutboundClickEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "Wishlist_slug_key" ON "Wishlist"("slug");
CREATE INDEX "User_username_idx" ON "User"("username");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
CREATE INDEX "Wishlist_slug_idx" ON "Wishlist"("slug");
CREATE INDEX "Wishlist_createdAt_idx" ON "Wishlist"("createdAt");
CREATE INDEX "WishlistItem_wishlistId_isActive_idx" ON "WishlistItem"("wishlistId", "isActive");
CREATE INDEX "WishlistItem_createdAt_idx" ON "WishlistItem"("createdAt");
CREATE INDEX "OutboundClickEvent_createdAt_idx" ON "OutboundClickEvent"("createdAt");

ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OutboundClickEvent" ADD CONSTRAINT "OutboundClickEvent_wishlistItemId_fkey" FOREIGN KEY ("wishlistItemId") REFERENCES "WishlistItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
