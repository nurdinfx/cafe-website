import { MenuItem, BlogPost, Review, FAQ, Event } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- Espresso ---
  {
    id: 'e1',
    name: 'Single-Origin Golden Espresso',
    price: 6.5,
    description: 'A vibrant shot of light-roasted Ethiopian Yirgacheffe, boasting sweet notes of jasmine, apricot, and honey with a bright citrus finish.',
    category: 'Espresso',
    calories: 5,
    ingredients: ['100% Arabica Espresso Beans', 'Filtered Water'],
    prepTime: '2 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510707577719-ee7c00180293?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'e2',
    name: 'Aura Signature Espresso Blend',
    price: 5.5,
    description: 'Our house blend composed of Brazilian, Colombian, and Indonesian beans, delivering a rich body with chocolate and toasted almond notes.',
    category: 'Espresso',
    calories: 5,
    ingredients: ['House Blend Espresso Beans', 'Filtered Water'],
    prepTime: '2 mins',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
  },

  // --- Coffee ---
  {
    id: 'c1',
    name: 'Kyoto-Style Cold Brew',
    price: 8.0,
    description: 'Slow-dripped over 18 hours through our glass tower, yielding a remarkably clean, sweet, and low-acid cup with notes of dark cocoa and cherry.',
    category: 'Coffee',
    calories: 10,
    ingredients: ['Kyoto Espresso Blend', 'Filtered Cold Water', 'Ice'],
    prepTime: '1 min',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
    isSeasonal: true,
  },
  {
    id: 'c2',
    name: 'Hario V60 Single-Origin Pour Over',
    price: 7.5,
    description: 'Slow-dripped pour-over crafted with your choice of current micro-lot beans, highlighting delicate floral and stone fruit tones.',
    category: 'Coffee',
    calories: 5,
    ingredients: ['Premium Single-Origin Beans', 'Filtered Hot Water'],
    prepTime: '4 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
  },

  // --- Latte ---
  {
    id: 'l1',
    name: 'Rose Gold Charcoal Latte',
    price: 8.5,
    description: 'Activated charcoal paired with organic rose hydrosol, sweetened with wild honey, and finished with velvety milk and real 24k gold leaf flakes.',
    category: 'Latte',
    calories: 180,
    ingredients: ['Espresso', 'Activated Charcoal', 'Rose Hydrosol', 'Organic Honey', 'Steamed Oat Milk', '24k Gold Flakes'],
    prepTime: '3 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'l2',
    name: 'Salted Madagascar Vanilla Latte',
    price: 7.5,
    description: 'House-made paste of fresh Madagascar vanilla beans and sea salt, dissolved in double espresso, steamed with premium whole milk.',
    category: 'Latte',
    calories: 210,
    ingredients: ['Espresso', 'Madagascar Vanilla Bean Paste', 'Sea Salt', 'Steamed Whole Milk'],
    prepTime: '3 mins',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
  },

  // --- Cappuccino ---
  {
    id: 'cap1',
    name: 'Velvet Cloud Cappuccino',
    price: 7.0,
    description: 'Equal parts double espresso, steamed milk, and ultra-dense, micro-foamed milk, dusted with organic Peruvian cocoa powder.',
    category: 'Cappuccino',
    calories: 120,
    ingredients: ['Espresso', 'Steamed Milk', 'Thick Microfoam', 'Cocoa Dusting'],
    prepTime: '3 mins',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop',
  },

  // --- Tea ---
  {
    id: 't1',
    name: 'Ceremonial Uji Matcha Latte',
    price: 8.5,
    description: 'Whisked ceremonial-grade matcha from Uji, Kyoto, poured over sweet cream and steamed almond milk. Earthy, rich, and highly energizing.',
    category: 'Tea',
    calories: 140,
    ingredients: ['Uji Ceremonial Matcha', 'Warm Water', 'Organic Maple Syrup', 'Almond Milk'],
    prepTime: '3 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop',
  },

  // --- Fresh Juice ---
  {
    id: 'j1',
    name: 'Aura Glow Cold-Pressed Juice',
    price: 9.0,
    description: 'Cold-pressed organic orange, ginger, fresh turmeric root, carrots, and yellow apples. High in antioxidants and vitamins.',
    category: 'Fresh Juice',
    calories: 110,
    ingredients: ['Organic Orange', 'Ginger Root', 'Turmeric Root', 'Carrot', 'Yellow Apple'],
    prepTime: '2 mins',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop',
  },

  // --- Smoothies ---
  {
    id: 's1',
    name: 'Blue Velvet Collagen Smoothie',
    price: 11.5,
    description: 'Organic blueberries, raw almond butter, organic hemp seeds, marine collagen peptides, and blue spirulina blended with vanilla oat milk.',
    category: 'Smoothies',
    calories: 320,
    ingredients: ['Blueberries', 'Blue Spirulina', 'Almond Butter', 'Hemp Seeds', 'Collagen Peptides', 'Oat Milk'],
    prepTime: '3 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600&auto=format&fit=crop',
  },

  // --- Milkshakes ---
  {
    id: 'm1',
    name: 'Salted Caramel Hazelnut Shake',
    price: 9.5,
    description: 'Premium vanilla bean gelato, roasted Oregon hazelnuts, hand-harvested sea salt, and house-made dark caramel blended with grass-fed organic milk.',
    category: 'Milkshakes',
    calories: 480,
    ingredients: ['Vanilla Gelato', 'Oregon Hazelnuts', 'Sea Salt', 'Caramel Syrup', 'Grass-fed Milk', 'Whipped Cream'],
    prepTime: '4 mins',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
  },

  // --- Breakfast ---
  {
    id: 'b1',
    name: 'Smoked Salmon Caviar Toast',
    price: 18.0,
    description: 'Toasted artisanal sourdough, whipped organic cream cheese, premium Scottish smoked salmon, sliced heirloom cucumber, fresh dill, and wild sturgeon caviar.',
    category: 'Breakfast',
    calories: 420,
    ingredients: ['Sourdough Bread', 'Whipped Cream Cheese', 'Smoked Salmon', 'Cucumber', 'Dill', 'Sturgeon Caviar', 'Capers'],
    prepTime: '7 mins',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'b2',
    name: 'Aura Signature Avocado Toast',
    price: 14.5,
    description: 'Crushed Hass avocado, organic heirloom cherry tomatoes, French feta cheese, pumpkin seed oil, and chili flakes on fresh multigrain toast.',
    category: 'Breakfast',
    calories: 380,
    ingredients: ['Multigrain Bread', 'Avocado', 'Cherry Tomatoes', 'Feta Cheese', 'Pumpkin Seed Oil', 'Chili Flakes'],
    prepTime: '5 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=600&auto=format&fit=crop',
  },

  // --- Lunch ---
  {
    id: 'lu1',
    name: 'Truffle Burrata Artisan Flatbread',
    price: 19.5,
    description: 'Italian black truffle oil base, fresh burrata cheese, wild arugula, caramelized organic figs, and a premium aged balsamic glaze drizzle.',
    category: 'Lunch',
    calories: 550,
    ingredients: ['Artisan Flatbread Dough', 'Truffle Oil', 'Burrata Cheese', 'Arugula', 'Organic Figs', 'Aged Balsamic'],
    prepTime: '10 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop',
  },

  // --- Desserts ---
  {
    id: 'd1',
    name: 'Signature Espresso Tiramisu',
    price: 11.0,
    description: 'Classic Italian ladyfingers soaked in our Kyoto Cold Brew and sweet dark rum, layered with rich whipped egg yolk-mascarpone and finished with cocoa.',
    category: 'Desserts',
    calories: 340,
    ingredients: ['Mascarpone Cheese', 'Ladyfingers', 'Kyoto Cold Brew', 'Rum', 'Organic Cocoa', 'Cage-Free Eggs'],
    prepTime: '3 mins',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop',
  },

  // --- Pastries ---
  {
    id: 'p1',
    name: 'Aged Butter Almond Croissant',
    price: 6.5,
    description: 'A 24-hour laminated pastry made with premium French cultured butter, filled with rich almond frangipane, topped with sliced toasted almonds.',
    category: 'Pastries',
    calories: 320,
    ingredients: ['Laminated Pastry Flour', 'French Cultured Butter', 'Almond Frangipane', 'Toasted Almond Slices', 'Powdered Sugar'],
    prepTime: '2 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
  },

  // --- Kids Menu ---
  {
    id: 'k1',
    name: 'Cloud Nine Babyccino',
    price: 4.0,
    description: 'Steam microfoamed organic milk (dairy or oat) topped with marshmallows, organic chocolate syrup drizzle, and chocolate sprinkles.',
    category: 'Kids Menu',
    calories: 80,
    ingredients: ['Microfoamed Milk', 'Mini Marshmallows', 'Chocolate Syrup', 'Sprinkles'],
    prepTime: '2 mins',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600&auto=format&fit=crop',
  },

  // --- Seasonal Drinks ---
  {
    id: 'sd1',
    name: 'Winter Truffle White Mocha',
    price: 9.5,
    description: 'Silky white chocolate ganache blended with shavings of winter black truffle, double espresso, and creamy oat milk.',
    category: 'Seasonal Drinks',
    calories: 290,
    ingredients: ['Espresso', 'White Chocolate Ganache', 'Winter Black Truffle Shavings', 'Oat Milk'],
    prepTime: '3 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600&auto=format&fit=crop',
    isSeasonal: true,
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of Slow Drip: Why Kyoto Cold Brew Reigns Supreme',
    excerpt: 'Explore the fascinating history and mechanics behind our 18-hour glass tower slow-drip coffee system.',
    content: 'At Aura Café, we believe that coffee is a slow and beautiful craft. Our Kyoto Cold Brew is brewed drip-by-drip over eighteen hours using custom-made glass towers. This process, dating back to 17th-century Japan, uses ice-cold water that touches each coffee grind exactly once. The outcome is an extraordinarily clean, sweet cup of coffee free of bitterness and high acidity. We source high-density washed Colombian coffee specifically for this tower to preserve notes of black cherry and dark chocolate.',
    readTime: '4 mins read',
    author: 'Elena Rostova (Master Roaster)',
    date: 'June 28, 2026',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop',
    category: 'Coffee Education',
  },
  {
    id: 'b2',
    title: 'Behind the Beans: Sourcing the Ethiopian Yirgacheffe Micro-Lot',
    excerpt: 'Journey with our green buyer to the high-altitude volcanic soils of southern Ethiopia.',
    content: 'Sourcing single-origin beans requires patience, deep relationships, and extreme selection. This winter, our sourcing team visited the high-altitude washing stations of Yirgacheffe, Ethiopia. Operating at over 2,200 meters above sea level in rich volcanic soil, these farms yield heirloom varieties of Arabica with unbelievable floral clarity. We contracted a special micro-lot from the Konga cooperative, where cherries are hand-sorted three times. When lightly roasted in our state-of-the-art Loring roaster, it unlocks sweet notes of white jasmine and fresh apricot.',
    readTime: '6 mins read',
    author: 'Marcus Vance (Green Coffee Buyer)',
    date: 'May 14, 2026',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop',
    category: 'Bean Sourcing',
  },
  {
    id: 'b3',
    title: 'Designing Cozy Spaces: Coffee and Architecture',
    excerpt: 'How spatial design, Japanese wabi-sabi aesthetics, and modern minimalism enhance your sensory experience.',
    content: 'The setting in which you drink your espresso changes its taste. Scientific studies show high-ceiling spaces with warm, diffused natural lighting and wood materials amplify the sweetness perception of specialty coffee. When designing Aura Café, our lead architect blended Japanese minimalism with industrial luxury. By utilizing textured clay-rendered walls, white oak furniture, raw brass accents, and custom acoustics, we created a sanctuary where you can fully immerse yourself in coffee aromas without audio distractions.',
    readTime: '5 mins read',
    author: 'Sofia Kenin (Lead Architect)',
    date: 'April 20, 2026',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=600&auto=format&fit=crop',
    category: 'Design & Culture',
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Charlotte Sterling',
    rating: 5,
    text: 'Aura Café sets an entirely new standard for luxury. The Kyoto Cold Brew is exceptional, smooth and complex, and the rose gold latte feels like art. The design is absolutely gorgeous.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 'r2',
    author: 'Devon Carter',
    rating: 5,
    text: 'The best espresso in the city, hands down. The single-origin Ethiopian espresso is dialed in perfectly, showcasing brilliant floral and jasmine notes. Service is incredibly refined.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 'r3',
    author: 'Amara Al-Jamil',
    rating: 5,
    text: 'A beautiful sanctuary. I booked a private tasting table for client meetings, and the experience was flawless. Highly recommend the Avocado Toast and Uji Matcha Latte.',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'Where do you source your coffee beans?',
    answer: 'We source 100% Arabica specialty coffee directly from ethical micro-lot farms in Ethiopia, Colombia, Brazil, and Sumatra. All beans are certified organic and roasted weekly in-house to guarantee freshness.',
    category: 'Coffee & Sourcing'
  },
  {
    id: 'f2',
    question: 'Can I book a table in advance?',
    answer: 'Yes, you can reserve our standard lounge seating, quiet workstation desks, or premium tasting booths through our online reservation system. Tables are held for 15 minutes past reservation times.',
    category: 'Reservations'
  },
  {
    id: 'f3',
    question: 'Do you offer vegan and gluten-free options?',
    answer: 'Absolutely. We offer organic oat, almond, and soy milk alternatives at no extra cost. Several breakfast and pastry items are gluten-free, including our vegan wild berry bars.',
    category: 'Dietary & Menu'
  },
  {
    id: 'f4',
    question: 'How does your Loyalty & Rewards system work?',
    answer: 'You earn 10 points for every dollar spent. Your points can be redeemed for complimentary drinks, pastries, or premium roasted retail coffee beans. Membership levels (Silver, Gold, VIP) unlock free birthday treats and exclusive tasting events.',
    category: 'Loyalty Program'
  }
];

export const EVENTS: Event[] = [
  {
    id: 'ev1',
    title: 'Coffee Sensory & Cupping Masterclass',
    date: 'July 15, 2026',
    time: '6:00 PM - 8:00 PM',
    description: 'Join our Master Roaster for an intimate cupping session. Learn to identify aroma profiles, acidity structures, and flavor notes of five single-origin micro-lot beans.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop',
    price: 45
  },
  {
    id: 'ev2',
    title: 'Aura Jazz & Late Night Espresso Lounge',
    date: 'July 28, 2026',
    time: '8:00 PM - 11:00 PM',
    description: 'An evening of live contemporary jazz paired with exclusive late-night cold brew mocktails, nitro espressos, and artisanal chocolate pairings.',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=600&auto=format&fit=crop',
    price: 15
  }
];
