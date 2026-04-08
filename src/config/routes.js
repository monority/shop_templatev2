export const ROUTES = {
  // Public
  HOME: '/',
  SHOP: '/shop',
  SHOP_CATEGORY: '/shop/:category',
  PRODUCT: '/product/:id',
  SEARCH: '/search',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  
  // User
  CART: '/cart',
  CHECKOUT: '/checkout',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  
  // Info
  ABOUT: '/about',
  CAREERS: '/careers',
  PRESS: '/press',
  SUSTAINABILITY: '/sustainability',
  
  // Help
  SIZE_GUIDE: '/help/size-guide',
  SHIPPING: '/help/shipping',
  RETURNS: '/help/returns',
  TRACK_ORDER: '/help/track',
  FAQ: '/help/faq',
  
  // Legal
  PRIVACY: '/legal/privacy',
  TERMS: '/legal/terms',
  
  // Not Found
  NOT_FOUND: '*',
};

export const getRoute = (route, params = {}) => {
  let path = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
};
