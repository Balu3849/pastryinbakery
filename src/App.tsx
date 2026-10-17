import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  QrCode, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ArrowUp,
  Sparkles,
  CheckCircle,
  X
} from 'lucide-react';
import { MenuItem, CartItem, OrderRecord, GalleryItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { DigitalQRModal } from './components/DigitalQRModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPaymentModal } from './components/CheckoutPaymentModal';
import { LocationShowcase } from './components/LocationShowcase';
import { CustomerReviews } from './components/CustomerReviews';
import { AmbienceGallery } from './components/AmbienceGallery';
import { ContactSection } from './components/ContactSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AdminMenuModal } from './components/AdminMenuModal';
import { PastryInLoyaltySection } from './components/PastryInLoyaltySection';
import { Footer } from './components/Footer';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { ThemeCustomizerFloatingButton } from './components/ThemeCustomizerFloatingButton';
import { CustomizerProvider, useCustomizer } from './utils/customizerContext';
import { BAKERY_PHONE, BAKERY_PHONE_INTL, BAKERY_FEATURES, MENU_ITEMS, DEFAULT_GALLERY_PHOTOS } from './data/bakeryData';
import { getSavedOrderHistory, saveOrderToHistory, calculateLoyaltyStats } from './utils/loyaltyUtils';

function MainBakeryApp() {
  const { isCustomizerOpen, closeCustomizer, openCustomizer } = useCustomizer();
  // Dynamic menu items with localStorage persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const savedMenu = localStorage.getItem('pastry_inn_custom_menu');
      if (savedMenu) {
        const parsed = JSON.parse(savedMenu);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MENU_ITEMS;
  });

  // Dynamic gallery photos with localStorage persistence
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryItem[]>(() => {
    try {
      const savedGallery = localStorage.getItem('pastry_inn_gallery');
      if (savedGallery) {
        const parsed = JSON.parse(savedGallery);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_GALLERY_PHOTOS;
  });

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pastry_inn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Order history with localStorage persistence for Pastry In Loyalty tracking
  const [orderHistory, setOrderHistory] = useState<OrderRecord[]>(() => {
    return getSavedOrderHistory();
  });

  // Table selection from QR query or user selector
  const [currentTable, setCurrentTable] = useState<string>('');
  const [showTableBanner, setShowTableBanner] = useState(false);

  // Modal controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);

  // Active section tracking for navbar highlighting
  const [activeSection, setActiveSection] = useState('hero');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Auto-detect table param or admin param (?table=4 or ?admin=true)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        setCurrentTable(tableParam);
        setShowTableBanner(true);
      }
      if (params.get('admin') === 'true') {
        setIsAdminOpen(true);
      }
    }
  }, []);

  const handleUpdateMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    try {
      localStorage.setItem('pastry_inn_custom_menu', JSON.stringify(newItems));
    } catch {}
  };

  const handleUpdateGallery = (newPhotos: GalleryItem[]) => {
    setGalleryPhotos(newPhotos);
    try {
      localStorage.setItem('pastry_inn_gallery', JSON.stringify(newPhotos));
    } catch {}
  };

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pastry_inn_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(i => i.item.id === newItem.item.id && i.customMessage === newItem.customMessage);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) => 
      prev.map(i => i.item.id === itemId ? { ...i, quantity: newQty } : i)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter(i => i.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const loyaltyStats = calculateLoyaltyStats(orderHistory);

  const handleProceedToCheckout = (discount: number) => {
    setAppliedDiscount(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderRecord) => {
    // Persist to localStorage order history
    const updated = saveOrderToHistory(order);
    setOrderHistory(updated);
    // Clear cart on successful checkout
    setCartItems([]);
  };

  const handleReorder = (items: CartItem[]) => {
    items.forEach((ci) => handleAddToCart(ci));
    setIsCartOpen(true);
  };

  const handleRefreshOrders = () => {
    setOrderHistory(getSavedOrderHistory());
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29221F] flex flex-col font-sans selection:bg-[#E29D7D]/30 selection:text-[#5B2E1E]">
      
      {/* Table Greeting Banner (when scanned from table QR) */}
      {showTableBanner && currentTable && (
        <div className="bg-[#29221F] text-white px-4 py-2.5 text-xs font-medium border-b border-[#3D332F] flex items-center justify-between sticky top-0 z-50 animate-in slide-in-from-top">
          <div className="flex items-center gap-2 max-w-7xl mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span>
              Connected to <strong>Table #{currentTable}</strong> at Pastry Inn. 
              Orders placed will be served freshly baked to your table!
            </span>
          </div>
          <button
            onClick={() => setShowTableBanner(false)}
            className="text-[#D8CCC1] hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={totalCartCount}
        loyaltyPoints={loyaltyStats.totalPointsEarned}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => openCustomizer('colors')}
      />

      {/* Main Body */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => handleNavigate('menu')}
          onOpenQR={() => setIsQROpen(true)}
          onViewLocation={() => handleNavigate('location')}
        />

        {/* Bakery Value Pillars */}
        <section className="bg-white border-b border-[#E8DEC8] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BAKERY_FEATURES.map((feat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xs font-bold text-[#29221F] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-xs text-[#5A4E48] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Section with Search, Filters, and Price Tags */}
        <MenuSection
          items={menuItems}
          onAddToCart={handleAddToCart}
          onSelectItem={(item) => setSelectedItemForDetail(item)}
          onOpenQR={() => setIsQROpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Pastry In Loyalty Club & Order History (LocalStorage Tracking) */}
        <PastryInLoyaltySection
          orders={orderHistory}
          onReorder={handleReorder}
          onExploreMenu={() => handleNavigate('menu')}
          onRefreshOrders={handleRefreshOrders}
          onApplyCouponToCart={(code) => {
            setIsCartOpen(true);
          }}
        />

        {/* Bakery Ambience & Inside Tour */}
        <AmbienceGallery
          photos={galleryPhotos}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Location Showcase (NH-16 Annavaram Flagship & Maps) */}
        <LocationShowcase />

        {/* Customer Reviews & Ratings */}
        <CustomerReviews />

        {/* Catering & Custom Celebration Cakes */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenQR={() => setIsQROpen(true)}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Sticky Mobile Cart Bar */}
      {cartItems.length > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#DDD0BC] shadow-lg md:hidden animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="relative p-2 bg-[#FAF7F2] rounded-lg border border-[#DDD0BC]">
                <ShoppingBag className="w-5 h-5 text-[#C86D51]" />
                <span className="absolute -top-1 -right-1 bg-[#C86D51] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#29221F] block">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in Bag
                </span>
                <span className="text-sm font-bold text-[#C86D51]">
                  ₹{cartSubtotal}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 bg-[#C86D51] hover:bg-[#B3583C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              View Bag & Checkout
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action */}
      <WhatsAppFloat />

      {/* MODALS */}

      {/* Item Detail & Customization Modal */}
      <ItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Digital QR Table Menu Modal */}
      <DigitalQRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        currentTable={currentTable}
        onSelectTable={(tableNum) => setCurrentTable(tableNum)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        currentTable={currentTable}
        onViewLoyalty={() => handleNavigate('loyalty')}
      />

      {/* Multi-Rail Integrated Payment Gateway Modal */}
      <CheckoutPaymentModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={appliedDiscount}
        initialTable={currentTable}
        onOrderSuccess={handleOrderSuccess}
        onViewLoyalty={() => handleNavigate('loyalty')}
      />

      {/* Resume & LinkedIn Engineering Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

      {/* Admin Menu & Product Pricing Manager */}
      <AdminMenuModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onUpdateItems={handleUpdateMenuItems}
        galleryPhotos={galleryPhotos}
        onUpdateGallery={handleUpdateGallery}
      />

      {/* Live Colors, Fonts & Texts Customizer Studio Modal */}
      <ThemeCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={closeCustomizer}
      />

      {/* Quick-Access Floating Customizer Pill */}
      <ThemeCustomizerFloatingButton />

    </div>
  );
}

export default function App() {
  return (
    <CustomizerProvider>
      <MainBakeryApp />
    </CustomizerProvider>
  );
}
