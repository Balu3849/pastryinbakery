import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { BAKERY_PHONE_INTL } from '../data/bakeryData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!item) return null;

  const isCake = item.category === 'cakes';

  const handleAdd = () => {
    onAddToCart({
      item,
      quantity,
      customMessage: customMessage.trim() || undefined,
      egglessChoice: item.isVeg,
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppOrder = () => {
    let msg = `Hi Pastry Inn! I would like to order:\n• ${item.name} (Qty: ${quantity}) - ₹${item.price * quantity}`;
    if (customMessage.trim()) {
      msg += `\n• Cake Inscription: "${customMessage.trim()}"`;
    }
    msg += `\nPlease let me know availability and delivery/pickup time!`;
    const url = `https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl border border-[#DDD0BC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#29221F]/80 hover:bg-[#29221F] text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Media Section */}
          <div className="relative h-64 md:h-full min-h-[280px] bg-[#E8DEC8]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            
            {/* Dietary Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs text-xs font-semibold text-[#29221F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              <span>100% Pure Veg / Eggless</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E48] uppercase tracking-wider">
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#29221F]">
                  <Star className="w-3.5 h-3.5 fill-[#E5A853] text-[#E5A853]" />
                  {item.rating} ({item.reviewCount} reviews)
                </span>
              </div>

              {/* Title & Price */}
              <h3 className="font-serif text-2xl font-bold text-[#29221F] mt-1 leading-snug">
                {item.name}
              </h3>

              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-2xl font-bold text-[#C86D51]">
                  ₹{item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-sm line-through text-[#8F817A]">
                    ₹{item.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[#786A63] ml-1">
                  ({item.portion})
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5A4E48] mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Ingredients & Details */}
              <div className="mt-4 pt-4 border-t border-[#EFE7D8] space-y-2 text-xs text-[#5A4E48]">
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-[#29221F] shrink-0">Ingredients:</span>
                  <span>{item.ingredients.join(', ')}</span>
                </div>
                {item.allergens && (
                  <div className="flex items-start gap-1.5">
                    <span className="font-semibold text-[#29221F] shrink-0">Allergens:</span>
                    <span>{item.allergens.join(', ')}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-[#786A63]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C86D51]" />
                    {item.prepTime}
                  </span>
                  {item.calories && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.calories}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Custom Cake Inscription Box (if Cake or celebration pastry) */}
              {isCake && (
                <div className="mt-4 space-y-1.5">
                  <label htmlFor="cake-text" className="text-xs font-semibold text-[#29221F] flex items-center justify-between">
                    <span>Message to pipe on cake:</span>
                    <span className="text-[10px] text-[#8F817A]">Optional</span>
                  </label>
                  <input
                    id="cake-text"
                    type="text"
                    maxLength={35}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. Happy Birthday Rohit!"
                    className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-[#DDD0BC] text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-[#EFE7D8]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#29221F]">Quantity</span>
                <div className="flex items-center gap-3 bg-white px-2.5 py-1.5 rounded-lg border border-[#DDD0BC]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#5A4E48] hover:text-[#C86D51] cursor-pointer"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-[#29221F] min-w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#5A4E48] hover:text-[#C86D51] cursor-pointer"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  disabled={addedNotice}
                  className={`flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    addedNotice
                      ? 'bg-[#34A853] text-white'
                      : 'bg-[#C86D51] hover:bg-[#B3583C] text-white shadow-xs'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ₹{item.price * quantity}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
