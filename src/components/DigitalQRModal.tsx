import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Smartphone, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  ExternalLink,
  Sparkles,
  Coffee,
  Download,
  Loader2
} from 'lucide-react';
import { generateQrSvgUrl, downloadTableQrCode, generateTableUrl } from '../utils/qrCodeGenerator';
import { BAKERY_PHONE } from '../data/bakeryData';

interface DigitalQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTable: (tableNum: string) => void;
  currentTable: string;
}

export const DigitalQRModal: React.FC<DigitalQRModalProps> = ({
  isOpen,
  onClose,
  onSelectTable,
  currentTable,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState(currentTable || '5');
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const menuWithTableUrl = `${currentUrl}?table=${selectedTable}&source=qr`;
  const qrImageUrl = generateQrSvgUrl(menuWithTableUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(menuWithTableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTableChange = (num: string) => {
    setSelectedTable(num);
    onSelectTable(num);
  };

  const handleDownloadQr = async (includeBranding = true) => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      await downloadTableQrCode(selectedTable, {
        brandTitle: 'PASTRY INN',
        includeBranding,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to download QR code', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl border border-[#DDD0BC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#29221F] text-[#F3EBDD] px-6 py-4 flex items-center justify-between border-b border-[#3D332F]">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#E5A853]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Digital QR Menu</h3>
              <p className="text-[11px] text-[#CBB9AC]">Scan & Order Directly at Table or Counter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8CCC1] hover:text-white rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Table Number Selector */}
          <div className="bg-[#F3EBDD] p-3.5 rounded-xl border border-[#E5DACF] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#29221F]">
              <span>Choose Table / Ordering Point</span>
              <span className="text-[#C86D51]">Active: Table #{selectedTable}</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '10', '12', 'Takeaway'].map((num) => (
                <button
                  key={num}
                  onClick={() => handleTableChange(num)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    selectedTable === num
                      ? 'bg-[#C86D51] text-white shadow-2xs font-semibold'
                      : 'bg-white text-[#4A3E39] hover:bg-[#FAF7F2] border border-[#DDD0BC]'
                  }`}
                >
                  {num === 'Takeaway' ? 'Highway Drive-By' : `Table ${num}`}
                </button>
              ))}
            </div>
          </div>

          {/* QR Code Display Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E5DACF] shadow-sm flex flex-col items-center text-center space-y-4">
            
            {/* Header in QR Tent Card */}
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C5E48]">
                PASTRY INN ARTISANAL BAKERY
              </span>
              <h4 className="font-serif text-xl font-bold text-[#29221F]">
                {selectedTable === 'Takeaway' ? 'Express Takeaway Menu' : `Table #${selectedTable} Digital Menu`}
              </h4>
            </div>

            {/* Crisp QR Code Frame */}
            <div className="relative p-3 bg-[#FAF7F2] rounded-xl border-2 border-dashed border-[#C86D51]/40 shadow-inner">
              <img
                src={qrImageUrl}
                alt={`QR code for Table ${selectedTable} menu`}
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="bg-white/95 rounded-md p-1 shadow-xs border border-[#DDD0BC]">
                  <Coffee className="w-5 h-5 text-[#C86D51]" />
                </div>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-1 text-xs text-[#5A4E48] max-w-xs">
              <p className="font-semibold text-[#29221F]">How to use:</p>
              <p>1. Open Phone Camera or Google Lens</p>
              <p>2. Scan the code to explore fresh menu & order</p>
              <p>3. Food is brought warm to Table #{selectedTable}</p>
            </div>
          </div>

          {/* Direct Link & Copy */}
          <div className="flex items-center gap-2 bg-[#F5EFEB] p-2.5 rounded-xl border border-[#E5DACF]">
            <input
              type="text"
              readOnly
              value={menuWithTableUrl}
              className="bg-transparent text-xs text-[#5A4E48] font-mono flex-1 outline-hidden select-all truncate"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#29221F] hover:bg-[#3D332F] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4EBA6F]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Download & Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* Primary Download Button */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDownloadQr(true)}
                disabled={isDownloading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#A6241D] hover:bg-[#841812] text-white text-xs font-semibold rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer disabled:opacity-60"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Generating High-Res QR...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#86EFAC]" />
                    <span>QR Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Table {selectedTable} QR (PNG)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadQr(false)}
                disabled={isDownloading}
                title="Download pure QR code without branding card"
                className="px-3.5 py-3 bg-[#F3EBDD] hover:bg-[#E8DEC8] border border-[#DDD0BC] text-[#29221F] text-xs font-medium rounded-xl transition-colors cursor-pointer"
              >
                Pure QR
              </button>
            </div>

            {/* Print and WhatsApp Row */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-[#F3EBDD] border border-[#DDD0BC] text-[#29221F] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#A6241D]" />
                <span>Print Table Card</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out the delicious Pastry Inn live menu: ${menuWithTableUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer note */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-t border-[#E8DEC8] flex items-center justify-between text-[11px] text-[#786A63]">
          <span>Assistance: Call {BAKERY_PHONE}</span>
          <span className="flex items-center gap-1 text-[#C86D51] font-medium">
            <Sparkles className="w-3 h-3" />
            Instant Kitchen Dispatch
          </span>
        </div>
      </div>
    </div>
  );
};
