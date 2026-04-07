import React from 'react';

export const Hero = ({ 
  eyebrow = "NEW COLLECTION 2024",
  title = "Step Into The",
  titleHighlight = "Future",
  description = "Discover the latest premium sneakers designed for ultimate style, comfort, and performance.",
  primaryAction = "Shop Now",
  secondaryAction = "View Collection",
  onPrimaryClick,
  onSecondaryClick,
  imageSrc = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
}) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Content */}
          <div>
            <span className="hero-tag">{eyebrow}</span>
            <h1 className="hero-title">
              {title} <span className="text-brand">{titleHighlight}</span>
            </h1>
            <p className="hero-desc">{description}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onPrimaryClick}>
                {primaryAction}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
              <button className="btn btn-secondary" onClick={onSecondaryClick}>
                {secondaryAction}
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
            <img 
              src={imageSrc}
              alt="Hero Product"
              className="relative w-full max-w-lg animate-fade-in-up"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
