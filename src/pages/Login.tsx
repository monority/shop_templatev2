import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../cfg/firebase/firebaseCfg';
import { useAuth } from '../store';
import PageMeta from '../components/ui/PageMeta';

const AUTH_ERRORS = {
  'auth/invalid-credential':    'Email or password is incorrect.',
  'auth/user-not-found':        'No account found for this email.',
  'auth/wrong-password':        'Incorrect password.',
  'auth/invalid-email':         'Invalid email address.',
  'auth/network-request-failed':'Network error, please try again.',
};

const SS_KEY = 'HORLOG�_login_attempts';
const MAX_ATTEMPTS = 5;
const COOLDOWN_SECS = 30;

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const redirectTo = location.state?.from?.pathname || '/';

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [attempts, setAttempts] = useState(() => {
    const s = sessionStorage.getItem(SS_KEY);
    if (!s) return 0;
    const { count, until } = JSON.parse(s);
    return (until && Date.now() < until) ? count : 0;
  });
  const [cooldown, setCooldown] = useState(() => {
    const s = sessionStorage.getItem(SS_KEY);
    if (!s) return 0;
    const { until } = JSON.parse(s);
    return (until && Date.now() < until) ? Math.ceil((until - Date.now()) / 1000) : 0;
  });
  const initialCooldown = useRef(cooldown);

  useEffect(() => {
    if (initialCooldown.current <= 0) return;
    const t = setInterval(() => setCooldown((c) => {
      if (c <= 1) { clearInterval(t); sessionStorage.removeItem(SS_KEY); setAttempts(0); return 0; }
      return c - 1;
    }), 1000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setError(''); setLoading(true);
    try {
      const { user: fbUser } = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const snap = await getDoc(doc(db, 'users', fbUser.uid));
      setUser(snap.exists() ? { uid: fbUser.uid, ...snap.data() } : { uid: fbUser.uid, email: fbUser.email, username: email.split('@')[0], favorites: [] });
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
          if (c <= 1) { clearInterval(t); sessionStorage.removeItem(SS_KEY); setAttempts(0); return 0; }
          return c - 1;
        }), 1000);
        setError(`Too many attempts. Try again in ${COOLDOWN_SECS}s.`);
      } else {
        sessionStorage.setItem(SS_KEY, JSON.stringify({ count: next, until: null }));
        setError(AUTH_ERRORS[err.code] || 'An error occurred.');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <PageMeta title="Sign In" noIndex />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
        aria-label="Back to home"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        Back
      </button>

      {/* Left — branding (desktop) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-16 border-r border-white/[0.06]">
        <button onClick={() => navigate('/')} className="text-white text-xl font-black tracking-[-0.02em] focus-visible:outline-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          HORLOG�
        </button>
        <div>
          <h2 className="text-white leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Welcome<br />back.
          </h2>
          <div className="space-y-3">
            {[['Exclusive drops & early access'], ['Rewards program & VIP perks'], ['Free shipping on orders over $200']].map(([text]) => (
              <div key={text} className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <span className="text-white/40 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-10">
          {[['50K+', 'Customers'], ['200+', 'Products'], ['4.9', 'Rating']].map(([v, l]) => (
            <div key={l}>
              <p className="text-white font-bold text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>{v}</p>
              <p className="text-white/25 text-xs tracking-widest uppercase mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <p className="text-white text-xl font-black" style={{ fontFamily: "'DM Serif Display', serif" }}>HORLOG�</p>
          </div>

          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Account</p>
          <h1 className="text-white mb-8" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem' }}>Sign In</h1>

          {error && (
            <div role="alert" className="border border-accent/30 bg-accent/5 text-accent/80 px-4 py-3 text-xs mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" className="input w-full" />
            </div>
            <div>
              <label htmlFor="password" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Password</label>
              <div className="relative">
                <input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} autoComplete="current-password" className="input w-full pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors">
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading || cooldown > 0} className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50 mt-2">
              {loading ? '…' : cooldown > 0 ? `Try again in ${cooldown}s` : 'Sign In'}
            </button>
          </form>

          <p className="text-white/25 text-xs text-center mt-8">
            No account?{' '}
            <Link to="/register" className="text-white hover:text-white/70 transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
