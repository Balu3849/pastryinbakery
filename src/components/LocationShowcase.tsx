import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Sparkles, 
  CheckCircle,
  MessageCircle,
  Building,
  Car
} from 'lucide-react';
import { BRANCHES, BAKERY_PHONE, BAKERY_PHONE_INTL, BAKERY_MAPS_LINK } from '../data/bakeryData';

export const LocationShowcase: React.FC = () => {
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES[0].id);

  const activeBranch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];

  return (
    <section id="location" className="py-16 sm:py-20 bg-[#F5EFEB] border-y border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E48]">
            <span>NH-16 Highway Hub</span>
            <span aria-hidden="true" className="text-[#C86D51]">·</span>
            <span>Kakinada & Annavaram</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29221F]">
            Find Pastry Inn
          </h2>
          <p className="text-sm text-[#5A4E48]">
            Whether you are on a highway journey across coastal Andhra or picking up a designer birthday cake, 
            our warm ovens are right by your route.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedBranchId === b.id
                  ? 'bg-[#29221F] text-white shadow-xs'
                  : 'bg-white text-[#4A3E39] hover:bg-[#FAF7F2] border border-[#DDD0BC]'
              }`}
            >
              {b.name} {b.isMain ? '★ Flagship' : ''}
            </button>
          ))}
        </div>

        {/* Location Spotlight Card */}
        <div className="bg-white rounded-2xl border border-[#DDD0BC] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Details Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center gap-2 text-xs text-[#C86D51] font-semibold">
                <Car className="w-4 h-4" />
                <span>Prime Highway Pitstop with Easy Car Parking</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#29221F]">
                  {activeBranch.name}
                </h3>
                <p className="text-xs text-[#786A63] mt-0.5">
                  Landmark: {activeBranch.landmark}
                </p>
              </div>

              {/* Address Box */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DACF] space-y-2.5 text-xs text-[#5A4E48]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#29221F] block mb-0.5">Physical Address:</span>
                    <span className="leading-relaxed">{activeBranch.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#EFE7D8]">
                  <Clock className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#29221F] block mb-0.5">Operating Hours:</span>
                    <span>{activeBranch.hours} (Live in Kitchen)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#EFE7D8]">
                  <Phone className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#29221F] block mb-0.5">Direct Helpline & Bulk Orders:</span>
                    <a 
                      href={`tel:${BAKERY_PHONE}`}
                      className="font-bold text-[#C86D51] hover:underline"
                    >
                      {BAKERY_PHONE} ({activeBranch.displayPhone})
                    </a>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#5A4E48]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Ample Parking Space</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Air-Conditioned Lounge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>100% Pure Veg Counter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Express Highway Takeaway</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#EFE7D8] flex flex-wrap items-center gap-3">
              <a
                href={activeBranch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#C86D51] hover:bg-[#B3583C] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions ({activeBranch.name})</span>
              </a>

              <a
                href={`tel:${BAKERY_PHONE}`}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white hover:bg-[#FAF7F2] border border-[#DDD0BC] text-[#29221F] text-xs font-semibold rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C86D51]" />
                <span>Call {BAKERY_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent(`Hi Pastry Inn (${activeBranch.name}), I am en route and would like to order ahead!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order Ahead</span>
              </a>
            </div>

          </div>

          {/* Right Visual & Map Column */}
          <div className="lg:col-span-6 relative bg-[#E8DEC8] flex flex-col min-h-[320px] lg:min-h-full">
            <div className="relative flex-1 min-h-[220px]">
              <img
                src={activeBranch.image}
                alt={activeBranch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#29221F]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
                <span className="bg-[#C86D51] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                  Google Maps Verified Outlet
                </span>
                <p className="font-serif text-lg font-bold">
                  {activeBranch.name}
                </p>
                <p className="text-[11px] text-[#D8CCC1]">
                  Official location: {activeBranch.address}
                </p>
              </div>
            </div>

            {/* Embedded Google Map helper banner */}
            <div className="bg-[#29221F] text-[#F3EBDD] p-3 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 truncate pr-2">
                <MapPin className="w-3.5 h-3.5 text-[#E5A853] shrink-0" />
                <span className="truncate">{activeBranch.address}</span>
              </span>
              <a
                href={activeBranch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5A853] hover:underline flex items-center gap-1 font-semibold shrink-0"
              >
                <span>Open Google Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
