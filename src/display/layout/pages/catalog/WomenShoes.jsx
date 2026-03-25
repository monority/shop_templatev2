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

  const resolveGender = (product, index) => {
    if (product.gender) return product.gender.toLowerCase();
    if (product.sizeDetail?.toLowerCase().includes('women')) return 'women';
    if (product.sizeDetail?.toLowerCase().includes('men')) return 'men';
    return index % 2 === 0 ? 'women' : 'men';
  };

  const filteredProducts = useMemo(() => {
    const now = [...data].filter((product, index) => {
      if (activeCollection === 'all') return true;
      if (activeCollection === 'trending') return product.isTrending;
      if (activeCollection === 'new') return product.isNew;
      if (activeCollection === 'sale') return Number(product.discountRate || 0) > 0;
      if (activeCollection === 'women') return resolveGender(product, index) === 'women';
      if (activeCollection === 'men') return resolveGender(product, index) === 'men';
      return true;
    });

    switch (sortMode) {
      case 'price-asc':
        return now.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-desc':
        return now.sort((a, b) => Number(b.price) - Number(a.price));
      case 'rating':
        return now.sort((a, b) => Number(b.stars) - Number(a.stars));
      default:
        return now.sort((a, b) => Number(b.isTrending) - Number(a.isTrending));
    }
  }, [activeCollection, sortMode]);

  const titleMap = {
    all: 'All Collections',
    women: 'Women Collection',
    men: 'Men Collection',
    trending: 'Trending Right Now',
    new: 'New Arrivals',
    sale: 'Sale Picks',
  };

  const subtitleMap = {
    all: 'Discover every pair currently available in the store.',
    women: 'Edited silhouettes with elevated comfort for everyday movement.',
    men: 'Performance-driven models and city-ready classics in one place.',
    trending: 'The most viewed sneakers this week from our community.',
    new: 'Just dropped pairs curated from premium brands and creators.',
    sale: 'Best value choices with limited-time pricing.',
  };

  return (
    <section id="catalog_page">
      <div className="lyt_container gap4">
        <div className="catalog_intro">
          <p className="catalog_kicker">Collection</p>
          <h1>{titleMap[activeCollection] || 'Collection'}</h1>
          <p>{subtitleMap[activeCollection] || 'Explore our selected products.'}</p>
        </div>

        <div className="catalog_toolbar">
          <div className="catalog_tabs">
            <button className={`btn ${activeCollection === 'all' ? 'btn_base' : 'btn_secondary'}`} onClick={() => navigate('/shop')}>All</button>
            <button className={`btn ${activeCollection === 'women' ? 'btn_base' : 'btn_secondary'}`} onClick={() => navigate('/shop/women')}>Women</button>
            <button className={`btn ${activeCollection === 'men' ? 'btn_base' : 'btn_secondary'}`} onClick={() => navigate('/shop/men')}>Men</button>
            <button className={`btn ${activeCollection === 'trending' ? 'btn_base' : 'btn_secondary'}`} onClick={() => navigate('/shop/trending')}>Trending</button>
            <button className={`btn ${activeCollection === 'new' ? 'btn_base' : 'btn_secondary'}`} onClick={() => navigate('/shop/new')}>New</button>
            <button className={`btn ${activeCollection === 'sale' ? 'btn_base' : 'btn_secondary'}`} onClick={() => navigate('/shop/sale')}>Sale</button>
          </div>

          <select className="catalog_sort" value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        <div className="catalog_grid">
          {filteredProducts.map((sneaker) => (
            <ProductCard
              key={sneaker.id}
              id={sneaker.id}
              title={sneaker.title}
              colors={sneaker.colors}
              description={sneaker.description}
              img={sneaker.image}
              type={sneaker.category}
              price={sneaker.price}
              isNew={sneaker.isNew}
              discountRate={sneaker.discountRate}
              action={() => navigate(`/product/${sneaker.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WomenShoes