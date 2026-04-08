import { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart, useAuth } from '../../store';

const NAV_LINKS = [
  { label: 'New', path: '/shop/new' },
  { label: 'Men', path: '/shop/men' },
  { label: 'Women', path: '/shop/women' },
  { label: 'Sale', path: '/shop/sale', highlight: true },
];

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SearchIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Nav = ({ isScrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const cartCount = getCartCount();

  const isActive = useCallback((path) =>
    path === '/shop'
      ? location.pathname === '/shop'
      : location.pathname.startsWith(path),
    [location.pathname]
  );

  const go = useCallback((path) => {
    navigate(path);
    setMobileOpen(false);
  }, [navigate]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);
  }, [searchQuery, navigate]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 50);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileOpen ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}>

        {/* Top bar */}
        <div className="bg-dark text-white text-xs">
          <div className="container flex items-center justify-between py-2">
            <span className="hidden md:block text-white/70">Free Shipping on Orders Over $200</span>
            <div className="flex items-center gap-4 ml-auto">
              {isAuthenticated ? (
                <button onClick={() => navigate('/profile')} className="hover:text-brand transition-colors flex items-center gap-1">
                  <UserIcon size={14} /> My Account
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-white/70 hover:text-white transition-colors text-xs font-medium"
                  >
                    Sign In
                  </button>
                  <span className="text-white/30">|</span>
                  <button
                    onClick={() => navigate('/register')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand text-white text-xs font-semibold hover:bg-brand-dark transition-all hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                    aria-label="Create a free account"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Join Free
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button onClick={() => navigate('/')} className="flex-shrink-0">
              <span className="text-2xl font-extrabold tracking-tight text-dark">
                SNEAK<span className="text-brand">ARA</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-lg transition-colors hover:bg-gray-100 ${isActive(link.path)
                      ? 'text-brand'
                      : link.highlight
                        ? 'text-accent'
                        : 'text-dark'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">

              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="h-10 w-40 sm:w-56 pl-4 pr-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:bg-white transition-all"
                    autoComplete="off"
                    aria-label="Search products"
                    onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-dark"
                    aria-label="Close search"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={openSearch}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <SearchIcon />
                </button>
              )}

              {/* Favorites */}
              <button
                onClick={() => navigate('/favorites')}
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Favorites"
              >
                <HeartIcon />
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cart"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-accent rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-100px)]">
            <div className="container py-4 space-y-1">

              {/* Mobile search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20"
                  autoComplete="off"
                  aria-label="Search products"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <SearchIcon size={18} />
                </span>
              </form>

              {/* Nav links */}
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  className={`w-full px-4 py-4 flex items-center text-lg font-semibold rounded-xl transition-colors text-left ${isActive(link.path)
                      ? 'bg-brand/10 text-brand'
                      : link.highlight
                        ? 'text-accent hover:bg-orange-50'
                        : 'text-dark hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Quick actions */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                <button
                  onClick={() => go('/favorites')}
                  className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-xl text-dark font-medium hover:bg-gray-100 transition-colors"
                >
                  <HeartIcon /> Favorites
                </button>
                <button
                  onClick={() => go('/cart')}
                  className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-xl text-dark font-medium hover:bg-gray-100 transition-colors"
                >
                  <CartIcon /> Cart {cartCount > 0 && `(${cartCount})`}
                </button>
              </div>

              {/* Auth */}
              <div className="pt-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => go('/profile')}
                    className="w-full p-4 bg-dark text-white rounded-xl font-semibold hover:bg-dark/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <UserIcon /> My Profile
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => go('/login')}
                      className="p-4 border-2 border-brand text-brand rounded-xl font-semibold hover:bg-brand/5 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => go('/register')}
                      className="p-4 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[88px]" />
    </>
  );
};

export default Nav;
