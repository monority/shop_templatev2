import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useFeaturedProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Hero } from '../components/ui/Hero';
import { ProductCard } from '../components/ui/ProductCard';
import PageMeta from '../components/ui/PageMeta';
import { ProductGridSkeleton, CategoryGridSkeleton } from '../components/ui/Skeleton';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import useImageFallback from '../hooks/useImageFallback';
import { OrganizationJsonLd } from '../components/ui/JsonLd';

const FEATURES = [
  { num: '01', title: 'Free Express Shipping', desc: 'Every order delivered within 24–48 hours, fully insured and free over $200.' },
  { num: '02', title: 'Authenticity Guaranteed', desc: 'Every timepiece verified by our expert horologists. Zero counterfeits, ever.' },
  { num: '03', title: 'Easy Returns', desc: '30-day hassle-free returns. No questions asked.' },
  { num: '04', title: 'Exclusive Drops', desc: 'Early access to limited editions and rare references before anyone else.' },
];

const TESTIMONIALS = [
  { name: 'Alexandre M.', role: 'Watch Collector', text: 'Best curated selection of authentic timepieces I\'ve found. Fast shipping and impeccable packaging.', rating: 5 },
  { name: 'Sophie L.', role: 'Luxury Enthusiast', text: 'The Longines arrived in perfect condition. Exactly as described. Will definitely order again.', rating: 5 },
  { name: 'James C.', role: 'Horology Enthusiast', text: 'Rare references at fair prices. The authentication process gives me complete confidence.', rating: 5 },
];

const MARQUEE_ITEMS = ['HORLOGÉS', 'LUXURY TIMEPIECES', 'SS 2026', 'EXCLUSIVE DROPS', 'FREE SHIPPING', 'AUTHENTICATED'];

// Animated counter
const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const controls = motionVal.animation;
        import('framer-motion').then(({ animate }) => {
          animate(motionVal, value, { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] });
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, motionVal]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const SectionLabel = ({ children, light = false }: { children: string; light?: boolean }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className={`w-6 h-px ${light ? 'bg-black/30' : 'bg-white/30'}`} aria-hidden="true" />
    <span className={`text-[11px] font-semibold tracking-[0.25em] uppercase ${light ? 'text-black/40' : 'text-white/40'}`}>{children}</span>
  </div>
);

// Infinite horizontal marquee using CSS
const Marquee = ({ items, speed = 30, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) => (
  <div className="overflow-hidden py-5 border-y border-white/[0.06]" aria-hidden="true">
    <div 
      className="flex gap-12 whitespace-nowrap"
      style={{
        animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
      }}
    >
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="text-white/20 text-[11px] tracking-[0.3em] uppercase font-semibold flex items-center gap-12 flex-shrink-0">
          {item}
          <span className="w-1.5 h-1.5 rounded-full bg-white/10 inline-block" />
        </span>
      ))}
    </div>
  </div>
);

// Parallax section wrapper
const ParallaxSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { products: featuredProducts, loading: productsLoading, error: productsError } = useFeaturedProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const goShop = useCallback(() => navigate('/shop'), [navigate]);
  const goNew = useCallback(() => navigate('/shop/new'), [navigate]);
  const handleImgError = useImageFallback();

  return (
    <div className="relative bg-[#0a0a0a]">
      <PageMeta
        description="Curated luxury timepieces for the modern collector. Shop exclusive watch drops at HORLOGÉS — authenticated, insured, delivered."
        canonical="/"
      />
      <OrganizationJsonLd />
      <Hero onPrimaryClick={goShop} onSecondaryClick={goNew} />

      {/* ── Marquee ───────────────────────────────────────────────────────── */}
      <Marquee items={MARQUEE_ITEMS} speed={25} />

      {/* ── Animated stats strip ──────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] bg-[#0a0a0a]" aria-label="Key figures">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
            {[
              { value: 500, suffix: '+', label: 'Brands' },
              { value: 12000, suffix: '+', label: 'Collectors' },
              { value: 98, suffix: '%', label: 'Satisfaction' },
              { value: 24, suffix: 'h', label: 'Avg. Delivery' },
            ].map(({ value, suffix, label }) => (
              <Reveal key={label}>
                <div className="bg-[#0a0a0a] px-8 py-10 text-center">
                  <p className="text-white text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    <Counter value={value} suffix={suffix} />
                  </p>
                  <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="content-section py-24 md:py-32 bg-[#0a0a0a]" aria-labelledby="featured-title">
        <div className="container">
          <div className="flex items-end justify-between mb-14">
            <Reveal>
              <div>
                <SectionLabel>Curated Selection</SectionLabel>
                <h2
                  id="featured-title"
                  className="text-white leading-tight"
                  style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  Featured Timepieces
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <button
                onClick={goShop}
                className="hidden sm:flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase font-medium hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5"
              >
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </Reveal>
          </div>

          {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : productsError ? (
            <p className="text-white/30 text-center py-12" role="alert">Error loading products</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
              {featuredProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="bg-[#0a0a0a]">
                  <ProductCard product={product} dark />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <button onClick={goShop} className="w-full py-4 border border-white/10 text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/30 transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ── Marquee reversed ──────────────────────────────────────────────── */}
      <Marquee items={['MENS WATCHES', 'WOMENS WATCHES', 'ROLEX', 'LONGINES', 'FOSSIL', 'MICHAEL KORS', 'LUXURY']} speed={20} reverse />

      {/* ── Most Wanted ───────────────────────────────────────────────────── */}
      <section className="content-section py-24 md:py-32 bg-[#0d0d0d]" aria-labelledby="most-wanted-title">
        <div className="container">
          <div className="flex items-end justify-between mb-14">
            <Reveal>
              <div>
                <SectionLabel>Top Rated</SectionLabel>
                <h2
                  id="most-wanted-title"
                  className="text-white leading-tight"
                  style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  Most Wanted
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <button
                onClick={() => navigate('/shop')}
                className="hidden sm:flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5"
              >
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </Reveal>
          </div>

          {productsLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
              {[...featuredProducts]
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 4)
                .map((product) => (
                  <div key={product.id} className="bg-[#0d0d0d]">
                    <ProductCard product={product} dark />
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0d0d0d]" aria-labelledby="categories-title">
        <div className="container">
          <Reveal className="mb-14">
            <SectionLabel>Browse</SectionLabel>
            <h2
              id="categories-title"
              className="text-white leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Shop by Category
            </h2>
          </Reveal>

          {categoriesLoading ? (
            <CategoryGridSkeleton count={4} />
          ) : categoriesError ? (
            <p className="text-white/30 text-center py-12" role="alert">Error loading categories</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
              {categories.map((category, i) => (
                <motion.button
                  key={category.id}
                  className="group relative overflow-hidden bg-[#0d0d0d] aspect-[3/4] text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  onClick={() => navigate(`/shop/${category.slug}`)}
                  aria-label={`Shop ${category.name}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    loading="lazy"
                    onError={handleImgError}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-1">{category.count} Products</p>
                    <h3 className="text-white text-2xl font-black" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      {category.name}
                    </h3>
                    <motion.div
                      className="flex items-center gap-2 mt-3 text-white/30 text-xs tracking-widest uppercase overflow-hidden"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{ width: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Shop Now →
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Full-width parallax banner ─────────────────────────────────────── */}
      <ParallaxSection className="h-[40vh] md:h-[55vh]">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #111 0%, #1a1a1a 50%, #0a0a0a 100%)',
            minHeight: '55vh',
          }}
        >
          <Reveal className="text-center px-6">
            <p className="text-white/20 text-[11px] tracking-[0.3em] uppercase mb-4">The HORLOGÉS Promise</p>
            <h2
              className="text-white max-w-3xl mx-auto leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              Every second counts.<br />
              <em className="text-white/40 not-italic">Make it yours.</em>
            </h2>
            <motion.button
              onClick={goShop}
              className="mt-10 px-8 py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Collection
            </motion.button>
          </Reveal>
        </div>
      </ParallaxSection>

      {/* ── Why Us ────────────────────────────────────────────────────────── */}
      <section className="content-section py-24 md:py-32 bg-[#0a0a0a] border-t border-white/[0.04]" aria-labelledby="features-title">
        <div className="container">
          <Reveal className="mb-14">
            <SectionLabel>Why HORLOGÉS</SectionLabel>
            <h2
              id="features-title"
              className="text-white leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Built Different
            </h2>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]" stagger={0.08}>
            {FEATURES.map((f) => (
              <RevealItem key={f.num}>
                <motion.div
                  className="bg-[#0a0a0a] p-8 h-full"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/10 text-5xl font-black mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>{f.num}</p>
                  <h3 className="text-white text-base font-semibold mb-3">{f.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="content-section py-24 md:py-32 bg-[#0d0d0d]" aria-labelledby="testimonials-title">
        <div className="container">
          <Reveal className="mb-14">
            <SectionLabel>Social Proof</SectionLabel>
            <h2
              id="testimonials-title"
              className="text-white leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              What They Say
            </h2>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-3 gap-px bg-white/[0.04]" stagger={0.1}>
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.name}>
                <div className="bg-[#0d0d0d] p-8 flex flex-col gap-6 h-full">
                  <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-white/50" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">"{t.text}"</p>
                  <div className="border-t border-white/[0.06] pt-4">
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/25 text-xs tracking-widest uppercase mt-0.5">{t.role}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white" aria-labelledby="newsletter-title">
        <div className="container">
          <Reveal className="max-w-2xl mx-auto text-center">
            <SectionLabel light>Stay in the loop</SectionLabel>
            <h2
              id="newsletter-title"
              className="text-[#0a0a0a] mb-4 leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Join the Inner Circle
            </h2>
            <p className="text-black/40 text-sm leading-relaxed mb-10 max-w-md mx-auto">
              Get early access to exclusive drops, special offers, and members-only deals.
            </p>
            <form
              className="flex gap-0 max-w-md mx-auto border border-black/10"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-4 text-sm bg-transparent text-[#0a0a0a] placeholder:text-black/25 focus:outline-none"
                autoComplete="email"
                aria-label="Email address"
              />
              <motion.button
                type="submit"
                className="px-6 py-4 bg-[#0a0a0a] text-white text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap"
                whileHover={{ backgroundColor: '#1a1a1a' }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-xs text-black/25 mt-4 tracking-wide">No spam. Unsubscribe anytime.</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
