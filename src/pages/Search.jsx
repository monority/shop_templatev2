import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ui/ProductCard';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'relevance'
  });
  
  const { products, loading, error } = useSearchProducts(debouncedQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (filters.priceRange !== 'all') {
      const price = parseFloat(product.price);
      switch (filters.priceRange) {
        case 'under50': return price < 50;
        case '50to100': return price >= 50 && price <= 100;
        case '100to200': return price > 100 && price <= 200;
        case 'over200': return price > 200;
        default: return true;
      }
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high': return parseFloat(b.price) - parseFloat(a.price);
      case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      default: return 0;
    }
  });

  return (
    <div className="bg-light min-h-screen">
      {/* Search Header */}
      <div className="bg-brand/10 py-16 pt-24">
        <div className="container">
          <h1 className="text-4xl font-extrabold text-center mb-4 text-dark">
            Find Your Perfect Pair
          </h1>
          <p className="text-lg text-gray text-center mb-8">
            Search through our collection of premium sneakers
          </p>

          {/* Search Bar */}
          <form className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="flex items-center bg-white rounded-xl px-4 py-3 border-2 border-gray-200 focus-within:border-brand transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray mr-3">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by brand, style, or color..."
                    className="flex-1 bg-transparent outline-none"
                  />
                  {query && (
                    <button 
                      type="button"
                      onClick={() => setQuery('')}
                      className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="container py-8">
        {/* Filters */}
        <div className="card mb-8">
          <div className="card-body flex flex-wrap justify-between items-center gap-4">
            <span className="font-semibold text-dark">
              {loading ? 'Searching...' : `${sortedProducts.length} results`}
            </span>
            
            <div className="flex gap-4 flex-wrap">
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="input w-auto"
              >
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>

              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="input w-auto"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="100to200">$100 - $200</option>
                <option value="over200">Over $200</option>
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="input w-auto"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="products-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse" style={{ height: '300px' }} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-4">Something went wrong</h3>
            <p className="text-gray">Please try again later</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-28 h-28 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M8 8l6 6"/>
                <path d="M14 8l-6 6"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">No results found</h3>
            <p className="text-gray max-w-md mx-auto mb-6">
              We couldn't find any products matching "{debouncedQuery}". Try different keywords or browse our categories.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
