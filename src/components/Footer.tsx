import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  Code2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { BAKERY_PHONE, BAKERY_PHONE_INTL, BAKERY_MAPS_LINK, BAKERY_TUNI_MAPS_LINK, BRANCHES } from '../data/bakeryData';

interface FooterProps {
  onOpenQR: () => void;
  onOpenCaseStudy: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQR,
  onOpenCaseStudy,
  onNavigate,
}) => {
  return (
    <footer className="bg-[#241C1A] text-[#D8CCC1] pt-16 pb-12 border-t border-[#3D332F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Story & Values */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-wide text-white block">
                PASTRY INN
              </span>
              <span className="text-[11px] tracking-[0.16em] uppercase text-[#E5A853] font-medium">
                Est. 2017 · Annavaram (NH-16) & Tuni (GNT Road)
              </span>
            </div>

            <p className="text-xs text-[#B5A69B] leading-relaxed max-w-sm">
              Handcrafted celebration cakes, 27-layer butter viennoiserie, decadent chocolate gateaux, 
              and piping-hot savory puffs. Proudly serving the NH-16 corridor, Annavaram, and surrounding regions.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#A6978C]">
              <span className="flex items-center gap-1 bg-[#332825] px-2.5 py-1 rounded-md text-[#E8ECE4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                100% Pure Veg Options
              </span>
              <span className="flex items-center gap-1 bg-[#332825] px-2.5 py-1 rounded-md text-[#E8ECE4]">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A853]" />
                Deck Ovens
              </span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#E5A853] transition-colors cursor-pointer text-left"
                >
                  Artisan Menu & Slices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('loyalty')}
                  className="hover:text-[#E5A853] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#FDE68A]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Pastry In Club (Points & Orders)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQR}
                  className="hover:text-[#E5A853] transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Scan Table QR Menu</span>
                  <span className="text-[10px] text-[#E5A853] font-bold">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ambience')}
                  className="hover:text-[#E5A853] transition-colors cursor-pointer text-left"
                >
                  Bakery Counter Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#E5A853] transition-colors cursor-pointer text-left"
                >
                  Google Customer Reviews (4.8★)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E5A853] transition-colors cursor-pointer text-left"
                >
                  Custom Birthday & Wedding Cakes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Outlets & Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Branches & Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-white block">NH-16 Flagship (Annavaram)</span>
                <span className="text-[#A6978C]">Opposite NVR Complex, NH-16 Highway</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Tuni Town Branch</span>
                <span className="text-[#A6978C]">GNT Road, Opposite RTC Complex</span>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[#E5A853]">
                <Clock className="w-3.5 h-3.5" />
                <span>8:30 AM – 10:30 PM (Daily)</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Direct Actions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
              Connect & Order
            </h4>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${BAKERY_PHONE}`}
                className="flex items-center gap-2 text-white hover:text-[#E5A853] transition-colors font-bold"
              >
                <Phone className="w-4 h-4 text-[#C86D51]" />
                <span>{BAKERY_PHONE} (+91 96663 51333)</span>
              </a>

              <a
                href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent('Hello Pastry Inn! I would like to order fresh baked items.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#4EBA6F] hover:underline font-semibold"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Direct Chat</span>
              </a>

              <div className="pt-1 space-y-1.5">
                <a
                  href={BAKERY_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#D8CCC1] hover:text-[#E5A853] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                  <span className="truncate">Annavaram Map (NH-16)</span>
                  <ExternalLink className="w-3 h-3 text-[#A6978C] shrink-0" />
                </a>

                <a
                  href={BAKERY_TUNI_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#D8CCC1] hover:text-[#E5A853] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E5A853] shrink-0" />
                  <span className="truncate">Tuni Map (GNT Road)</span>
                  <ExternalLink className="w-3 h-3 text-[#A6978C] shrink-0" />
                </a>
              </div>
            </div>

            {/* Developer Credit & Portfolio Button */}
            <div className="pt-2">
              <button
                onClick={onOpenCaseStudy}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#332825] hover:bg-[#423430] text-[#E5A853] hover:text-white text-xs font-semibold rounded-xl border border-[#4D3C37] transition-all cursor-pointer text-center"
              >
                <Code2 className="w-4 h-4 text-[#E5A853] shrink-0" />
                <span>website by Agraharapu Bala venkatesh · +91 9391233769</span>
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Developer Credit */}
        <div className="pt-8 border-t border-[#3D332F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F817A]">
          <div>
            © {new Date().getFullYear()} PASTRY INN. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCaseStudy}
              className="text-[#E5A853] hover:underline font-medium cursor-pointer"
            >
              website by Agraharapu Bala venkatesh · +91 9391233769
            </button>
            <span aria-hidden="true">·</span>
            <span>FSSAI Certified Bakery</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#C86D51] fill-current" /> for foodies
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
