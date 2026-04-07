import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthGuard from './cfg/guards/AuthGuard';
import UnAuthGuard from './cfg/guards/UnAuthGuard';
import { useAppStore } from './store';

// Lazy load pages for better performance
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

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
    <div className="animate-pulse">Loading...</div>
  </div>
);

const Root = () => {
  const initializeAuth = useAppStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<UnAuthGuard><Login /></UnAuthGuard>} />
          <Route path="/register" element={<UnAuthGuard><Register /></UnAuthGuard>} />
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
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default Root;
