import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Award, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cart: CartItem[];
  loyaltyPoints: number;
  currency: 'USD' | 'EUR' | 'GBP';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP') => void;
  language: 'EN' | 'SO' | 'AR';
  setLanguage: (l: 'EN' | 'SO' | 'AR') => void;
}

export default function Header({
  currentView,
  setView,
  cart,
  loyaltyPoints,
  currency,
  setCurrency,
  language,
  setLanguage,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        home: 'Home',
        menu: 'Menu',
        reserve: 'Reservations',
        order: 'Order Online',
        dashboard: 'Dashboard',
        admin: 'Admin Console',
        more: 'Explore',
        points: 'Points',
      },
      SO: {
        home: 'Hoyga',
        menu: 'Dalabka',
        reserve: 'Boos-Qabashada',
        order: 'Hada Dalbo',
        dashboard: 'Koontada',
        admin: 'Xafiiska',
        more: 'Warbixin',
        points: 'Dhibco',
      },
      AR: {
        home: 'الرئيسية',
        menu: 'القائمة',
        reserve: 'الحجوزات',
        order: 'اطلب الآن',
        dashboard: 'حسابي',
        admin: 'الإدارة',
        more: 'المزيد',
        points: 'نقاط',
      },
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const menuItems = [
    { id: 'home', label: getTranslation('home') },
    { id: 'menu', label: getTranslation('menu') },
    { id: 'reserve', label: getTranslation('reserve') },
    { id: 'order', label: getTranslation('order') },
    { id: 'dashboard', label: getTranslation('dashboard') },
    { id: 'admin', label: getTranslation('admin') },
  ];

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-gray/90 border-b border-white/5 shadow-2xl backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => setView('home')}
            className="flex items-center space-x-2 text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange to-gold flex items-center justify-center glow-gold group-hover:scale-105 transition-transform">
              <span className="text-xl">☕</span>
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors block leading-tight">
                AURA
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-gold block -mt-1">
                L'Atelier Café
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setView(item.id)}
                className={`font-button text-sm tracking-wide font-medium transition-colors cursor-pointer relative py-2 ${
                  currentView === item.id
                    ? 'text-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange to-gold rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Quick Actions (Cart, Language, Currency) */}
          <div id="quick-actions" className="hidden sm:flex items-center space-x-6">
            {/* Loyalty points display */}
            <button
              id="loyalty-badge"
              onClick={() => setView('dashboard')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <Award className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-xs font-mono text-gold-light font-bold">
                {loyaltyPoints} <span className="text-[10px] text-white/50">{getTranslation('points')}</span>
              </span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                id="currency-selector"
                onClick={() => {
                  setIsCurrOpen(!isCurrOpen);
                  setIsLangOpen(false);
                }}
                className="flex items-center space-x-1 text-xs font-mono text-white/70 hover:text-white"
              >
                <span>
                  {currency === 'USD' ? '$ USD' : currency === 'EUR' ? '€ EUR' : '£ GBP'}
                </span>
                <ChevronDown className="w-3 h-3 text-gold" />
              </button>
              {isCurrOpen && (
                <div
                  id="currency-dropdown"
                  className="absolute right-0 mt-2 py-1 w-24 rounded-lg bg-brand-slate border border-white/10 shadow-xl"
                >
                  {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                    <button
                      key={curr}
                      id={`curr-option-${curr}`}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:bg-white/5 hover:text-gold font-mono"
                    >
                      {curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                id="language-selector"
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsCurrOpen(false);
                }}
                className="flex items-center space-x-1 text-xs font-mono text-white/70 hover:text-white"
              >
                <span>🌍 {language}</span>
                <ChevronDown className="w-3 h-3 text-gold" />
              </button>
              {isLangOpen && (
                <div
                  id="language-dropdown"
                  className="absolute right-0 mt-2 py-1 w-28 rounded-lg bg-brand-slate border border-white/10 shadow-xl"
                >
                  {[
                    { code: 'EN', name: 'English' },
                    { code: 'SO', name: 'Soomaali' },
                    { code: 'AR', name: 'العربية' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-option-${lang.code}`}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLangOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:bg-white/5 hover:text-gold"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart button */}
            <button
              id="header-cart-btn"
              onClick={() => setView('order')}
              className="relative p-2.5 rounded-full bg-gradient-to-tr from-brand-slate to-brand-gray border border-white/10 hover:border-gold/30 hover:scale-105 transition-all text-white group"
            >
              <ShoppingBag className="w-5 h-5 text-gold-light group-hover:text-gold transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange text-[10px] font-mono font-bold flex items-center justify-center text-white ring-2 ring-brand-gray animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions and Burger */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Quick Mobile Cart */}
            <button
              id="mobile-cart-btn"
              onClick={() => setView('order')}
              className="relative p-2 rounded-full bg-white/5 text-white"
            >
              <ShoppingBag className="w-5 h-5 text-gold" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange text-[9px] font-mono font-bold flex items-center justify-center text-white">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              id="mobile-menu-burger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden absolute top-full left-0 right-0 bg-brand-gray border-b border-white/5 shadow-2xl backdrop-blur-xl px-4 py-6 flex flex-col space-y-4"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                setView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left font-button text-base py-2.5 px-4 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-orange/10 to-gold/10 text-gold border-l-2 border-gold'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Language and Currency Selectors */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                Language
              </span>
              <select
                id="mobile-lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-brand-slate border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:border-gold"
              >
                <option value="EN">English</option>
                <option value="SO">Soomaali</option>
                <option value="AR">العربية</option>
              </select>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                Currency
              </span>
              <select
                id="mobile-curr-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full bg-brand-slate border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:border-gold"
              >
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
