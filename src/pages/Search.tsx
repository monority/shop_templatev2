import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ui/ProductCard';
import PageMeta from '../components/ui/PageMeta';
import { ProductGridSkeleton } from '../components/ui/Skeleton';

const PRICE_RANGES = [
  { value: 'all',      label: 'All Prices' },
  { value: 'under50',  label: 'Under $50' },
  { value: '50to100',  label: '$50–$100' },
  { value: '100to200', label: '$100–$200' },
  { value: 'over200',  label: 'Over $200' },
];

const SORT_OPTIONS = [
  { value: 'relevance',  label: 'Relevance' },
  { value: 'price-low',  label: 'Price ↑' },
  { value: 'price-high', label: 'Price ↓' },
  { value: 'newest',     label: 'Newest' },
  { value: 'rating',     label: 'Top Rated' },
];

const filterByPrice = (p, range) => {
  switch (range) {
    case 'under50':  return p.price < 50;
    case '50to100':  return p.price >= 50 && p.price <= 100;
    case '100to200': return p.price > 100 && p.price <= 200;
    case 'over200':  return p.price > 200;
    default:         return true;
  }
};

const sortProducts = (products, sortBy) => [...products].sort((a, b) => {
  switch (sortBy) {
    case 'price-low':  return a.price - b.price;
    case 'price-high': return b.price - a.price;
    case 'newest':     return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    case 'rating':     return (b.rating || 0) - (a.rating || 0);
    default:           return 0;
  }
});

const DarkSelect = ({ value, onChange, options, label }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-transparent text-white/40 text-[11px] tracking-[0.15em] uppercase focus:outline-none cursor-pointer hover:text-white transition-colors border border-white/10 px-3 py-2"
    aria-label={label}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value} className="bg-[#0a0a0a] text-white">{o.label}</option>
    ))}
  </select>
);

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query,          setQuery]      = useState(searchParams.get('q') || '');
  const [category,       setCategory]   = useState(searchParams.get('cat') || 'all');
  const [priceRange,     setPriceRange] = useState(searchParams.get('price') || 'all');
  const [sortBy,         setSortBy]     = useState(searchParams.get('sort') || 'relevance');
  const [debouncedQuery, setDebounced]  = useState(searchParams.get('q') || '');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (query)              params.q     = query;
    if (category !== 'all') params.cat   = category;
    if (priceRange !== 'all') params.price = priceRange;
    if (sortBy !== 'relevance') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [query, category, priceRange, sortBy, setSearchParams]);

  const { products, loading, error } = useSearchProducts(debouncedQuery);

  const results = useMemo(() => {
    const filtered = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      return filterByPrice(p, priceRange);
    });
    return sortProducts(filtered, sortBy);
  }, [products, category, priceRange, sortBy]);

  const handleClear = useCallback(() => {
    setQuery(''); setCategory('all'); setPriceRange('all'); setSortBy('relevance');
  }, []);

  const CATEGORY_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'running', label: 'Running' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <PageMeta title={debouncedQuery ? `"${debouncedQuery}"` : 'Search'} description="Search our collection of luxury timepieces — filter by brand, movement, and price." canonical="/search" />

      {/* Header */}
      <div className="border-b border-white/[0.06] py-16">
        <div className="container">
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Search</p>
          <form onSubmit={(e) => e.preventDefault()} role="search" aria-label="Product search">
            <div className="flex items-center gap-4 border-b border-white/20 pb-4 max-w-2xl">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 flex-shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by brand, style, color..."
                className="flex-1 bg-transparent text-white placeholder:text-white/20 text-xl focus:outline-none"
                autoComplete="off"
                autoFocus
                aria-label="Search products"
              />
              {query && (
                <button type="button" onClick={handleClear} className="text-white/20 hover:text-white transition-colors" aria-label="Clear">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.06]">
          <span className="text-white/30 text-xs tracking-widest uppercase" role="status" aria-live="polite">
            {loading ? 'Searching…' : `${results.length} result${results.length !== 1 ? 's' : ''}`}
          </span>
          <div className="flex gap-3 flex-wrap">
            <DarkSelect value={category}   onChange={setCategory}   options={CATEGORY_OPTIONS} label="Category" />
            <DarkSelect value={priceRange} onChange={setPriceRange} options={PRICE_RANGES}     label="Price range" />
            <DarkSelect value={sortBy}     onChange={setSortBy}     options={SORT_OPTIONS}     label="Sort by" />
          </div>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <p className="text-white/30 text-center py-16" role="alert">Something went wrong</p>
        ) : results.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm tracking-widest uppercase mb-6">
              {debouncedQuery ? `No results for "${debouncedQuery}"` : 'Start typing to search'}
            </p>
            {debouncedQuery && (
              <button className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors" onClick={() => navigate('/shop')}>
                Browse All Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
            {results.map((product) => (
              <div key={product.id} className="bg-[#0a0a0a]">
                <ProductCard product={product} dark />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
