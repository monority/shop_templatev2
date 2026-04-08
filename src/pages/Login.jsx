import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../cfg/firebase/firebaseCfg';
import { useAuth } from '../store';
import { Helmet } from 'react-helmet-async';

const AUTH_ERRORS = {
  'auth/invalid-credential': 'Email ou mot de passe incorrect.',
  'auth/user-not-found': 'Aucun compte associé à cet email.',
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/invalid-email': 'Adresse email invalide.',
  'auth/network-request-failed': 'Erreur réseau, réessayez plus tard.',
};

const SS_KEY = 'sneakara_login_attempts';
const MAX_ATTEMPTS = 5;
const COOLDOWN_SECS = 30;

const EyeIcon = ({ open }) => open ? (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
) : (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const redirectTo = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(() => {
    const stored = sessionStorage.getItem(SS_KEY);
    if (!stored) return 0;
    const { count, until } = JSON.parse(stored);
    if (until && Date.now() < until) return count;
    sessionStorage.removeItem(SS_KEY);
    return 0;
  });
  const [cooldown, setCooldown] = useState(() => {
    const stored = sessionStorage.getItem(SS_KEY);
    if (!stored) return 0;
    const { until } = JSON.parse(stored);
    if (until && Date.now() < until) return Math.ceil((until - Date.now()) / 1000);
    return 0;
  });

  // Resume cooldown countdown if page is refreshed mid-cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(t);
          sessionStorage.removeItem(SS_KEY);
          setAttempts(0);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setError('');
    setLoading(true);
    try {
      const { user: fbUser } = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const snap = await getDoc(doc(db, 'users', fbUser.uid));
      setUser(snap.exists()
        ? { uid: fbUser.uid, ...snap.data() }
        : { uid: fbUser.uid, email: fbUser.email, username: email.split('@')[0], favorites: [] }
      );
      sessionStorage.removeItem(SS_KEY);
      navigate(redirectTo);
    } catch (err) {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= MAX_ATTEMPTS) {
        const until = Date.now() + COOLDOWN_SECS * 1000;
        sessionStorage.setItem(SS_KEY, JSON.stringify({ count: next, until }));
        setCooldown(COOLDOWN_SECS);
        const t = setInterval(() => setCooldown((c) => {
          if (c <= 1) {
            clearInterval(t);
            sessionStorage.removeItem(SS_KEY);
            setAttempts(0);
            return 0;
          }
          return c - 1;
        }), 1000);
        setError(`Trop de tentatives. Réessayez dans ${COOLDOWN_SECS}s.`);
      } else {
        sessionStorage.setItem(SS_KEY, JSON.stringify({ count: next, until: null }));
        setError(AUTH_ERRORS[err.code] || 'Une erreur est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-light to-white relative overflow-hidden">
      <Helmet><title>Sign In · Sneakara</title></Helmet>
      <div className="absolute -top-20 -right-10 w-[500px] h-[500px] bg-brand/10 rounded-full blur-3xl pointer-events-none" />

      {/* Bouton retour accueil */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-sm font-semibold text-dark hover:bg-white hover:shadow-md transition-all"
        aria-label="Retour à l'accueil"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
        </svg>
        Back to Home
      </button>

      <div className="flex max-w-7xl mx-auto min-h-screen">

        {/* Left — branding */}
        <div className="hidden lg:flex flex-1 flex-col justify-center p-16 relative z-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold text-dark tracking-tight mb-2">
              SNEAK<span className="text-brand">ARA</span>
            </h1>
            <p className="text-xl text-gray-500 mb-12">Step into the future of style</p>

            <div className="flex gap-10 p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 mb-10">
              {[['50K+', 'Customers'], ['200+', 'Products'], ['4.9', 'Rating']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-extrabold text-brand">{v}</div>
                  <div className="text-sm text-gray-500 mt-1">{l}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[['🔥', 'Exclusive drops & early access'], ['🏆', 'Rewards program & VIP perks'], ['🚚', 'Free shipping on orders over $200']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-4 p-4 bg-white/40 rounded-xl">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-dark font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Logo mobile */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-extrabold text-dark">SNEAK<span className="text-brand">ARA</span></h1>
            </div>

            <div className="p-10 bg-white rounded-3xl shadow-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-dark mb-1">Welcome back</h2>
                <p className="text-gray-500">Sign in to continue your journey</p>
              </div>

              {error && (
                <div role="alert" className="p-4 bg-error/10 text-error rounded-xl mb-6 text-sm flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="input"
                  />
                </div>

                <div className="mb-7">
                  <label htmlFor="password" className="block text-sm font-semibold text-dark mb-2">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      autoComplete="current-password"
                      className="input pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading || cooldown > 0} className="btn btn-primary w-full">
                  {loading ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="30" />
                    </svg>
                  ) : cooldown > 0 ? `Réessayez dans ${cooldown}s` : 'Sign In'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-brand font-semibold hover:underline">Create one</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
