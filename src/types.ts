export type CategoryId = 
  | 'roller-coasters'
  | 'theme-parks'
  | 'water-rides'
  | 'decorations'
  | 'starter-parks'
  | 'mega-parks'
  | 'custom-builds';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  image: string;
  itemCount: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  buildTitle?: string;
  buildImage?: string;
}

export interface ProductSpecs {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  plotSize: string; // e.g. "2x2 Plots (100x100m)", "1 Plot"
  buildTime: string; // e.g. "45 mins", "4 Hours"
  pieceCount: number;
  maxSpeed?: string; // e.g. "112 mph"
  inversions?: number;
  tp2StatBoost?: string; // e.g. "+$4,500/min Income"
  themeStyle: string; // e.g. "Cyberpunk", "Sci-Fi", "Fantasy", "Realism", "Spooky"
}

export interface Creator {
  name: string;
  avatar: string;
  badge: string;
  tp2Level: string;
  rating: number;
  salesCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: CategoryId;
  categoryName: string;
  priceUSD: number;
  priceRobux: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  creator: Creator;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  images: string[];
  specs: ProductSpecs;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Delivery' | 'Installation' | 'Roblox Requirements' | 'Refunds' | 'Support';
}

export interface FilterState {
  searchQuery: string;
  category: CategoryId | 'all';
  minPrice: number;
  maxPrice: number;
  rating: number;
  difficulty: string | 'all';
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
