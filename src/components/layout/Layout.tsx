import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Toast from '../ui/Toast';
import { PageTransition } from '../ui/PageTransition';

// Session guard — no-op (Firebase removed)
const useSessionGuard = () => {};

// ── Layout ────────────────────────────────────────────────────────────────────
const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>
      <Nav isScrolled={isScrolled} />
      <main className="flex-1" id="main-content">
        {!isHome && <div className="h-[86px]" aria-hidden="true" />}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default Layout;
