import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface Product {
  id: string;
  category: string;
  brand: string;
  price: number;
}

const STORAGE_KEY = 'recently_viewed';

export const useRecommendations = (products: Product[], currentProduct?: Product) => {
  const [recentlyViewed] = useLocalStorage<string[]>(STORAGE_KEY, []);

  const recommendations = useMemo(() => {
    if (!products.length) return [];
    if (!currentProduct) return products.slice(0, 4);

    const scored = products
      .filter(p => p.id !== currentProduct.id)
      .map(product => {
        let score = 0;

        // Same category
        if (product.category === currentProduct.category) score += 3;

        // Same brand
        if (product.brand === currentProduct.brand) score += 2;

        // Similar price range (within 30%)
        const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price;
        if (priceDiff < 0.3) score += 1;

        // Recently viewed
        if (recentlyViewed.includes(product.id)) score += 2;

        return { product, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(r => r.product);

    return scored;
  }, [products, currentProduct, recentlyViewed]);

  const trackView = (productId: string) => {
    const updated = [productId, ...recentlyViewed.filter(id => id !== productId)].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { recommendations, trackView };
};