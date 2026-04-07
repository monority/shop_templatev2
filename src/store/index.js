import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../cfg/firebase/firebaseCfg';

// ============================================================================
// STORE UNIFIÉ SNEAKARA 2026
// ============================================================================

export const useAppStore = create(
  persist(
    (set, get) => ({
      // ==========================================================================
      // AUTH STATE
      // ==========================================================================
      user: {
        uid: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        createdAt: '',
        favorites: [],
      },
      isAuthenticated: false,
      authLoading: true,

      // ==========================================================================
      // CART STATE
      // ==========================================================================
      cart: {
        items: [],
        coupon: null,
      },

      // ==========================================================================
      // UI STATE
      // ==========================================================================
      ui: {
        mobileMenuOpen: false,
        searchOpen: false,
        toast: null,
      },

      // ==========================================================================
      // AUTH ACTIONS
      // ==========================================================================
      setUser: (userData) => set({
        user: userData || {
          uid: '',
          username: '',
          email: '',
          phone: '',
          address: '',
          role: '',
          createdAt: '',
          favorites: [],
        },
        isAuthenticated: !!userData,
        authLoading: false,
      }),

      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            try {
              const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
              if (userDoc.exists()) {
                get().setUser({ uid: currentUser.uid, ...userDoc.data() });
              } else {
                get().setUser({ uid: currentUser.uid, email: currentUser.email, favorites: [] });
              }
            } catch (error) {
              console.error('Auth error:', error);
              get().setUser(null);
            }
          } else {
            get().setUser(null);
          }
        });
        return unsubscribe;
      },

      logout: async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error('Logout error:', error);
        }
        get().setUser(null);
        get().clearCart();
      },

      // ==========================================================================
      // FAVORITES ACTIONS
      // ==========================================================================
      toggleFavorite: (product) => {
        const { user } = get();
        const isFavorite = user.favorites?.some(fav => fav.id === product.id);

        set({
          user: {
            ...user,
            favorites: isFavorite
              ? user.favorites.filter(fav => fav.id !== product.id)
              : [...(user.favorites || []), product],
          },
        });
      },

      isFavorite: (productId) => {
        return get().user.favorites?.some(fav => fav.id === productId);
      },

      // ==========================================================================
      // CART ACTIONS
      // ==========================================================================
      addToCart: (product) => {
        const { cart } = get();
        const { items } = cart;

        const existingItem = items.find(
          (item) => item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        const newItems = existingItem
          ? items.map((item) =>
            item.id === existingItem.id &&
              item.size === existingItem.size &&
              item.color === existingItem.color
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          )
          : [...items, { ...product, quantity: product.quantity || 1 }];

        set({ cart: { ...cart, items: newItems } });
        get().showToast(`${product.name} added to cart`, 'success');
      },

      removeFromCart: (id, size, color) => {
        const { cart } = get();
        set({
          cart: {
            ...cart,
            items: cart.items.filter(
              (item) => !(item.id === id && item.size === size && item.color === color)
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
            items: cart.items.map((item) =>
              item.id === id && item.size === size && item.color === color
                ? { ...item, quantity }
                : item
            ),
          },
        });
      },

      clearCart: () => {
        const { cart } = get();
        set({ cart: { ...cart, items: [] } });
      },

      applyCoupon: (code, discount) => {
        const { cart } = get();
        set({ cart: { ...cart, coupon: { code, discount } } });
      },

      // ==========================================================================
      // CART GETTERS
      // ==========================================================================
      getCartCount: () => {
        return get().cart.items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartSubtotal: () => {
        return get().cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartShipping: () => {
        const subtotal = get().getCartSubtotal();
        return subtotal > 200 ? 0 : 15;
      },

      getCartDiscount: () => {
        const { cart } = get();
        if (!cart.coupon) return 0;
        const subtotal = get().getCartSubtotal();
        return subtotal * (cart.coupon.discount / 100);
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const shipping = get().getCartShipping();
        const discount = get().getCartDiscount();
        return subtotal + shipping - discount;
      },

      // ==========================================================================
      // UI ACTIONS
      // ==========================================================================
      toggleMobileMenu: () => {
        const { ui } = get();
        set({ ui: { ...ui, mobileMenuOpen: !ui.mobileMenuOpen } });
      },

      closeMobileMenu: () => {
        const { ui } = get();
        set({ ui: { ...ui, mobileMenuOpen: false } });
      },

      toggleSearch: () => {
        const { ui } = get();
        set({ ui: { ...ui, searchOpen: !ui.searchOpen } });
      },

      showToast: (message, type = 'info', duration = 3000) => {
        const { ui } = get();
        set({ ui: { ...ui, toast: { message, type } } });

        setTimeout(() => {
          set({ ui: { ...get().ui, toast: null } });
        }, duration);
      },

      hideToast: () => {
        const { ui } = get();
        set({ ui: { ...ui, toast: null } });
      },
    }),
    {
      name: 'sneakara-2026',
      // Only persist the cart and the user's uid — full user data is reloaded
      // from Firestore on auth state change. This prevents sensitive data
      // (email, address, phone) from living in localStorage indefinitely.
      partialize: (state) => ({
        cart: state.cart,
        user: state.user?.uid ? { uid: state.user.uid } : {},
      }),
    }
  )
);

// ============================================================================
// HOOKS UTILITAIRES
// ============================================================================

export const useAuth = () => {
  const { user, isAuthenticated, authLoading, setUser, initializeAuth, logout } = useAppStore();
  return { user, isAuthenticated, authLoading, setUser, initializeAuth, logout };
};

export const useCart = () => {
  const store = useAppStore();
  return {
    items: store.cart.items,
    coupon: store.cart.coupon,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateCartQuantity: store.updateCartQuantity,
    clearCart: store.clearCart,
    applyCoupon: store.applyCoupon,
    getCartCount: store.getCartCount,
    getCartSubtotal: store.getCartSubtotal,
    getCartShipping: store.getCartShipping,
    getCartDiscount: store.getCartDiscount,
    getCartTotal: store.getCartTotal,
  };
};

export const useFavorites = () => {
  const { user, toggleFavorite, isFavorite } = useAppStore();
  return {
    favorites: user.favorites,
    toggleFavorite,
    isFavorite,
  };
};

export const useUI = () => {
  const { ui, toggleMobileMenu, closeMobileMenu, toggleSearch, showToast, hideToast } = useAppStore();
  return {
    ...ui,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearch,
    showToast,
    hideToast,
  };
};
