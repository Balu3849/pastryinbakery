import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Printer, 
  MessageCircle, 
  QrCode, 
  MapPin, 
  User, 
  Phone as PhoneIcon, 
  FileText,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CartItem, OrderType, PaymentMethod, OrderRecord } from '../types';
import { BAKERY_PHONE, BAKERY_PHONE_INTL, BRANCHES } from '../data/bakeryData';
import { generateQrSvgUrl, formatWhatsAppMessage } from '../utils/qrCodeGenerator';

interface CheckoutPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  initialTable?: string;
  onOrderSuccess: (order: OrderRecord) => void;
  onViewLoyalty?: () => void;
}

export const CheckoutPaymentModal: React.FC<CheckoutPaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  initialTable,
  onOrderSuccess,
  onViewLoyalty,
}) => {
  // Step state: 'details' -> 'payment' -> 'processing' -> 'success'
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');

  // Order Details
  const [orderType, setOrderType] = useState<OrderType>(initialTable ? 'dinein' : 'pickup');
  const [tableNumber, setTableNumber] = useState(initialTable || '4');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].id);

  // Payment Gateway
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiOption, setUpiOption] = useState<'qr' | 'id'>('qr');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Confirmation record
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, it) => sum + it.item.price * it.quantity, 0);
  const gst = Math.round((subtotal - discount) * 0.05);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 499 ? 0 : 40) : 0;
  const grandTotal = subtotal - discount + gst + deliveryFee;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    if (orderType === 'delivery' && !customerAddress.trim()) {
      alert('Please provide your delivery address.');
      return;
    }
    setStep('payment');
  };

  const handlePayNow = () => {
    // If UPI ID selected, validate
    if (paymentMethod === 'upi' && upiOption === 'id' && !upiId.includes('@')) {
      alert('Please enter a valid UPI VPA (e.g. yourname@okhdfcbank)');
      return;
    }
    // If Card selected, validate
    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 15 || !cardExpiry || !cardCvv) {
        alert('Please fill out the card details completely.');
        return;
      }
    }

    setStep('processing');

    // Simulate payment gateway authorization
    setTimeout(() => {
      const randomId = 'PINN-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder: OrderRecord = {
        orderId: randomId,
        items,
        subtotal,
        discount,
        tax: gst,
        deliveryFee,
        total: grandTotal,
        orderType,
        tableNumber: orderType === 'dinein' ? tableNumber : undefined,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: orderType === 'delivery' ? customerAddress.trim() : undefined,
        landmark: landmark.trim() || undefined,
        specialInstructions: specialInstructions.trim() || undefined,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pay_at_counter' : 'completed',
        transactionId: 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed',
        pointsEarned: Math.floor(grandTotal / 10),
      };

      setConfirmedOrder(newOrder);
      setStep('success');
      onOrderSuccess(newOrder);

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C86D51', '#E5A853', '#34A853', '#29221F'],
        });
      } catch (err) {
        // gracefully handle if blocked
      }
    }, 1400);
  };

  const handleFormatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  const handleFormatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.substring(0, 2)}/${raw.substring(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!confirmedOrder) return;
    const msg = formatWhatsAppMessage({
      orderId: confirmedOrder.orderId,
      items: confirmedOrder.items.map(i => ({
        name: i.item.name,
        quantity: i.quantity,
        price: i.item.price,
        customMessage: i.customMessage,
      })),
      total: confirmedOrder.total,
      customerName: confirmedOrder.customerName,
      customerPhone: confirmedOrder.customerPhone,
      orderType: confirmedOrder.orderType,
      tableNumber: confirmedOrder.tableNumber,
      address: confirmedOrder.customerAddress,
      notes: confirmedOrder.specialInstructions,
    });
    const url = `https://wa.me/${BAKERY_PHONE_INTL}?text=${msg}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl border border-[#DDD0BC] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Gateway Header */}
        <div className="bg-[#29221F] text-[#F3EBDD] px-6 py-4 flex items-center justify-between border-b border-[#3D332F]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#4EBA6F]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {step === 'success' ? 'Order Confirmed!' : 'Secure Bakery Checkout'}
              </h3>
              <p className="text-[11px] text-[#CBB9AC]">
                {step === 'details' && 'Step 1 of 2: Dining & Delivery Details'}
                {step === 'payment' && 'Step 2 of 2: Payment Gateway Selection'}
                {step === 'processing' && 'Authorizing Payment...'}
                {step === 'success' && 'Your bakes are entering the oven!'}
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#D8CCC1] hover:text-white rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              
              {/* Order Mode Switcher */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#29221F]">Choose Order Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-2xs'
                        : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🚗 Takeaway</span>
                    <span className="text-[10px] font-normal opacity-90">Highway Pickup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      orderType === 'dinein'
                        ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-2xs'
                        : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🏨 Dine-In</span>
                    <span className="text-[10px] font-normal opacity-90">Table Service</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-2xs'
                        : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🛵 Delivery</span>
                    <span className="text-[10px] font-normal opacity-90">To Your Door</span>
                  </button>
                </div>
              </div>

              {/* Dine-In Table Selector */}
              {orderType === 'dinein' && (
                <div className="bg-[#F3EBDD] p-3.5 rounded-xl border border-[#E5DACF] space-y-2">
                  <label className="text-xs font-semibold text-[#29221F]">Select Table Number</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '10', '12'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTableNumber(num)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          tableNumber === num
                            ? 'bg-[#29221F] text-white shadow-2xs'
                            : 'bg-white text-[#29221F] border border-[#DDD0BC]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pickup Branch Selector */}
              {orderType === 'pickup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#29221F]">Pickup Outlet</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                  >
                    {BRANCHES.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.area})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#29221F] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#C86D51]" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Balu Sharma"
                    className="w-full text-xs px-3 py-2.5 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#29221F] flex items-center gap-1">
                    <PhoneIcon className="w-3.5 h-3.5 text-[#C86D51]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 09666351333"
                    className="w-full text-xs px-3 py-2.5 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
              </div>

              {/* Delivery Address fields */}
              {orderType === 'delivery' && (
                <div className="space-y-3 bg-[#F3EBDD] p-3.5 rounded-xl border border-[#E5DACF]">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#29221F] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
                      <span>Delivery Address (House/Flat, Street) *</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="e.g. Flat 302, Green Meadows, Near Highway Junction, Annavaram"
                      className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#29221F]">Nearby Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Opposite State Bank ATM"
                      className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#29221F]">Special Chef Instructions</label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Add 2 birthday candles, warm croissants please"
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] placeholder:text-[#A89A92] focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#C86D51] hover:bg-[#B3583C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to Payment (₹{grandTotal})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 'payment' && (
            <div className="space-y-5">
              
              {/* Order Summary Strip */}
              <div className="bg-[#F3EBDD] p-3.5 rounded-xl border border-[#E5DACF] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#29221F]">
                    {items.length} items for {customerName}
                  </span>
                  <p className="text-[11px] text-[#786A63]">
                    {orderType === 'dinein' ? `Dine-In Table #${tableNumber}` : orderType === 'delivery' ? 'Doorstep Delivery' : 'Express Pickup'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-[#C86D51]">₹{grandTotal}</span>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="block text-[10px] text-[#8F817A] hover:underline cursor-pointer"
                  >
                    Edit details
                  </button>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-[#29221F] text-white border-[#29221F] shadow-xs'
                      : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#4EBA6F]" />
                  <span>UPI Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#29221F] text-white border-[#29221F] shadow-xs'
                      : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#E5A853]" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#29221F] text-white border-[#29221F] shadow-xs'
                      : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#C86D51]" />
                  <span>NetBank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-[#29221F] text-white border-[#29221F] shadow-xs'
                      : 'bg-white text-[#4A3E39] border-[#DDD0BC] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#34A853]" />
                  <span>Cash</span>
                </button>
              </div>

              {/* PAYMENT SUB-PANELS */}

              {/* Panel 1: UPI */}
              {paymentMethod === 'upi' && (
                <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUpiOption('qr')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        upiOption === 'qr'
                          ? 'bg-[#F3EBDD] text-[#C86D51] border-[#C86D51]'
                          : 'bg-white text-[#5A4E48] border-[#DDD0BC]'
                      }`}
                    >
                      Scan UPI QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiOption('id')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        upiOption === 'id'
                          ? 'bg-[#F3EBDD] text-[#C86D51] border-[#C86D51]'
                          : 'bg-white text-[#5A4E48] border-[#DDD0BC]'
                      }`}
                    >
                      Enter UPI ID / VPA
                    </button>
                  </div>

                  {upiOption === 'qr' ? (
                    <div className="flex flex-col items-center text-center space-y-3 py-2">
                      <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] shadow-inner">
                        <img
                          src={generateQrSvgUrl(`upi://pay?pa=pastryinn@icici&pn=PastryInn&am=${grandTotal}&cu=INR&tn=BakeryOrder`)}
                          alt="UPI Payment QR Code"
                          className="w-40 h-40 object-contain"
                        />
                      </div>
                      <div className="text-xs text-[#5A4E48] space-y-0.5">
                        <p className="font-semibold text-[#29221F]">Scan with any UPI App:</p>
                        <p className="text-[11px] text-[#786A63]">Google Pay · PhonePe · Paytm · BHIM · CRED</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#29221F]">Enter UPI ID (VPA)</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. 9666351333@paytm or name@okhdfcbank"
                        className="w-full text-xs px-3 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                      />
                      <p className="text-[11px] text-[#786A63]">A payment request will be sent directly to your UPI app.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Panel 2: Credit / Debit Card */}
              {paymentMethod === 'card' && (
                <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-3.5">
                  {/* Interactive Card Visual */}
                  <div className="p-4 rounded-xl bg-gradient-to-tr from-[#29221F] via-[#3E3430] to-[#5C4D47] text-white shadow-md space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono tracking-widest text-[#E5A853]">PASTRY INN PAY</span>
                      <CreditCard className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="font-mono text-base tracking-widest py-1">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between text-[11px] text-[#D8CCC1]">
                      <div>
                        <span className="text-[9px] block uppercase opacity-75">Card Holder</span>
                        <span>{cardName || 'YOUR NAME'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] block uppercase opacity-75">Expires</span>
                        <span>{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-2.5">
                    <div>
                      <label className="text-xs font-semibold text-[#29221F]">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => handleFormatCardNumber(e.target.value)}
                        placeholder="4532 8900 1234 5678"
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] font-mono focus:outline-hidden focus:border-[#C86D51]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-[#29221F]">Valid Thru</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => handleFormatExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full text-xs px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] font-mono focus:outline-hidden focus:border-[#C86D51]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#29221F]">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full text-xs px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] font-mono focus:outline-hidden focus:border-[#C86D51]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#29221F]">Name on Card</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Cardholder Full Name"
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 3: Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-3">
                  <label className="text-xs font-semibold text-[#29221F]">Select Your Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2 rounded-lg border text-xs text-left font-medium transition-all cursor-pointer ${
                          selectedBank === bank
                            ? 'bg-[#F3EBDD] text-[#C86D51] border-[#C86D51] font-semibold'
                            : 'bg-[#FAF7F2] text-[#4A3E39] border-[#DDD0BC]'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Panel 4: Cash / Pay at Counter */}
              {paymentMethod === 'cod' && (
                <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-2 text-xs text-[#5A4E48]">
                  <p className="font-semibold text-[#29221F]">
                    {orderType === 'dinein' ? 'Pay at Table / Counter' : orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay on Highway Counter Pickup'}
                  </p>
                  <p>
                    You can pay in cash or via card/UPI upon receiving your fresh order. 
                    Exact change of <span className="font-bold text-[#C86D51]">₹{grandTotal}</span> is appreciated!
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#786A63]">
                <Lock className="w-3.5 h-3.5 text-[#4EBA6F]" />
                <span>256-bit Encrypted SSL Payment Gateway · RBI Compliant</span>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                onClick={handlePayNow}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#C86D51] hover:bg-[#B3583C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Authorize & Pay ₹{grandTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: Processing Simulation */}
          {step === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 border-4 border-[#DDD0BC] border-t-[#C86D51] rounded-full animate-spin" />
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-[#29221F]">
                  Processing with Payment Gateway
                </h4>
                <p className="text-xs text-[#786A63]">
                  Verifying transaction token with your bank and dispatching baking ticket...
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Live Order Tracking */}
          {step === 'success' && confirmedOrder && (
            <div className="space-y-5">
              
              {/* Receipt Header Banner */}
              <div className="bg-[#EBF5ED] p-4 rounded-2xl border border-[#A3D9AE] text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#34A853] text-white flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#1E562D]">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-[#2A753F]">
                  Order ID: <span className="font-mono font-bold">{confirmedOrder.orderId}</span>
                </p>
              </div>

              {/* Pastry In Loyalty Points Earned Banner */}
              <div className="bg-gradient-to-r from-[#FAF6EF] to-[#FDE68A]/30 p-3.5 rounded-2xl border border-[#E8DEC8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FDE68A] flex items-center justify-center text-[#841812] shrink-0 font-bold shadow-2xs">
                    ★
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#841812] uppercase tracking-wider block">
                      Pastry In Points Earned!
                    </span>
                    <span className="text-xs text-[#5A4E48]">
                      +{confirmedOrder.pointsEarned ?? Math.floor(confirmedOrder.total / 10)} Points added to your device profile!
                    </span>
                  </div>
                </div>
                {onViewLoyalty && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onViewLoyalty();
                    }}
                    className="px-3 py-1.5 bg-[#A6241D] hover:bg-[#841812] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    View Club
                  </button>
                )}
              </div>

              {/* Live Kitchen Status Tracker */}
              <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#29221F]">
                  <span>Live Bakery Order Status</span>
                  <span className="text-[#C86D51]">Est: 20-25 mins</span>
                </div>

                <div className="grid grid-cols-4 gap-1 text-center">
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-[#34A853]" />
                    <span className="text-[10px] font-semibold text-[#29221F]">Confirmed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-[#C86D51] animate-pulse" />
                    <span className="text-[10px] font-semibold text-[#C86D51]">Baking</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-[#DDD0BC]" />
                    <span className="text-[10px] text-[#8F817A]">Packaging</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-[#DDD0BC]" />
                    <span className="text-[10px] text-[#8F817A]">
                      {confirmedOrder.orderType === 'delivery' ? 'Out for Delivery' : 'Ready'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Receipt Details */}
              <div className="bg-white p-4 rounded-xl border border-[#DDD0BC] space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#EFE7D8] pb-2 text-[#786A63]">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-[#29221F] uppercase">{confirmedOrder.paymentMethod} ({confirmedOrder.transactionId})</span>
                </div>

                <div className="space-y-1.5">
                  {confirmedOrder.items.map((ci) => (
                    <div key={ci.item.id} className="flex justify-between text-[#29221F]">
                      <span>{ci.quantity}x {ci.item.name}</span>
                      <span className="font-medium">₹{ci.item.price * ci.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EFE7D8] flex justify-between font-bold text-sm text-[#29221F]">
                  <span>Total Paid</span>
                  <span className="text-[#C86D51]">₹{confirmedOrder.total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleSendWhatsAppConfirmation}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send to WhatsApp ({BAKERY_PHONE})</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 bg-white hover:bg-[#F3EBDD] border border-[#DDD0BC] text-[#29221F] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#C86D51]" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full text-center py-2 text-xs font-semibold text-[#C86D51] hover:underline cursor-pointer"
              >
                Back to Bakery Home
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
