import { useState } from 'react';
import { Award, ShoppingBag, Calendar, MapPin, CreditCard, Sparkles, CheckCircle, Barcode, Flame } from 'lucide-react';
import { Order, Reservation } from '../../types';

interface DashboardViewProps {
  loyaltyPoints: number;
  onClaimReward: (rewardId: string, cost: number) => Promise<boolean>;
  orders: Order[];
  reservations: Reservation[];
  language: 'EN' | 'SO' | 'AR';
}

export default function DashboardView({
  loyaltyPoints,
  onClaimReward,
  orders,
  reservations,
  language,
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'rewards'>('rewards');
  const [claimedCode, setClaimedCode] = useState<string | null>(null);
  const [claimedLabel, setClaimedLabel] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        title: 'Loyalty Portal',
        sub: 'Manage luxury membership levels, track active extractions, and claim exclusive micro-lot rewards.',
        silver: 'Silver Connoisseur',
        gold: 'Gold Connoisseur',
        vip: 'VIP Elite Member',
        history: 'Order Chronicles',
        reserve: 'Reservations',
        claim: 'Spend Points',
        availPoints: 'Available Balance',
        redeemBtn: 'Redeem Reward',
        insufficient: 'Insufficient loyalty balance.',
        rewardsTitle: 'Available Rewards',
        noOrders: 'No active coffee logs recorded yet.',
        noReservations: 'No table reservations scheduled.',
      },
      SO: {
        title: 'Koontada Aura Club',
        sub: 'Maaree xubinnimadaada, la soco boosaska miisaska, oo ku dhibco-kuurso hadiyado bilaash ah.',
        silver: 'Xubin Silver ah',
        gold: 'Xubin Gold ah',
        vip: 'Xubin VIP Sare ah',
        history: 'Diiwaanka Dalabaadka',
        reserve: 'Boosaska Miisaska',
        claim: 'Redeem Dhibcaha',
        availPoints: 'Dhibcahaaga Hada',
        redeemBtn: 'Qaado Hadiyadan',
        insufficient: 'Dhibco kugu filan ma jiraan.',
        rewardsTitle: 'Hadiyadaha Aad Qaadan Karto',
        noOrders: 'Ma jiro wax dalab ah oo diiwaan gashan.',
        noReservations: 'Ma jiraan miisas laguu xaqiijiyay.',
      },
      AR: {
        title: 'بوابة الولاء والعضوية',
        sub: 'أدر مستويات العضوية الفاخرة الخاصة بك، وتتبع حجوزاتك، واستبدل نقاطك بمكافآت حصرية.',
        silver: 'عضوية فضية',
        gold: 'عضوية ذهبية',
        vip: 'عضوية VIP النخبة',
        history: 'سجل الطلبات الفاخرة',
        reserve: 'الحجوزات الحالية',
        claim: 'استبدال النقاط',
        availPoints: 'رصيد النقاط المتاحة',
        redeemBtn: 'استبدال النقاط بالمكافأة',
        insufficient: 'رصيد النقاط غير كافٍ للاستبدال.',
        rewardsTitle: 'المكافآت الحصرية المتاحة',
        noOrders: 'لا توجد طلبات مسجلة في التاريخ حالياً.',
        noReservations: 'لا توجد حجوزات طاولات مجدولة.',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const rewards = [
    { id: 'rew-1', title: 'Complimentary Aged Butter Croissant', cost: 150, desc: 'Freshly baked laminated pastry with French butter.' },
    { id: 'rew-2', title: 'Free Pour-Over Micro-Lot Tasting', cost: 250, desc: 'Your choice of any freshly roasted single-origin micro-lot.' },
    { id: 'rew-3', title: 'Aura Premium Retail Bean Bag (250g)', cost: 500, desc: 'A custom bag of single-origin Gesha roasted beans.' }
  ];

  const handleClaim = async (rewardId: string, cost: number, label: string) => {
    setErrorMsg('');
    setClaimedCode(null);

    if (loyaltyPoints < cost) {
      setErrorMsg(getTranslation('insufficient'));
      return;
    }

    const success = await onClaimReward(rewardId, cost);
    if (success) {
      const randomCode = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setClaimedCode(randomCode);
      setClaimedLabel(label);
    } else {
      setErrorMsg('Failed to process claim. Try again.');
    }
  };

  // Determine loyalty tier details
  const getTierDetails = () => {
    if (loyaltyPoints >= 1000) {
      return {
        level: getTranslation('vip'),
        color: 'from-amber-500 via-yellow-400 to-amber-600',
        nextLevel: 'Max Level Unlocked 👑',
        percent: 100,
        text: 'Elite status unlocks unlimited complimentary double-shots, express couriers, and priority tasting chambers.'
      };
    } else if (loyaltyPoints >= 400) {
      return {
        level: getTranslation('gold'),
        color: 'from-yellow-600 via-yellow-500 to-yellow-700',
        nextLevel: '550 points to VIP Elite',
        percent: ((loyaltyPoints - 400) / 600) * 100,
        text: 'Gold members receive complimentary organic milk upgrades, free birthday treats, and double point-gains on Tuesdays.'
      };
    } else {
      return {
        level: getTranslation('silver'),
        color: 'from-slate-400 via-slate-300 to-slate-500',
        nextLevel: `${400 - loyaltyPoints} points to Gold Connoisseur`,
        percent: (loyaltyPoints / 400) * 100,
        text: 'Silver members earn 10 points per dollar and access basic reward claim catalogs.'
      };
    }
  };

  const tier = getTierDetails();

  return (
    <div id="dashboard-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      {/* 1. HEADER TITLE */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
          AURA INNER CIRCLE
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          {getTranslation('title')}
        </h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto">
          {getTranslation('sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Loyalty Progress Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card Metal Graphic */}
          <div className={`p-8 rounded-3xl bg-gradient-to-tr ${tier.color} text-brand-gray relative overflow-hidden shadow-2xl`}>
            {/* Background vector rings */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gray/60 block">
                    Luxury Membership
                  </span>
                  <span className="font-display font-bold text-xl block leading-tight">
                    {tier.level}
                  </span>
                </div>
                <Award className="w-8 h-8 text-brand-gray animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gray/60 block mb-1">
                  {getTranslation('availPoints')}
                </span>
                <span className="font-display font-bold text-4xl block">
                  {loyaltyPoints} <span className="text-sm font-sans font-medium text-brand-gray/70">Points</span>
                </span>
              </div>

              {/* Progress meter bar */}
              <div className="space-y-2">
                <div className="w-full bg-brand-gray/25 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-gray h-full transition-all duration-1000" style={{ width: `${tier.percent}%` }} />
                </div>
                <span className="text-[10px] font-mono text-brand-gray/60 block text-right">
                  {tier.nextLevel}
                </span>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs leading-relaxed p-4 rounded-2xl bg-brand-slate border border-white/5">
            {tier.text}
          </p>
        </div>

        {/* Right: Tab view for Orders, Reservations, Claims */}
        <div className="lg:col-span-8 bg-brand-slate rounded-3xl p-6 sm:p-8 border border-white/5 space-y-8">
          {/* Tabs navigation */}
          <div className="flex border-b border-white/5 pb-4 gap-4 overflow-x-auto no-scrollbar">
            {(['rewards', 'orders', 'reservations'] as const).map((tab) => (
              <button
                key={tab}
                id={`dashboard-tab-${tab}`}
                onClick={() => {
                  setActiveTab(tab);
                  setErrorMsg('');
                  setClaimedCode(null);
                }}
                className={`font-button text-sm font-medium pb-2 transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab ? 'text-gold' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab === 'rewards' ? getTranslation('claim') : tab === 'orders' ? getTranslation('history') : getTranslation('reserve')}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange to-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div id="tab-content-portal" className="space-y-6">
            
            {/* REWARDS CLAIM TAB */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                {/* Rewards claimed voucher notification */}
                {claimedCode && (
                  <div id="claimed-voucher" className="p-6 bg-gold/10 border border-gold/30 rounded-2xl text-center space-y-4 animate-fade-in glow-gold">
                    <span className="text-gold font-mono font-bold text-sm block">Voucher Code Claimed Successfully!</span>
                    <h4 className="font-display font-bold text-white text-lg">{claimedLabel}</h4>
                    
                    <div className="py-4 bg-white/5 max-w-xs mx-auto rounded-xl flex flex-col items-center">
                      <Barcode className="w-48 h-12 text-gold-light animate-pulse shrink-0" />
                      <span className="font-mono text-xs tracking-widest text-white mt-2 block">{claimedCode}</span>
                    </div>
                    <span className="text-[10px] text-white/40 block">Present this barcode/vouchers code to your sensory host at checkout.</span>
                  </div>
                )}

                {/* Claim Errors */}
                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <h3 className="font-display text-lg font-bold text-white flex items-center">
                  <Sparkles className="w-5 h-5 text-gold mr-2" />
                  {getTranslation('rewardsTitle')}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {rewards.map((rew) => (
                    <div
                      key={rew.id}
                      id={`reward-card-${rew.id}`}
                      className="p-5 rounded-2xl bg-brand-gray/45 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gold/10 transition-colors"
                    >
                      <div>
                        <h4 className="font-display font-semibold text-white text-sm">{rew.title}</h4>
                        <p className="text-white/55 text-xs mt-1">{rew.desc}</p>
                      </div>

                      <button
                        id={`claim-btn-${rew.id}`}
                        onClick={() => handleClaim(rew.id, rew.cost, rew.title)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-button font-bold flex items-center space-x-2 border transition-all cursor-pointer ${
                          loyaltyPoints >= rew.cost
                            ? 'bg-gradient-to-r from-orange to-gold text-brand-gray border-gold shadow-md hover:scale-105'
                            : 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed'
                        }`}
                      >
                        <span>{rew.cost} Pts</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MY ACTIVE ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-white/40 text-xs font-mono">{getTranslation('noOrders')}</div>
                ) : (
                  orders.map((ord, idx) => (
                    <div
                      key={ord.id}
                      id={`order-history-${ord.id}`}
                      className="p-5 rounded-2xl bg-brand-gray/45 border border-white/5 hover:border-gold/10 transition-colors space-y-3"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs">
                        <div>
                          <span className="font-mono text-gold block">{ord.id}</span>
                          <span className="text-white/40 text-[10px] block mt-0.5">{new Date(ord.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase font-bold bg-white/5 text-gold-light border border-white/5`}>
                          {ord.status}
                        </span>
                      </div>

                      {/* Item summaries */}
                      <div className="space-y-1.5">
                        {ord.items.map((item, idy) => (
                          <div key={idy} className="flex justify-between text-xs text-white/70">
                            <span>
                              {item.quantity}x {item.menuItem.name}{' '}
                              <span className="text-[10px] text-white/40">({item.selectedSize})</span>
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs font-bold text-white">
                        <span>Paid Receipt</span>
                        <span className="font-mono text-gold-light">${ord.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* MY RESERVATIONS TAB */}
            {activeTab === 'reservations' && (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {reservations.length === 0 ? (
                  <div className="text-center py-12 text-white/40 text-xs font-mono">{getTranslation('noReservations')}</div>
                ) : (
                  reservations.map((res) => (
                    <div
                      key={res.id}
                      id={`reservation-history-${res.id}`}
                      className="p-5 rounded-2xl bg-brand-gray/45 border border-white/5 hover:border-gold/10 transition-colors space-y-3"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs">
                        <div>
                          <span className="font-mono text-gold block">{res.id}</span>
                          <span className="text-white/40 text-[10px] block mt-0.5">Booth Selection &bull; Allocated Table #{res.tableNumber}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase font-bold bg-white/5 text-gold-light border border-white/5">
                          {res.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                        <div>
                          <span className="block text-[10px] text-white/40 uppercase">Date & Hours</span>
                          <span className="font-medium text-white">{res.date} @ {res.time}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-white/40 uppercase">Connoisseur Group</span>
                          <span className="font-medium text-white">{res.guests} Guests ({res.name})</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
