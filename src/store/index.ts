import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, User, CartItem, Cart, UI } from '../types';

const EMPTY_USER: User = {
  uid: '',
  username: '',
  email: '',
  phone: '',
  address: '',
  role: '',
  createdAt: '',
  favorites: [],
};

interface AppStore {
  user: User;
  isAuthenticated: boolean;
  authLoading: boolean;
  cart: Cart;
  ui: UI;
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

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: { ...EMPTY_USER },
      isAuthenticated: false,
      authLoading: false,
      cart: { items: [], coupon: null },
      ui: { mobileMenuOpen: false, searchOpen: false, toast: null },

      setUser: (userData) => set({
        user: userData ? { ...EMPTY_USER, ...userData } : { ...EMPTY_USER },
        isAuthenticated: !!userData,
        authLoading: false,
      }),

      initializeAuth: () => () => {},

      logout: async () => {
        get().setUser(null);
        get().clearCart();
      },

      toggleFavorite: (product) => {
        const { user } = get();
        const favs = user.favorites ?? [];
        const exists = favs.some((f) => f.id === product.id);
        set({
          user: {
            ...user,
            favorites: exists
              ? favs.filter((f) => f.id !== product.id)
              : [...favs, product],
          },
        });
      },

      isFavorite: (productId) => get().user.favorites?.some((f) => f.id === productId) ?? false,

      addToCart: (product) => {
        const { cart } = get();
        const key = (i: CartItem) => `${i.id}-${i.size}-${i.color}`;
        const pKey = key(product as unknown as CartItem);
        const exists = cart.items.find((i) => key(i) === pKey);
        const items = exists
          ? cart.items.map((i) =>
              key(i) === pKey
                ? { ...i, quantity: i.quantity + (product.quantity ?? 1) }
                : i
            )
          : [...cart.items, { ...product, quantity: product.quantity ?? 1 }];
        set({ cart: { ...cart, items } });
        get().showToast(`${product.name} added to cart`, 'success');
      },

      removeFromCart: (id, size, color) => {
        const { cart } = get();
        set({
          cart: {
            ...cart,
            items: cart.items.filter(
              (i) => !(i.id === id && i.size === size && i.color === color)
            ),
          },
        });
      },

      updateCartQuantity: (id, size, color, quantity) => {
        if (quantity < 1) return;
        const { cart } = get();
        set({
          cart: {
            ...cart,
            items: cart.items.map((i) =>
              i.id === id && i.size === size && i.color === color
                ? { ...i, quantity }
                : i
            ),
          },
        });
      },

      clearCart: () => set((s) => ({ cart: { ...s.cart, items: [] } })),

      applyCoupon: (code, discount) =>
        set((s) => ({
          cart: { ...s.cart, coupon: { code, discount } },
        })),

      getCartCount: () => get().cart.items.reduce((t, i) => t + i.quantity, 0),

      getCartSubtotal: () => get().cart.items.reduce((t, i) => t + i.price * i.quantity, 0),

      getCartShipping: () => (get().getCartSubtotal() > 200 ? 0 : 15),

      getCartDiscount: () => {
        const { coupon } = get().cart;
        return coupon ? get().getCartSubtotal() * (coupon.discount / 100) : 0;
      },

      getCartTotal: () =>
        get().getCartSubtotal() + get().getCartShipping() - get().getCartDiscount(),

      toggleMobileMenu: () =>
        set((s) => ({
          ui: { ...s.ui, mobileMenuOpen: !s.ui.mobileMenuOpen },
        })),

      closeMobileMenu: () =>
        set((s) => ({
          ui: { ...s.ui, mobileMenuOpen: false },
        })),

      toggleSearch: () =>
        set((s) => ({
          ui: { ...s.ui, searchOpen: !s.ui.searchOpen },
        })),

      showToast: (message, type = 'info', duration = 3000) => {
        set((s) => ({ ui: { ...s.ui, toast: { message, type } } }));
        setTimeout(() => set((s) => ({ ui: { ...s.ui, toast: null } })), duration);
      },

      hideToast: () => set((s) => ({ ui: { ...s.ui, toast: null } })),
    }),
    {
      name: 'HORLOGÉ-2026',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user?.uid ? { uid: state.user.uid } : {},
      }),
    }
  )
);

export const useAuth = () => {
  const user = useAppStore((s) => s.user);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const authLoading = useAppStore((s) => s.authLoading);
  const setUser = useAppStore((s) => s.setUser);
  const initializeAuth = useAppStore((s) => s.initializeAuth);
  const logout = useAppStore((s) => s.logout);
  return { user, isAuthenticated, authLoading, setUser, initializeAuth, logout };
};

export const useCart = () => {
  const items = useAppStore((s) => s.cart.items);
  const coupon = useAppStore((s) => s.cart.coupon);
  const addToCart = useAppStore((s) => s.addToCart);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const updateCartQuantity = useAppStore((s) => s.updateCartQuantity);
  const clearCart = useAppStore((s) => s.clearCart);
  const applyCoupon = useAppStore((s) => s.applyCoupon);
  const getCartCount = useAppStore((s) => s.getCartCount);
  const getCartSubtotal = useAppStore((s) => s.getCartSubtotal);
  const getCartShipping = useAppStore((s) => s.getCartShipping);
  const getCartDiscount = useAppStore((s) => s.getCartDiscount);
  const getCartTotal = useAppStore((s) => s.getCartTotal);
  return {
    items,
    coupon,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    applyCoupon,
    getCartCount,
    getCartSubtotal,
    getCartShipping,
    getCartDiscount,
    getCartTotal,
  };
};

export const useFavorites = () => {
  const favorites = useAppStore((s) => s.user.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const isFavorite = useAppStore((s) => s.isFavorite);
  return { favorites, toggleFavorite, isFavorite };
};

export const useUI = () => {
  const toast = useAppStore((s) => s.ui.toast);
  const mobileMenuOpen = useAppStore((s) => s.ui.mobileMenuOpen);
  const searchOpen = useAppStore((s) => s.ui.searchOpen);
  const toggleMobileMenu = useAppStore((s) => s.toggleMobileMenu);
  const closeMobileMenu = useAppStore((s) => s.closeMobileMenu);
  const toggleSearch = useAppStore((s) => s.toggleSearch);
  const showToast = useAppStore((s) => s.showToast);
  const hideToast = useAppStore((s) => s.hideToast);
  return {
    toast,
    mobileMenuOpen,
    searchOpen,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearch,
    showToast,
    hideToast,
  };
};