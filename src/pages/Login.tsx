import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store';
import PageMeta from '../components/ui/PageMeta';

// Fake credentials for demo
const FAKE_USERS = [
  { email: 'demo@horlog.com', password: 'demo1234', username: 'demo_user' },
  { email: 'admin@horlog.com', password: 'admin1234', username: 'admin' },
];

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500)); // simulate network

    const match = FAKE_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (match) {
      setUser({
        uid: `fake-${match.username}`,
        email: match.email,
        username: match.username,
        phone: '',
        address: '',
        role: match.username === 'admin' ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
        favorites: [],
      });
      navigate(redirectTo);
    } else {
      setError('Email or password is incorrect.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <PageMeta title="Sign In" noIndex />

      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
        aria-label="Back to home"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
        Back
      </button>

      {/* Left — branding (desktop) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-16 border-r border-white/[0.06]">
        <button onClick={() => navigate('/')} className="text-white text-xl font-black tracking-[-0.02em] focus-visible:outline-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          HORLOGÉS
        </button>
        <div>
          <h2 className="text-white leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Welcome<br />back.
          </h2>
          <div className="space-y-3">
            {['Exclusive drops & early access', 'Rewards program & VIP perks', 'Free shipping on orders over $200'].map((text) => (
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
          <div className="lg:hidden mb-10">
            <p className="text-white text-xl font-black" style={{ fontFamily: "'DM Serif Display', serif" }}>HORLOGÉS</p>
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
                <input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" className="input w-full pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors">
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50 mt-2">
              {loading ? '…' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 border border-white/[0.06] p-4 space-y-2">
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-3">Demo credentials</p>
            {FAKE_USERS.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => { setEmail(u.email); setPassword(u.password); }}
                className="w-full text-left group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs group-hover:text-white/70 transition-colors">{u.email}</span>
                  <span className="text-white/20 text-[10px] group-hover:text-white/40 transition-colors">{u.password}</span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-white/25 text-xs text-center mt-6">
            No account?{' '}
            <Link to="/register" className="text-white hover:text-white/70 transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
