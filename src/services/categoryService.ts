import { getAllCategories, getCategoryBySlug } from '../data/categories';
import type { Category } from '../types';

export const categoryService = {
  getAll: (): Promise<Category[]> => Promise.resolve(getAllCategories()),

  getBySlug: (slug: string): Promise<Category> => {
    const category = getCategoryBySlug(slug);
    return category
      ? Promise.resolve(category)
      : Promise.reject(new Error(`Catégorie introuvable (slug: ${slug})`));
  },
};

export default categoryService;