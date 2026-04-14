import { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart, useAuth } from '../../store';

const NAV_LINKS = [
  { label: "Men's",    path: '/shop/men' },
  { label: "Women's",  path: '/shop/women' },
  { label: 'New In',   path: '/shop/new' },
  { label: 'Sale',     path: '/shop/sale', highlight: true },
];

const CartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const HeartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SearchIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const UserIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Nav = ({ isScrolled }: { isScrolled: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const cartCount = getCartCount();

  const isHome   = location.pathname === '/';
  const scrolled = isScrolled || mobileOpen || !isHome;

  const isActive = useCallback(
    (path: string) =>
      path === '/shop'
        ? location.pathname === '/shop'
        : location.pathname.startsWith(path),
    [location.pathname]
  );

  const go = useCallback((path: string) => {
    navigate(path);
    setMobileOpen(false);
  }, [navigate]);

  const handleSearch = useCallback((e: React.FormEvent) => {
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      {/* Announcement strip — always dark, always visible */}
      <div className="border-b border-white/[0.06]">
        <div className="container flex items-center justify-center py-2 gap-6">
          <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase">Free Shipping Over $200</span>
          <span className="w-px h-3 bg-white/10" aria-hidden="true" />
          <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase">SS 2026 Collection</span>
          <span className="w-px h-3 bg-white/10 hidden sm:block" aria-hidden="true" />
          <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase hidden sm:block">30-Day Returns</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="container">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            aria-label="HORLOG� home"
          >
            <span
              className="text-white text-lg font-black tracking-[-0.02em]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              HORLOG�
            </span>
          </button>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-white'
                    : link.highlight
                      ? 'text-accent hover:text-red-400'
                      : 'text-white/40 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">

            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 mr-1">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-8 w-32 sm:w-48 px-3 text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  autoComplete="off"
                  aria-label="Search products"
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                  aria-label="Close search"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={openSearch}
                className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
            )}

            <button
              onClick={() => navigate('/favorites')}
              className="hidden sm:flex w-9 h-9 items-center justify-center text-white/40 hover:text-white transition-colors"
              aria-label="Favorites"
            >
              <HeartIcon />
            </button>

            <button
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              className="hidden sm:flex w-9 h-9 items-center justify-center text-white/40 hover:text-white transition-colors"
              aria-label={isAuthenticated ? 'My account' : 'Sign in'}
            >
              <UserIcon />
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold text-white bg-accent rounded-full flex items-center justify-center leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-colors ml-1"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu — full-screen dark ───────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[88px] bg-[#0a0a0a] z-40 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="container py-10 flex flex-col h-full">

            {/* Search */}
            <form onSubmit={handleSearch} className="relative mb-10">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-10 pr-4 bg-transparent border-b border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-white/30 transition-colors"
                autoComplete="off"
                aria-label="Search products"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
                <SearchIcon size={15} />
              </span>
            </form>

            {/* Links */}
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  className={`group flex items-end justify-between py-5 border-b border-white/[0.06] text-left transition-colors ${
                    isActive(link.path)
                      ? 'text-white'
                      : link.highlight
                        ? 'text-accent'
                        : 'text-white/30 hover:text-white'
                  }`}
                >
                  <span
                    className="font-black leading-none"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
                    }}
                  >
                    {link.label}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-2 group-hover:text-white/40 transition-colors">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="mt-auto pt-10 flex flex-col gap-3">
              {isAuthenticated ? (
                <button
                  onClick={() => go('/profile')}
                  className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase"
                >
                  My Profile
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => go('/register')}
                    className="py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase"
                  >
                    Join Free
                  </button>
                  <button
                    onClick={() => go('/login')}
                    className="py-4 border border-white/15 text-white/40 text-xs font-medium tracking-[0.2em] uppercase hover:text-white hover:border-white/30 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              )}
              <div className="flex items-center justify-center gap-6 pt-4">
                <button onClick={() => go('/favorites')} className="text-white/20 hover:text-white transition-colors flex items-center gap-2 text-xs tracking-widest uppercase">
                  <HeartIcon /> Wishlist
                </button>
                <span className="w-px h-4 bg-white/10" aria-hidden="true" />
                <button onClick={() => go('/cart')} className="text-white/20 hover:text-white transition-colors flex items-center gap-2 text-xs tracking-widest uppercase">
                  <CartIcon /> Cart {cartCount > 0 && `(${cartCount})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
