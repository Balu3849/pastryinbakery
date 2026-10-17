import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Send, 
  CheckCircle, 
  Calendar, 
  Users, 
  Cake,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';
import { BAKERY_PHONE, BAKERY_PHONE_INTL, BAKERY_MAPS_LINK } from '../data/bakeryData';

export const ContactSection: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'cake' | 'bulk' | 'feedback'>('cake');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('25-50 guests');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Build WhatsApp message for instant dispatch
    let inquiryMsg = `*Special Inquiry - PASTRY INN*\n`;
    inquiryMsg += `*Type:* ${inquiryType === 'cake' ? 'Custom Celebration Cake' : inquiryType === 'bulk' ? 'Bulk Catering / Highway Party' : 'General Feedback'}\n`;
    inquiryMsg += `*Name:* ${name}\n*Phone:* ${phone}\n`;
    if (eventDate) inquiryMsg += `*Event Date:* ${eventDate}\n`;
    if (inquiryType !== 'feedback') inquiryMsg += `*Estimated Guests:* ${guestCount}\n`;
    inquiryMsg += `*Details:* ${message}\n`;

    const url = `https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent(inquiryMsg)}`;
    window.open(url, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEventDate('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#F5EFEB] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E48]">
            <span>Connect With Us</span>
            <span aria-hidden="true" className="text-[#C86D51]">·</span>
            <span>Custom Orders & Celebrations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29221F]">
            Order Custom Cakes & Event Catering
          </h2>
          <p className="text-sm text-[#5A4E48]">
            Planning a birthday, anniversary, or wedding reception? Let our master patissiers bake an unforgettable centerpiece.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Contact Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#DDD0BC] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#29221F]">
                Direct Bakery Helplines
              </h3>
              
              <div className="space-y-3 text-xs text-[#5A4E48]">
                <a
                  href={`tel:${BAKERY_PHONE}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EBDD] border border-[#E5DACF] transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#C86D51] text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C5E48] block">Primary Phone / Helpline</span>
                    <span className="text-sm font-bold text-[#29221F] group-hover:text-[#C86D51] transition-colors">
                      {BAKERY_PHONE} (+91 96663 51333)
                    </span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${BAKERY_PHONE_INTL}?text=${encodeURIComponent('Hi Pastry Inn! I would like to inquire about cake orders.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EBF5ED] border border-[#E5DACF] transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#25D366] text-white">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#34A853] block">Official WhatsApp Business</span>
                    <span className="text-sm font-bold text-[#29221F] group-hover:text-[#25D366] transition-colors">
                      Instant WhatsApp Chat & Orders
                    </span>
                  </div>
                </a>

                <a
                  href={BAKERY_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EBDD] border border-[#E5DACF] transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#29221F] text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C5E48] block">Highway Flagship Location</span>
                    <span className="text-xs font-semibold text-[#29221F] group-hover:text-[#C86D51] transition-colors">
                      NH-16, Opposite NVR Complex, Annavaram
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Operating Times Card */}
            <div className="bg-[#29221F] text-[#F3EBDD] p-6 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E5A853]">
                <Clock className="w-4 h-4" />
                <span>Oven Schedule & Pickup Times</span>
              </div>
              <div className="space-y-1.5 text-xs text-[#D8CCC1]">
                <div className="flex justify-between border-b border-[#3D332F] pb-1.5">
                  <span>Monday – Sunday:</span>
                  <span className="font-bold text-white">8:30 AM – 10:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-[#3D332F] pb-1.5">
                  <span>Morning Croissant Batch:</span>
                  <span className="text-white">Fresh at 9:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Same-Day Custom Cakes:</span>
                  <span className="text-white">Requires 2 Hours Advance Notice</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD0BC] shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#29221F] mb-1">
              Custom Order & Event Inquiry
            </h3>
            <p className="text-xs text-[#786A63] mb-6">
              Fill in your details below and we will automatically open WhatsApp or confirm your booking directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setInquiryType('cake')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    inquiryType === 'cake'
                      ? 'bg-[#C86D51] text-white border-[#C86D51]'
                      : 'bg-[#FAF7F2] text-[#4A3E39] border-[#DDD0BC]'
                  }`}
                >
                  🎂 Celebration Cake
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('bulk')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    inquiryType === 'bulk'
                      ? 'bg-[#C86D51] text-white border-[#C86D51]'
                      : 'bg-[#FAF7F2] text-[#4A3E39] border-[#DDD0BC]'
                  }`}
                >
                  🎉 Party / Bulk Box
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('feedback')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    inquiryType === 'feedback'
                      ? 'bg-[#C86D51] text-white border-[#C86D51]'
                      : 'bg-[#FAF7F2] text-[#4A3E39] border-[#DDD0BC]'
                  }`}
                >
                  💬 Catering Inquiry
                </button>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#29221F]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Balu"
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#29221F]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 09666351333"
                    className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
              </div>

              {/* Date & Guest Count (if cake or bulk) */}
              {inquiryType !== 'feedback' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#29221F]">Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#29221F]">Estimated Guest Count / Weight</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                    >
                      <option value="1 kg Cake (8-10 people)">1 kg Cake (8-10 people)</option>
                      <option value="2-3 kg Cake (15-25 people)">2-3 kg Cake (15-25 people)</option>
                      <option value="5+ kg Multi-Tier Wedding Cake">5+ kg Multi-Tier Wedding Cake</option>
                      <option value="Corporate Box (25-50 guests)">Party Snack Boxes (25-50 guests)</option>
                      <option value="Grand Celebration (100+ guests)">Grand Celebration (100+ guests)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#29221F]">Flavor, Theme or Special Requests</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Belgian chocolate truffle with gold leaf piping and red velvet layers for an anniversary on Sunday."
                  className="w-full text-xs px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>

              {isSubmitted ? (
                <div className="p-3 bg-[#EBF5ED] text-[#227237] rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Inquiry generated! Opening WhatsApp with Pastry Inn team...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#C86D51] hover:bg-[#B3583C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Pastry Inn via WhatsApp</span>
                </button>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
