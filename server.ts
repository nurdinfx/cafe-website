import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { MENU_ITEMS, BLOG_POSTS, FAQS, EVENTS, REVIEWS } from './src/data.js';

// Resolve directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not defined. AI Chat will run in offline demo mode.');
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // IN-MEMORY SIMULATED DB FOR REAL-TIME SESSIONS
  const sessionDb = {
    orders: [
      {
        id: 'ORD-8431',
        items: [
          {
            menuItem: MENU_ITEMS[0], // Single-Origin Golden Espresso
            quantity: 1,
            selectedSize: 'Standard' as const,
            specialRequests: 'No sugar'
          },
          {
            menuItem: MENU_ITEMS[12], // Aged Butter Almond Croissant
            quantity: 1,
            selectedSize: 'Standard' as const
          }
        ],
        type: 'pickup' as const,
        status: 'completed' as const,
        total: 13.0,
        pointsEarned: 130,
        date: '2026-07-01T14:32:00.000Z',
      },
      {
        id: 'ORD-9204',
        items: [
          {
            menuItem: MENU_ITEMS[4], // Rose Gold Charcoal Latte
            quantity: 2,
            selectedSize: 'Grande' as const,
            specialRequests: 'Oat milk, extra hot'
          }
        ],
        type: 'delivery' as const,
        status: 'ready' as const,
        total: 17.0,
        pointsEarned: 170,
        date: '2026-07-02T06:45:00.000Z',
        address: '142 Luxury Penthouse Ave, Suite 4B'
      }
    ] as any[],
    reservations: [
      {
        id: 'RES-103',
        date: '2026-07-05',
        time: '18:30',
        guests: 2,
        name: 'Charlotte Sterling',
        email: 'charlotte@sterling.com',
        phone: '+1 (555) 304-9214',
        specialRequests: 'Window seat with city view please.',
        tableNumber: 4,
        status: 'confirmed' as const
      },
      {
        id: 'RES-104',
        date: '2026-07-06',
        time: '10:00',
        guests: 4,
        name: 'Dr. Evelyn Martinez',
        email: 'evelyn.m@hospital.org',
        phone: '+1 (555) 831-2904',
        specialRequests: 'Conducting a business meeting, quiet corner table.',
        tableNumber: 8,
        status: 'pending' as const
      }
    ] as any[],
    loyalty: {
      points: 450,
      membershipLevel: 'Gold' as string,
      claimedRewards: [] as string[]
    }
  };

  // --- API ENDPOINTS ---

  // Static Data Queries
  app.get('/api/menu', (req, res) => {
    res.json(MENU_ITEMS);
  });

  app.get('/api/blogs', (req, res) => {
    res.json(BLOG_POSTS);
  });

  app.get('/api/reviews', (req, res) => {
    res.json(REVIEWS);
  });

  app.get('/api/faqs', (req, res) => {
    res.json(FAQS);
  });

  app.get('/api/events', (req, res) => {
    res.json(EVENTS);
  });

  // Orders Management
  app.get('/api/orders', (req, res) => {
    res.json(sessionDb.orders);
  });

  app.post('/api/orders', (req, res) => {
    try {
      const { items, type, address, couponUsed, discountApplied, total } = req.body;
      
      if (!items || !items.length) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      const pointsEarned = Math.floor(total * 10);
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        items,
        type,
        status: 'placed' as const,
        total,
        pointsEarned,
        date: new Date().toISOString(),
        address,
        couponUsed,
        discountApplied
      };

      sessionDb.orders.unshift(newOrder);
      sessionDb.loyalty.points += pointsEarned;
      
      // Upgrade tiers based on points
      if (sessionDb.loyalty.points >= 1000) {
        sessionDb.loyalty.membershipLevel = 'VIP';
      } else if (sessionDb.loyalty.points >= 400) {
        sessionDb.loyalty.membershipLevel = 'Gold';
      }

      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Server error placing order' });
    }
  });

  // Reservations Management
  app.get('/api/reservations', (req, res) => {
    res.json(sessionDb.reservations);
  });

  app.post('/api/reservations', (req, res) => {
    try {
      const { date, time, guests, name, email, phone, specialRequests } = req.body;
      
      if (!date || !time || !guests || !name || !email) {
        return res.status(400).json({ error: 'Missing reservation details' });
      }

      const newReservation = {
        id: `RES-${Math.floor(100 + Math.random() * 900)}`,
        date,
        time,
        guests: Number(guests),
        name,
        email,
        phone,
        specialRequests,
        tableNumber: Math.floor(1 + Math.random() * 12),
        status: 'pending' as const
      };

      sessionDb.reservations.unshift(newReservation);
      res.status(201).json(newReservation);
    } catch (error) {
      console.error('Error booking table:', error);
      res.status(500).json({ error: 'Server error booking table' });
    }
  });

  // Loyalty Program Details
  app.get('/api/loyalty', (req, res) => {
    res.json(sessionDb.loyalty);
  });

  app.post('/api/loyalty/claim', (req, res) => {
    const { rewardId, pointsCost } = req.body;
    if (sessionDb.loyalty.points < pointsCost) {
      return res.status(400).json({ error: 'Insufficient loyalty points' });
    }

    sessionDb.loyalty.points -= pointsCost;
    sessionDb.loyalty.claimedRewards.push(rewardId);
    res.json({ success: true, pointsLeft: sessionDb.loyalty.points });
  });

  // Admin Panel & Analytics Dashboard
  app.get('/api/analytics', (req, res) => {
    const salesTotal = sessionDb.orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = sessionDb.orders.length;
    const reservationCount = sessionDb.reservations.length;
    
    // Simple categorized sales
    const categories: Record<string, number> = {};
    sessionDb.orders.forEach(order => {
      order.items.forEach(item => {
        const category = item.menuItem.category;
        categories[category] = (categories[category] || 0) + (item.menuItem.price * item.quantity);
      });
    });

    const categoryStats = Object.keys(categories).map(name => ({
      name,
      value: Number(categories[name].toFixed(2))
    }));

    // Generate simulated hourly sales for today
    const salesHistory = [
      { time: '08:00', sales: 120, orders: 12 },
      { time: '10:00', sales: 240, orders: 20 },
      { time: '12:00', sales: 190, orders: 15 },
      { time: '14:00', sales: 150, orders: 11 },
      { time: '16:00', sales: 80, orders: 6 },
      { time: '18:00', sales: 310, orders: 18 },
    ];

    res.json({
      salesTotal: Number(salesTotal.toFixed(2)),
      orderCount,
      reservationCount,
      customerCount: 154,
      categoryStats,
      salesHistory
    });
  });

  // AI Chatbot with Server-Side Gemini API
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const client = getGeminiClient();
    if (!client) {
      // Fallback offline responses if API Key is missing
      const textLower = message.toLowerCase();
      let reply = "Hello! I am Aura's luxury AI sommelier. Currently, my live server connection is in demo mode, but I can happily guide you conceptually. ";

      if (textLower.includes('menu') || textLower.includes('drink') || textLower.includes('recommend')) {
        reply += "Our signature creation is the **Rose Gold Charcoal Latte** ($8.50), featuring double espresso, activated charcoal, organic rose water, and real 24k gold leaf flakes. Pair it with an **Aged Butter Almond Croissant** ($6.5) for pure ecstasy!";
      } else if (textLower.includes('table') || textLower.includes('book') || textLower.includes('reserve')) {
        reply += "You can book a luxury tasting table directly on our 'Reservations' tab in the app! Select your time, guests, and custom table requirements, and we will hold it for you.";
      } else if (textLower.includes('somali') || textLower.includes('ahlan') || textLower.includes('baro')) {
        reply = "Ksoo dhawaada Aura Café! Waxaan ahay kaaliyahaaga gaarka ah ee dhinaca qaxwaha. Miyaad rabtaa inaan kuu sharxo dalabyada maanta ama miiska kuu qabto? ☕✨";
      } else if (textLower.includes('arabic') || textLower.includes('مرحبا') || textLower.includes('قهوة')) {
        reply = "أهلاً بك في مقهى أورا الفاخر! أنا خبير القهوة الذكي الخاص بك. هل ترغب في التعرف على قائمة المشروبات المميزة لدينا أو حجز طاولة تذوق؟ ☕✨";
      } else {
        reply += "I recommend trying our slow-dripped Kyoto Cold Brew, crafted in our 18-hour slow-drip glass towers. Feel free to explore the interactive tabs to view our full menu, book tables, or order online directly!";
      }

      return res.json({ text: reply });
    }

    try {
      // Build systematic instructions including menus and cafe context
      const systemPrompt = `
        You are "Aura Sommelier", the elite AI Coffee Sommelier, Culinary Advisor, and Hospitality Concierge for Aura Café.
        Aura Café is an ultra-luxury modern coffee lounge, famous for combining hand-crafted specialty micro-lots, visual art, wabi-sabi spaces, and top-tier hospitality.

        AURA CAFE CONTEXT:
        - Signature items: "Rose Gold Charcoal Latte" ($8.50, features 24k gold flakes), "Kyoto-Style Cold Brew" ($8.0, 18-hour slow drip), "Single-Origin Golden Espresso" ($6.5, Ethiopian bean), "Ceremonial Uji Matcha Latte" ($8.5), "Smoked Salmon Caviar Toast" ($18.0), "Truffle Burrata Artisan Flatbread" ($19.5), and "Signature Espresso Tiramisu" ($11.0).
        - Dietary: We offer organic oat, almond, and soy milk at no extra charge. Organic gluten-free options are available.
        - Sourcing: 100% Arabica washed/natural single-origins directly contracted.
        - Reservations: Table booking, workstation booking, and private tasting booth bookings can be made directly. We hold bookings for 15 mins.
        - Loyalty Program: 10 points per $1 spent. Membership tiers: Silver, Gold, VIP. Points unlock free drinks & private cupping masterclasses.

        TONE & PERSONALITY:
        - Extremely sophisticated, polite, poetic, warm, and cinematic. You speak like a world-class barista working at a Michelin-star dining lounge.
        - Emphasize coffee aromas, taste notes, and luxury lifestyles.
        - Support multiple languages with master fluency: English, Somali (Soomaali), and Arabic (العربية). If a customer asks in Somali, reply in poetic Somali. If they ask in Arabic, reply in perfect Arabic.
        - Use emojis elegantly (☕, ✨, 🥐, 🌿, 🌟).

        When recommended items, refer to our actual MENU items listed above. If the customer wants to book a table, explain that they can do so using the "Reservations" tab in the app interface, or offer to simulate the booking.
      `;

      // Format previous chat history for @google/genai SDK
      // The history should be array of objects with role 'user' | 'model' and parts.
      const formattedContents: any[] = [];
      if (history && history.length) {
        history.forEach((h: any) => {
          formattedContents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        });
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });

      const replyText = response.text || "I apologize, but I am momentarily experiencing an espresso overload. Please let me know how I can guide you again.";
      res.json({ text: replyText });

    } catch (error) {
      console.error('Error contacting Gemini:', error);
      res.status(500).json({ error: 'Failed to communicate with the AI Coffee Sommelier' });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AURA SERVER] Coffee is brewing on http://0.0.0.0:${PORT}`);
  });
}

startServer();
