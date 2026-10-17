import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  RotateCcw, 
  Printer, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  Copy, 
  Search, 
  Gift, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Phone, 
  Trash2, 
  ExternalLink,
  MessageCircle,
  X,
  Star,
  CheckCircle2,
  Coffee,
  Heart
} from 'lucide-react';
import { OrderRecord, CartItem } from '../types';
import { 
  LOYALTY_TIERS, 
  LOYALTY_REWARDS, 
  calculateLoyaltyStats, 
  clearOrderHistory, 
  getSamplePastOrders 
} from '../utils/loyaltyUtils';
import { BAKERY_PHONE_INTL } from '../data/bakeryData';

interface PastryInLoyaltySectionProps {
  orders: OrderRecord[];
  onReorder: (items: CartItem[]) => void;
  onExploreMenu: () => void;
  onRefreshOrders: () => void;
  onApplyCouponToCart?: (couponCode: string) => void;
}

export const PastryInLoyaltySection: React.FC<PastryInLoyaltySectionProps> = ({
  orders,
  onReorder,
  onExploreMenu,
  onRefreshOrders,
  onApplyCouponToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderRecord | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [phoneFilter, setPhoneFilter] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'dinein' | 'pickup' | 'delivery'>('all');

  // Compute loyalty statistics
  const stats = useMemo(() => {
    return calculateLoyaltyStats(orders);
  }, [orders]);

  // Filter orders by search & type
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch = 
        ord.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerPhone.includes(searchQuery) ||
        ord.items.some(i => i.item.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = filterType === 'all' || ord.orderType === filterType;
      const matchesPhone = !phoneFilter || ord.customerPhone.includes(phoneFilter.trim());

      return matchesSearch && matchesType && matchesPhone;
    });
  }, [orders, searchQuery, filterType, phoneFilter]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onApplyCouponToCart) {
      onApplyCouponToCart(code);
    }
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local order history? Your points will reset to 0.')) {
      clearOrderHistory();
      onRefreshOrders();
    }
  };

  const handleLoadSampleOrders = () => {
    const samples = getSamplePastOrders();
    try {
      localStorage.setItem('pastry_inn_order_history', JSON.stringify(samples));
      onRefreshOrders();
    } catch {}
  };

  return (
    <section id="loyalty" className="py-20 bg-[#FAF6EF] border-t border-[#E8DEC8] relative overflow-hidden">
      {/* Background Subtle Flourish */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A6241D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#30683B]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A6241D]/10 text-[#A6241D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pastry In Loyalty Club</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A100E] tracking-tight">
            Earn Delicious Points on Every Order
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A4E48] leading-relaxed">
            Every bite counts! Earn <strong className="text-[#A6241D]">1 Point for every ₹10 spent</strong> on dine-in, takeaway, and delivery orders. 
            Track your order history, unlock artisan perks, and redeem sweet discounts.
          </p>
        </div>

        {/* Top Grid: Loyalty Digital Pass Card & Tier Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Col 1: VIP Digital Membership Pass (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 sm:p-7 text-white shadow-xl overflow-hidden bg-gradient-to-br from-[#841812] via-[#A6241D] to-[#55100B] border border-[#C23C35]">
              {/* Card Texture Overlays */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#D97706]/20 rounded-full blur-xl pointer-events-none" />
              
              {/* Card Header */}
              <div className="flex items-start justify-between relative z-10 mb-8">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#FDE68A] block">
                    PASTRY INN · PRIVILEGE PASS
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Pastry In Club
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                  <Star className="w-3.5 h-3.5 fill-[#FDE68A] text-[#FDE68A]" />
                  <span>{stats.currentTier.name}</span>
                </div>
              </div>

              {/* Points Big Display */}
              <div className="relative z-10 mb-6 bg-black/20 backdrop-blur-xs rounded-2xl p-4 border border-white/10">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#FDE68A] font-medium uppercase tracking-wider block">
                      Total Points Earned
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        {stats.totalPointsEarned}
                      </span>
                      <span className="text-sm font-semibold text-[#FDE68A]">PTS</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#F3EADA]/80 block">Points Value</span>
                    <span className="text-lg font-bold text-white">
                      ≈ ₹{Math.floor(stats.totalPointsEarned / 2)}
                    </span>
                  </div>
                </div>

                {/* Progress bar to next tier */}
                {stats.nextTier ? (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                    <div className="flex justify-between text-[11px] text-[#F3EADA]/90 font-medium">
                      <span>{stats.pointsToNextTier} pts to {stats.nextTier.name}</span>
                      <span>{stats.tierProgressPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FDE68A] to-[#D97706] rounded-full transition-all duration-500"
                        style={{ width: `${stats.tierProgressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#FDE68A] flex items-center gap-1.5 font-medium">
                    <Award className="w-4 h-4" />
                    <span>Highest Tier Achieved: Royal Patron VIP!</span>
                  </div>
                )}
              </div>

              {/* Card Footer: Patron details & Scan QR */}
              <div className="flex items-center justify-between text-xs text-[#F3EADA]/90 relative z-10 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#F3EADA]/70 block">
                    Cardholder
                  </span>
                  <span className="font-bold text-white tracking-wide text-sm">
                    {orders[0]?.customerName || 'Valued Bakery Patron'}
                  </span>
                  <span className="text-[11px] text-[#FDE68A] block font-mono">
                    ID: PINN-{(orders[0]?.customerPhone || 'NH16').slice(-4)}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20">
                  <QrCode className="w-6 h-6 text-[#FDE68A]" />
                  <div className="text-[10px] leading-tight">
                    <span className="font-bold block text-white">Scan at Counter</span>
                    <span className="text-[#F3EADA]/80">NH-16 Flagship</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Loyalty Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white rounded-2xl p-3.5 border border-[#E8DEC8] text-center shadow-2xs">
                <span className="text-[11px] text-[#73635B] font-medium block">Total Orders</span>
                <span className="font-serif text-xl font-bold text-[#1A100E] mt-0.5 block">
                  {stats.totalOrders}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-[#E8DEC8] text-center shadow-2xs">
                <span className="text-[11px] text-[#73635B] font-medium block">Lifetime Spent</span>
                <span className="font-serif text-xl font-bold text-[#A6241D] mt-0.5 block">
                  ₹{stats.lifetimeSpent}
                </span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-[#E8DEC8] text-center shadow-2xs">
                <span className="text-[11px] text-[#73635B] font-medium block">Rate Rule</span>
                <span className="text-xs font-bold text-[#30683B] mt-1 block">
                  ₹10 = 1 Pt
                </span>
              </div>
            </div>

          </div>

          {/* Col 2: Loyalty Tiers & Unlocked Member Perks (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tiers Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DEC8] shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F4EADA]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A100E]">
                    Membership Tiers & Perks
                  </h3>
                  <p className="text-xs text-[#5A4E48]">
                    Ascend through the ranks as you savor pastries and celebrate with custom cakes
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF4ED] text-[#30683B] border border-[#30683B]/20">
                  {stats.currentTier.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {LOYALTY_TIERS.map((tier) => {
                  const isCurrent = stats.currentTier.name === tier.name;
                  const isUnlocked = stats.totalPointsEarned >= tier.minPoints;

                  return (
                    <div 
                      key={tier.name}
                      className={`rounded-2xl p-4 border transition-all ${
                        isCurrent 
                          ? 'bg-[#A6241D]/5 border-[#A6241D] shadow-xs ring-1 ring-[#A6241D]' 
                          : isUnlocked
                            ? 'bg-[#FAF6EF] border-[#E8DEC8]'
                            : 'bg-white/60 border-gray-200 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${tier.textColor} flex items-center gap-1.5`}>
                          <Sparkles className="w-3.5 h-3.5" />
                          {tier.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#73635B]">
                          {tier.maxPoints === Infinity ? `${tier.minPoints}+ pts` : `${tier.minPoints}–${tier.maxPoints} pts`}
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#5A4E48]">
                        {tier.perks.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isUnlocked ? 'text-[#30683B]' : 'text-gray-400'}`} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      {isCurrent && (
                        <div className="mt-2.5 pt-2 border-t border-[#A6241D]/15 text-[11px] font-bold text-[#A6241D] flex items-center justify-between">
                          <span>Your Active Tier</span>
                          <span className="text-[10px] bg-[#A6241D] text-white px-2 py-0.5 rounded-full">Active</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Redeemable Perks Catalog */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DEC8] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A100E] flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#A6241D]" />
                    <span>Redeemable Rewards & Coupons</span>
                  </h3>
                  <p className="text-xs text-[#5A4E48]">
                    Use your earned points to unlock promo coupons for your next visit or online order
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LOYALTY_REWARDS.map((rew) => {
                  const canRedeem = stats.totalPointsEarned >= rew.pointsCost;

                  return (
                    <div 
                      key={rew.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        canRedeem 
                          ? 'bg-[#FAF6EF] border-[#E8DEC8] hover:border-[#A6241D]' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-[#1A100E]">{rew.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            canRedeem ? 'bg-[#30683B]/10 text-[#30683B]' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {rew.pointsCost} PTS
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5A4E48] leading-tight mb-2">
                          {rew.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E8DEC8]/60 flex items-center justify-between">
                        <div className="font-mono text-xs font-bold text-[#A6241D] bg-[#A6241D]/10 px-2 py-1 rounded-md">
                          {rew.code}
                        </div>
                        <button
                          onClick={() => handleCopyCode(rew.code)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                            copiedCode === rew.code
                              ? 'bg-[#30683B] text-white'
                              : 'bg-white hover:bg-[#F4EADA] text-[#1A100E] border border-[#DDD0BC]'
                          }`}
                        >
                          {copiedCode === rew.code ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Applied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{onApplyCouponToCart ? 'Apply to Bag' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Order History Tracker with LocalStorage */}
        <div className="bg-white rounded-3xl border border-[#E8DEC8] shadow-xs p-6 sm:p-8">
          
          {/* Order History Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F4EADA]">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#A6241D]" />
                <h3 className="font-serif text-2xl font-bold text-[#1A100E]">
                  Your Order History
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAF6EF] text-[#A6241D] border border-[#E8DEC8]">
                  {orders.length} {orders.length === 1 ? 'Record' : 'Records'} in LocalStorage
                </span>
              </div>
              <p className="text-xs text-[#5A4E48] mt-1">
                All dine-in, takeaway, and delivery orders are tracked locally on your device with complete points ledger.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {orders.length === 0 ? (
                <button
                  onClick={handleLoadSampleOrders}
                  className="px-3.5 py-2 text-xs font-bold text-[#A6241D] bg-[#A6241D]/10 hover:bg-[#A6241D]/20 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Sample Order History</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleClearHistory}
                    className="px-3 py-2 text-xs font-semibold text-[#841812] hover:bg-[#A6241D]/10 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Clear local order history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear History</span>
                  </button>

                  <button
                    onClick={onExploreMenu}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#A6241D] hover:bg-[#841812] rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Place New Order</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#F4EADA]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#73635B]" />
              <input
                type="text"
                placeholder="Search orders by ID, item, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAF6EF] border border-[#DDD0BC] rounded-xl text-xs text-[#1A100E] placeholder-[#8F817A] focus:outline-hidden focus:border-[#A6241D]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['all', 'dinein', 'pickup', 'delivery'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap cursor-pointer transition-colors ${
                    filterType === type
                      ? 'bg-[#1A100E] text-white'
                      : 'bg-[#FAF6EF] text-[#5A4E48] hover:bg-[#F4EADA]'
                  }`}
                >
                  {type === 'all' ? 'All Orders' : type === 'dinein' ? 'Dine-In' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Order Cards List */}
          <div className="mt-6 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF6EF] border border-[#E8DEC8] flex items-center justify-center text-[#73635B]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1A100E]">
                  {orders.length === 0 ? 'No orders recorded yet' : 'No matching orders found'}
                </h4>
                <p className="text-xs text-[#5A4E48] max-w-sm mx-auto">
                  {orders.length === 0 
                    ? 'Place an order from our artisan menu or load sample past orders to see your loyalty points in action.' 
                    : 'Try clearing your search query or switching filters.'}
                </p>
                {orders.length === 0 && (
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={onExploreMenu}
                      className="px-4 py-2 bg-[#A6241D] hover:bg-[#841812] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Browse Bakery Menu
                    </button>
                    <button
                      onClick={handleLoadSampleOrders}
                      className="px-4 py-2 bg-[#FAF6EF] hover:bg-[#F4EADA] text-[#1A100E] border border-[#DDD0BC] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Load Sample Orders
                    </button>
                  </div>
                )}
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isExpanded = expandedOrderId === order.orderId;
                const points = order.pointsEarned ?? Math.floor(order.total / 10);

                return (
                  <div
                    key={order.orderId}
                    className="border border-[#E8DEC8] rounded-2xl bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] transition-all overflow-hidden"
                  >
                    {/* Order Row Summary */}
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      {/* Left: ID, Type, Date */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#DDD0BC] flex items-center justify-center text-[#A6241D] shrink-0 font-serif font-bold text-sm shadow-2xs">
                          {order.orderType === 'dinein' ? '🍽️' : order.orderType === 'delivery' ? '🛵' : '🛍️'}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#1A100E]">
                              #{order.orderId}
                            </span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white text-[#30683B] border border-[#30683B]/20">
                              {order.orderType === 'dinein' 
                                ? `Table #${order.tableNumber || '4'}` 
                                : order.orderType === 'delivery' 
                                  ? 'Highway Delivery' 
                                  : 'Counter Pickup'}
                            </span>
                            <span className="text-[10px] font-semibold text-[#30683B] bg-[#EBF4ED] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {order.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 text-xs text-[#73635B]">
                            <span>{order.createdAt}</span>
                            <span>·</span>
                            <span>{order.items.reduce((s, i) => s + i.quantity, 0)} items</span>
                            <span>·</span>
                            <span className="capitalize">{order.paymentMethod.toUpperCase()} ({order.paymentStatus === 'completed' ? 'Paid' : 'Pay at counter'})</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Points Earned, Total, Actions */}
                      <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#E8DEC8]">
                        
                        {/* Points Earned Tag */}
                        <div className="flex flex-col items-end">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDE68A] text-[#841812] text-xs font-extrabold shadow-2xs">
                            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                            <span>+{points} PTS</span>
                          </span>
                          <span className="text-sm font-bold text-[#1A100E] mt-0.5">
                            ₹{order.total}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onReorder(order.items)}
                            className="px-3 py-1.5 bg-[#FAF6EF] hover:bg-white text-[#1A100E] border border-[#DDD0BC] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Add items to cart"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-[#A6241D]" />
                            <span className="hidden sm:inline">Reorder</span>
                          </button>

                          <button
                            onClick={() => setSelectedReceiptOrder(order)}
                            className="p-1.5 bg-white hover:bg-[#F4EADA] text-[#5A4E48] border border-[#DDD0BC] rounded-lg transition-colors cursor-pointer"
                            title="View & Print Receipt"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.orderId)}
                            className="p-1.5 text-[#5A4E48] hover:text-[#1A100E] cursor-pointer"
                            aria-label="Toggle details"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </div>

                      </div>

                    </div>

                    {/* Expandable Order Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-3 border-t border-[#E8DEC8] bg-white space-y-3">
                        <span className="text-xs font-bold text-[#1A100E] uppercase tracking-wider block">
                          Ordered Pastries & Cafe Treats
                        </span>
                        
                        <div className="divide-y divide-[#F4EADA]">
                          {order.items.map((cartIt, idx) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={cartIt.item.image}
                                  alt={cartIt.item.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-[#E8DEC8]"
                                />
                                <div>
                                  <span className="font-semibold text-[#1A100E] block">
                                    {cartIt.quantity}x {cartIt.item.name}
                                  </span>
                                  {cartIt.customMessage && (
                                    <span className="text-[11px] text-[#A6241D] italic block">
                                      Inscription: "{cartIt.customMessage}"
                                    </span>
                                  )}
                                  <span className="text-[11px] text-[#73635B]">
                                    {cartIt.item.portion} · ₹{cartIt.item.price} each
                                  </span>
                                </div>
                              </div>
                              <span className="font-bold text-[#1A100E]">
                                ₹{cartIt.item.price * cartIt.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Customer & Bill details */}
                        <div className="pt-3 border-t border-[#F4EADA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A4E48]">
                          <div>
                            <span className="font-medium text-[#1A100E]">Guest:</span> {order.customerName} ({order.customerPhone})
                            {order.customerAddress && (
                              <span className="block text-[11px] text-[#73635B]">Address: {order.customerAddress}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <a
                              href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent(
                                `Hello Pastry Inn, regarding my order #${order.orderId} (₹${order.total}): Can you provide an update?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#30683B] hover:underline font-semibold flex items-center gap-1 text-xs"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              <span>WhatsApp Support</span>
                            </a>
                            <span className="text-gray-300">|</span>
                            <span className="font-mono text-[11px] text-[#73635B]">Txn: {order.transactionId}</span>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

      {/* Printable Receipt Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#DDD0BC] relative">
            <button
              onClick={() => setSelectedReceiptOrder(null)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Content */}
            <div className="text-center pb-4 border-b border-dashed border-gray-300">
              <span className="font-serif text-2xl font-bold text-[#1A100E] block">PASTRY INN</span>
              <span className="text-[11px] tracking-widest uppercase text-[#73635B] font-medium block">
                Artisanal Bakery & Cafe · Est. 2017
              </span>
              <span className="text-[10px] text-gray-500 block mt-0.5">
                NH-16 Flagship (Opp NVR Complex, Annavaram) & Tuni
              </span>
              <span className="text-[10px] text-gray-500 block">Phone: 09666351333 · GSTIN: 37AAECP1234F1Z8</span>
            </div>

            <div className="py-4 border-b border-dashed border-gray-300 text-xs space-y-1">
              <div className="flex justify-between font-mono">
                <span className="text-gray-500">Receipt No:</span>
                <span className="font-bold text-gray-900">#{selectedReceiptOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Time:</span>
                <span className="text-gray-900">{selectedReceiptOrder.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Order Channel:</span>
                <span className="font-semibold capitalize text-gray-900">
                  {selectedReceiptOrder.orderType === 'dinein' 
                    ? `Dine-In (Table #${selectedReceiptOrder.tableNumber})` 
                    : selectedReceiptOrder.orderType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="text-gray-900">{selectedReceiptOrder.customerName} ({selectedReceiptOrder.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span className="font-semibold uppercase text-gray-900">{selectedReceiptOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Items */}
            <div className="py-4 border-b border-dashed border-gray-300 text-xs space-y-2">
              <div className="flex justify-between font-bold text-gray-700 pb-1 border-b border-gray-100">
                <span>Item</span>
                <span>Qty x Rate</span>
                <span>Amount</span>
              </div>
              {selectedReceiptOrder.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-gray-800">
                  <span className="truncate max-w-[170px]">{i.item.name}</span>
                  <span className="text-gray-500">{i.quantity} x ₹{i.item.price}</span>
                  <span className="font-medium">₹{i.item.price * i.quantity}</span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="py-3 border-b border-dashed border-gray-300 text-xs space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{selectedReceiptOrder.subtotal}</span>
              </div>
              {selectedReceiptOrder.discount > 0 && (
                <div className="flex justify-between text-[#30683B] font-medium">
                  <span>Loyalty Discount:</span>
                  <span>-₹{selectedReceiptOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Bakery GST (5%):</span>
                <span>₹{selectedReceiptOrder.tax}</span>
              </div>
              {selectedReceiptOrder.deliveryFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Corridor Delivery:</span>
                  <span>₹{selectedReceiptOrder.deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-gray-200">
                <span>Grand Total:</span>
                <span>₹{selectedReceiptOrder.total}</span>
              </div>
            </div>

            {/* Points earned on this receipt */}
            <div className="my-3 p-3 rounded-xl bg-[#FDE68A]/40 border border-[#D97706]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#841812] font-bold">
                <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                <span>Points Earned on this Bill</span>
              </div>
              <span className="font-extrabold text-[#841812] text-sm">
                +{selectedReceiptOrder.pointsEarned ?? Math.floor(selectedReceiptOrder.total / 10)} PTS
              </span>
            </div>

            <div className="text-center pt-2 space-y-3">
              <p className="text-[11px] text-gray-500">
                Thank you for visiting Pastry Inn! Keep this invoice for loyalty credit & guarantees.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-[#1A100E] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedReceiptOrder(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
