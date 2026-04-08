import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useFavorites } from '../../store';

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/**
 * ProductCard — mémoïsé, accessible, images responsive.
 */
const ProductCard = memo(({ product, showAddToCart = true }) => {
  const navigate  = useNavigate();
  const { addToCart }                          = useCart();
  const { toggleFavorite, isFavorite: check }  = useFavorites();

  const { id, name, brand, price, originalPrice, image, isNew, discount, rating = 4.5 } = product;
  const isFav = check(id);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    addToCart({ id, name, brand, price, image, size: 42, color: 'Default', quantity: 1 });
  }, [id, name, brand, price, image, addToCart]);

  const handleFavorite = useCallback((e) => {
    e.stopPropagation();
    toggleFavorite(product);
  }, [product, toggleFavorite]);

  const handleClick = useCallback(() => navigate(`/product/${id}`), [id, navigate]);

  return (
    <article
      className="card cursor-pointer group"
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      role="button"
      tabIndex={0}
      aria-label={`${name} par ${brand} — $${price}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick add overlay */}
        {showAddToCart && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              className="btn btn-primary translate-y-4 group-hover:translate-y-0 transition-transform"
              onClick={handleAddToCart}
              aria-label={`Ajouter ${name} au panier`}
            >
              Add to Cart
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew     && <span className="badge badge-brand">New</span>}
          {discount > 0 && <span className="badge badge-error">-{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${isFav ? 'bg-error text-white' : 'bg-white text-gray hover:text-error'}`}
          aria-label={isFav ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`}
          aria-pressed={isFav}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>

      {/* Info */}
      <div className="card-body">
        <span className="text-sm text-brand font-medium">{brand}</span>
        <h3 className="font-semibold text-dark mt-1 line-clamp-1">{name}</h3>

        <div className="flex items-center gap-1 mt-2" aria-label={`Note : ${rating} sur 5`}>
          <div className="flex text-warning">
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.floor(rating)} />)}
          </div>
          <span className="text-xs text-gray">({rating})</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="font-bold text-dark">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray line-through" aria-label={`Prix original : $${originalPrice}`}>${originalPrice}</span>
          )}
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

export { ProductCard };
export default ProductCard;
