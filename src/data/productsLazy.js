/**
 * Lazy-loaded products data
 * Imported dynamically to avoid blocking initial page load
 */

let productsCache = null;

export const getProductsData = async () => {
  if (productsCache) return productsCache;
  
  const { products } = await import('./products');
  productsCache = products;
  return products;
};

export const getProductsDataSync = () => {
  // Fallback for sync access - returns empty array if not loaded
  return productsCache || [];
};
