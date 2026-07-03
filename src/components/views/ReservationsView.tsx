import React, { useState } from 'react';
import { Calendar, Clock, Users, ShieldAlert, Sparkles, CheckCircle, MapPin, Phone } from 'lucide-react';
import { Reservation } from '../../types';

interface ReservationsViewProps {
  onReservationSuccess: (res: Reservation) => void;
  language: 'EN' | 'SO' | 'AR';
}

export default function ReservationsView({ onReservationSuccess, language }: ReservationsViewProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState('2');
  const [seatingType, setSeatingType] = useState('standard'); // standard, workstation, vip
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successRes, setSuccessRes] = useState<Reservation | null>(null);

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        title: 'Reserve an Aura Table',
        sub: 'Secure standard lounge spaces, quiet workstation hubs, or private VIP tasting booths.',
        date: 'Choose Date',
        time: 'Choose Time',
        guests: 'Number of Guests',
        seating: 'Seating Preference',
        seatingA: 'Standard Lounge Seating',
        seatingADesc: 'Comfortable couches in our sunlit lounge area, perfect for ambient conversations.',
        seatingB: 'Quiet Workstation Hub',
        seatingBDesc: 'Individual sound-buffered tables with dedicated high-speed outlets and charging arrays.',
        seatingC: 'VIP Sommelier Tasting Booth',
        seatingCDesc: 'Private corner booth with personal barista guidance and interactive cupping showcases.',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        requests: 'Special Requests (Allergies, wheelchair access, layout notes)',
        bookBtn: 'Book Tasting Seating',
        error: 'Please fill out all required fields properly.',
        successTitle: 'Seating Confirmed',
        successSub: 'We have reserved your table. A sensory host will await your arrival.',
        tableNum: 'Allocated Table',
        id: 'Reservation Reference',
      },
      SO: {
        title: 'Boos-Qabashada Miiska Aura',
        sub: 'Xaqiiji booskaaga maanta: goobaha nasashada, miisaska shaqada, ama qolalka VIP.',
        date: 'Dooro Maalinta',
        time: 'Dooro Saacada',
        guests: 'Tirada Martida',
        seating: 'Nooca Miiska Aad Rabto',
        seatingA: 'Miiska Nasashada ee Caadiga ah',
        seatingADesc: 'Goobo raaxo leh oo ku haboon wada sheekaysiga caadiga ah.',
        seatingB: 'Miiska Shaqada ee Degan',
        seatingBDesc: 'Miisas shaqo oo gaar ah oo leh koronto iyo internet aad u dheereeya.',
        seatingC: 'Qolka VIP ee Barista Sommelier',
        seatingCDesc: 'Qol gaar ah oo uu ku wehliyo khabiir barista ah oo ku tusaya fanka kafeega.',
        name: 'Magacaaga oo Buuxa',
        email: 'Ciwaanka Iimaylka',
        phone: 'Lambarka Telefoonka',
        requests: 'Codsiyada Gaarka ah',
        bookBtn: 'Xaqiiji Booska Miiska',
        error: 'Fadlan buuxi dhamaan meelaha loo baahan yahay.',
        successTitle: 'Boos-qabashada Waa Guul',
        successSub: 'Waan kuu diyaarinay miiskaaga. Shaqaale daryeel ayaa kugu sugaya albaabka.',
        tableNum: 'Miiska Laguu Qoondeeyay',
        id: 'Tixraaca Booska',
      },
      AR: {
        title: 'حجز طاولة في أورا',
        sub: 'قم بتأمين مساحتك الخاصة: صالات جلوس مريحة، مكاتب عمل هادئة، أو مقصورات تذوق VIP خاصة.',
        date: 'اختر التاريخ',
        time: 'اختر الوقت',
        guests: 'عدد الضيوف',
        seating: 'نوع الجلسة المفضلة',
        seatingA: 'جلسات الصالة القياسية المريحة',
        seatingADesc: 'أرائك مريحة في صالتنا المشرقة المشمسة، مثالية للمحادثات الودية العميقة.',
        seatingB: 'مكاتب عمل فردية هادئة',
        seatingBDesc: 'طاولات عمل معزولة صوتياً ومجهزة بمنافذ شحن كهربائية سريعة وشبكة إنترنت فائقة.',
        seatingC: 'مقصورة VIP للتذوق الخاص',
        seatingCDesc: 'مقصورة ركنية خاصة مع توجيه باريستا شخصي وعروض حية لتذوق المحاصيل النادرة.',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        requests: 'طلبات خاصة (حساسية، كراسي متحركة، ملاحظات الترتيب)',
        bookBtn: 'تأكيد الحجز الفاخر',
        error: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.',
        successTitle: 'تم تأكيد الحجز بنجاح',
        successSub: 'لقد قمنا بحجز طاولتك. سيكون مضيف الحجوزات بانتظارك عند الوصول.',
        tableNum: 'رقم الطاولة المخصصة',
        id: 'مرجع الحجز الخاص بك',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!date || !time || !name || !email || !phone) {
      setError(getTranslation('error'));
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date,
          time,
          guests: Number(guests),
          seatingType,
          name,
          email,
          phone,
          specialRequests
        })
      });

      if (!res.ok) {
        throw new Error('Reservation submission failed');
      }

      const data: Reservation = await res.json();
      setSuccessRes(data);
      onReservationSuccess(data);

    } catch (err) {
      console.error(err);
      setError('A system variance occurred. Please try submitting again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="reservations-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      {/* 1. HEADER TITLE */}
      <div className="text-center space-y-4 mb-12">
        <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
          AURA HOSPITALITY CONCIERGE
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          {getTranslation('title')}
        </h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto">
          {getTranslation('sub')}
        </p>
      </div>

      {successRes ? (
        /* SUCCESS CONFIRMATION PANEL */
        <div id="reservation-success-panel" className="max-w-xl mx-auto glass p-8 sm:p-12 rounded-3xl border border-gold/30 text-center space-y-8 animate-fade-in glow-gold">
          <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold flex items-center justify-center mx-auto text-gold animate-bounce">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl text-gold">
              {getTranslation('successTitle')}
            </h2>
            <p className="text-white/70 text-xs">
              {getTranslation('successSub')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 bg-white/5 rounded-2xl text-xs">
            <div>
              <span className="block text-white/40 mb-1">{getTranslation('tableNum')}</span>
              <span className="block font-mono text-gold font-bold text-base">
                Booth #{successRes.tableNumber || 5}
              </span>
            </div>
            <div>
              <span className="block text-white/40 mb-1">{getTranslation('id')}</span>
              <span className="block font-mono text-gold-light text-base">
                {successRes.id}
              </span>
            </div>
            <div className="col-span-2 pt-2 border-t border-white/5">
              <span className="text-white/40 block mb-1">Time & Guest Count</span>
              <span className="text-white font-medium">
                {successRes.date} @ {successRes.time} ({successRes.guests} Guests)
              </span>
            </div>
          </div>

          <div className="text-[11px] text-white/40 flex items-center justify-center space-x-2 font-mono">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Chelsea Lounge &middot; 512 Velvet Blvd, NY</span>
          </div>

          <button
            id="book-another-btn"
            onClick={() => setSuccessRes(null)}
            className="w-full bg-gradient-to-r from-brand-slate to-brand-gray hover:text-gold text-white text-xs font-bold py-3.5 rounded-xl border border-white/10 transition-colors"
          >
            Schedule Another Seating
          </button>
        </div>
      ) : (
        /* RESERVATION FORM */
        <form id="reservation-form" onSubmit={handleBookingSubmit} className="max-w-4xl mx-auto bg-brand-slate rounded-3xl p-8 border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl">
          {/* Left Column: Date / Time / Guests Selection */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-wider text-gold font-mono block mb-2 border-b border-white/5 pb-2">
              Seating Options
            </span>

            {/* Seating style selectors */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-white/40 block">{getTranslation('seating')}</label>
              
              <button
                id="seating-option-standard"
                type="button"
                onClick={() => setSeatingType('standard')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                  seatingType === 'standard'
                    ? 'border-gold bg-gold/5'
                    : 'border-white/5 bg-brand-gray/50 hover:border-white/10'
                }`}
              >
                <Users className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-white block">{getTranslation('seatingA')}</span>
                  <p className="text-[10px] text-white/50 leading-relaxed mt-1">{getTranslation('seatingADesc')}</p>
                </div>
              </button>

              <button
                id="seating-option-workstation"
                type="button"
                onClick={() => setSeatingType('workstation')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                  seatingType === 'workstation'
                    ? 'border-gold bg-gold/5'
                    : 'border-white/5 bg-brand-gray/50 hover:border-white/10'
                }`}
              >
                <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-white block">{getTranslation('seatingB')}</span>
                  <p className="text-[10px] text-white/50 leading-relaxed mt-1">{getTranslation('seatingBDesc')}</p>
                </div>
              </button>

              <button
                id="seating-option-vip"
                type="button"
                onClick={() => setSeatingType('vip')}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                  seatingType === 'vip'
                    ? 'border-gold bg-gold/5'
                    : 'border-white/5 bg-brand-gray/50 hover:border-white/10'
                }`}
              >
                <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-white block">{getTranslation('seatingC')}</span>
                  <p className="text-[10px] text-white/50 leading-relaxed mt-1">{getTranslation('seatingCDesc')}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Details Form */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-wider text-gold font-mono block mb-2 border-b border-white/5 pb-2">
              Parameters & Contact Details
            </span>

            {/* Inputs: Date, Time, Guests */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1.5">{getTranslation('date')} *</label>
                <div className="relative">
                  <input
                    id="reservation-date-input"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-brand-gray border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1.5">{getTranslation('time')} *</label>
                <select
                  id="reservation-time-select"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-brand-gray border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gold"
                >
                  <option value="08:00">08:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                  <option value="20:00">08:00 PM</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1.5">{getTranslation('guests')} *</label>
                <select
                  id="reservation-guests-select"
                  required
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-brand-gray border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-gold"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6 Guests</option>
                </select>
              </div>
            </div>

            {/* Inputs: Name, Email, Phone */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1">{getTranslation('name')} *</label>
                <input
                  id="reservation-name-input"
                  type="text"
                  required
                  placeholder="E.g. Charlotte Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-gray border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-white/40 block mb-1">{getTranslation('email')} *</label>
                  <input
                    id="reservation-email-input"
                    type="email"
                    required
                    placeholder="E.g. charlotte@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-gray border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 block mb-1">{getTranslation('phone')} *</label>
                  <input
                    id="reservation-phone-input"
                    type="tel"
                    required
                    placeholder="E.g. +1 (555) 304-9214"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-gray border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1">{getTranslation('requests')}</label>
                <textarea
                  id="reservation-requests-textarea"
                  rows={2}
                  placeholder="E.g. Quiet area, wheelchair access, high chair needed..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-brand-gray border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Form Validation Errors */}
            {error && (
              <div id="reservation-error" className="p-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 rounded-lg flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Actions */}
            <button
              id="reservation-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange to-gold text-brand-gray font-button font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-gold/15 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-brand-gray border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{getTranslation('bookBtn')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
