import React, { useState, useEffect } from 'react';
import { TrendingUp, ShoppingBag, Calendar, Users, RefreshCw, CheckCircle, Clock, Truck, Eye, ArrowRight } from 'lucide-react';
import { Order, Reservation } from '../../types';

interface AdminViewProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  language: 'EN' | 'SO' | 'AR';
}

interface AnalyticsData {
  salesTotal: number;
  orderCount: number;
  reservationCount: number;
  customerCount: number;
  categoryStats: { name: string; value: number }[];
}

export default function AdminView({
  orders,
  setOrders,
  reservations,
  setReservations,
  language,
}: AdminViewProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [orders, reservations]);

  const handleUpdateOrderStatus = (orderId: string, nextStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
  };

  const handleUpdateReservationStatus = (resId: string, nextStatus: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === resId ? { ...res, status: nextStatus } : res))
    );
  };

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        title: 'Operations HQ',
        sub: 'Real-time extraction analytics, sensory order control queues, and hospitality booking systems.',
        gross: 'Gross Revenue',
        orders: 'Orders Placed',
        activeBookings: 'Table Bookings',
        customers: 'Audited Guests',
        incomingOrders: 'Extraction Queue',
        incomingRes: 'Hospitality Seating',
        statusBtn: 'Progress Status',
        confirm: 'Confirm Seating',
        cancel: 'Cancel',
      },
      SO: {
        title: 'Xafiiska Maamulka',
        sub: 'La soco diyaarinta kafeega, dalabaadka macaamiisha, iyo boosaska miisaska ee maanta.',
        gross: 'Dakhliga Guud',
        orders: 'Dalabaadka Maanta',
        activeBookings: 'Miisaska la Qabtay',
        customers: 'Macaamiisha Guud',
        incomingOrders: 'Safarka Karinta',
        incomingRes: 'Boosaska Miisaska',
        statusBtn: 'Hore u soco',
        confirm: 'Xaqiiji booska',
        cancel: 'Tirtir',
      },
      AR: {
        title: 'مكتب الإدارة والعمليات',
        sub: 'تحليلات الاستخلاص الفوري المباشر، طوابير الطلبات التخصصية، وجدول الحجوزات النشط.',
        gross: 'إجمالي الإيرادات',
        orders: 'الطلبات المكتملة',
        activeBookings: 'حجوزات الطاولات',
        customers: 'الضيوف المعتمدون',
        incomingOrders: 'طابور التحضير النشط',
        incomingRes: 'حجوزات طاولات الضيوف',
        statusBtn: 'تحديث الحالة',
        confirm: 'تأكيد الحجز',
        cancel: 'إلغاء',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  return (
    <div id="admin-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      {/* 1. HEADER TITLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
            AURA CENTRAL COMMAND
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            {getTranslation('title')}
          </h1>
          <p className="text-white/60 text-sm max-w-xl">
            {getTranslation('sub')}
          </p>
        </div>

        <button
          id="admin-sync-btn"
          onClick={fetchAnalytics}
          className="bg-brand-slate hover:bg-white/5 border border-white/10 hover:border-gold/30 px-5 py-2.5 rounded-xl text-xs font-mono tracking-wide text-gold flex items-center space-x-2 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Synchronize Command</span>
        </button>
      </div>

      {/* 2. OPERATIONAL ANALYTICS CARDS */}
      {analytics && (
        <div id="admin-metrics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <TrendingUp className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-mono">{getTranslation('gross')}</span>
              <span className="block text-xl sm:text-2xl font-display font-bold text-gold-light">
                ${analytics.salesTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-mono">{getTranslation('orders')}</span>
              <span className="block text-xl sm:text-2xl font-display font-bold text-gold-light">
                {analytics.orderCount} Orders
              </span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <Calendar className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-mono">{getTranslation('activeBookings')}</span>
              <span className="block text-xl sm:text-2xl font-display font-bold text-gold-light">
                {analytics.reservationCount} Active
              </span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <Users className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-mono">{getTranslation('customers')}</span>
              <span className="block text-xl sm:text-2xl font-display font-bold text-gold-light">
                {analytics.customerCount} Guests
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. INCOMING QUEUES AND CONTROLLERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Orders Queue Controller */}
        <div className="lg:col-span-8 bg-brand-slate rounded-3xl p-6 border border-white/5 space-y-6">
          <h2 className="font-display font-bold text-lg text-gold border-b border-white/5 pb-2">
            {getTranslation('incomingOrders')}
          </h2>

          <div id="incoming-orders-queue" className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
            {orders.length === 0 ? (
              <p className="text-white/40 text-xs text-center py-8">No coffee extractions scheduled.</p>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  id={`admin-order-row-${ord.id}`}
                  className="p-4 rounded-xl bg-brand-gray/45 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-gold font-bold">{ord.id}</span>
                      <span className="text-white/40 text-[10px]">{new Date(ord.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 text-[9px] uppercase tracking-wider font-mono">
                        {ord.type}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      {ord.items.map((item, index) => (
                        <p key={index} className="text-white/70">
                          {item.quantity}x {item.menuItem.name} ({item.selectedSize})
                          {item.specialRequests && (
                            <span className="block text-[10px] text-orange">Req: {item.specialRequests}</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Actions to update status */}
                  <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                    <span className="font-mono text-gold-light font-bold block mr-3">${ord.total.toFixed(2)}</span>
                    
                    {ord.status === 'placed' && (
                      <button
                        id={`admin-brew-btn-${ord.id}`}
                        onClick={() => handleUpdateOrderStatus(ord.id, 'brewing')}
                        className="bg-orange/20 text-orange border border-orange/40 hover:bg-orange hover:text-white px-3 py-1.5 rounded-lg font-button font-bold text-[10px] transition-all cursor-pointer"
                      >
                        Start Brew
                      </button>
                    )}

                    {ord.status === 'brewing' && (
                      <button
                        id={`admin-dispatch-btn-${ord.id}`}
                        onClick={() => handleUpdateOrderStatus(ord.id, ord.type === 'delivery' ? 'out-for-delivery' : 'ready')}
                        className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500 hover:text-brand-gray px-3 py-1.5 rounded-lg font-button font-bold text-[10px] transition-all cursor-pointer"
                      >
                        {ord.type === 'delivery' ? 'Dispatch Courier' : 'Ready at Bar'}
                      </button>
                    )}

                    {(ord.status === 'out-for-delivery' || ord.status === 'ready') && (
                      <button
                        id={`admin-complete-btn-${ord.id}`}
                        onClick={() => handleUpdateOrderStatus(ord.id, 'completed')}
                        className="bg-green-500/20 text-green-300 border border-green-500/40 hover:bg-green-500 hover:text-brand-gray px-3 py-1.5 rounded-lg font-button font-bold text-[10px] transition-all cursor-pointer"
                      >
                        Delivered & Complete
                      </button>
                    )}

                    {ord.status === 'completed' && (
                      <span className="text-green-400 font-mono text-[10px] font-bold flex items-center space-x-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Dispatched Delight</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Seating Reservations Controller */}
        <div className="lg:col-span-4 bg-brand-slate rounded-3xl p-6 border border-white/5 space-y-6">
          <h2 className="font-display font-bold text-lg text-gold border-b border-white/5 pb-2">
            {getTranslation('incomingRes')}
          </h2>

          <div id="incoming-reservations-queue" className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
            {reservations.length === 0 ? (
              <p className="text-white/40 text-xs text-center py-8 font-mono">No bookings requested.</p>
            ) : (
              reservations.map((res) => (
                <div
                  key={res.id}
                  id={`admin-res-card-${res.id}`}
                  className="p-4 rounded-xl bg-brand-gray/45 border border-white/5 space-y-3 text-xs"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="font-mono text-gold font-bold">{res.id}</span>
                    <span className={`text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded ${
                      res.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : res.status === 'cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {res.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-white/70">
                    <p className="font-bold text-white">{res.name}</p>
                    <p>{res.date} @ {res.time}</p>
                    <p>{res.guests} Guests &bull; Desk #{res.tableNumber || 5}</p>
                    {res.specialRequests && (
                      <p className="text-[10px] text-gold-light italic">Req: "{res.specialRequests}"</p>
                    )}
                  </div>

                  {res.status === 'pending' && (
                    <div className="flex items-center space-x-2 pt-2 border-t border-white/5">
                      <button
                        id={`admin-confirm-res-${res.id}`}
                        onClick={() => handleUpdateReservationStatus(res.id, 'confirmed')}
                        className="flex-1 bg-green-500/20 text-green-300 border border-green-500/40 hover:bg-green-500 hover:text-brand-gray py-1 rounded text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        id={`admin-cancel-res-${res.id}`}
                        onClick={() => handleUpdateReservationStatus(res.id, 'cancelled')}
                        className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-2 py-1 rounded text-[10px] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
