import { useState } from 'react';
import { Search, Star, Clock, Info, Heart, ShoppingCart, Sparkles, Flame } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuViewProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  language: 'EN' | 'SO' | 'AR';
}

export default function MenuView({ menuItems, onAddToCart, language }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedDetailsItem, setSelectedDetailsItem] = useState<MenuItem | null>(null);

  // Generate unique list of categories plus 'All'
  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        title: 'Specialty Menu',
        sub: 'Every drink and pastry is handcrafted using direct-trade single-origin beans and premium organic ingredients.',
        search: 'Search our coffee house library...',
        calories: 'Calories',
        prep: 'Prep Time',
        ingredients: 'Ingredients',
        rating: 'Rating',
        add: 'Add to Cart',
        details: 'Nutrition & Details',
        close: 'Close',
        favToast: 'Added to favorites!',
        seasonal: 'Seasonal Special',
      },
      SO: {
        title: 'Menu-ga Gaarka ah',
        sub: 'Cabitaan kasta iyo jillb kasta waxaa lagu farsameeyay digir heer sare ah oo si toos ah loo soo iibiyay.',
        search: 'Raadi waxaad rabto halkan...',
        calories: 'Kalooriyada',
        prep: 'Muda Karinta',
        ingredients: 'Waxyaabaha ka kooban',
        rating: 'Qiimaynta',
        add: 'Hada Dalbo',
        details: 'Nafaqada & Faahfaahinta',
        close: 'Xir',
        favToast: 'Lagu daray kuwa aad jeceshahay!',
        seasonal: 'Dalabka Xilliyeedka',
      },
      AR: {
        title: 'قائمة المشروبات والمأكولات',
        sub: 'كل مشروب ومعجنات معد يدويًا باستخدام حبوب قهوة أحادية الأصل مستوردة مباشرة ومكونات عضوية ممتازة.',
        search: 'ابحث في مكتبة القهوة الفاخرة الخاصة بنا...',
        calories: 'السعرات الحرارية',
        prep: 'وقت التحضير',
        ingredients: 'المكونات الأساسية',
        rating: 'التقييم',
        add: 'إضافة إلى السلة',
        details: 'القيم الغذائية والتفاصيل',
        close: 'إغلاق',
        favToast: 'تمت الإضافة للمفضلة!',
        seasonal: 'عرض موسمي خاص',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="menu-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      {/* 1. HEADER TITLE */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
          AURA SPECIALTY ROASTS
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          {getTranslation('title')}
        </h1>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {getTranslation('sub')}
        </p>
      </div>

      {/* 2. SEARCH BAR & FILTERS */}
      <div className="space-y-8 mb-16">
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <input
            id="menu-search-input"
            type="text"
            placeholder={getTranslation('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-slate border border-white/10 rounded-2xl py-4.5 pl-12 pr-6 text-sm focus:outline-none focus:border-gold/50 text-white placeholder-white/40 shadow-inner"
          />
          <Search className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Categories Pills */}
        <div id="category-pills" className="flex items-center justify-start lg:justify-center overflow-x-auto gap-3 pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-pill-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-button font-medium whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange to-gold text-brand-gray border-gold font-bold shadow-lg shadow-gold/20'
                  : 'bg-brand-slate text-white/70 border-white/5 hover:border-gold/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MENU GRID */}
      {filteredItems.length === 0 ? (
        <div id="no-results-state" className="text-center py-20 space-y-4">
          <span className="text-4xl">☕🚫</span>
          <p className="text-white/50 text-sm font-mono">No exquisite coffee elements matched your parameters.</p>
        </div>
      ) : (
        <div id="menu-items-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`menu-card-${item.id}`}
              className="group bg-brand-slate rounded-3xl border border-white/5 overflow-hidden shadow-2xl hover:border-gold/20 transition-all duration-500 relative flex flex-col justify-between h-full"
            >
              {/* Product Image and badges */}
              <div className="relative overflow-hidden h-60 bg-brand-gray/50">
                <img
                  referrerPolicy="no-referrer"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/90 via-transparent to-transparent opacity-80" />

                {/* Seasonal Badge */}
                {item.isSeasonal && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-orange/90 text-[10px] font-mono tracking-wider text-white uppercase flex items-center space-x-1 animate-pulse">
                    <Flame className="w-3 h-3 text-white" />
                    <span>{getTranslation('seasonal')}</span>
                  </span>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-brand-gray/80 text-[10px] font-mono text-white flex items-center space-x-1 border border-white/5">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span>{item.rating}</span>
                </div>

                {/* Favorite Action */}
                <button
                  id={`fav-btn-${item.id}`}
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-brand-gray/70 text-white/70 hover:text-gold hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites[item.id] ? 'text-orange fill-orange' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Product Details info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-base font-mono text-gold font-bold shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Ingredients tag list previews */}
                <div className="flex flex-wrap gap-1">
                  {item.ingredients.slice(0, 3).map((ing, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 text-white/40 px-2 py-0.5 rounded">
                      {ing}
                    </span>
                  ))}
                  {item.ingredients.length > 3 && (
                    <span className="text-[10px] font-mono text-gold px-1.5 py-0.5">+{item.ingredients.length - 3}</span>
                  )}
                </div>

                {/* Card actions: Add & details popover */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <button
                    id={`details-trigger-${item.id}`}
                    onClick={() => setSelectedDetailsItem(item)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all"
                    title={getTranslation('details')}
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    id={`menu-add-btn-${item.id}`}
                    onClick={() => onAddToCart(item)}
                    className="flex-1 bg-gradient-to-r from-brand-slate to-brand-gray hover:from-orange hover:to-gold text-white hover:text-brand-gray text-xs font-button font-bold py-3 px-4 rounded-xl border border-white/10 hover:border-gold hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{getTranslation('add')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. DETAILS DRAWER MODAL */}
      {selectedDetailsItem && (
        <div
          id="menu-details-modal"
          className="fixed inset-0 z-50 bg-brand-gray/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="w-full max-w-lg bg-brand-slate border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative p-6 space-y-6">
            <button
              id="details-close-btn"
              onClick={() => setSelectedDetailsItem(null)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {getTranslation('close')} ✕
            </button>

            {/* Title with seasonal indicator */}
            <div className="flex items-center space-x-3 pr-20">
              <span className="text-2xl">☕</span>
              <div>
                <h2 className="font-display font-bold text-xl text-gold">
                  {selectedDetailsItem.name}
                </h2>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                  {selectedDetailsItem.category}
                </span>
              </div>
            </div>

            {/* Image banner inside details */}
            <div className="h-48 rounded-xl overflow-hidden border border-white/5">
              <img
                referrerPolicy="no-referrer"
                src={selectedDetailsItem.image}
                alt={selectedDetailsItem.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              {selectedDetailsItem.description}
            </p>

            {/* Quick stats metrics */}
            <div className="grid grid-cols-3 gap-4 text-center py-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <span className="block text-gold font-mono font-bold text-sm">
                  {selectedDetailsItem.calories}
                </span>
                <span className="block text-[10px] text-white/40 uppercase">
                  {getTranslation('calories')}
                </span>
              </div>
              <div>
                <span className="block text-gold font-mono font-bold text-sm">
                  {selectedDetailsItem.prepTime}
                </span>
                <span className="block text-[10px] text-white/40 uppercase">
                  {getTranslation('prep')}
                </span>
              </div>
              <div>
                <span className="block text-gold font-mono font-bold text-sm">
                  {selectedDetailsItem.rating} ⭐
                </span>
                <span className="block text-[10px] text-white/40 uppercase">
                  {getTranslation('rating')}
                </span>
              </div>
            </div>

            {/* Complete Ingredients List */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-white/40 tracking-wider">
                {getTranslation('ingredients')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDetailsItem.ingredients.map((ing, idx) => (
                  <span key={idx} className="text-xs bg-brand-gray border border-white/5 px-3 py-1 rounded-lg text-gold-light">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct action button */}
            <button
              id="details-add-btn"
              onClick={() => {
                onAddToCart(selectedDetailsItem);
                setSelectedDetailsItem(null);
              }}
              className="w-full bg-gradient-to-r from-orange to-gold text-brand-gray font-button font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-gold/15 cursor-pointer"
            >
              Add To Cart (${selectedDetailsItem.price.toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
