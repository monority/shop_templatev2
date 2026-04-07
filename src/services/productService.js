/**
 * Product Service
 * Business logic for products
 */

import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getNewArrivals,
  getProductsOnSale,
  searchProducts
} from '../data/products';

export const productService = {
  /**
   * Get all products
   */
  getAll: () => {
    return Promise.resolve(getAllProducts());
  },

  /**
   * Get product by ID
   */
  getById: (id) => {
    const product = getProductById(id);
    if (!product) {
      return Promise.reject(new Error('Product not found'));
    }
    return Promise.resolve(product);
  },

  /**
   * Get products by category
   * Handles special slugs: new, sale, kids (all)
   */
  getByCategory: (category) => {
    if (category === 'new') return Promise.resolve(getNewArrivals());
    if (category === 'sale') return Promise.resolve(getProductsOnSale());
    return Promise.resolve(getProductsByCategory(category));
  },

  /**
   * Get featured products
   */
  getFeatured: () => {
    return Promise.resolve(getFeaturedProducts());
  },

  /**
   * Get new arrivals
   */
  getNewArrivals: () => {
    return Promise.resolve(getNewArrivals());
  },

  /**
   * Get products on sale
   */
  getOnSale: () => {
    return Promise.resolve(getProductsOnSale());
  },

  /**
   * Search products
   */
  search: (query) => {
    return Promise.resolve(searchProducts(query));
  }
};

export default productService;
