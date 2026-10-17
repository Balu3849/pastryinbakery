import React from 'react';
import { QrCode, MessageCircle, ArrowRight, Star, Sparkles, MapPin, Palette } from 'lucide-react';
import { BAKERY_PHONE_INTL, BAKERY_PHONE } from '../data/bakeryData';
import { useCustomizer } from '../utils/customizerContext';
import { InlineEditableText } from './InlineEditableText';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenQR: () => void;
  onViewLocation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenQR,
  onViewLocation,
}) => {
  const { content, openCustomizer } = useCustomizer();

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#EFE7D8]">
      {/* Subtle organic background warm glows */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#F3EBDD]/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#E8DEC8]/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-7 space-y-6 pt-2 sm:pt-4">
            
            {/* PASTRY INN Brand Signature & Tagline - moved downward */}
            <div className="pt-3 sm:pt-5 pb-1 space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-widest text-[#A6241D] uppercase drop-shadow-2xs">
                  <InlineEditableText contentKey="brandName" value={content.brandName} />
                </span>
                <span className="h-0.5 w-12 sm:w-20 bg-[#A6241D]/40 rounded-full" />
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#8C5E48]">
                <InlineEditableText contentKey="brandTagline" value={content.brandTagline} />
              </p>
            </div>

            {/* Dominant Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#29221F] font-bold leading-[1.12] tracking-tight">
              <InlineEditableText contentKey="heroHeadline" value={content.heroHeadline} multiline />
            </h1>

            {/* Refined Prose */}
            <div className="text-base sm:text-lg text-[#5A4E48] leading-relaxed max-w-2xl font-normal">
              <InlineEditableText contentKey="heroDescription" value={content.heroDescription} multiline />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C86D51] hover:bg-[#B3583C] text-white text-sm font-semibold rounded-xl shadow-sm transition-all transform active:scale-98 cursor-pointer"
              >
                <span>{content.ctaExploreText || 'Explore Daily Menu'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQR}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#F2E8DC] hover:bg-[#E8DEC8] text-[#29221F] border border-[#DDD0BC] text-sm font-semibold rounded-xl transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#C86D51]" />
                <span>{content.ctaQrText || 'Scan QR Table Menu'}</span>
              </button>

              <a
                href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent('Hello Pastry Inn! I would like to place an order or check today’s fresh pastries.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#1fb355] text-white text-sm font-semibold rounded-xl transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{content.ctaWhatsappText || `WhatsApp (${content.phone || BAKERY_PHONE})`}</span>
              </a>

              <button
                onClick={() => openCustomizer('colors')}
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-white hover:bg-[#F3EBDD] text-[#A6241D] border border-[#DDD0BC] text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
                title="Edit page colors, fonts and texts"
              >
                <Palette className="w-4 h-4" />
                <span>Customize Page</span>
              </button>
            </div>

            {/* Quiet Unboxed Metadata & Credibility Stats */}
            <div className="pt-6 border-t border-[#EFE7D8] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="flex items-center gap-1 text-base font-bold text-[#29221F]">
                  <Star className="w-4 h-4 fill-[#E5A853] text-[#E5A853]" />
                  <span>4.8 / 5.0</span>
                </div>
                <p className="text-xs text-[#786A63] mt-0.5">1,280+ Google Reviews</p>
              </div>

              <div>
                <div className="text-base font-bold text-[#29221F]">
                  100% Eggless
                </div>
                <p className="text-xs text-[#786A63] mt-0.5">Pure Veg Options</p>
              </div>

              <div>
                <div className="text-base font-bold text-[#29221F]">
                  Fresh Batches
                </div>
                <p className="text-xs text-[#786A63] mt-0.5">Baked Hourly on NH-16</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main High-Res Pastry Visual */}
              <div className="relative overflow-hidden rounded-2xl bg-[#E8DEC8] border border-[#DDD0BC] shadow-lg aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85"
                  alt="Pastry Inn Dutch Chocolate Truffle Pastry"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Visual Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#29221F]/85 via-transparent to-black/20" />

                {/* Floating Content within Hero Media */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-[#F3EBDD]">
                    <span className="flex items-center gap-1.5 text-[#E5A853]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Chef Signature Showpiece
                    </span>
                    <span className="font-semibold text-white bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-sm">
                      ₹130 / Slice
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold leading-tight">
                    Dutch Chocolate Truffle Pastry
                  </h3>

                  <p className="text-xs text-[#D8CCC1] line-clamp-2">
                    Belgian 54% dark ganache layered with silky cocoa chiffon, handcrafted daily at our flagship deck oven.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={onExploreMenu}
                      className="text-xs font-semibold text-[#F3EBDD] hover:text-[#E5A853] flex items-center gap-1 underline underline-offset-4 cursor-pointer"
                    >
                      View in Menu & Order
                    </button>
                    <button
                      onClick={onViewLocation}
                      className="text-xs text-[#E8ECE4] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-[#C86D51]" />
                      <span>NH-16, Annavaram</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Mini Card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3.5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#DDD0BC] shadow-md max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80"
                  alt="Fresh Butter Croissants"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-[#29221F]">
                    27-Layer Flaky Croissant
                  </div>
                  <div className="text-[11px] text-[#786A63]">
                    100% Pure Cultured Butter · ₹95
                  </div>
                  <div className="text-[10px] text-[#4EBA6F] font-medium mt-0.5">
                    Pulled from oven 18 mins ago
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
