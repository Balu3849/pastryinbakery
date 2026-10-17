import React, { useState, useMemo, lazy, Suspense } from 'react';
import { 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Sparkles, 
  Plus, 
  SlidersHorizontal,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { MenuItem, ProductCategory, CartItem } from '../types';
import { MENU_ITEMS, BAKERY_PHONE_INTL } from '../data/bakeryData';
import { useCustomizer } from '../utils/customizerContext';
import { InlineEditableText } from './InlineEditableText';

// Lazy-load image component using React.lazy & Suspense
const LazyImage = lazy(() => import('./LazyImage'));

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (cartItem: CartItem) => void;
  onSelectItem: (item: MenuItem) => void;
  onOpenQR: () => void;
  onOpenAdmin: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  onSelectItem,
  onOpenQR,
  onOpenAdmin,
}) => {
  const { content } = useCustomizer();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Delights', count: items.length },
    { id: 'pastries', label: 'Pastries & Slices', count: items.filter(m => m.category === 'pastries').length },
    { id: 'cakes', label: 'Celebration Cakes', count: items.filter(m => m.category === 'cakes').length },
    { id: 'viennoiserie', label: 'Viennoiserie & Breads', count: items.filter(m => m.category === 'viennoiserie').length },
    { id: 'savouries', label: 'Savouries & Puffs', count: items.filter(m => m.category === 'savouries').length },
    { id: 'cookies', label: 'Artisan Cookies', count: items.filter(m => m.category === 'cookies').length },
    { id: 'beverages', label: 'Cafe Beverages', count: items.filter(m => m.category === 'beverages').length },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Eggless filter
      if (egglessOnly && !item.isVeg) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredient = item.ingredients.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredient) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured (chef special & bestsellers first)
      const aScore = (a.isChefSpecial ? 2 : 0) + (a.isBestseller ? 1 : 0);
      const bScore = (b.isChefSpecial ? 2 : 0) + (b.isBestseller ? 1 : 0);
      return bScore - aScore;
    });
  }, [activeCategory, searchQuery, egglessOnly, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onAddToCart({
      item,
      quantity: 1,
      egglessChoice: item.isVeg,
    });
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleQuickWhatsApp = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    const message = `Hello Pastry Inn! I would like to order: "${item.name}" (₹${item.price}). Please confirm availability for pickup or delivery.`;
    const url = `https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE7D8] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E48]">
              <span>Handcrafted Daily</span>
              <span aria-hidden="true" className="text-[#C86D51]">·</span>
              <span>Deck Oven Quality</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29221F]">
              <InlineEditableText contentKey="menuSectionTitle" value={content.menuSectionTitle} />
            </h2>
            <div className="text-sm text-[#5A4E48] max-w-xl">
              <InlineEditableText contentKey="menuSectionSubtitle" value={content.menuSectionSubtitle} multiline />
            </div>
          </div>

          <div className="self-start md:self-end flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-[#F3EBDD] text-[#29221F] border border-[#DDD0BC] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Add products or change prices & images"
            >
              <Sparkles className="w-4 h-4 text-[#C86D51]" />
              <span>Admin: Manage Menu</span>
            </button>

            <button
              onClick={onOpenQR}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F1E8DC] hover:bg-[#E8DEC8] text-[#29221F] border border-[#DDD0BC] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C86D51]" />
              <span>Digital Table QR Code</span>
            </button>
          </div>
        </div>

        {/* Filter & Controls Toolbar */}
        <div className="space-y-4">
          
          {/* Category Tabs (Segmented controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#29221F] text-white shadow-xs font-semibold'
                    : 'bg-[#F3EBDD] text-[#4A3E39] hover:bg-[#EAE0D1] border border-[#E5DACF]'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search, Eggless Toggle & Sort Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8F817A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pastries, cakes, puffs, ingredients..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51] transition-colors"
              />
            </div>

            {/* Eggless Toggle */}
            <div className="sm:col-span-3 flex items-center">
              <button
                onClick={() => setEgglessOnly(!egglessOnly)}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  egglessOnly
                    ? 'bg-[#EBF5ED] border-[#34A853] text-[#227237]'
                    : 'bg-white border-[#DDD0BC] text-[#4A3E39] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                <span>100% Pure Veg Only</span>
                {egglessOnly && <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />}
              </button>
            </div>

            {/* Sort Select */}
            <div className="sm:col-span-3">
              <select
                aria-label="Sort Menu By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white border border-[#DDD0BC] rounded-xl text-xs text-[#29221F] focus:outline-hidden focus:border-[#C86D51] transition-colors cursor-pointer"
              >
                <option value="featured">Sort: Chef Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#DDD0BC] p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-[#29221F]">
              No baked items found matching your filters.
            </p>
            <p className="text-xs text-[#786A63]">
              Try adjusting your search query or resetting the vegetarian filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setEgglessOnly(false);
              }}
              className="mt-2 text-xs font-semibold text-[#C86D51] underline underline-offset-4 cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-white rounded-2xl border border-[#E5DACF] hover:border-[#C86D51]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Image & Overlay Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#E8DEC8]">
                  <Suspense
                    fallback={
                      <div className="w-full h-full bg-[#E8DEC8] animate-pulse flex flex-col items-center justify-center p-3">
                        <div className="w-7 h-7 rounded-full bg-[#DDD0BC] flex items-center justify-center mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#8C5E48]" />
                        </div>
                        <span className="text-[10px] text-[#786A63] font-medium tracking-wide">Baking preview...</span>
                      </div>
                    }
                  >
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      imgClassName="object-center group-hover:scale-104 transition-transform duration-500"
                    />
                  </Suspense>
                  
                  {/* Subtle Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Dietary Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs text-[11px] font-medium text-[#29221F]">
                    <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                    <span>Pure Veg</span>
                  </div>

                  {/* Price Tag (Clean, high-intent) */}
                  <div className="absolute bottom-3 right-3 bg-[#29221F]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
                    ₹{item.price}
                  </div>

                  {/* Quick Peek indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="bg-white/95 text-[#29221F] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#C86D51]" />
                      Quick Details
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed Metadata (Zero-pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#786A63]">
                      <span className="capitalize font-medium text-[#8C5E48]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-[#29221F] font-medium">
                        <Star className="w-3 h-3 fill-[#E5A853] text-[#E5A853]" />
                        {item.rating}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.portion}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-[#29221F] group-hover:text-[#C86D51] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#5A4E48] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA Row */}
                  <div className="pt-3 border-t border-[#EFE7D8] flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-[#C86D51]">
                        ₹{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs line-through text-[#8F817A]">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* WhatsApp Quick Order button */}
                      <button
                        onClick={(e) => handleQuickWhatsApp(e, item)}
                        title="Order this item on WhatsApp"
                        className="p-2 bg-[#F3EBDD] hover:bg-[#25D366] text-[#4A3E39] hover:text-white rounded-lg transition-colors cursor-pointer"
                        aria-label="Order on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      {/* Add to Bag Button */}
                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          addedItemIds[item.id]
                            ? 'bg-[#34A853] text-white'
                            : 'bg-[#C86D51] hover:bg-[#B3583C] text-white shadow-2xs'
                        }`}
                      >
                        {addedItemIds[item.id] ? (
                          <span>Added!</span>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
