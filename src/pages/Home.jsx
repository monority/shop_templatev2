import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useFeaturedProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Hero } from '../components/ui/Hero';
import { ProductCard } from '../components/ui/ProductCard';
import PageMeta from '../components/ui/PageMeta';
import { ProductGridSkeleton, CategoryGridSkeleton } from '../components/ui/Skeleton';
import useImageFallback from '../hooks/useImageFallback';

// ── Constantes hors composant ─────────────────────────────────────────────────
const FEATURES = [
  { icon: '🚀', title: 'Free Express Shipping', desc: 'Get your sneakers delivered within 24-48 hours, completely free.' },
  { icon: '✨', title: 'Authentic Guarantee',   desc: 'Every pair is verified authentic by our expert team.' },
  { icon: '🔄', title: 'Easy Returns',          desc: '30-day hassle-free returns. No questions asked.' },
  { icon: '💎', title: 'Exclusive Drops',       desc: 'Get early access to limited edition releases.' },
];

const Home = () => {
  const navigate = useNavigate();
  const { products: featuredProducts, loading: productsLoading, error: productsError } = useFeaturedProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const goShop    = useCallback(() => navigate('/shop'),     [navigate]);
  const goNew     = useCallback(() => navigate('/shop/new'), [navigate]);
  const handleImgError = useImageFallback();

  return (
    <div className="bg-light">
      <PageMeta description="Premium sneakers for the modern urban lifestyle. Shop the latest drops at Sneakara." />
      <Hero onPrimaryClick={goShop} onSecondaryClick={goNew} />

      {/* Featured Products */}
      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-header">
            <h2 id="featured-title" className="section-title">Featured Products</h2>
            <button className="btn btn-ghost" onClick={goShop} aria-label="View all products">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </div>

          {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : productsError ? (
            <div className="text-center py-12" role="alert">
              <p className="text-gray">Error loading products</p>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-white" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-header">
            <h2 id="categories-title" className="section-title">Shop by Category</h2>
          </div>

          {categoriesLoading ? (
            <CategoryGridSkeleton count={4} />
          ) : categoriesError ? (
            <div className="text-center py-12" role="alert">
              <p className="text-gray">Error loading categories</p>
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="card cursor-pointer"
                  onClick={() => navigate(`/shop/${category.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/shop/${category.slug}`)}
                  aria-label={`Shop ${category.name}`}
                >
                  <div className="relative" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={handleImgError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.count || '120+'} Products</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="section bg-dark" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="text-3xl font-bold text-center text-white mb-12">
            Why Choose <span className="text-brand">SNEAKARA</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-3" aria-hidden="true">{f.icon}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" aria-labelledby="newsletter-title">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand flex items-center justify-center text-2xl" aria-hidden="true">
              📧
            </div>
            <h2 id="newsletter-title" className="text-2xl font-bold mb-2">Join the Club</h2>
            <p className="text-gray mb-6">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form
              className="flex gap-2 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
              role="form"
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
                autoComplete="email"
                aria-label="Email address"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
            <p className="text-xs text-gray mt-4">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
