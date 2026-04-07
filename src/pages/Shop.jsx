import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ui/ProductCard';

const Shop = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('featured');

  // Derive filter directly from URL — no stale state issue
  const filter = category || 'all';

  const { products, loading, error } = useProducts(filter);

  const filteredProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return 0;
    }
  });

  return (
    <div className="bg-light min-h-screen">
      {/* Shop Header */}
      <div className="bg-brand-dark py-16 pt-24 text-white">
        <div className="container">
          <div className="flex items-center gap-2 mb-4 text-white/80 text-sm">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <span>Shop</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            {filter === 'all' ? 'All Products' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </h1>
          <p className="text-lg text-white/90">
            Discover our latest collection of premium sneakers
          </p>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container py-8">
        {/* Filters Bar */}
        <div className="card mb-8">
          <div className="card-body flex flex-wrap items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', 'men', 'women', 'new', 'sale'].map((f) => (
                <button
                  key={f}
                  onClick={() => navigate(f === 'all' ? '/shop' : `/shop/${f}`)}
                  className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray mb-6">
          Showing {filteredProducts.length} products
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="products-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse" style={{ height: '300px' }} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-gray">Error loading products</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-gray mb-6">Try adjusting your filters or browse all products</p>
            <button className="btn btn-primary" onClick={() => setFilter('all')}>
              View All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
