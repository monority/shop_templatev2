import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ui/ProductCard';
import PageMeta from '../components/ui/PageMeta';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemListJsonLd, BreadcrumbJsonLd } from '../components/ui/JsonLd';

const CATEGORIES = [
  { slug: 'all', label: 'All' },
  { slug: 'men', label: "Men's" },
  { slug: 'women', label: "Women's" },
  { slug: 'new', label: 'New In' },
  { slug: 'sale', label: 'Sale' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price ↑' },
  { value: 'price-high', label: 'Price ↓' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

const MOVEMENTS = ['All', 'Automatic', 'Quartz', 'Mechanical', 'Solar'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100–$500', min: 100, max: 500 },
  { label: '$500–$1000', min: 500, max: 1000 },
  { label: 'Over $1000', min: 1000, max: Infinity },
];

// Chevron icon
const Chevron = ({ open }: { open: boolean }) => (
  <motion.svg
    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
    className="text-white/30"
  >
    <path d="m6 9 6 6 6-6" />
  </motion.svg>
);

// Collapsible filter group
const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/[0.06] pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-semibold group-hover:text-white/50 transition-colors">{title}</span>
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import type { CategoryFilter } from '../services/productService';

const Shop = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const filter: CategoryFilter = (category as CategoryFilter) || 'all';

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [priceRange, setPriceRange] = useState(0);
  const [movement, setMovement] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { products, loading, error } = useProducts(filter);

  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES[priceRange];
    let result = products.filter((p) => {
      if (p.price < range.min || p.price >= range.max) return false;
      if (movement !== 'All' && p.movement !== movement) return false;
      return true;
    });
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default: return 0;
      }
    });
  }, [products, sortBy, priceRange, movement]);

  const activeFilters = useMemo(() => {
    let count = 0;
    if (priceRange !== 0) count++;
    if (movement !== 'All') count++;
    return count;
  }, [priceRange, movement]);

  const clearFilters = useCallback(() => {
    setPriceRange(0);
    setMovement('All');
    setSortBy('featured');
  }, []);

  const categoryLabel = filter === 'all' ? 'All Timepieces'
    : CATEGORIES.find(c => c.slug === filter)?.label + ' Watches' || filter;

  return (
    <>
      <PageMeta
        title={categoryLabel}
        description={`Shop ${filteredProducts.length}+ ${categoryLabel.toLowerCase()} at HORLOGÉS. Authenticated luxury timepieces, free shipping over $200.`}
        canonical={filter === 'all' ? '/shop' : `/shop/${filter}`}
      />
      {!loading && filteredProducts.length > 0 && (
        <>
          <ItemListJsonLd items={filteredProducts} name={categoryLabel} />
          <BreadcrumbJsonLd items={[
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            ...(filter !== 'all' ? [{ name: categoryLabel, path: `/shop/${filter}` }] : []),
          ]} />
        </>
      )}
      <div className="bg-[#0a0a0a] min-h-screen">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] py-14">
          <div className="container">
            <div className="flex items-center gap-2 mb-5 text-[11px] tracking-[0.2em] uppercase">
              <Link to="/" className="text-white/25 hover:text-white transition-colors">Home</Link>
              <span className="text-white/10">/</span>
              <span className="text-white/40">Shop</span>
              {filter !== 'all' && <>
                <span className="text-white/10">/</span>
                <span className="text-white/40">{categoryLabel}</span>
              </>}
            </div>
            <div className="flex items-end justify-between gap-4">
              <h1
                className="text-white leading-none"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
              >
                {categoryLabel}
              </h1>
              <p className="text-white/25 text-xs tracking-widest uppercase pb-1">
                {loading ? '—' : `${filteredProducts.length} pieces`}
              </p>
            </div>
          </div>
        </div>

        {/* ── Category tabs + sort bar ─────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] sticky top-[86px] z-30 bg-[#0a0a0a]/95 backdrop-blur-md">
          <div className="container">
            <div className="flex items-center justify-between h-12 gap-4">
              {/* Tabs */}
              <div className="flex items-center overflow-x-auto scrollbar-none">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => navigate(c.slug === 'all' ? '/shop' : `/shop/${c.slug}`)}
                    className={`px-4 h-12 text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors border-b-2 ${filter === c.slug ? 'text-white border-white' : 'text-white/30 border-transparent hover:text-white/60'
                      }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Active filter badge */}
                {activeFilters > 0 && (
                  <button onClick={clearFilters} className="text-white/40 text-[10px] tracking-widest uppercase hover:text-white transition-colors flex items-center gap-1.5">
                    Clear ({activeFilters})
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </button>
                )}

                {/* Mobile filter toggle */}
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden flex items-center gap-1.5 text-white/40 text-[11px] tracking-[0.15em] uppercase hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" /></svg>
                  Filters {activeFilters > 0 && `(${activeFilters})`}
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white/40 text-[11px] tracking-[0.15em] uppercase focus:outline-none cursor-pointer hover:text-white transition-colors"
                  aria-label="Sort"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#0a0a0a] text-white">{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main layout: sidebar + grid ──────────────────────────────────── */}
        <div className="container py-10">
          <div className="flex gap-10">

            {/* ── Sidebar filters (desktop) ─────────────────────────────── */}
            <aside className="hidden lg:block w-52 flex-shrink-0 pt-1" aria-label="Filters">

              <FilterGroup title="Price Range">
                <div className="space-y-1">
                  {PRICE_RANGES.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => setPriceRange(i)}
                      className={`w-full text-left text-sm py-1.5 transition-colors flex items-center justify-between ${priceRange === i ? 'text-white' : 'text-white/35 hover:text-white/60'
                        }`}
                    >
                      {r.label}
                      {priceRange === i && <span className="w-1 h-1 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Movement">
                <div className="space-y-1">
                  {MOVEMENTS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMovement(m)}
                      className={`w-full text-left text-sm py-1.5 transition-colors flex items-center justify-between ${movement === m ? 'text-white' : 'text-white/35 hover:text-white/60'
                        }`}
                    >
                      {m}
                      {movement === m && <span className="w-1 h-1 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Gender">
                <div className="space-y-1">
                  {["All", "Men's", "Women's", "Unisex"].map((g) => (
                    <button
                      key={g}
                      onClick={() => navigate(g === 'All' ? '/shop' : g === "Men's" ? '/shop/men' : g === "Women's" ? '/shop/women' : '/shop')}
                      className={`w-full text-left text-sm py-1.5 transition-colors flex items-center justify-between ${(g === 'All' && filter === 'all') || (g === "Men's" && filter === 'men') || (g === "Women's" && filter === 'women')
                        ? 'text-white' : 'text-white/35 hover:text-white/60'
                        }`}
                    >
                      {g}
                      {((g === 'All' && filter === 'all') || (g === "Men's" && filter === 'men') || (g === "Women's" && filter === 'women')) && (
                        <span className="w-1 h-1 rounded-full bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-white/25 text-xs tracking-widest uppercase hover:text-white transition-colors mt-2"
                >
                  Clear all filters
                </button>
              )}
            </aside>

            {/* ── Mobile filter drawer ──────────────────────────────────── */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  className="lg:hidden fixed inset-0 z-50 flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
                  <motion.div
                    className="relative ml-auto w-72 bg-[#0d0d0d] h-full overflow-y-auto p-6"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase">Filters</p>
                      <button onClick={() => setFiltersOpen(false)} className="text-white/30 hover:text-white transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </div>

                    <FilterGroup title="Price Range">
                      <div className="space-y-1">
                        {PRICE_RANGES.map((r, i) => (
                          <button key={r.label} onClick={() => setPriceRange(i)} className={`w-full text-left text-sm py-2 transition-colors ${priceRange === i ? 'text-white' : 'text-white/35'}`}>
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </FilterGroup>

                    <FilterGroup title="Movement">
                      <div className="space-y-1">
                        {MOVEMENTS.map((m) => (
                          <button key={m} onClick={() => setMovement(m)} className={`w-full text-left text-sm py-2 transition-colors ${movement === m ? 'text-white' : 'text-white/35'}`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </FilterGroup>

                    <button
                      onClick={() => { setFiltersOpen(false); clearFilters(); }}
                      className="w-full mt-6 py-3 border border-white/10 text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/30 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="w-full mt-3 py-3 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase"
                    >
                      Show {filteredProducts.length} Results
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Product grid ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <ProductGridSkeleton count={8} />
              ) : error ? (
                <p className="text-white/30 text-center py-24" role="alert">Error loading products</p>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-white/20 text-sm tracking-widest uppercase mb-6">No products match your filters</p>
                  <button onClick={clearFilters} className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-[#0a0a0a]">
                      <ProductCard product={product} dark />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
