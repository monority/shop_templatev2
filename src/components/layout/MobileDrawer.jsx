import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart, useAuth } from '../../store';

const MobileDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const cartCount = getCartCount();

  const NAV_ITEMS = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Shop', path: '/shop', icon: '🛍️' },
    { label: 'Women', path: '/shop/women', icon: '👩' },
    { label: 'Men', path: '/shop/men', icon: '👨' },
    { label: 'New Arrivals', path: '/shop/new', icon: '✨' },
    { label: 'Sale', path: '/shop/sale', icon: '🔥' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[min(320px,85vw)] bg-white shadow-xl z-50 flex flex-col transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-dark">
            SNEAK<span className="text-brand">ARA</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${isActive(item.path)
                      ? 'bg-brand/10 text-brand font-semibold'
                      : 'text-dark hover:bg-gray-50'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                  {isActive(item.path) && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-brand" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-gray-100 space-y-3">
            <button
              onClick={() => handleNavigate('/search')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white text-dark hover:border-brand transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Search
            </button>

            <button
              onClick={() => handleNavigate('/favorites')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white text-dark hover:border-brand transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Favorites
            </button>

            <button
              onClick={() => handleNavigate('/cart')}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white text-dark hover:border-brand transition-colors"
            >
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand text-white text-xs font-semibold flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              Cart
            </button>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand text-white font-bold flex items-center justify-center text-lg shrink-0">
                {user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark truncate">{user?.username || 'User'}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                  onClose();
                }}
                aria-label="Sign out"
                className="px-4 py-2 rounded-lg bg-gray-100 text-dark font-semibold hover:bg-gray-200 transition-colors shrink-0"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate('/login')}
              className="w-full py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition-colors"
            >
              Sign In / Create Account
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileDrawer;
