import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct, useFeaturedProducts } from '../hooks/useProducts';
import { useCart, useFavorites } from '../store';
import PageMeta from '../components/ui/PageMeta';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import { ProductCard } from '../components/ui/ProductCard';
import { formatPrice } from '../utils/format';
import useImageFallback from '../hooks/useImageFallback';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/ui/Reveal';
import { ProductJsonLd, BreadcrumbJsonLd } from '../components/ui/JsonLd';

// ── Fake reviews ──────────────────────────────────────────────────────────────
const FAKE_REVIEWS = [
  { name: 'Alexandre M.', rating: 5, date: 'March 2026',    text: 'Exceptional quality. The movement is smooth and the dial is even more beautiful in person. Packaging was impeccable.' },
  { name: 'Sophie L.',    rating: 5, date: 'February 2026', text: 'Arrived faster than expected, fully authenticated. Exactly as described. Will definitely order again.' },
  { name: 'James C.',     rating: 4, date: 'January 2026',  text: 'Great piece at a fair price. Strap is comfortable and the clasp is solid. Highly recommend.' },
];

// ── Image zoom component ──────────────────────────────────────────────────────
const ZoomImage = ({ src, alt, onError }: { src: string; alt: string; onError: any }) => {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }, []);

  return (
    <div
      className="aspect-square bg-[#111] overflow-hidden cursor-zoom-in relative"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMove}
      aria-label="Hover to zoom"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-100"
        style={zoomed ? { transform: 'scale(2)', transformOrigin: `${pos.x}% ${pos.y}%` } : {}}
        loading="eager"
        onError={onError}
      />
      {!zoomed && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/30 text-[10px] tracking-widest uppercase pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
          Zoom
        </div>
      )}
    </div>
  );
};

// ── Tab component ─────────────────────────────────────────────────────────────
const TABS = ['Description', 'Specifications', 'Reviews'];

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { products: related } = useFeaturedProducts();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const handleImgError = useImageFallback();

  const [selectedSize,  setSelectedSize]  = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity,      setQuantity]      = useState(1);
  const [mainImage,     setMainImage]     = useState<string | null>(null);
  const [added,         setAdded]         = useState(false);
  const [activeTab,     setActiveTab]     = useState('Description');

  useEffect(() => {
    if (product) {
      setMainImage(product.images?.[0] || product.image);
      setSelectedSize(product.sizes?.[0]);
      setSelectedColor(product.colors?.[0]);
      setActiveTab('Description');
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedSize) return;
    addToCart({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: mainImage, size: selectedSize, color: selectedColor, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [product, selectedSize, selectedColor, mainImage, quantity, addToCart]);

  if (loading) return <div className="bg-[#0a0a0a] min-h-screen"><ProductDetailSkeleton /></div>;

  if (error || !product) return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/20 text-sm tracking-widest uppercase mb-6">Product not found</p>
        <button className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    </div>
  );

  const relatedProducts = related.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <PageMeta
        title={product.name}
        description={`${product.brand} ${product.name} — ${product.description?.slice(0, 150)}`}
        image={product.image}
        canonical={`/product/${product.id}`}
      />
      <ProductJsonLd
        id={product.id}
        name={product.name}
        brand={product.brand}
        description={product.description}
        image={product.image}
        images={product.images}
        price={product.price}
        originalPrice={product.originalPrice}
        rating={product.rating}
        reviewCount={product.reviews || 3}
        stock={product.stock}
        isNew={product.isNew}
        movement={product.movement}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: product.name, path: `/product/${product.id}` },
      ]} />

      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06]">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
            <Link to="/" className="text-white/25 hover:text-white transition-colors">Home</Link>
            <span className="text-white/10">/</span>
            <Link to="/shop" className="text-white/25 hover:text-white transition-colors">Shop</Link>
            <span className="text-white/10">/</span>
            <span className="text-white/40 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Main product section ─────────────────────────────────────────── */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Images */}
          <div>
            <ZoomImage src={mainImage!} alt={product.name} onError={handleImgError} />
            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img: string, i: number) => (
                  <motion.button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 overflow-hidden flex-shrink-0 transition-all ${mainImage === img ? 'ring-1 ring-white' : 'ring-1 ring-white/10 opacity-40 hover:opacity-80'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" onError={handleImgError} />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.isNew && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/15 px-2 py-0.5">New In</span>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-accent border border-accent/30 px-2 py-0.5">
                  Only {product.stock} left
                </span>
              )}
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 border border-white/10 px-2 py-0.5 flex items-center gap-1">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white/40"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Authenticated
              </span>
            </div>

            <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-2">{product.brand}</p>
            <h1
              className="text-white mb-4 leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < Math.floor(product.rating || 4.5) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="text-white/50">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('Reviews')}
                className="text-white/30 text-xs hover:text-white transition-colors"
              >
                {product.rating || 4.5} · {FAKE_REVIEWS.length} reviews
              </button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-white/[0.06]">
              <span className="text-white text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-white/25 text-lg line-through">{formatPrice(product.originalPrice)}</span>}
              {product.discount > 0 && (
                <span className="text-[10px] font-bold text-white bg-accent px-2 py-1 tracking-widest">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <p className="text-white/30 text-[11px] tracking-[0.2em] uppercase mb-3">
                  Strap — <span className="text-white/60">{selectedColor}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`px-3 py-1.5 text-xs transition-all ${
                        selectedColor === color
                          ? 'bg-white text-[#0a0a0a] font-semibold'
                          : 'border border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size (case size) */}
            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/30 text-[11px] tracking-[0.2em] uppercase">Case Diameter</p>
                  <Link to="/help/size-guide" className="text-white/25 text-[10px] tracking-widest uppercase hover:text-white transition-colors border-b border-transparent hover:border-white/20">
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: any) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-xs font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-white text-[#0a0a0a]'
                          : 'border border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {size}mm
                    </button>
                  ))}
                </div>
                <p className="text-white/20 text-[10px] mt-2">
                  {selectedSize === 36 ? 'Small — ideal for wrists under 16cm' :
                   selectedSize === 38 ? 'Classic — suits most wrists' :
                   selectedSize === 40 ? 'Mid-size — most popular' :
                   selectedSize === 42 ? 'Large — bold presence' :
                   'Oversized — statement piece'}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <div className="flex items-center border border-white/10">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 text-white/40 hover:text-white transition-colors text-lg">−</button>
                <span className="w-10 text-center text-white text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 text-white/40 hover:text-white transition-colors text-lg">+</button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 h-11 text-xs font-bold tracking-[0.2em] uppercase transition-all ${
                  added ? 'bg-white/20 text-white' : 'bg-white text-[#0a0a0a] hover:bg-white/90'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {added ? '✓ Added to Cart' : `Add to Cart — ${formatPrice(product.price * quantity)}`}
              </motion.button>

              <button
                onClick={() => toggleFavorite(product)}
                aria-label={isFavorite(product?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-11 h-11 border flex items-center justify-center transition-all ${
                  isFavorite(product?.id) ? 'border-white/40 text-white bg-white/5' : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white'
                }`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={isFavorite(product?.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4">
              {[
                ['Free Shipping', 'Over $200'],
                ['30-Day Returns', 'No questions'],
                ['Authenticated', 'By experts'],
              ].map(([title, sub]) => (
                <div key={title} className="text-center">
                  <p className="text-white/50 text-xs font-medium">{title}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ─────────────────────────── */}
        <div className="mt-16 border-t border-white/[0.06]">
          {/* Tab bar */}
          <div className="flex border-b border-white/[0.06]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors border-b-2 -mb-px ${
                  activeTab === tab ? 'text-white border-white' : 'text-white/30 border-transparent hover:text-white/60'
                }`}
              >
                {tab} {tab === 'Reviews' && `(${FAKE_REVIEWS.length})`}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="py-10"
            >
              {activeTab === 'Description' && (
                <div className="max-w-2xl">
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>
                  {product.features?.length > 0 && (
                    <ul className="space-y-3">
                      {product.features.map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-white/40 text-sm">
                          <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0 mt-2" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === 'Specifications' && (
                <div className="max-w-lg">
                  <div className="space-y-px bg-white/[0.04]">
                    {[
                      ['Brand',            product.brand],
                      ['Reference',        `REF-${product.id}`],
                      ['Case Material',    'Stainless Steel 316L'],
                      ['Case Diameter',    `${selectedSize || 40}mm`],
                      ['Case Thickness',   '10.5mm'],
                      ['Movement',         'Swiss Automatic'],
                      ['Power Reserve',    '42 hours'],
                      ['Water Resistance', '50m / 5 ATM'],
                      ['Crystal',          'Sapphire, anti-reflective'],
                      ['Strap',            selectedColor || 'Black Leather'],
                      ['Clasp',            'Deployant buckle'],
                      ['Warranty',         '2 Years international'],
                      ['Condition',        product.isNew ? 'New with box & papers' : 'Pre-owned, excellent'],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-[#0a0a0a] flex items-center justify-between px-5 py-3.5">
                        <span className="text-white/30 text-xs tracking-wide">{label}</span>
                        <span className="text-white/70 text-xs font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="max-w-2xl space-y-6">
                  {/* Average */}
                  <div className="flex items-center gap-6 pb-6 border-b border-white/[0.06]">
                    <div className="text-center">
                      <p className="text-white text-5xl font-bold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {product.rating || 4.5}
                      </p>
                      <div className="flex gap-0.5 justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.floor(product.rating || 4.5) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="text-white/50">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-white/25 text-xs mt-1">{FAKE_REVIEWS.length} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map((star) => {
                        const count = FAKE_REVIEWS.filter(r => r.rating === star).length;
                        const pct = (count / FAKE_REVIEWS.length) * 100;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-white/25 text-[10px] w-3">{star}</span>
                            <div className="flex-1 h-px bg-white/10">
                              <div className="h-px bg-white/40" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-white/20 text-[10px] w-4">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review list */}
                  {FAKE_REVIEWS.map((r) => (
                    <div key={r.name} className="pb-6 border-b border-white/[0.06]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-white/10 flex items-center justify-center text-white/50 text-xs font-bold">
                            {r.name[0]}
                          </div>
                          <span className="text-white/70 text-sm font-medium">{r.name}</span>
                        </div>
                        <span className="text-white/20 text-xs">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2 ml-10">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < r.rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="text-white/40">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed ml-10">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── You May Also Like ────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <Reveal>
            <section className="mt-8 pt-12 border-t border-white/[0.06]" aria-labelledby="related-title">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-2">Discover More</p>
                  <h2
                    id="related-title"
                    className="text-white leading-tight"
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    You May Also Like
                  </h2>
                </div>
                <button
                  onClick={() => navigate('/shop')}
                  className="hidden sm:flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5"
                >
                  View All
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="bg-[#0a0a0a]">
                    <ProductCard product={p} dark />
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default Product;
