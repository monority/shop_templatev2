// Nike Air Max 90 — fond blanc neutre, mix-blend-mode supprime le fond visuellement
const DEFAULT_IMAGE  = 'img/heroshow.webp';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

const handleHeroError = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMAGE) {
    e.currentTarget.src = FALLBACK_IMAGE;
  }
};

/**
 * Section Hero — LCP optimisé (loading eager, alt descriptif, aria).
 */
const Hero = ({
  eyebrow         = 'NEW COLLECTION 2026',
  title           = 'Step Into The',
  titleHighlight  = 'Future',
  description     = 'Discover the latest premium sneakers designed for ultimate style, comfort, and performance.',
  primaryAction   = 'Shop Now',
  secondaryAction = 'View Collection',
  onPrimaryClick,
  onSecondaryClick,
  imageSrc = DEFAULT_IMAGE,
  alt      = 'Premium sneakers collection',
}) => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="container">
      <div className="hero-grid">
        {/* Content */}
        <div>
          <span className="hero-tag" aria-hidden="true">{eyebrow}</span>
          <h1 id="hero-title" className="hero-title">
            {title} <span className="text-brand">{titleHighlight}</span>
          </h1>
          <p className="hero-desc">{description}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onPrimaryClick} aria-label={primaryAction}>
              {primaryAction}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={onSecondaryClick} aria-label={secondaryAction}>
              {secondaryAction}
            </button>
          </div>
        </div>

        {/* Image — eager pour LCP, mix-blend-mode:multiply efface le fond blanc */}
        <div className="relative flex items-center justify-center" aria-hidden="true">
          <div className="absolute w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
          <img
            src={imageSrc}
            alt={alt}
            className="relative w-full max-w-lg animate-fade-in-up"
            style={{
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 24px 48px rgba(99,102,241,0.18))',
            }}
            loading="eager"
            fetchPriority="high"
            onError={handleHeroError}
          />
        </div>
      </div>
    </div>
  </section>
);

export { Hero };
export default Hero;
