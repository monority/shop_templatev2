import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';

const NotFound = () => (
  <>
    <PageMeta title="404 — Page Not Found" noIndex />
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
      <p
        className="text-white/[0.04] font-black select-none leading-none mb-8"
        style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(8rem, 25vw, 20rem)' }}
        aria-hidden="true"
      >
        404
      </p>
      <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Page not found</p>
      <h1 className="text-white mb-8" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        This page doesn't exist
      </h1>
      <div className="flex items-center gap-8">
        <Link to="/" className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
          Go Home
        </Link>
        <span className="w-px h-4 bg-white/10" aria-hidden="true" />
        <Link to="/shop" className="text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
          Browse Shop
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
