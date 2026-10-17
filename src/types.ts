export type ProductCategory = 
  | 'all'
  | 'pastries'
  | 'cakes'
  | 'viennoiserie'
  | 'savouries'
  | 'cookies'
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: 'pastries' | 'cakes' | 'viennoiserie' | 'savouries' | 'cookies' | 'beverages';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  ingredients: string[];
  isVeg: boolean; // Eggless
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  calories?: string;
  portion: string;
  prepTime: string;
  image: string;
  allergens?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customMessage?: string;
  egglessChoice?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  branch: string;
  favoriteItem?: string;
  verified: boolean;
}

export interface BakeryBranch {
  id: string;
  name: string;
  area: string;
  address: string;
  landmark: string;
  phone: string;
  displayPhone: string;
  hours: string;
  mapsUrl: string;
  embedQuery: string;
  isMain: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'counter' | 'cakes' | 'ovens' | 'lounge';
  categoryLabel: string;
  image: string;
  caption: string;
}

export type OrderType = 'dinein' | 'pickup' | 'delivery';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface OrderRecord {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  orderType: OrderType;
  tableNumber?: string;
  pickupTime?: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  landmark?: string;
  specialInstructions?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'completed' | 'pay_at_counter';
  transactionId: string;
  createdAt: string;
  status: 'confirmed' | 'baking' | 'packaging' | 'ready';
  pointsEarned?: number;
}

export interface SiteTheme {
  primaryColor: string;
  primaryHoverColor: string;
  secondaryColor: string;
  secondaryLightColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  headingFont: string;
  bodyFont: string;
  headingScale: number; // 0.9, 1.0, 1.15
  borderRadius: string; // '8px' | '12px' | '16px' | '24px'
  navButtonBg?: string; // e.g. '#b8a3a3' or 'transparent'
  navButtonTextColor?: string;
}

export interface SiteContent {
  brandName: string;
  brandTagline: string;
  heroHeadline: string;
  heroDescription: string;
  topRibbonText: string;
  ctaExploreText: string;
  ctaQrText: string;
  ctaWhatsappText: string;
  phone: string;
  displayPhone: string;
  addressHeadline: string;
  menuSectionTitle: string;
  menuSectionSubtitle: string;
  loyaltyTitle: string;
}

