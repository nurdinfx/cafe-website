export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  calories: number;
  ingredients: string[];
  prepTime: string;
  rating: number;
  image: string;
  isSeasonal?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize: 'Standard' | 'Grande' | 'Reserve';
  specialRequests?: string;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  tableNumber?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Order {
  id: string;
  items: CartItem[];
  type: 'pickup' | 'delivery';
  status: 'placed' | 'brewing' | 'out-for-delivery' | 'ready' | 'completed';
  total: number;
  pointsEarned: number;
  date: string;
  address?: string;
  couponUsed?: string;
  discountApplied?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  price: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  membershipLevel: 'Silver' | 'Gold' | 'VIP';
  points: number;
  orders: Order[];
  reservations: Reservation[];
  savedAddresses: string[];
  savedCards: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
