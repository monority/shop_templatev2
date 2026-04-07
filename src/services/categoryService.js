/**
 * Category Service
 * Business logic for categories
 */

import { getAllCategories, getCategoryBySlug } from '../data/categories';

export const categoryService = {
  /**
   * Get all categories
   */
  getAll: () => {
    return Promise.resolve(getAllCategories());
  },

  /**
   * Get category by slug
   */
  getBySlug: (slug) => {
    const category = getCategoryBySlug(slug);
    if (!category) {
      return Promise.reject(new Error('Category not found'));
    }
    return Promise.resolve(category);
  }
};

export default categoryService;
