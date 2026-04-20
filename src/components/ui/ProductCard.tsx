import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useFavorites } from '../../store';
import { formatPrice } from '../../utils/format';
import useImageFallback from '../../hooks/useImageFallback';
import type { Product as ProductType } from '../../types';

interface ProductCardProps {
  product: ProductType;
  showAddToCart?: boolean;
  dark?: boolean;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-hidden="true">
    {[1,2,3,4,5].map((i) => (
      <svg key={i} width="11" height="11" viewBox="0 0 24 24"
        fill={i <= Math.floor(rating) ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const ProductCard = memo(({ product, showAddToCart = true, dark = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite: check } = useFavorites();
  const handleImgError = useImageFallback();

  const { id, name, brand, price, originalPrice, image, isNew, discount, rating = 4.5, movement } = product;
  const isFav = check(id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, size: 40, color: 'Black Leather', quantity: 1 });
  }, [product, addToCart]);

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  }, [product, toggleFavorite]);

  const handleClick = useCallback(() => navigate(`/product/${id}`), [id, navigate]);

  return (
    <article
      className={`product-card-root cursor-pointer group ${dark ? 'bg-[#0a0a0a]' : 'card'}`}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      role="button"
      tabIndex={0}
      aria-label={`${name} by ${brand} — ${formatPrice(price)}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          onError={handleImgError}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick add — CSS only, no JS animation */}
        {showAddToCart && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              className="px-5 py-2.5 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
              onClick={handleAddToCart}
              aria-label={`Add ${name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && (
            <span className="text-[9px] tracking-[0.2em] uppercase font-bold bg-white text-[#0a0a0a] px-2 py-0.5">New</span>
          )}
          {(discount ?? 0) > 0 && (
            <span className="text-[9px] tracking-[0.2em] uppercase font-bold bg-accent text-white px-2 py-0.5">-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 ${
            isFav
              ? 'text-white bg-accent/80'
              : dark
                ? 'text-white/30 bg-white/5 hover:text-white hover:bg-white/10'
                : 'text-black/40 bg-white/80 hover:text-black hover:bg-white'
          }`}
          aria-label={isFav ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={isFav}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className={`text-[10px] tracking-[0.2em] uppercase font-medium mb-1 ${dark ? 'text-white/30' : 'text-black/40'}`}>
          {brand}
        </p>
        <h3 className={`text-sm font-semibold line-clamp-1 ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}>
          {name}
        </h3>
        {movement && (
          <p className={`text-[10px] tracking-widest uppercase mt-0.5 ${dark ? 'text-white/20' : 'text-black/25'}`}>
            {movement}
          </p>
        )}

        <div className="flex items-center gap-1.5 mt-2" aria-label={`Rating: ${rating} out of 5`}>
          <Stars rating={rating} />
          <span className={`text-[10px] ${dark ? 'text-white/20' : 'text-black/30'}`}>({rating})</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}>
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className={`text-xs line-through ${dark ? 'text-white/20' : 'text-black/30'}`}>
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
export { ProductCard };
export default ProductCard;
