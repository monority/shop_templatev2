import React from 'react'
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../../components/ui/ProductCard';
import { data } from '../../../../temp/ProductData';

const WomenShoes = () => {
  const { collection } = useParams();
  const navigate = useNavigate();
  const [sortMode, setSortMode] = useState('featured');

  const activeCollection = (collection || 'all').toLowerCase();

  // Collection filters configuration
  const collectionFilters = {
    all: { label: 'All Products', filter: () => true },
    women: {
      label: 'Women', filter: (product, index) => {
        if (product.gender) return product.gender.toLowerCase() === 'women';
        if (product.sizeDetail?.toLowerCase().includes('women')) return true;
        return index % 2 === 0;
      }
    },
    men: {
      label: 'Men', filter: (product, index) => {
        if (product.gender) return product.gender.toLowerCase() === 'men';
        if (product.sizeDetail?.toLowerCase().includes('men')) return true;
        return index % 2 === 1;
      }
    },
    trending: { label: 'Trending', filter: (product) => product.isTrending },
    new: { label: 'New Arrivals', filter: (product) => product.isNew },
    sale: { label: 'Sale', filter: (product) => Number(product.discountRate || 0) > 0 }
  };

  // Sort options configuration
  const sortOptions = {
    featured: { label: 'Featured', sort: (products) => products.sort((a, b) => Number(b.isTrending) - Number(a.isTrending)) },
    rating: { label: 'Top Rated', sort: (products) => products.sort((a, b) => Number(b.stars || 0) - Number(a.stars || 0)) },
    'price-asc': { label: 'Price: Low to High', sort: (products) => products.sort((a, b) => Number(a.price) - Number(b.price)) },
    'price-desc': { label: 'Price: High to Low', sort: (products) => products.sort((a, b) => Number(b.price) - Number(a.price)) }
  };

  // Content configuration
  const content = {
    all: { title: 'All Collections', subtitle: 'Discover every pair currently available in the store.' },
    women: { title: "Women's Collection", subtitle: 'Edited silhouettes with elevated comfort for everyday movement.' },
    men: { title: "Men's Collection", subtitle: 'Performance-driven models and city-ready classics in one place.' },
    trending: { title: 'Trending Right Now', subtitle: 'The most viewed sneakers this week from our community.' },
    new: { title: 'New Arrivals', subtitle: 'Just dropped pairs curated from premium brands and creators.' },
    sale: { title: 'Sale Picks', subtitle: 'Best value choices with limited-time pricing.' }
  };

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    const currentFilter = collectionFilters[activeCollection];
    const filtered = data.filter(currentFilter.filter);
    const currentSort = sortOptions[sortMode];
    return currentSort.sort([...filtered]);
  }, [activeCollection, sortMode]);

  const currentContent = content[activeCollection] || content.all;

  return (
    <section id="catalog_page">
      <div className="layout-base gap4">
        {/* Header Section */}
        <div className="catalog_header">
          <div className="catalog_intro">
            <p className="catalog_kicker">Collection</p>
            <h1>{currentContent.title}</h1>
            <p>{currentContent.subtitle}</p>
            <p className="catalog_count">{filteredProducts.length} products found</p>
          </div>
        </div>

        {/* Filter Controls */}
        <section className="catalog_controls">
          {/* Collection Tabs */}
          <nav className="filter_tabs" role="tablist">
            <div className="tabs_label">Shop by Collection</div>
            <div className="tabs_list">
              {Object.entries(collectionFilters).map(([key, config]) => (
                <button
                  key={key}
                  className={`filter_tab ${activeCollection === key ? 'active' : ''}`}
                  onClick={() => navigate(key === 'all' ? '/shop' : `/shop/${key}`)}
                  role="tab"
                  aria-selected={activeCollection === key}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Sort Options */}
          <div className="sort_section">
            <label htmlFor="sort-select" className="sort_label">Sort by</label>
            <select
              id="sort-select"
              className="sort_select"
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value)}
            >
              {Object.entries(sortOptions).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Products Grid */}
        <section className="catalog_results">
          <div className="catalog_grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                colors={product.colors}
                description={product.description}
                img={product.image}
                type={product.category}
                price={product.price}
                isNew={product.isNew}
                discountRate={product.discountRate}
                action={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="empty_state">
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse all collections.</p>
              <button className="btn btn_base" onClick={() => navigate('/shop')}>
                Browse All Products
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default WomenShoes