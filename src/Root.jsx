import { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthGuard from './cfg/guards/AuthGuard';
import UnAuthGuard from './cfg/guards/UnAuthGuard';
import { useAppStore } from './store';
import Toast from './components/ui/Toast';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ThemeProvider } from './cfg/theme/ThemeProvider';

// Auth layout — no Nav/Footer
const AuthLayout = () => (
  <div className="min-h-screen">
    <Outlet />
    <Toast />
  </div>
);

// Lazy pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Payment = lazy(() => import('./pages/Payment'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Search = lazy(() => import('./pages/Search'));
const Profile = lazy(() => import('./pages/Profile'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Press = lazy(() => import('./pages/Press'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const SizeGuide = lazy(() => import('./pages/help/SizeGuide'));
const Shipping = lazy(() => import('./pages/help/Shipping'));
const Returns = lazy(() => import('./pages/help/Returns'));
const TrackOrder = lazy(() => import('./pages/help/TrackOrder'));
const FAQ = lazy(() => import('./pages/help/FAQ'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" aria-label="Loading page" role="status">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-brand rounded-full animate-spin" aria-hidden="true" />
    <span className="sr-only">Loading…</span>
  </div>
);

const Root = () => {
  const initializeAuth = useAppStore((state) => state.initializeAuth);
  const unsubRef = useRef(null);

  // Run once on mount — initializeAuth is a stable Zustand action
  useEffect(() => {
    unsubRef.current = initializeAuth();
    return () => unsubRef.current?.();
  }, []); // mount only

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* Auth routes — no Nav/Footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<UnAuthGuard><Login /></UnAuthGuard>} />
            <Route path="/register" element={<UnAuthGuard><Register /></UnAuthGuard>} />
          </Route>

          {/* Main routes — full Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<AuthGuard><Payment /></AuthGuard>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/help/size-guide" element={<SizeGuide />} />
            <Route path="/help/shipping" element={<Shipping />} />
            <Route path="/help/returns" element={<Returns />} />
            <Route path="/help/track" element={<TrackOrder />} />
            <Route path="/help/faq" element={<FAQ />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default Root;
