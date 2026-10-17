import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  QrCode, 
  Phone, 
  MapPin, 
  Clock, 
  Menu as MenuIcon, 
  X,
  MessageCircle,
  Sparkles,
  Star,
  Palette,
  Edit3
} from 'lucide-react';
import { BAKERY_PHONE, BAKERY_PHONE_INTL, BAKERY_MAPS_LINK } from '../data/bakeryData';
import { useCustomizer } from '../utils/customizerContext';
import { InlineEditableText } from './InlineEditableText';

interface HeaderProps {
  cartCount: number;
  loyaltyPoints?: number;
  onOpenCart: () => void;
  onOpenQR: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCustomizer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  loyaltyPoints = 0,
  onOpenCart,
  onOpenQR,
  activeSection,
  onNavigate,
  onOpenCustomizer,
}) => {
  const { theme, content, openCustomizer } = useCustomizer();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate live open status (8:30 AM to 10:30 PM IST)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      // IST is UTC+5:30
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const currentDecimal = hours + minutes / 60;
      // 8:30 AM = 8.5, 10:30 PM = 22.5
      setIsOpenNow(currentDecimal >= 8.5 && currentDecimal < 22.5);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Artisan Menu' },
    { id: 'loyalty', label: 'Pastry In Club' },
    { id: 'qr-menu', label: 'Table QR Code' },
    { id: 'ambience', label: 'Bakery & Ambience' },
    { id: 'location', label: 'NH-16 Location' },
    { id: 'reviews', label: 'Guest Reviews' },
    { id: 'contact', label: 'Contact & Bulk' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'qr-menu') {
      onOpenQR();
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Ambient Ribbon */}
      <div className="bg-[#1A100E] text-[#F3EBDD] text-xs py-2 px-4 border-b border-[#362520]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="font-semibold text-[#FDE68A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <InlineEditableText contentKey="topRibbonText" value={content.topRibbonText} />
            </span>
            <span className="text-[#6E5850]" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-[#E8ECE4]">
              <Clock className="w-3 h-3 text-[#A6241D]" />
              <span className={isOpenNow ? 'text-[#86EFAC] font-medium' : 'text-[#FCA5A5]'}>
                {isOpenNow ? 'Open Now (Closes 10:30 PM)' : 'Opens at 8:30 AM'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={`tel:${content.phone}`}
              className="flex items-center gap-1.5 text-[#F3EBDD] hover:text-[#FDE68A] transition-colors duration-150"
            >
              <Phone className="w-3 h-3 text-[#A6241D]" />
              <span className="font-semibold">{content.displayPhone || content.phone}</span>
            </a>
            <span className="text-[#6E5850]" aria-hidden="true">·</span>
            <a
              href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent('Hi Pastry Inn, I would like to inquire about fresh pastries and cake orders!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4EBA6F] hover:text-[#86EFAC] hover:underline font-semibold transition-colors duration-150"
            >
              <MessageCircle className="w-3 h-3" />
              <span>{content.ctaWhatsappText || 'WhatsApp Order'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DEC8]' 
            : 'bg-[#FAF7F2] border-b border-[#EFE7D8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[5.5rem] py-2.5 flex items-center justify-between">
          {/* Brand Logo & Editorial Typography - moved downward with breathing room */}
          <button 
            onClick={() => onNavigate('hero')}
            className="text-left group flex flex-col justify-center cursor-pointer focus:outline-hidden transition-transform duration-200 hover:scale-[1.01] pt-2 sm:pt-3 mt-1"
          >
            <div className="flex items-baseline">
              <span className="font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-[0.06em] font-extrabold text-[#1A100E] group-hover:text-[#A6241D] transition-colors drop-shadow-[0_1px_1px_rgba(0,0,0,0.04)]">
                <InlineEditableText contentKey="brandName" value={content.brandName} />
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A6241D] ml-1 mb-1 group-hover:scale-125 transition-transform" />
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#841812] font-semibold mt-0.5 sm:mt-1 group-hover:text-[#A6241D] transition-colors">
              <InlineEditableText contentKey="brandTagline" value={content.brandTagline} />
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    backgroundColor: theme.navButtonBg || undefined,
                    color: theme.navButtonTextColor || undefined,
                  }}
                  className={`header-nav-btn relative px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs active:scale-95 ${
                    isActive
                      ? 'font-bold ring-2 ring-[#A6241D]/40'
                      : 'hover:brightness-95'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Subtle animated underline indicator on active and hover */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-250 ease-out ${
                      isActive
                        ? 'bg-[#A6241D] opacity-100 scale-x-100'
                        : 'bg-[#A6241D] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Customize Colours & Fonts Button */}
            <button
              onClick={() => (onOpenCustomizer ? onOpenCustomizer() : openCustomizer('colors'))}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#A6241D] bg-[#A6241D]/10 hover:bg-[#A6241D] hover:text-white border border-[#A6241D]/30 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0"
              title="Customize colors, typography fonts, and on-page text"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Customize</span>
              <span className="text-[10px] bg-[#A6241D]/20 px-1 py-0.2 rounded-sm hidden sm:inline">UI Edit</span>
            </button>

            {/* Scan QR Menu Button */}
            <button
              onClick={onOpenQR}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#29221F] bg-[#F1E8DC] hover:bg-[#E8DEC8] hover:text-[#A6241D] hover:border-[#A6241D]/30 hover:-translate-y-0.5 border border-[#DDD0BC] rounded-lg transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:translate-y-0"
              title="Scan QR Code to open digital menu on mobile"
            >
              <QrCode className="w-3.5 h-3.5 text-[#A6241D]" />
              <span className="hidden md:inline">Table QR</span>
            </button>

            {/* Order on WhatsApp Direct Button */}
            <a
              href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent('Hello Pastry Inn, I would like to order fresh bakery items!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] hover:-translate-y-0.5 rounded-lg transition-all duration-200 shadow-2xs hover:shadow-xs active:translate-y-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Pastry In Club Points Badge */}
            <button
              onClick={() => onNavigate('loyalty')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#841812] bg-[#FDE68A]/75 hover:bg-[#FDE68A] hover:-translate-y-0.5 hover:shadow-xs border border-[#D97706]/40 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs active:translate-y-0"
              title="View your Pastry In Loyalty points & order history"
            >
              <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
              <span>{loyaltyPoints} pts</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#29221F] bg-[#FFFFFF] hover:bg-[#F3EBDD] hover:text-[#A6241D] hover:border-[#A6241D]/30 hover:-translate-y-0.5 border border-[#E5DACF] rounded-lg transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:translate-y-0 flex items-center justify-center"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#29221F] group-hover:text-[#A6241D]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#A6241D] text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#29221F] hover:bg-[#A6241D]/8 hover:text-[#A6241D] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DEC8] px-4 pt-3 pb-6 shadow-md transition-all">
            <div className="flex flex-col space-y-1 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-[#A6241D]/10 text-[#A6241D] font-bold pl-4'
                      : 'text-[#44342F] hover:bg-[#A6241D]/5 hover:text-[#A6241D] hover:pl-4'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8DEC8] space-y-2">
              {/* Mobile Customize Button */}
              <button
                onClick={() => {
                  if (onOpenCustomizer) onOpenCustomizer();
                  else openCustomizer('colors');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#A6241D] rounded-lg shadow-xs"
              >
                <Palette className="w-4 h-4" />
                <span>🎨 Customize Colours, Fonts & Texts</span>
              </button>

              <button
                onClick={() => {
                  onOpenQR();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#29221F] bg-[#F1E8DC] rounded-lg border border-[#DDD0BC]"
              >
                <QrCode className="w-4 h-4 text-[#C86D51]" />
                <span>Open Digital QR Menu (Table Ordering)</span>
              </button>

              <a
                href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent('Hello Pastry Inn, I would like to order fresh bakery items!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#25D366] rounded-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Direct WhatsApp Order (09666351333)</span>
              </a>

              <a
                href={BAKERY_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#29221F] bg-white border border-[#DDD0BC] rounded-lg"
              >
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                <span>View NH-16 Location on Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
