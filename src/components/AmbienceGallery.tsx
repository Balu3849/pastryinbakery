import React, { useState, lazy, Suspense } from 'react';
import { Sparkles, X, Maximize2, Camera, Edit3 } from 'lucide-react';
import { GalleryItem } from '../types';

// Lazy-load image component with Suspense support
const LazyImage = lazy(() => import('./LazyImage'));

interface AmbienceGalleryProps {
  photos: GalleryItem[];
  onOpenAdmin: () => void;
}

export const AmbienceGallery: React.FC<AmbienceGalleryProps> = ({ photos, onOpenAdmin }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'counter' | 'cakes' | 'ovens' | 'lounge'>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filtered = activeTab === 'all' 
    ? photos 
    : photos.filter(item => item.category === activeTab);

  return (
    <section id="ambience" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE7D8] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E48]">
              <span>Bakery Atmosphere</span>
              <span aria-hidden="true" className="text-[#C86D51]">·</span>
              <span>Visual Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29221F]">
              Inside Pastry Inn
            </h2>
            <p className="text-sm text-[#5A4E48] max-w-xl">
              Take a visual tour through our live kitchen, gleaming display counters, and comfortable dining lounges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#F3EBDD] text-[#29221F] border border-[#DDD0BC] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>Admin: Edit Photos</span>
            </button>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'counter', label: 'Counters' },
                { id: 'cakes', label: 'Cake Art' },
                { id: 'ovens', label: 'Baking' },
                { id: 'lounge', label: 'Cafe Lounge' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#C86D51] text-white shadow-2xs'
                      : 'bg-[#F3EBDD] text-[#4A3E39] hover:bg-[#EAE0D1] border border-[#E5DACF]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#E8DEC8] border border-[#DDD0BC] shadow-xs cursor-pointer aspect-4/3"
            >
              <Suspense
                fallback={
                  <div className="w-full h-full bg-[#E8DEC8] animate-pulse flex flex-col items-center justify-center p-4">
                    <div className="w-8 h-8 rounded-full bg-[#DDD0BC] flex items-center justify-center mb-2">
                      <Camera className="w-4 h-4 text-[#8C5E48]" />
                    </div>
                    <span className="text-[11px] text-[#786A63] font-medium tracking-wide">Loading photo...</span>
                  </div>
                }
              >
                <LazyImage
                  src={item.image}
                  alt={item.title}
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-[#29221F]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#E5A853]">
                  {item.categoryLabel}
                </span>
                <h4 className="font-serif text-base font-bold leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-[#D8CCC1] line-clamp-1 opacity-90">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-xs rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#DDD0BC] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 bg-black flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="w-full h-full bg-[#29221F] animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#C86D51] border-t-transparent animate-spin" />
                  </div>
                }
              >
                <LazyImage
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full"
                />
              </Suspense>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
                {activeModalItem.categoryLabel}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#29221F]">
                {activeModalItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4E48] leading-relaxed">
                {activeModalItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
