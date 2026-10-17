import { OrderRecord, CartItem } from '../types';

export const LOYALTY_STORAGE_KEY = 'pastry_inn_order_history';

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  maxPoints: number;
  badgeColor: string;
  textColor: string;
  perks: string[];
  multiplier: number;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Bronze Connoisseur',
    minPoints: 0,
    maxPoints: 149,
    badgeColor: 'bg-[#B08968]/20 border-[#B08968]/40',
    textColor: 'text-[#8A5A36]',
    perks: ['1 point for every ₹10 spent', 'Digital table QR ordering', 'Secret weekend menu alerts'],
    multiplier: 1.0,
  },
  {
    name: 'Silver Pâtissier',
    minPoints: 150,
    maxPoints: 349,
    badgeColor: 'bg-[#94A3B8]/25 border-[#94A3B8]/50',
    textColor: 'text-[#475569]',
    perks: ['Free butter croissant on milestone', '1.25x points on weekend orders', 'Priority cake pre-orders'],
    multiplier: 1.25,
  },
  {
    name: 'Gold Gateau VIP',
    minPoints: 350,
    maxPoints: 749,
    badgeColor: 'bg-[#F59E0B]/20 border-[#F59E0B]/50',
    textColor: 'text-[#B45309]',
    perks: ['Complimentary birthday dessert slice', '1.5x points on all menu items', 'Free delivery on NH-16 corridor'],
    multiplier: 1.5,
  },
  {
    name: 'Platinum Royal Patron',
    minPoints: 750,
    maxPoints: Infinity,
    badgeColor: 'bg-[#A6241D]/15 border-[#A6241D]/40',
    textColor: 'text-[#A6241D]',
    perks: ['Complimentary chef tasting box', '2x points multiplier', 'Dedicated master baker hotline & custom cake designs'],
    multiplier: 2.0,
  },
];

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  code: string;
  description: string;
  category: 'discount' | 'free_item' | 'experience';
  badge: string;
}

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'reward-1',
    title: '₹50 Flat Discount',
    pointsCost: 100,
    code: 'PASTRY50',
    description: 'Valid on any order above ₹299 across all outlets.',
    category: 'discount',
    badge: 'Popular',
  },
  {
    id: 'reward-2',
    title: 'Free Artisan Butter Croissant',
    pointsCost: 180,
    code: 'FREECROISSANT',
    description: 'Freshly baked flaky 27-layer butter croissant with your order.',
    category: 'free_item',
    badge: 'Guest Favorite',
  },
  {
    id: 'reward-3',
    title: '15% Off Celebration Gateaux',
    pointsCost: 300,
    code: 'VIPGATEAU15',
    description: 'Applicable on any 1kg or half-kg handcrafted designer cake.',
    category: 'discount',
    badge: 'VIP Perk',
  },
  {
    id: 'reward-4',
    title: 'Chef Special Macaron Tasting Trio',
    pointsCost: 450,
    code: 'CHEFMACARONS',
    description: '3 imported Parisian macarons (Pistachio, Raspberry, Dark Ganache).',
    category: 'free_item',
    badge: 'Exclusive',
  },
];

// Initial realistic sample orders so customers can experience the loyalty dashboard right away
export function getSamplePastOrders(): OrderRecord[] {
  return [
    {
      orderId: 'PINN-7842',
      items: [
        {
          item: {
            id: 'pastry-1',
            name: 'Belgian Truffle Dark Gateau Slice',
            category: 'pastries',
            price: 185,
            rating: 4.9,
            reviewCount: 142,
            description: 'Intense 70% dark Callebaut chocolate mousse layered with chocolate sponge.',
            ingredients: ['Callebaut Dark Chocolate', 'Cocoa Butter', 'Fresh Cream'],
            isVeg: true,
            isChefSpecial: true,
            portion: '1 Slice (140g)',
            prepTime: 'Instant',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
          },
          quantity: 2,
        },
        {
          item: {
            id: 'bev-1',
            name: 'Signature Cappuccino',
            category: 'beverages',
            price: 135,
            rating: 4.8,
            reviewCount: 96,
            description: 'Double shot Araku Valley espresso with velvety micro-foam.',
            ingredients: ['Araku Coffee Beans', 'Steamed Milk'],
            isVeg: true,
            portion: '250 ml',
            prepTime: '5 mins',
            image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
          },
          quantity: 2,
        },
      ],
      subtotal: 640,
      discount: 0,
      tax: 32,
      deliveryFee: 0,
      total: 672,
      orderType: 'dinein',
      tableNumber: '4',
      customerName: 'Bala Venkatesh',
      customerPhone: '9391233769',
      paymentMethod: 'upi',
      paymentStatus: 'completed',
      transactionId: 'TXN_UPI_ANN9281',
      createdAt: 'Yesterday, 4:15 PM',
      status: 'ready',
      pointsEarned: 67,
    },
    {
      orderId: 'PINN-6219',
      items: [
        {
          item: {
            id: 'cake-1',
            name: 'Red Velvet Cream Cheese Gateau (Half Kg)',
            category: 'cakes',
            price: 649,
            originalPrice: 720,
            rating: 4.9,
            reviewCount: 215,
            description: 'Velvety crimson sponge layered with Philadelphia style cream cheese frosting.',
            ingredients: ['Philadelphia Style Cheese', 'Beetroot Extract', 'Cocoa'],
            isVeg: true,
            isBestseller: true,
            portion: '500g (Serves 4-6)',
            prepTime: 'Freshly Baked Today',
            image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop',
          },
          quantity: 1,
          customMessage: 'Happy Birthday Bala!',
          egglessChoice: true,
        },
        {
          item: {
            id: 'vien-1',
            name: 'French Butter Croissant',
            category: 'viennoiserie',
            price: 120,
            rating: 4.8,
            reviewCount: 168,
            description: '27 laminated micro-layers using pure French butter.',
            ingredients: ['Normandy Butter', 'T55 Flour'],
            isVeg: true,
            isChefSpecial: true,
            portion: '1 Piece (85g)',
            prepTime: 'Fresh from morning deck oven',
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
          },
          quantity: 2,
        },
      ],
      subtotal: 889,
      discount: 88,
      tax: 40,
      deliveryFee: 0,
      total: 841,
      orderType: 'pickup',
      customerName: 'Bala Venkatesh',
      customerPhone: '9391233769',
      paymentMethod: 'card',
      paymentStatus: 'completed',
      transactionId: 'TXN_CRD_88194',
      createdAt: '3 days ago, 11:30 AM',
      status: 'ready',
      pointsEarned: 84,
    },
  ];
}

// Read orders from localStorage
export function getSavedOrderHistory(): OrderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOYALTY_STORAGE_KEY);
    if (!raw) {
      // Seed initial sample orders so customer can experience the loyalty points immediately
      const samples = getSamplePastOrders();
      localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(samples));
      return samples;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error('Failed to parse order history', e);
  }
  return [];
}

// Append a newly placed order to localStorage
export function saveOrderToHistory(order: OrderRecord): OrderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getSavedOrderHistory();
    // Ensure points are calculated if missing
    const calculatedPoints = order.pointsEarned ?? Math.floor(order.total / 10);
    const enrichedOrder: OrderRecord = {
      ...order,
      pointsEarned: calculatedPoints,
    };
    const updated = [enrichedOrder, ...existing.filter(o => o.orderId !== order.orderId)];
    localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save order to history', e);
    return [];
  }
}

// Clear order history
export function clearOrderHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(LOYALTY_STORAGE_KEY);
  } catch {}
}

// Compute loyalty statistics
export function calculateLoyaltyStats(orders: OrderRecord[]) {
  const totalOrders = orders.length;
  const lifetimeSpent = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  
  // Total points earned
  const totalPointsEarned = orders.reduce((sum, ord) => {
    return sum + (ord.pointsEarned ?? Math.floor((ord.total || 0) / 10));
  }, 0);

  // Find current tier
  const currentTier = LOYALTY_TIERS.find(
    (t) => totalPointsEarned >= t.minPoints && totalPointsEarned <= t.maxPoints
  ) || LOYALTY_TIERS[0];

  // Find next tier
  const currentTierIndex = LOYALTY_TIERS.findIndex((t) => t.name === currentTier.name);
  const nextTier = currentTierIndex < LOYALTY_TIERS.length - 1 ? LOYALTY_TIERS[currentTierIndex + 1] : null;

  let pointsToNextTier = 0;
  let tierProgressPercent = 100;

  if (nextTier) {
    const range = nextTier.minPoints - currentTier.minPoints;
    const progress = totalPointsEarned - currentTier.minPoints;
    tierProgressPercent = Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
    pointsToNextTier = Math.max(0, nextTier.minPoints - totalPointsEarned);
  }

  return {
    totalOrders,
    lifetimeSpent,
    totalPointsEarned,
    currentTier,
    nextTier,
    pointsToNextTier,
    tierProgressPercent,
  };
}
