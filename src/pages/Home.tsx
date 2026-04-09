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

const STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '2K+', label: 'Premium Sneakers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24h', label: 'Fast Delivery' },
];

const HOW_IT_WORKS = [
  { step: '1', title: 'Browse', desc: 'Explore our curated collection of premium sneakers' },
  { step: '2', title: 'Select', desc: 'Choose your size, color, and add to cart' },
  { step: '3', title: 'Checkout', desc: 'Secure payment with multiple options' },
  { step: '4', title: 'Enjoy', desc: 'Receive your sneakers in 24-48 hours' },
];

const TESTIMONIALS = [
  { name: 'Alex Johnson', role: 'Sneaker Enthusiast', text: 'Best selection of authentic sneakers I\'ve found. Fast shipping and great customer service!', rating: 5 },
  { name: 'Maria Garcia', role: 'Collector', text: 'The quality is incredible. Every pair is exactly as described. Highly recommend!', rating: 5 },
  { name: 'James Chen', role: 'Athlete', text: 'Perfect for both style and performance. The returns process was hassle-free.', rating: 5 },
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

      {/* Stats Section */}
      <section className="section bg-white border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="section bg-light border-b border-gray-100" aria-labelledby="categories-title">
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

      {/* How It Works */}
      <section className="section bg-light text-dark relative overflow-hidden" aria-labelledby="how-title">
        <div className="container relative z-10">
          <h2 id="how-title" className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It <span className="text-dark">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, idx) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-dark text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-dark">{item.title}</h3>
                  <p className="text-gray text-sm">{item.desc}</p>
                </div>
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-dark/30" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white" aria-labelledby="testimonials-title">
        <div className="container">
          <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark">
            What Our <span className="text-dark">Customers</span> Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="testimonial-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-warning" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray mb-4 italic">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-semibold text-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white relative overflow-hidden" aria-labelledby="features-title">
        <div className="container relative z-10">
          <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-center text-dark mb-12">
            Why Choose <span className="text-dark">SNEAKARA</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="text-3xl mb-3" aria-hidden="true">{f.icon}</div>
                <h3 className="text-dark font-semibold mb-2">{f.title}</h3>
                <p className="text-gray text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-white relative overflow-hidden border-t border-gray-100" aria-labelledby="newsletter-title">
        <div className="container relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-light flex items-center justify-center text-2xl shadow-sm border border-gray-100" aria-hidden="true">
              📧
            </div>
            <h2 id="newsletter-title" className="text-2xl md:text-3xl font-bold mb-2 text-dark">Join the Club</h2>
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
