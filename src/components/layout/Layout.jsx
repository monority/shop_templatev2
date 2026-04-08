import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Toast from '../ui/Toast';
import { useAppStore } from '../../store';

// ── Session Guard ─────────────────────────────────────────────────────────────
// Vérifie toutes les 5 min que le token Firebase est encore valide.
// Placé ici car Layout est toujours dans le Router context.
const useSessionGuard = () => {
  const navigate        = useNavigate();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const setUser         = useAppStore((s) => s.setUser);
  const clearCart       = useAppStore((s) => s.clearCart);
  const showToast       = useAppStore((s) => s.showToast);

  useEffect(() => {
    if (!isAuthenticated) return;

    const check = async () => {
      try {
        const { auth } = await import('../../cfg/firebase/firebaseCfg');
        const fbUser = auth.currentUser;
        if (!fbUser) return;
        await fbUser.getIdToken(true);
      } catch (err) {
        console.warn('[SessionGuard] Session expirée', err.code);
        setUser(null);
        clearCart();
        showToast('Your session has expired. Please sign in again.', 'warning');
        navigate('/login', { replace: true });
      }
    };

    const interval = setInterval(check, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate, setUser, clearCart, showToast]);
};

// ── Layout ────────────────────────────────────────────────────────────────────
const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useSessionGuard();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Nav isScrolled={isScrolled} />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default Layout;
