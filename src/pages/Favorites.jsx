import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../store';
import { ProductCard } from '../components/ui/ProductCard';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="bg-light min-h-screen">
        <div className="container py-24">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-dark">No Favorites Yet</h2>
            <p className="text-gray max-w-md mx-auto mb-8">
              Start exploring our collection and save your favorite items here for quick access.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/shop')}
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen">
      <div className="container py-12 pt-24">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
          <div>
            <span className="text-sm font-semibold text-brand uppercase tracking-wide">
              Your Collection
            </span>
            <h1 className="text-4xl font-extrabold text-dark mt-2">
              My Favorites <span className="text-gray text-xl">({favorites.length})</span>
            </h1>
            <p className="text-lg text-gray mt-2">
              All your favorite items in one place. Don't wait too long, popular items sell out fast!
            </p>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>

        {/* Favorites Grid */}
        <div className="products-grid mb-8">
          {favorites.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Footer Promo */}
        <div className="card bg-brand/10 border-brand/20">
          <div className="card-body flex items-center gap-4">
            <span className="text-2xl">💡</span>
            <p className="text-dark">
              <strong>Pro tip:</strong> Favorite items often sell out quickly. Add them to your cart to secure your size!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
