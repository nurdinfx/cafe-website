import { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Clock, HelpCircle, ChevronRight, MapPin, Eye, Heart, Share2 } from 'lucide-react';
import { BLOG_POSTS, EVENTS, FAQS } from '../../data';

interface OtherViewsProps {
  section: 'about' | 'gallery' | 'events' | 'blog' | 'faqs';
  language: 'EN' | 'SO' | 'AR';
}

export default function OtherViews({ section, language }: OtherViewsProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  const getTranslation = (key: string) => {
    const dict = {
      EN: {
        aboutTitle: 'Our Heritage & Journey',
        aboutSub: 'Blending Japanese slow-minimalism with Italian espresso engineering.',
        galleryTitle: 'Sensory Visual Atelier',
        gallerySub: 'A look inside our roasting chambers, custom spaces, and daily craft.',
        eventsTitle: 'Atelier Sensory Events',
        eventsSub: 'Join us for intimate roasting masterclasses, contemporary jazz, and micro-lot cuppings.',
        blogTitle: 'Coffee & Sourcing Chronicles',
        blogSub: 'Education directly from our green coffee buyers and master roasters.',
        faqsTitle: 'Connoisseur Queries',
        faqsSub: 'Everything you need to know about our sourcing, loyalty points, and lounge reservations.',
      },
      SO: {
        aboutTitle: 'Taariikhda Aura Café',
        aboutSub: 'Isku darka farsamada talyaaniga iyo degenaanshaha jabbaanka.',
        galleryTitle: 'Atelier-ga Sawirada Aura',
        gallerySub: 'Daawo sawirada rasmiga ah ee beeraheena, goobaha diyaarinta, iyo koobabka.',
        eventsTitle: 'Munaasabadaha Qaxwaha ee Aura',
        eventsSub: 'Ku biir tababarada gaarka ah, habeenada jazz-ka, iyo bandhigyada kale.',
        blogTitle: 'Qoraalada iyo Waxbarashada',
        blogSub: 'Qoraalo waxbarasho oo ku saabsan beerashada iyo karkarinta kafeega heer sare ah.',
        faqsTitle: 'Su\'aalaha badanaa la isweydiiyo',
        faqsSub: 'Dhamaan wixii aad u baahan tahay inaad ka ogaato boosaska miisaska ama dhibcaha.',
      },
      AR: {
        aboutTitle: 'إرثنا ورحلتنا الفنية',
        aboutSub: 'مزج البساطة اليابانية المتأنية مع هندسة الإسبريسو الإيطالية الكلاسيكية.',
        galleryTitle: 'أتيليه التذوق البصري الفاخر',
        gallerySub: 'نظرة داخل غرف التحميص الخاصة بنا ومساحاتنا المصممة بدقة لالتقاط اللحظات.',
        eventsTitle: 'فعاليات تذوق أورا الحصرية',
        eventsSub: 'انضم إلينا لحضور ورش عمل تحميص متقدمة، أمسيات جاز هادئة، وحفلات تذوق نادرة.',
        blogTitle: 'مدونة القهوة والاستيراد المباشر',
        blogSub: 'دروس تعليمية وثقافية تأتيكم مباشرة من خبراء استيراد البن ومحمصينا الرئيسيين.',
        faqsTitle: 'الاستفسارات والأسئلة الشائعة',
        faqsSub: 'كل ما تحتاج لمعرفته حول مصادرنا النادرة، رصيد نقاط الولاء، وحجوزات طاولات الصالون.',
      }
    };
    return dict[language][key as keyof typeof dict['EN']] || key;
  };

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=600&auto=format&fit=crop', title: 'Atelier Space', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop', title: 'Sensory Cupping', category: 'Roasting' },
    { url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop', title: 'Unwashed Gesha Cherries', category: 'Farming' },
    { url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop', title: 'Barista Extraction', category: 'Brewing' },
    { url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop', title: 'Cold Brew Tower', category: 'Brewing' },
    { url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=600&auto=format&fit=crop', title: 'Rose Gold Latte', category: 'Creations' }
  ];

  return (
    <div id="other-views-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      
      {/* ==================== ABOUT VIEW ==================== */}
      {section === 'about' && (
        <div id="about-section" className="space-y-16 animate-fade-in">
          <div className="text-center space-y-4">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">THE ORIGIN STORY</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">{getTranslation('aboutTitle')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{getTranslation('aboutSub')}</p>
          </div>

          {/* Timeline Grid */}
          <div id="about-timeline" className="max-w-4xl mx-auto relative border-l-2 border-gold/20 pl-8 space-y-12">
            {[
              { year: '2022', title: 'The Sacred Roast', text: 'Our journey began in a tiny custom roastery in Portland, sourcing three micro-lots of washed Ethiopian heirloom coffees and perfecting thermal roasting profiles.' },
              { year: '2024', title: 'Chelsea Sanctuary Lounge', yearColor: 'text-gold', text: 'We opened our flagship sensory lounge in Chelsea, NY, blending Japanese architectural acoustics with minimalist white oak furniture and slow cold brew towers.' },
              { year: '2026', title: 'The Global Micro-Lot Consortium', text: 'Today, we support direct-trade agreements with 14 organic coffee farming cooperatives across East Africa and South America, guaranteeing fair wages and pristine crop selections.' }
            ].map((node, idx) => (
              <div key={idx} className="relative">
                {/* Node dot */}
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-brand-gray border-2 border-gold flex items-center justify-center text-[10px]" />
                <span className="font-mono text-gold font-bold text-lg block">{node.year}</span>
                <h3 className="font-display font-bold text-lg text-white mt-1">{node.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">{node.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== GALLERY VIEW ==================== */}
      {section === 'gallery' && (
        <div id="gallery-section" className="space-y-16 animate-fade-in">
          <div className="text-center space-y-4">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">VISUAL PORTFOLIO</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">{getTranslation('galleryTitle')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{getTranslation('gallerySub')}</p>
          </div>

          <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden border border-white/5 aspect-video shadow-2xl">
                <img
                  referrerPolicy="no-referrer"
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-brand-gray/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6 z-10">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-widest">{img.category}</span>
                  <h3 className="font-display font-bold text-lg text-white">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== EVENTS VIEW ==================== */}
      {section === 'events' && (
        <div id="events-section" className="space-y-16 animate-fade-in">
          <div className="text-center space-y-4">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">SENSORY RESERVED EXPERIENCES</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">{getTranslation('eventsTitle')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{getTranslation('eventsSub')}</p>
          </div>

          <div id="events-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {EVENTS.map((ev) => (
              <div key={ev.id} className="group bg-brand-slate rounded-3xl border border-white/5 overflow-hidden shadow-2xl hover:border-gold/20 transition-all duration-500 flex flex-col justify-between">
                <div className="h-64 overflow-hidden relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-gold text-brand-gray text-xs font-mono font-bold shadow-md">
                    ${ev.price} Ticket
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-wider block flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" /> {ev.date} &middot; {ev.time}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-gold transition-colors">{ev.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{ev.description}</p>
                  
                  <button
                    id={`book-event-${ev.id}`}
                    onClick={() => alert(`Masterclass registration for "${ev.title}" is in demo mode. Present your name at our Chelsea lounge on ${ev.date}!`)}
                    className="w-full bg-white/5 hover:bg-gold hover:text-brand-gray text-white text-xs font-semibold py-3 rounded-xl border border-white/10 hover:border-gold transition-colors cursor-pointer"
                  >
                    Reserve Masterclass Entry Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== BLOG VIEW ==================== */}
      {section === 'blog' && (
        <div id="blog-section" className="space-y-16 animate-fade-in">
          <div className="text-center space-y-4">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">COFFEE INTELLECTUALS</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">{getTranslation('blogTitle')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{getTranslation('blogSub')}</p>
          </div>

          <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="group bg-brand-slate rounded-3xl border border-white/5 overflow-hidden shadow-2xl hover:border-gold/20 transition-all duration-500 flex flex-col justify-between">
                <div className="h-48 overflow-hidden relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 px-2 py-0.5 rounded bg-brand-gray/80 text-[10px] font-mono text-gold uppercase border border-gold/10">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block mb-2">{post.date} &middot; {post.readTime}</span>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-white/60 text-xs mt-2 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>

                  <button
                    id={`read-blog-btn-${post.id}`}
                    onClick={() => setActiveBlogId(activeBlogId === post.id ? null : post.id)}
                    className="mt-4 text-xs font-mono text-gold hover:text-white flex items-center space-x-1 group/btn"
                  >
                    <span>{activeBlogId === post.id ? 'Close Article ✕' : 'Read Article'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {activeBlogId === post.id && (
                  <div id={`blog-body-${post.id}`} className="px-6 pb-6 pt-2 border-t border-white/5 animate-fade-in text-xs leading-relaxed text-white/80 space-y-4">
                    <p className="whitespace-pre-line font-serif italic text-white/90">"{post.content}"</p>
                    <span className="block text-[10px] text-gold font-mono text-right">- By {post.author}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== FAQS VIEW ==================== */}
      {section === 'faqs' && (
        <div id="faqs-section" className="space-y-16 animate-fade-in">
          <div className="text-center space-y-4">
            <span className="text-gold text-xs font-mono uppercase tracking-[0.25em] block">FREQUENT QUESTIONS</span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">{getTranslation('faqsTitle')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{getTranslation('faqsSub')}</p>
          </div>

          <div id="faqs-accordions" className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-brand-slate border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center text-sm font-semibold hover:text-gold transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-gold font-mono font-bold text-lg">{activeFaq === faq.id ? '−' : '+'}</span>
                </button>
                
                {activeFaq === faq.id && (
                  <div id={`faq-answer-${faq.id}`} className="px-6 pb-6 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
