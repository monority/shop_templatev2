export interface User {
  uid: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  favorites: Product[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  discount: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  category: 'men' | 'women';
  movement: string;
  sizes: number[];
  colors: string[];
  features: string[];
  quantity?: number;
  size?: number | string;
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  count: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  coupon: { code: string; discount: number } | null;
}

export interface UI {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

export interface AppState {
  user: User;
  isAuthenticated: boolean;
  authLoading: boolean;
  cart: Cart;
  ui: UI;
}

export interface AppActions {
  setUser: (userData: Partial<User> | null) => void;
  initializeAuth: () => () => void;
  logout: () => Promise<void>;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number, size: number | string, color: string) => void;
  updateCartQuantity: (id: number, size: number | string, color: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  getCartCount: () => number;
  getCartSubtotal: () => number;
  getCartShipping: () => number;
  getCartDiscount: () => number;
  getCartTotal: () => number;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  hideToast: () => void;
}

export type AppStore = AppState & AppActions;