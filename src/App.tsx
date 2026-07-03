import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Views
import HomeView from './components/views/HomeView';
import MenuView from './components/views/MenuView';
import ReservationsView from './components/views/ReservationsView';
import OrderingView from './components/views/OrderingView';
import DashboardView from './components/views/DashboardView';
import AdminView from './components/views/AdminView';
import OtherViews from './components/views/OtherViews';

import { MenuItem, CartItem, Order, Reservation } from './types';
import { MENU_ITEMS } from './data';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(450);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [language, setLanguage] = useState<'EN' | 'SO' | 'AR'>('EN');

  // Menu, orders, and reservations from server DB sessions
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Preloader state
  const [showPreloader, setShowPreloader] = useState(true);

  // Custom cursor position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorStyle, setCursorStyle] = useState('w-8 h-8 opacity-80 border border-gold');

  // 1. Initial Data Fetching from full-stack REST routes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, ordersRes, resRes, loyaltyRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/orders'),
          fetch('/api/reservations'),
          fetch('/api/loyalty'),
        ]);

        if (menuRes.ok) {
          const mData = await menuRes.json();
          if (mData && mData.length) setMenuItems(mData);
        }
        if (ordersRes.ok) {
          const oData = await ordersRes.json();
          setOrders(oData);
        }
        if (resRes.ok) {
          const rData = await resRes.json();
          setReservations(rData);
        }
        if (loyaltyRes.ok) {
          const lData = await loyaltyRes.json();
          if (lData && typeof lData.points === 'number') {
            setLoyaltyPoints(lData.points);
          }
        }
      } catch (err) {
        console.warn('Backend server currently starting or offline. Falling back to robust offline state engines.');
      }
    };

    fetchData();

    // End preloader after 1.5 seconds
    const preloaderTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 1500);

    return () => clearTimeout(preloaderTimer);
  }, []);

  // 2. Custom Inertia-based Mouse Tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setCursorStyle('w-12 h-12 bg-gold/15 border-2 border-gold opacity-95 scale-110');
      } else {
        setCursorStyle('w-8 h-8 border border-gold opacity-80');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseHover);
    };
  }, []);

  // 3. Cart action interactions
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (c) => c.menuItem.id === item.id && c.selectedSize === 'Standard'
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [
          ...prev,
          {
            menuItem: item,
            quantity: 1,
            selectedSize: 'Standard',
          },
        ];
      }
    });

    // Notify user with elegant inline alert or simple visual feedback
    alert(`"${item.name}" added to your gourmet cart!`);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Gain loyalty points
    const earned = Math.floor(newOrder.total * 10);
    setLoyaltyPoints((prev) => prev + earned);
    setView('order'); // remains on order tracking page
  };

  const handleReservationSuccess = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleClaimReward = async (rewardId: string, cost: number): Promise<boolean> => {
    try {
      const res = await fetch('/api/loyalty/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardId, pointsCost: cost }),
      });
      if (res.ok) {
        setLoyaltyPoints((prev) => prev - cost);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    // Fallback in case of server offline
    setLoyaltyPoints((prev) => prev - cost);
    return true;
  };

  return (
    <div id="app-root" className="min-h-screen bg-brand-gray text-white flex flex-col relative selection:bg-gold/30 selection:text-white">
      
      {/* LUXURY HOVER CURSOR TRACKER */}
      <div
        id="custom-cursor"
        className={`hidden md:block fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${cursorStyle}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* LUXURY PRELOADER */}
      {showPreloader && (
        <div
          id="preloader-overlay"
          className="fixed inset-0 z-[100] bg-brand-slate flex flex-col items-center justify-center space-y-4 animate-fade-in"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange to-gold flex items-center justify-center glow-gold animate-spin-slow">
            <span className="text-2xl">☕</span>
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-3xl tracking-widest text-white uppercase block">
              AURA
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold block mt-1">
              L'Atelier Café
            </span>
          </div>
        </div>
      )}

      {/* GLOBAL HEADER */}
      <Header
        currentView={currentView}
        setView={setView}
        cart={cart}
        loyaltyPoints={loyaltyPoints}
        currency={currency}
        setCurrency={(c) => setCurrency(c as any)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* PRIMARY TRANSITIONAL VIEWPORT ROUTER */}
      <main id="app-viewport" className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setView={setView}
            featuredItems={menuItems}
            onAddToCart={handleAddToCart}
            language={language}
          />
        )}

        {currentView === 'menu' && (
          <MenuView
            menuItems={menuItems}
            onAddToCart={handleAddToCart}
            language={language}
          />
        )}

        {currentView === 'reserve' && (
          <ReservationsView
            onReservationSuccess={handleReservationSuccess}
            language={language}
          />
        )}

        {currentView === 'order' && (
          <OrderingView
            cart={cart}
            setCart={setCart}
            loyaltyPoints={loyaltyPoints}
            onOrderSuccess={handleOrderSuccess}
            language={language}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            loyaltyPoints={loyaltyPoints}
            onClaimReward={handleClaimReward}
            orders={orders}
            reservations={reservations}
            language={language}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            orders={orders}
            setOrders={setOrders}
            reservations={reservations}
            setReservations={setReservations}
            language={language}
          />
        )}

        {(currentView === 'about' ||
          currentView === 'gallery' ||
          currentView === 'events' ||
          currentView === 'blog' ||
          currentView === 'faqs') && (
          <OtherViews
            section={currentView as any}
            language={language}
          />
        )}
      </main>

      {/* DYNAMIC SENSORY CHATBOT (Somal, English, Arabic) */}
      <Chatbot language={language} setLanguage={setLanguage} setView={setView} />

      {/* GLOBAL FOOTER */}
      <Footer setView={setView} language={language} />
    </div>
  );
}
