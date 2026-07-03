import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Gift, Truck, MapPin, Compass, CheckCircle, Flame, Coffee, Check } from 'lucide-react';
import { CartItem, Order, MenuItem } from '../../types';

interface OrderingViewProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  loyaltyPoints: number;
  onOrderSuccess: (order: Order) => void;
  language: 'EN' | 'SO' | 'AR';
}

export default function OrderingView({
  cart,
  setCart,
  loyaltyPoints,
  onOrderSuccess,
  language,
}: OrderingViewProps) {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [trackingStep, setTrackingStep] = useState(0); // 0: placed, 1: brewing, 2: ready/out-for-delivery, 3: completed

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        title: 'Direct Order Atelier',
        sub: 'Order luxury roasts and pastries delivered directly to your door, or packaged for rapid pickup.',
        empty: 'Your shopping cart is currently empty.',
        subtotal: 'Subtotal',
        shipping: 'Delivery Fee',
        points: 'Gained Points',
        total: 'Total',
        checkout: 'Proceed to Secure Checkout',
        pickup: 'Bespoke Pickup',
        delivery: 'Courier Delivery',
        address: 'Delivery Residence Address',
        coupon: 'Apply Promo Coupon Code',
        couponBtn: 'Apply',
        size: 'Select Cup/Portion Size',
        sizeS: 'Standard',
        sizeG: 'Grande',
        sizeR: 'Reserve',
        trackingTitle: 'Brewing & Transit Tracking',
        trackingDesc: 'Your luxury single-origin is currently in extraction transit.',
        step1: 'Order Confirmed',
        step2: 'Sensory Brewing',
        step3: 'Courier Transit',
        step4: 'Completed Delight',
      },
      SO: {
        title: 'Dalabka Tooska ah ee Aura',
        sub: 'Dalbo cabitaano iyo jillb la diyaariyey oo gurigaaga laguugu keeno ama aad goobta ka qaadato.',
        empty: 'Kala dambiilahaagu hada waa maran yahay.',
        subtotal: 'Wajibaadka',
        shipping: 'Kharashka Keenista',
        points: 'Dhibcaha Aad Helayso',
        total: 'Wajibaadka Guud',
        checkout: 'Xaqiiji Dalabka Hada',
        pickup: 'Aad u tag goobta',
        delivery: 'Guri-Keenis',
        address: 'Ciwaanka gurigaaga si faahfaahsan',
        coupon: 'Geli Kuuboonka Qiimo-Dhimista',
        couponBtn: 'Isticmaal',
        size: 'Dooro Baaxada Koobka',
        sizeS: 'Caadi',
        sizeG: 'Wayn',
        sizeR: 'Gaar ah',
        trackingTitle: 'Lasocodka Diyaarinta',
        trackingDesc: 'Qaxwahaaga waxaa hada gacanta ku haya bishayste khabiir ah.',
        step1: 'Dalabka waa la xaqiijiyay',
        step2: 'Hadaa la karkarinayaa',
        step3: 'Waa la soo siday',
        step4: 'Waa laguu keenay',
      },
      AR: {
        title: 'طلب مباشر من مقهى أورا',
        sub: 'اطلب المشروبات التخصصية والمعجنات الطازجة ليتم توصيلها لبابك مباشرة أو استلامها بسرعة من الفرع.',
        empty: 'سلة المشتريات فارغة حالياً.',
        subtotal: 'المجموع الفرعي',
        shipping: 'رسوم التوصيل والخدمة',
        points: 'النقاط المكتسبة',
        total: 'المجموع الكلي',
        checkout: 'إتمام الطلب والدفع الآمن',
        pickup: 'استلام من الفرع',
        delivery: 'توصيل سريع بالبريد',
        address: 'عنوان التوصيل السكني بالتفصيل',
        coupon: 'رمز قسيمة الترويج والخصم',
        couponBtn: 'تطبيق',
        size: 'اختر حجم الكوب / الحصة',
        sizeS: 'قياسي',
        sizeG: 'جراندي',
        sizeR: 'محجوز خاص',
        trackingTitle: 'تتبع التحضير والعبور المباشر',
        trackingDesc: 'مشروبك التخصصي قيد الاستخلاص والتحضير الفني الآن.',
        step1: 'تم تأكيد الطلب',
        step2: 'استخلاص القهوة فنيّاً',
        step3: 'مع الكابتن في الطريق',
        step4: 'تم التسليم والهناء',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  // Tracking simulator
  useEffect(() => {
    let timer: any;
    if (activeOrder) {
      timer = setInterval(() => {
        setTrackingStep((prev) => {
          if (prev < 3) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 7000); // changes status every 7 seconds
    }
    return () => clearInterval(timer);
  }, [activeOrder]);

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const copy = [...prev];
      const item = copy[index];
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        copy.splice(index, 1);
      } else {
        item.quantity = newQty;
      }
      return copy;
    });
  };

  const changeSize = (index: number, size: 'Standard' | 'Grande' | 'Reserve') => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].selectedSize = size;
      return copy;
    });
  };

  const handleApplyCoupon = () => {
    setDiscount(0);
    setCouponMessage('');
    const code = coupon.trim().toUpperCase();

    if (code === 'AURA20') {
      setDiscount(0.2); // 20% off
      setCouponMessage('AURA20 Promo Applied: 20% Discount!');
    } else if (code === 'VIPLOYAL') {
      setDiscount(0.3); // 30% off
      setCouponMessage('VIPLOYAL Promo Applied: 30% VIP Discount!');
    } else {
      setCouponMessage('Invalid or Expired Coupon');
    }
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => {
      let price = item.menuItem.price;
      if (item.selectedSize === 'Grande') price += 1.50;
      if (item.selectedSize === 'Reserve') price += 3.00;
      return sum + (price * item.quantity);
    }, 0);
  };

  const subtotal = getCartSubtotal();
  const shippingFee = orderType === 'delivery' ? 5.00 : 0;
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);
  const earnedPoints = Math.floor(total * 10);

  const handlePlaceOrderSubmit = async () => {
    if (!cart.length) return;
    if (orderType === 'delivery' && !address.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    setIsPlacing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cart,
          type: orderType,
          address: orderType === 'delivery' ? address : undefined,
          couponUsed: coupon || undefined,
          discountApplied: discountAmount,
          total
        })
      });

      if (!res.ok) {
        throw new Error('Order placing failed');
      }

      const data: Order = await res.json();
      setActiveOrder(data);
      onOrderSuccess(data);
      setCart([]); // Clear cart
    } catch (error) {
      console.error(error);
      alert('Failed to process secure checkout. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div id="ordering-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      {/* 1. HEADER TITLE */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
          AURA DIRECT DISPATCH
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          {activeOrder ? getTranslation('trackingTitle') : getTranslation('title')}
        </h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto">
          {activeOrder ? getTranslation('trackingDesc') : getTranslation('sub')}
        </p>
      </div>

      {activeOrder ? (
        /* ACTIVE ORDER TRACKING INTERACTIVE STAGE */
        <div id="order-tracking-stage" className="max-w-3xl mx-auto bg-brand-slate rounded-3xl p-8 sm:p-12 border border-gold/20 shadow-2xl space-y-12 animate-fade-in glow-gold">
          {/* Tracking Status Indicator */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold flex items-center justify-center mx-auto text-gold animate-bounce">
              <Coffee className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-xl text-gold-light">
              Order {activeOrder.id} &middot;{' '}
              {trackingStep === 0
                ? getTranslation('step1')
                : trackingStep === 1
                ? getTranslation('step2')
                : trackingStep === 2
                ? orderType === 'delivery'
                  ? getTranslation('step3')
                  : 'Ready at Bar'
                : getTranslation('step4')}
            </h2>
          </div>

          {/* Stepper progress indicator lines */}
          <div className="relative">
            {/* Horizontal Line background */}
            <div className="absolute top-5 left-8 right-8 h-1 bg-white/5 z-0" />
            <div
              className="absolute top-5 left-8 h-1 bg-gradient-to-r from-orange to-gold z-0 transition-all duration-1000"
              style={{ width: `${(trackingStep / 3) * 85}%` }}
            />

            <div className="relative z-10 grid grid-cols-4 gap-2 text-center">
              {[
                { label: getTranslation('step1'), icon: <CheckCircle className="w-4 h-4" /> },
                { label: getTranslation('step2'), icon: <Flame className="w-4 h-4 text-orange" /> },
                {
                  label: orderType === 'delivery' ? getTranslation('step3') : 'Ready for Pickup',
                  icon: <Truck className="w-4 h-4 text-gold-light" />,
                },
                { label: getTranslation('step4'), icon: <Check className="w-4 h-4 text-green-400" /> },
              ].map((step, idx) => (
                <div key={idx} className="space-y-3 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      idx <= trackingStep
                        ? 'bg-gradient-to-tr from-orange to-gold text-brand-gray font-bold scale-110 shadow-lg'
                        : 'bg-brand-gray text-white/40 border border-white/5'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`block text-[10px] font-mono leading-tight max-w-[80px] ${
                      idx <= trackingStep ? 'text-gold-light font-bold' : 'text-white/30'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated transit map coords */}
          {orderType === 'delivery' && trackingStep === 2 && (
            <div id="simulated-courier-map" className="p-4 rounded-2xl bg-brand-gray/50 border border-white/5 text-center text-xs text-white/70 flex items-center justify-center space-x-2 font-mono animate-pulse">
              <Compass className="w-4 h-4 text-gold shrink-0 animate-spin" />
              <span>Courier "Dahir" is currently 0.8 miles away, transit heading North-West.</span>
            </div>
          )}

          {/* Tracking summary cards */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5 text-xs text-white/60">
            <div>
              <span className="block text-white/30 mb-0.5">Delivery Option</span>
              <span className="text-white font-medium capitalize">{orderType} Mode</span>
            </div>
            <div>
              <span className="block text-white/30 mb-0.5">Est. Delivery Duration</span>
              <span className="text-white font-medium">12 - 18 minutes</span>
            </div>
          </div>

          <button
            id="track-another-order"
            onClick={() => setActiveOrder(null)}
            className="w-full bg-white/5 hover:bg-gold hover:text-brand-gray text-white text-xs font-bold py-3.5 rounded-xl border border-white/10 hover:border-gold transition-colors"
          >
            Return to Direct Order
          </button>
        </div>
      ) : cart.length === 0 ? (
        /* EMPTY CART CONTEXT */
        <div id="empty-cart-state" className="text-center py-20 space-y-6">
          <span className="text-6xl">🛒🚫</span>
          <p className="text-white/50 text-sm font-mono">{getTranslation('empty')}</p>
        </div>
      ) : (
        /* CART OVERVIEW & CHECKOUT STAGE */
        <div id="cart-active-stage" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Cart list */}
          <div className="lg:col-span-7 bg-brand-slate rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold block border-b border-white/5 pb-2">
              Bespoke Shopping Cart
            </span>

            <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
              {cart.map((item, idx) => {
                const itemPrice = item.menuItem.price + 
                  (item.selectedSize === 'Grande' ? 1.50 : item.selectedSize === 'Reserve' ? 3.00 : 0);

                return (
                  <div
                    key={idx}
                    id={`cart-item-${idx}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-brand-gray/45 border border-white/5 hover:border-gold/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        referrerPolicy="no-referrer"
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/5 shrink-0"
                      />
                      <div>
                        <h3 className="font-display font-bold text-sm text-white">{item.menuItem.name}</h3>
                        <span className="text-[10px] font-mono text-gold block">
                          ${itemPrice.toFixed(2)} / {item.selectedSize}
                        </span>
                      </div>
                    </div>

                    {/* Size and Quantity Adjuster */}
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Cup Size select */}
                      <div className="flex bg-brand-slate rounded-lg p-1 border border-white/10 text-[9px] font-mono">
                        {(['Standard', 'Grande', 'Reserve'] as const).map((sz) => (
                          <button
                            key={sz}
                            id={`size-${sz}-${idx}`}
                            type="button"
                            onClick={() => changeSize(idx, sz)}
                            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                              item.selectedSize === sz
                                ? 'bg-gold text-brand-gray font-bold'
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            {sz === 'Standard' ? 'S' : sz === 'Grande' ? 'G' : 'R'}
                          </button>
                        ))}
                      </div>

                      {/* Quantity inc/dec */}
                      <div className="flex items-center space-x-2 bg-brand-slate rounded-lg border border-white/10 px-2 py-1">
                        <button
                          id={`qty-minus-${idx}`}
                          onClick={() => updateQuantity(idx, -1)}
                          className="p-1 hover:text-gold transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-2">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-plus-${idx}`}
                          onClick={() => updateQuantity(idx, 1)}
                          className="p-1 hover:text-gold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        id={`delete-cart-item-${idx}`}
                        onClick={() => updateQuantity(idx, -item.quantity)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Checkout parameters */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery/Pickup toggle */}
            <div className="bg-brand-slate rounded-3xl p-6 border border-white/5 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold block border-b border-white/5 pb-2">
                Logistics Mode
              </span>

              <div className="grid grid-cols-2 gap-3 bg-brand-gray p-1 rounded-xl border border-white/10 text-xs">
                <button
                  id="logistic-pickup-btn"
                  onClick={() => setOrderType('pickup')}
                  className={`py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-gradient-to-tr from-orange to-gold text-brand-gray shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{getTranslation('pickup')}</span>
                </button>

                <button
                  id="logistic-delivery-btn"
                  onClick={() => setOrderType('delivery')}
                  className={`py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-gradient-to-tr from-orange to-gold text-brand-gray shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>{getTranslation('delivery')}</span>
                </button>
              </div>

              {/* Delivery Residence details */}
              {orderType === 'delivery' && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-[10px] font-mono text-white/40 block">{getTranslation('address')} *</label>
                  <textarea
                    id="delivery-address-input"
                    rows={2}
                    required
                    placeholder="E.g. 142 Luxury Penthouse Ave, Suite 4B, Manhattan NY"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-brand-gray border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
              )}
            </div>

            {/* Coupons section */}
            <div className="bg-brand-slate rounded-3xl p-6 border border-white/5 space-y-4">
              <label className="text-[10px] font-mono text-white/40 block">{getTranslation('coupon')}</label>
              <div className="flex gap-2">
                <input
                  id="coupon-code-input"
                  type="text"
                  placeholder="Try 'AURA20'"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-brand-gray border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-gold text-white"
                />
                <button
                  id="coupon-apply-btn"
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-white/5 hover:bg-gold hover:text-brand-gray text-white text-xs font-semibold px-4 rounded-xl border border-white/10 hover:border-gold transition-colors cursor-pointer"
                >
                  {getTranslation('couponBtn')}
                </button>
              </div>
              {couponMessage && (
                <span id="coupon-message" className="text-[10px] font-mono block text-gold">
                  {couponMessage}
                </span>
              )}
            </div>

            {/* Price Calculations */}
            <div className="bg-brand-slate rounded-3xl p-6 border border-white/5 space-y-4 text-xs text-white/70">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold block border-b border-white/5 pb-2">
                Atelier Receipt Details
              </span>

              <div className="flex justify-between">
                <span>{getTranslation('subtotal')}</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>

              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>{getTranslation('shipping')}</span>
                  <span className="font-mono text-white">${shippingFee.toFixed(2)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Discount Applied</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gold font-bold">
                <span>{getTranslation('points')}</span>
                <span className="font-mono">+{earnedPoints} Pts</span>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4 text-base font-bold text-white">
                <span>{getTranslation('total')}</span>
                <span className="font-mono text-gold-light">${total.toFixed(2)}</span>
              </div>

              <button
                id="place-order-submit-btn"
                onClick={handlePlaceOrderSubmit}
                disabled={isPlacing}
                className="w-full bg-gradient-to-r from-orange to-gold text-brand-gray font-button font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-gold/15 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isPlacing ? (
                  <div className="w-5 h-5 border-2 border-brand-gray border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>{getTranslation('checkout')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
