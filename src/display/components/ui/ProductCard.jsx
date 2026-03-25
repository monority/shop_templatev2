import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ 
  img, 
  title, 
  colors = [], 
  price, 
  type, 
  description, 
  id, 
  action, 
  isNew = false, 
  discountRate = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  
  // Calculate discount and final price
  const discount = Number(discountRate || 0);
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? (Number(price) * (1 - discount / 100)).toFixed(2) : Number(price).toFixed(2);
  const originalPrice = Number(price).toFixed(2);
  
  // Fallback image for products without images
  const productImage = img || `https://picsum.photos/seed/${title}-${id}/400/300.jpg`;
  
  // Mouse tracking for hover effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);
    setMousePosition({ x, y });
  };
  
  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  
  const handleQuickView = (e) => {
    e.stopPropagation();
    if (action) action();
  };

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Card Image Section */}
      <div className="product-card__image-container" onClick={handleCardClick}>
        {/* Badges */}
        <div className="product-card__badges">
          {isNew && <span className="badge badge--new">New</span>}
          {hasDiscount && <span className="badge badge--sale">-{discount}%</span>}
        </div>
        
        {/* Product Image */}
        <img 
          src={productImage}
          alt={title}
          className="product-card__image"
          loading="lazy"
        />
        
        {/* Quick View Overlay */}
        <div 
          className="product-card__quick-view"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 40}px`,
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none'
          }}
          onClick={handleQuickView}
        >
          <span className="quick-view__text">Quick View</span>
          <span className="quick-view__price">€{finalPrice}</span>
        </div>
      </div>
      
      {/* Card Content Section */}
      <div className="product-card__content">
        {/* Product Title and Type */}
        <div className="product-card__header">
          <h3 className="product-card__title">{title}</h3>
          <span className="product-card__type">{type}</span>
        </div>
        
        {/* Color Options */}
        {colors.length > 0 && (
          <div className="product-card__colors">
            <span className="colors-label">Colors:</span>
            <div className="color-swatches">
              {colors.slice(0, 4).map((color, index) => (
                <button
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`Color: ${color}`}
                />
              ))}
              {colors.length > 4 && (
                <span className="color-more">+{colors.length - 4}</span>
              )}
            </div>
          </div>
        )}
        
        {/* Product Description */}
        <p className="product-card__description">{description}</p>
        
        {/* Price Section */}
        <div className="product-card__price-section">
          {hasDiscount && (
            <span className="price-original">€{originalPrice}</span>
          )}
          <span className="price-current">€{finalPrice}</span>
          {hasDiscount && (
            <span className="price-savings">Save €{(originalPrice - finalPrice).toFixed(2)}</span>
          )}
        </div>
        
        {/* Action Button */}
        <button 
          className="product-card__action"
          onClick={handleQuickView}
        >
          {isHovered ? 'Quick View' : 'View Details'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
