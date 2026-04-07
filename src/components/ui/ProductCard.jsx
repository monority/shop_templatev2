import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useFavorites } from '../../store';

export const ProductCard = ({ 
  product,
  showAddToCart = true
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite: checkFavorite } = useFavorites();
  
  const { id, name, brand, price, originalPrice, image, isNew, discount, rating = 4.5 } = product;
  
  const isFavorite = checkFavorite(id);
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      brand,
      price,
      image,
      size: 42,
      color: 'Default',
      quantity: 1
    });
  };
  
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };
  
  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  
  return (
    <div 
      className="card cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          loading="lazy" 
          className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Overlay with quick actions */}
        {showAddToCart && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              className="btn btn-primary transform translate-y-4 group-hover:translate-y-0 transition-transform"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="badge badge-brand">New</span>
          )}
          {discount > 0 && (
            <span className="badge badge-error">-{discount}%</span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
            isFavorite ? 'bg-error text-white' : 'bg-white text-gray hover:text-error'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="card-body">
        <span className="text-sm text-brand font-medium">{brand}</span>
        <h3 className="font-semibold text-dark mt-1 line-clamp-1">{name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-warning">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray">({rating})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-bold text-dark">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray line-through">${originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
