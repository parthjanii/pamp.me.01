export type Marketplace = 'IN' | 'US' | 'UK';
export type Priority = 'low' | 'medium' | 'high';

export interface WishlistItemDTO {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  marketplace: Marketplace;
  priceDisplay?: string;
  priority: Priority;
  affiliateUrl: string;
}

export interface PublicWishlistDTO {
  slug: string;
  title: string;
  owner: { displayName: string; username: string; bio?: string; avatarUrl?: string };
  items: WishlistItemDTO[];
}
