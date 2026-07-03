import { Sparkles, Award, Coffee, Eye, Heart, ArrowRight, Play, Star } from 'lucide-react';
import { MenuItem } from '../../types';

interface HomeViewProps {
  setView: (view: string) => void;
  featuredItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  language: 'EN' | 'SO' | 'AR';
}

export default function HomeView({ setView, featuredItems, onAddToCart, language }: HomeViewProps) {
  
  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        tag: 'Exquisite Coffee Artistry',
        title: 'Experience Coffee Like Never Before',
        sub: 'Handcrafted specialty drinks, organic micro-lots, artisanal pastries, and wabi-sabi spaces configured for pure sensory elevation.',
        orderBtn: 'Order Online',
        menuBtn: 'View Menu',
        tableBtn: 'Book Table',
        featuredTitle: 'Bespoke Creations',
        featuredSub: 'Explore our master-roaster signature selections brewed with extreme precision.',
        todaySpecial: 'Today\'s Curated Special',
        specialDesc: 'Double shots of washed Ethiopian Gesha micro-lot combined with rich French brown butter cream, organic maple syrup, and gold dust.',
        statsA: 'Specialty Micro-Lots',
        statsB: 'Sourcing Countries',
        statsC: 'Barista Championships',
        statsD: 'Sanctuary Lounges',
      },
      SO: {
        tag: 'Fanka iyo Naqshada Qaxwaha',
        title: 'Kala kulan Qaxwaha Aura Dareen Cusub',
        sub: 'Cabbitaanno si farshaxanimo leh loo karkariyey, beero gaar ah oo la soo xulay, iyo goobo degan oo loogu talagalay raaxada maskaxdaada.',
        orderBtn: 'Hada Dalbo',
        menuBtn: 'Eeg Menu-ga',
        tableBtn: 'Qabo Miis',
        featuredTitle: 'Wax soo Saarkayaga Gaarka ah',
        featuredSub: 'Ka dhex bogo xulashada gaarka ah ee uu diyaariyay khabiirkayaga qaxwaha.',
        todaySpecial: 'Dalabka Gaarka ah ee Maanta',
        specialDesc: 'Qaxwo labalaab ah oo laga keenay beero sareeya ee Itoobiya oo lagu daray subag jilicsan oo Faransiis ah, sharoobada maple, iyo budada dahabka ah.',
        statsA: 'Beero Gaar ah',
        statsB: 'Wadamada Sourcing-ka',
        statsC: 'Koobabka Barista',
        statsD: 'Goobaha Aura',
      },
      AR: {
        tag: 'فن صناعة القهوة الفاخرة',
        title: 'عِش تجربة القهوة كما لم تفعل من قبل',
        sub: 'مشروبات تخصصية مُعدة يدوياً ببراعة، ومحاصيل عضوية نادرة، ومعجنات فرنسية طازجة في مساحات مخصصة للراحة والهدوء النفسي.',
        orderBtn: 'اطلب الآن',
        menuBtn: 'قائمة المشروبات',
        tableBtn: 'حجز طاولة',
        featuredTitle: 'روائع أورا المبتكرة',
        featuredSub: 'استكشف تشكيلة توقيع الحمص الرئيسي المحضرة بدقة متناهية لتناسب ذوقك الرفيع.',
        todaySpecial: 'مميز اليوم المنسق',
        specialDesc: 'جرعتان من إسبريسو غيشا الإثيوبي المغسول مع كريمة الزبدة البنية الفرنسية الفاخرة، شراب القيقب العضوي، وغبار الذهب عيار 24.',
        statsA: 'محاصيل تخصصية نادرة',
        statsB: 'دول الاستيراد المباشر',
        statsC: 'جوائز باريستا عالمية',
        statsD: 'صالات هادئة فاخرة',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const reviews = [
    { name: "Julianne Moore", role: "Specialty Critic", text: "Aura's slow-dripped cold brew tastes like melted chocolate, cherries, and dreams. Absolute benchmark for café culture.", rating: 5 },
    { name: "Chef Kenji Alt", role: "Gastronome", text: "The Truffle Flatbread combined with the single origin espresso was a revelation. High design meets high taste.", rating: 5 },
    { name: "Yuki Tanaka", role: "Architect", text: "The acoustics in the Chelsea lounge are masterfully quiet. You feel the coffee aroma as a complete visual symphony.", rating: 5 }
  ];

  return (
    <div id="home-view-root" className="relative overflow-hidden pt-20">
      {/* Floating beans decorative background */}
      <div className="absolute top-1/4 left-10 text-4xl select-none pointer-events-none float-bean opacity-20">
        🫘
      </div>
      <div className="absolute top-1/2 right-12 text-3xl select-none pointer-events-none float-bean-delayed opacity-25">
        🫘
      </div>

      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center py-20 bg-brand-gray">
        {/* Cinematic Backdrop Video / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gray via-brand-gray/95 to-brand-slate opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Col */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <span className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 text-xs text-gold font-mono tracking-wider uppercase animate-pulse mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span>{getTranslation('tag')}</span>
              </span>

              <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none">
                {getTranslation('title')}
              </h1>

              <p className="text-white/70 text-base sm:text-lg font-sans max-w-2xl leading-relaxed">
                {getTranslation('sub')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <button
                  id="hero-order-btn"
                  onClick={() => setView('order')}
                  className="bg-gradient-to-r from-orange to-gold hover:scale-105 active:scale-95 text-brand-gray font-button font-semibold rounded-xl px-8 py-4 text-sm transition-all shadow-lg shadow-gold/15 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{getTranslation('orderBtn')}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  id="hero-menu-btn"
                  onClick={() => setView('menu')}
                  className="bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 text-white font-button font-medium rounded-xl px-8 py-4 text-sm transition-all flex items-center justify-center space-x-2"
                >
                  <span>{getTranslation('menuBtn')}</span>
                </button>

                <button
                  id="hero-reserve-btn"
                  onClick={() => setView('reserve')}
                  className="bg-brand-slate border border-gold/30 hover:border-gold text-gold font-button font-medium rounded-xl px-8 py-4 text-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>{getTranslation('tableBtn')}</span>
                </button>
              </div>
            </div>

            {/* Premium Interactive Coffee Pouring Illustration / Art Col */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-brand-slate to-brand-gray border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl glow-gold group">
                {/* Radial golden pulse */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] group-hover:scale-110 transition-transform duration-700" />

                {/* Simulated Glass-morphic Coffee Cup with steam */}
                <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md p-6 flex flex-col items-center justify-center shadow-inner">
                  
                  {/* Steam Effect Lines */}
                  <div className="absolute -top-12 flex space-x-4">
                    <div className="w-1.5 h-16 bg-white/20 rounded-full steam-line" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-20 bg-white/15 rounded-full steam-line" style={{ animationDelay: '2s' }} />
                    <div className="w-1.5 h-14 bg-white/25 rounded-full steam-line" style={{ animationDelay: '4s' }} />
                  </div>

                  {/* Coffee Dripper Pouring Stream */}
                  <div className="absolute -top-16 w-1 h-32 bg-gradient-to-b from-coffee/80 via-gold/80 to-coffee rounded-full animate-pulse opacity-80" />

                  {/* Cup graphic with liquid filling animation */}
                  <div className="w-32 h-28 border-4 border-white/40 rounded-b-3xl relative overflow-hidden flex items-end">
                    {/* Cup handle */}
                    <div className="absolute top-6 -right-6 w-8 h-12 border-4 border-white/40 rounded-r-full" />
                    
                    {/* Dynamic Liquid */}
                    <div className="w-full bg-gradient-to-t from-coffee-dark via-coffee to-gold/90 pour-fill relative" style={{ height: '75%' }}>
                      {/* Cream swirl */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-cream/30 blur-[2px] rounded-full" />
                    </div>
                  </div>

                  <span className="mt-6 text-xs font-mono tracking-widest text-gold text-center uppercase">
                    Brewing Masterpiece
                  </span>
                </div>

                {/* Floating micro items */}
                <div className="absolute top-12 left-12 text-2xl animate-bounce" style={{ animationDuration: '4s' }}>🥐</div>
                <div className="absolute bottom-12 right-12 text-2xl animate-bounce" style={{ animationDuration: '6s' }}>🌾</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (ANIMATED COUNTERS) */}
      <section id="stats-section" className="bg-brand-gray py-12 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <span className="block text-3xl sm:text-5xl font-display font-bold text-gold">
                100%
              </span>
              <span className="block text-xs uppercase tracking-widest text-white/50 font-mono">
                {getTranslation('statsA')}
              </span>
            </div>
            <div className="space-y-2">
              <span className="block text-3xl sm:text-5xl font-display font-bold text-gold">
                12+
              </span>
              <span className="block text-xs uppercase tracking-widest text-white/50 font-mono">
                {getTranslation('statsB')}
              </span>
            </div>
            <div className="space-y-2">
              <span className="block text-3xl sm:text-5xl font-display font-bold text-gold">
                5 Gold
              </span>
              <span className="block text-xs uppercase tracking-widest text-white/50 font-mono">
                {getTranslation('statsC')}
              </span>
            </div>
            <div className="space-y-2">
              <span className="block text-3xl sm:text-5xl font-display font-bold text-gold">
                3 NY/LDN
              </span>
              <span className="block text-xs uppercase tracking-widest text-white/50 font-mono">
                {getTranslation('statsD')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC TODAY'S SPECIAL (CINEMATIC) */}
      <section id="today-special-section" className="py-24 bg-brand-slate relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 sm:p-16 relative overflow-hidden glow-gold grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono uppercase tracking-wider">
                <Coffee className="w-3.5 h-3.5 mr-1" /> Season Micro-Lot
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {getTranslation('todaySpecial')}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {getTranslation('specialDesc')}
              </p>

              {/* Ingredients & Prep details */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10 text-center">
                <div>
                  <span className="block text-gold font-mono font-bold text-sm">Gesha #4</span>
                  <span className="block text-[10px] text-white/40 uppercase">Bean Lot</span>
                </div>
                <div>
                  <span className="block text-gold font-mono font-bold text-sm">140 Cal</span>
                  <span className="block text-[10px] text-white/40 uppercase">Nutritional</span>
                </div>
                <div>
                  <span className="block text-gold font-mono font-bold text-sm">3.5 Mins</span>
                  <span className="block text-[10px] text-white/40 uppercase">Extraction</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  id="special-view-btn"
                  onClick={() => setView('menu')}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
                >
                  Explore Ingredients
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 max-w-sm">
                <img
                  id="special-img"
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=600&auto=format&fit=crop"
                  alt="Today Special Coffee"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-xs font-mono text-gold block mb-1">CUP OF EXCELLENCE WINNER</span>
                  <span className="font-display font-bold text-white text-lg">Aura Rose Butter Latte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section id="featured-products-section" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
              {getTranslation('featuredTitle')}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Curated Masterpieces
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto">
              {getTranslation('featuredSub')}
            </p>
          </div>

          <div id="featured-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                id={`featured-card-${item.id}`}
                className="group bg-brand-slate rounded-2xl border border-white/5 overflow-hidden shadow-2xl hover:border-gold/20 transition-all duration-500 relative flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="relative overflow-hidden h-64">
                  <img
                    referrerPolicy="no-referrer"
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-brand-gray/80 text-[10px] font-mono tracking-wider text-gold uppercase border border-gold/10">
                    {item.category}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-brand-gray/80 text-[10px] font-mono text-white flex items-center space-x-1 border border-white/5">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-lg font-mono text-gold font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      id={`add-btn-${item.id}`}
                      onClick={() => onAddToCart(item)}
                      className="bg-white/5 hover:bg-gold hover:text-brand-gray text-white text-xs font-semibold px-4 py-2 rounded-lg border border-white/10 hover:border-gold transition-all cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. USER TESTIMONIALS */}
      <section id="reviews-section" className="py-24 bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
              GUEST OPINIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Verified Connoisseur Reviews
            </h2>
          </div>

          <div id="reviews-slider" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                id={`review-card-${idx}`}
                className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex space-x-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold" />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                  <span className="text-white font-bold block">{rev.name}</span>
                  <span className="text-gold font-mono uppercase tracking-widest text-[10px] block">
                    {rev.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SOCIAL INSTAGRAM / TIKTOK GALLERY MOCK */}
      <section id="social-gallery" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">
              SOCIAL FEED
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Aura Moments on #Instagram
            </h2>
          </div>

          <div id="social-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400&auto=format&fit=crop'
            ].map((url, index) => (
              <div
                key={index}
                id={`social-card-${index}`}
                className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={url}
                  alt="Social Post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-gray/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 z-10">
                  <span className="text-gold font-mono font-bold text-sm flex items-center">
                    <Heart className="w-4 h-4 mr-1 fill-gold" /> 1.2k
                  </span>
                  <span className="text-white font-mono font-bold text-sm flex items-center">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
