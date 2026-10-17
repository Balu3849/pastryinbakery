import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  MessageCircle,
  Sparkles,
  Star
} from 'lucide-react';
import { CartItem } from '../types';
import { BAKERY_PHONE_INTL } from '../data/bakeryData';
import { formatWhatsAppMessage } from '../utils/qrCodeGenerator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
  currentTable: string;
  onViewLoyalty?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  currentTable,
  onViewLoyalty,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [couponSuccessMsg, setCouponSuccessMsg] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const discountAmount = flatDiscount > 0 ? flatDiscount : Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 40;
  const gst = Math.round((Math.max(0, subtotal - discountAmount)) * 0.05); // 5% GST for bakery/restaurant
  const grandTotal = Math.max(0, subtotal - discountAmount + gst + (currentTable ? 0 : deliveryFee));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'PASTRYINN10' || code === 'FIRSTBITE' || code === 'SWEET10') {
      setDiscountPercent(10);
      setFlatDiscount(0);
      setCouponApplied(true);
      setCouponSuccessMsg('10% discount applied successfully!');
      setCouponError('');
    } else if (code === 'CHEF20') {
      setDiscountPercent(20);
      setFlatDiscount(0);
      setCouponApplied(true);
      setCouponSuccessMsg('20% Chef discount applied!');
      setCouponError('');
    } else if (code === 'PASTRY50') {
      setFlatDiscount(50);
      setDiscountPercent(0);
      setCouponApplied(true);
      setCouponSuccessMsg('₹50 Pastry In Club voucher applied!');
      setCouponError('');
    } else if (code === 'VIPGATEAU15') {
      setDiscountPercent(15);
      setFlatDiscount(0);
      setCouponApplied(true);
      setCouponSuccessMsg('15% VIP Gateau loyalty perk applied!');
      setCouponError('');
    } else if (code === 'FREECROISSANT') {
      setFlatDiscount(120);
      setDiscountPercent(0);
      setCouponApplied(true);
      setCouponSuccessMsg('₹120 Free Croissant reward applied!');
      setCouponError('');
    } else if (code === 'CHEFMACARONS') {
      setFlatDiscount(150);
      setDiscountPercent(0);
      setCouponApplied(true);
      setCouponSuccessMsg('₹150 Macaron Tasting reward applied!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "PASTRYINN10" or redeem in Pastry In Club.');
    }
  };

  const handleWhatsAppCheckout = () => {
    const formatted = formatWhatsAppMessage({
      items: items.map(i => ({
        name: i.item.name,
        quantity: i.quantity,
        price: i.item.price,
        customMessage: i.customMessage,
      })),
      total: grandTotal,
      customerName: 'Valued Guest',
      customerPhone: '',
      orderType: currentTable ? `Dine-In Table #${currentTable}` : 'Takeaway / Pickup',
      tableNumber: currentTable || undefined,
    });
    const url = `https://wa.me/${BAKERY_PHONE_INTL}?text=${formatted}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD0BC] animate-in slide-in-from-right duration-300"
        role="dialog"
      >
        {/* Drawer Header */}
        <div className="bg-[#29221F] text-[#F3EBDD] p-5 flex items-center justify-between border-b border-[#3D332F]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E5A853]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Your Bakery Bag</h3>
              <p className="text-[11px] text-[#CBB9AC]">
                {items.length} {items.length === 1 ? 'item' : 'items'} 
                {currentTable ? ` · Table #${currentTable}` : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8CCC1] hover:text-white rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3EBDD] flex items-center justify-center text-[#8C5E48]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold text-[#29221F]">
                  Your bag is empty
                </p>
                <p className="text-xs text-[#786A63] max-w-xs">
                  Treat yourself to our warm Dutch truffle pastries, butter croissants, or fresh savouries!
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#C86D51] text-white text-xs font-semibold rounded-xl hover:bg-[#B3583C] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="bg-white p-3.5 rounded-xl border border-[#E5DACF] shadow-2xs flex gap-3 items-center justify-between"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#F3EBDD] shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-[#29221F] truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="text-[11px] text-[#786A63]">
                        ₹{cartItem.item.price} each
                      </p>
                      {cartItem.customMessage && (
                        <p className="text-[10px] text-[#C86D51] truncate mt-0.5">
                          "{cartItem.customMessage}"
                        </p>
                      )}

                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#DDD0BC] text-[#29221F] flex items-center justify-center hover:bg-[#EAE0D1] cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#29221F] min-w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#DDD0BC] text-[#29221F] flex items-center justify-center hover:bg-[#EAE0D1] cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end justify-between self-stretch">
                      <button
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="text-[#A89A92] hover:text-[#C86D51] p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#29221F]">
                        ₹{cartItem.item.price * cartItem.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="bg-[#F3EBDD] p-3 rounded-xl border border-[#E5DACF] space-y-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8F817A]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. PASTRYINN10)"
                      className="w-full pl-8 pr-2 py-1.5 bg-white text-xs text-[#29221F] uppercase tracking-wider rounded-lg border border-[#DDD0BC] focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#29221F] text-white text-xs font-semibold rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponApplied && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#227237] font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>{couponSuccessMsg || 'Discount applied successfully!'}</span>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#C86D51] font-medium">{couponError}</p>
                )}
              </div>

              {/* Free Delivery progress */}
              <div className="bg-white p-3 rounded-xl border border-[#E5DACF] text-xs text-[#5A4E48]">
                {subtotal >= 499 ? (
                  <p className="text-[#227237] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    You unlocked FREE delivery on this order!
                  </p>
                ) : (
                  <p>
                    Add <span className="font-bold text-[#C86D51]">₹{499 - subtotal}</span> more for FREE delivery in town!
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Totals and Checkout CTA */}
        {items.length > 0 && (
          <div className="bg-white p-5 border-t border-[#E8DEC8] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5A4E48]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#29221F]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#227237]">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5% Food & Beverage)</span>
                <span className="font-medium text-[#29221F]">₹{gst}</span>
              </div>
              {!currentTable && (
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-[#29221F]">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-[#EFE7D8] flex justify-between text-sm font-bold text-[#29221F]">
                <span>Grand Total</span>
                <span className="text-[#C86D51] text-base">₹{grandTotal}</span>
              </div>
            </div>

            {/* Loyalty points earned reminder */}
            <div className="bg-[#FAF6EF] p-2.5 rounded-xl border border-[#E8DEC8] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#841812] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                <span>Earn ~{Math.floor(grandTotal / 10)} Pastry In Points</span>
              </div>
              {onViewLoyalty && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewLoyalty();
                  }}
                  className="text-[11px] text-[#A6241D] hover:underline font-bold cursor-pointer"
                >
                  View Club
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={() => onProceedToCheckout(discountAmount)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#C86D51] hover:bg-[#B3583C] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Proceed to Payment Gateway</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant Order on WhatsApp</span>
              </button>
            </div>

            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-[#8F817A] hover:text-[#C86D51] pt-1 cursor-pointer"
            >
              Clear shopping bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
