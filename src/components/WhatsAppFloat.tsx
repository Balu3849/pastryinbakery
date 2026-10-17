import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Phone, MapPin, Sparkles } from 'lucide-react';
import { BAKERY_PHONE, BAKERY_PHONE_INTL, BAKERY_MAPS_LINK } from '../data/bakeryData';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    { label: 'Check Today’s Fresh Bakes', msg: 'Hi Pastry Inn! What fresh pastries and cakes are available right now?' },
    { label: 'Book a Custom Celebration Cake', msg: 'Hello! I would like to inquire about booking a custom celebration cake.' },
    { label: 'Highway Takeaway / Dine-In Order', msg: 'Hi! I am travelling on NH-16 and want to order for express pickup.' },
  ];

  const handleSend = (text: string) => {
    const url = `https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl border border-[#DDD0BC] shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-[#EFE7D8] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#29221F]">Pastry Inn Helpline</h4>
                <p className="text-[10px] text-[#34A853] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  Online · {BAKERY_PHONE}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#8F817A] hover:text-[#29221F] cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#5A4E48] leading-relaxed">
            Welcome to Pastry Inn! Tap below to start an instant WhatsApp conversation with our bakery team:
          </p>

          <div className="space-y-1.5">
            {quickMessages.map((q) => (
              <button
                key={q.label}
                onClick={() => handleSend(q.msg)}
                className="w-full text-left p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EBDD] text-xs font-medium text-[#29221F] border border-[#E5DACF] flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span className="text-[11px] truncate pr-2">{q.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C86D51] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EFE7D8] flex items-center justify-between text-[11px]">
            <a
              href={`tel:${BAKERY_PHONE}`}
              className="text-[#C86D51] hover:underline flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3 h-3" />
              <span>Direct Call</span>
            </a>
            <a
              href={BAKERY_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5A4E48] hover:text-[#29221F] flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-[#C86D51]" />
              <span>NH-16 Map</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Order on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C86D51] rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
};
