import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ui/ProductCard';
import PageMeta from '../components/ui/PageMeta';
import { ProductGridSkeleton } from '../components/ui/Skeleton';

// ── Constantes ────────────────────────────────────────────────────────────────
const PRICE_RANGES = [
  { value: 'all',      label: 'All Prices' },
  { value: 'under50',  label: 'Under $50' },
  { value: '50to100',  label: '$50 – $100' },
  { value: '100to200', label: '$100 – $200' },
  { value: 'over200',  label: 'Over $200' },
];

const SORT_OPTIONS = [
  { value: 'relevance',  label: 'Relevance' },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest',     label: 'Newest First' },
  { value: 'rating',     label: 'Top Rated' },
];

const filterByPrice = (product, range) => {
  const price = product.price;
  switch (range) {
    case 'under50':  return price < 50;
    case '50to100':  return price >= 50 && price <= 100;
    case '100to200': return price > 100 && price <= 200;
    case 'over200':  return price > 200;
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

// ── Composant ─────────────────────────────────────────────────────────────────
const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Lit l'état depuis l'URL — persistant au refresh et partageable
  const [query,      setQuery]      = useState(searchParams.get('q') || '');
  const [category,   setCategory]   = useState(searchParams.get('cat') || 'all');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');
  const [sortBy,     setSortBy]     = useState(searchParams.get('sort') || 'relevance');
  const [debouncedQuery, setDebouncedQuery] = useState(searchParams.get('q') || '');

  // Debounce query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Sync URL params
  useEffect(() => {
    const params = {};
    if (query)      params.q     = query;
    if (category   !== 'all') params.cat   = category;
    if (priceRange !== 'all') params.price = priceRange;
    if (sortBy     !== 'relevance') params.sort = sortBy;
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
    setQuery('');
    setCategory('all');
    setPriceRange('all');
    setSortBy('relevance');
  }, []);

  return (
    <div className="bg-light min-h-screen">
      <PageMeta
        title={debouncedQuery ? `Search: "${debouncedQuery}"` : 'Search'}
        description="Search through our collection of premium sneakers"
      />

      {/* Header */}
      <div className="bg-brand/10 py-16 pt-24">
        <div className="container">
          <h1 className="text-4xl font-extrabold text-center mb-4 text-dark">
            Find Your Perfect Pair
          </h1>
          <p className="text-lg text-gray text-center mb-8">
            Search through our collection of premium sneakers
          </p>

          <form
            className="max-w-2xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Product search"
          >
            <div className="flex gap-4">
              <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 border-2 border-gray-200 focus-within:border-brand transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray mr-3 flex-shrink-0" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brand, style, or color..."
                  className="flex-1 bg-transparent outline-none"
                  autoComplete="off"
                  aria-label="Search products"
                />
                {query && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                    aria-label="Clear search"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="container py-8">
        {/* Filters */}
        <div className="card mb-6">
          <div className="card-body flex flex-wrap justify-between items-center gap-4">
            <span className="font-semibold text-dark" role="status" aria-live="polite">
              {loading ? 'Searching…' : `${results.length} result${results.length !== 1 ? 's' : ''}`}
            </span>

            <div className="flex gap-3 flex-wrap">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input w-auto"
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="running">Running</option>
                <option value="lifestyle">Lifestyle</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="input w-auto"
                aria-label="Filter by price"
              >
                {PRICE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
                aria-label="Sort results"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <div className="text-center py-16" role="alert">
            <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
            <p className="text-gray">Please try again later</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                <path d="M8 8l6 6"/><path d="M14 8l-6 6"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">No results found</h3>
            <p className="text-gray max-w-md mx-auto mb-6">
              {debouncedQuery
                ? `No products matching "${debouncedQuery}". Try different keywords.`
                : 'Start typing to search our collection.'}
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
