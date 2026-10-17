import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Smartphone,
  Share2,
  Phone,
  MessageCircle,
  UserCheck
} from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [copiedBullet, setCopiedBullet] = useState<number | null>(null);

  if (!isOpen) return null;

  const resumeBullets = [
    "Architected and deployed 'PASTRY INN', a full-featured artisanal bakery web platform using React 19, TypeScript, and Tailwind CSS v4, featuring a dynamic QR code table menu ordering system and real-time kitchen dispatch.",
    "Integrated a multi-rail payment gateway supporting UPI (dynamic QR scan & VPA validation), Credit/Debit cards with interactive Luhn visual verification, Net Banking, and Cash on Delivery with automated receipt generation.",
    "Implemented automated WhatsApp Business integration dispatching structured order summaries, customer delivery coordinates, and custom cake inscription requests to +91 96663 51333.",
    "Designed an earthy pastel editorial UI following strict anti-slop design principles (zero-pill typography, 60-30-10 color allocation, WCAG AA compliance, and mobile-first responsiveness).",
    "Engineered live operating hours calculation (IST timezone aware) and embedded Google Maps geolocation routing for the NH-16 highway flagship outlet."
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(idx);
    setTimeout(() => setCopiedBullet(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl border border-[#DDD0BC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#29221F] text-[#F3EBDD] px-6 py-4 flex items-center justify-between border-b border-[#3D332F]">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-[#E5A853]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Website by Agraharapu Bala venkatesh
              </h3>
              <p className="text-[11px] text-[#CBB9AC]">
                Developer Portfolio & Engineering Case Study · +91 9391233769
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8CCC1] hover:text-white rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Developer Contact Card */}
          <div className="bg-[#EBF5ED] p-4 rounded-xl border border-[#A3D9AE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#227237]">
                Lead Engineer & Frontend Architect
              </span>
              <h4 className="font-serif text-xl font-bold text-[#1E562D]">
                Agraharapu Bala Venkatesh
              </h4>
              <p className="text-xs text-[#2A753F]">
                Available for full-time roles, software engineering internships, and bespoke client projects.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:+919391233769"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#29221F] hover:bg-[#3D332F] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E5A853]" />
                <span>Call +91 9391233769</span>
              </a>

              <a
                href={`https://wa.me/919391233769?text=${encodeURIComponent('Hello Bala Venkatesh! I saw your Pastry Inn bakery web platform portfolio project and would like to connect.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Tech Stack Strip */}
          <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C5E48]">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'React 19 (SPA)',
                'TypeScript (Strict)',
                'Tailwind CSS v4',
                'Canvas Confetti',
                'Lucide React',
                'Dynamic SVG QR Engine',
                'WhatsApp Business API Format',
                'Google Maps Platform',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#FAF7F2] text-[#29221F] border border-[#E5DACF] rounded-md font-medium text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architectural Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#29221F]">
                <Smartphone className="w-4 h-4 text-[#C86D51]" />
                <span>1. Digital QR Code Table Ordering</span>
              </div>
              <p className="text-xs text-[#5A4E48] leading-relaxed">
                Generates vector-sharp QR codes with table parameters for 20+ dine-in tables or highway takeaway. Includes a ready-to-print Table Tent card mode.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#29221F]">
                <ShieldCheck className="w-4 h-4 text-[#4EBA6F]" />
                <span>2. Multi-Rail Integrated Payment Gateway</span>
              </div>
              <p className="text-xs text-[#5A4E48] leading-relaxed">
                Supports real-time UPI deep linking & dynamic QR scan, interactive Luhn card verification visual, Net Banking for major Indian banks, and Cash on Delivery.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#29221F]">
                <Share2 className="w-4 h-4 text-[#25D366]" />
                <span>3. Automated WhatsApp Order Dispatch</span>
              </div>
              <p className="text-xs text-[#5A4E48] leading-relaxed">
                Formats complex orders (items, custom cake text, delivery addresses, GST, order IDs) into human-readable WhatsApp messages sent directly to +91 96663 51333.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#29221F]">
                <Layers className="w-4 h-4 text-[#E5A853]" />
                <span>4. Anti-Slop Design Constitution</span>
              </div>
              <p className="text-xs text-[#5A4E48] leading-relaxed">
                Zero-pill metadata discipline, typographic contrast (Playfair Display + Plus Jakarta Sans), earthy pastel palette, and 100% responsive ergonomics.
              </p>
            </div>
          </div>

          {/* Copyable Resume / LinkedIn Bullets Section */}
          <div className="bg-[#F3EBDD] p-5 rounded-xl border border-[#E5DACF] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#29221F]">
                  Ready-to-Use Resume & LinkedIn Bullets
                </h4>
                <p className="text-[11px] text-[#786A63]">
                  Click copy on any bullet point to add to your CV or LinkedIn experience description.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {resumeBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-[#DDD0BC] flex items-start justify-between gap-3 text-xs text-[#3D332F]"
                >
                  <p className="leading-relaxed flex-1">
                    • {bullet}
                  </p>
                  <button
                    onClick={() => handleCopy(bullet, idx)}
                    className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EBDD] text-[#5A4E48] hover:text-[#C86D51] transition-colors shrink-0 cursor-pointer"
                    title="Copy bullet"
                  >
                    {copiedBullet === idx ? (
                      <Check className="w-4 h-4 text-[#34A853]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="text-xs text-[#786A63] space-y-1">
            <p>
              <strong>Live Client Brand:</strong> PASTRY INN (Flagship: NH-16, Opposite NVR Complex, Annavaram, Andhra Pradesh).
            </p>
            <p>
              <strong>Bakery Helpline:</strong> 09666351333 (+91 96663 51333) · Official Google Maps Listing.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-t border-[#E8DEC8] flex items-center justify-between">
          <span className="text-[11px] text-[#786A63]">
            website by Agraharapu Bala venkatesh · +91 9391233769
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#29221F] text-white text-xs font-semibold rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
