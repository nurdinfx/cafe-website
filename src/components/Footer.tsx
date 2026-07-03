import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  language: 'EN' | 'SO' | 'AR';
}

export default function Footer({ setView, language }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        title: 'Subscribe to Aura Club',
        desc: 'Join our inner circle for tasting releases, masterclass access, and seasonal micro-lot drops.',
        placeholder: 'Enter your email address',
        button: 'Subscribe',
        subscribed: 'Thank you! Welcome to Aura Club ✨',
        hours: 'Opening Hours',
        weekday: 'Monday - Friday',
        weekend: 'Saturday - Sunday',
        phone: 'Reservations Desk',
        location: 'Our Atelier',
      },
      SO: {
        title: 'Ku biir Aura Club',
        desc: 'Ku biir xubnaheena gaarka ah si aad u hesho wararkii ugu dambeeyay, tababarada, iyo dhibco bilaash ah.',
        placeholder: 'Geli iimaylkaaga halkan',
        button: 'Isqor',
        subscribed: 'Waad ku mahadsantahay ku biiristaada! ✨',
        hours: 'Saacadaha Shaqada',
        weekday: 'Isniin - Jimco',
        weekend: 'Sabti - Axad',
        phone: 'Khadka Boos-qabashada',
        location: 'Goobteena',
      },
      AR: {
        title: 'اشترك في نادي أورا',
        desc: 'انضم إلى مجتمعنا الخاص للحصول على إصدارات التذوق الحصرية، وحضور ورش العمل المتقدمة.',
        placeholder: 'أدخل بريدك الإلكتروني',
        button: 'اشترك الآن',
        subscribed: 'شكراً لك! أهلاً بك في نادي أورا ✨',
        hours: 'ساعات العمل',
        weekday: 'الاثنين - الجمعة',
        weekend: 'السبت - الأحد',
        phone: 'مكتب الحجوزات',
        location: 'موقعنا',
      },
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="app-footer" className="bg-brand-gray text-white border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Section */}
        <div className="glass rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden glow-gold">
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange/5 blur-3xl -ml-20 -mb-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="flex items-center text-gold text-xs font-mono uppercase tracking-[0.2em] mb-3">
                <Sparkles className="w-4 h-4 mr-2" /> Privilege Program
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {getTranslation('title')}
              </h3>
              <p className="text-white/60 text-sm max-w-md">
                {getTranslation('desc')}
              </p>
            </div>
            <div>
              {subscribed ? (
                <div id="newsletter-success" className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-center text-gold font-medium animate-pulse">
                  {getTranslation('subscribed')}
                </div>
              ) : (
                <form id="newsletter-form" onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder={getTranslation('placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-brand-slate border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-gold text-white"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="bg-gradient-to-r from-orange to-gold text-brand-gray font-button font-semibold rounded-xl px-6 py-3 text-sm hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-gold/20"
                  >
                    <span>{getTranslation('button')}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange to-gold flex items-center justify-center">
                <span className="text-sm">☕</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                AURA
              </span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-6">
              Crafting sensory sanctuaries where single-origin micro-lot brewing is elevated into architectural and culinary art. Experience coffee like never before.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-gold/10 hover:text-gold transition-all text-white/70">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-gold/10 hover:text-gold transition-all text-white/70">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-gold uppercase mb-6">
              Atelier Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button onClick={() => setView('about')} className="hover:text-gold transition-colors text-left cursor-pointer">Our Concept & Heritage</button>
              </li>
              <li>
                <button onClick={() => setView('menu')} className="hover:text-gold transition-colors text-left cursor-pointer">Specialty Menu</button>
              </li>
              <li>
                <button onClick={() => setView('reserve')} className="hover:text-gold transition-colors text-left cursor-pointer">Reserve a Seating</button>
              </li>
              <li>
                <button onClick={() => setView('order')} className="hover:text-gold transition-colors text-left cursor-pointer">Direct Courier Order</button>
              </li>
              <li>
                <button onClick={() => setView('dashboard')} className="hover:text-gold transition-colors text-left cursor-pointer">Loyalty Portal</button>
              </li>
              <li>
                <button onClick={() => setView('gallery')} className="hover:text-gold transition-colors text-left cursor-pointer">Sensory Gallery</button>
              </li>
              <li>
                <button onClick={() => setView('events')} className="hover:text-gold transition-colors text-left cursor-pointer">Masterclasses & Events</button>
              </li>
              <li>
                <button onClick={() => setView('blog')} className="hover:text-gold transition-colors text-left cursor-pointer">Sourcing Blog</button>
              </li>
              <li>
                <button onClick={() => setView('faqs')} className="hover:text-gold transition-colors text-left cursor-pointer">Connoisseur FAQs</button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-gold uppercase mb-6">
              {getTranslation('hours')}
            </h4>
            <ul className="space-y-4 text-xs text-white/60">
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{getTranslation('weekday')}</span>
                  <span className="text-[11px] text-white/40 block">06:00 AM - 10:00 PM</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{getTranslation('weekend')}</span>
                  <span className="text-[11px] text-white/40 block">07:00 AM - 11:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-gold uppercase mb-6">
              {getTranslation('location')}
            </h4>
            <ul className="space-y-4 text-xs text-white/60">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  512 Velvet Boulevard, Chelsea Design District, NY 10011
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{getTranslation('phone')}</span>
                  <span className="text-[11px] text-white/40">+1 (800) 555-AURA</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Inquiries</span>
                  <span className="text-[11px] text-white/40">concierge@auracafegroup.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/40 font-mono">
          <span>&copy; 2026 Aura Café Group. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Experience</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
