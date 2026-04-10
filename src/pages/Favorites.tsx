import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../store';
import { ProductCard } from '../components/ui/ProductCard';
import PageMeta from '../components/ui/PageMeta';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const meta = <PageMeta title="My Wishlist" description="Your saved timepieces — all in one place." />;

  if (!favorites || favorites.length === 0) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen">
        {meta}
        <div className="container py-24 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/10 mx-auto mb-8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-white/20 text-sm tracking-widest uppercase mb-8">No favorites yet</p>
          <button
            className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors"
            onClick={() => navigate('/shop')}
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {meta}

      {/* Header */}
      <div className="border-b border-white/[0.06] py-16">
        <div className="container">
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Your Collection</p>
          <h1 className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95 }}>
            My Favorites <span className="text-white/20">({favorites.length})</span>
          </h1>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
          {favorites.map((product) => (
            <div key={product.id} className="bg-[#0a0a0a]">
              <ProductCard product={product} dark />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
