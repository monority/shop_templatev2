import { getAllCategories, getCategoryBySlug } from '../data/categories';

export const categoryService = {
  getAll: () => Promise.resolve(getAllCategories()),

  getBySlug: (slug) => {
    const category = getCategoryBySlug(slug);
    return category
      ? Promise.resolve(category)
      : Promise.reject(new Error(`Catégorie introuvable (slug: ${slug})`));
  },
};

export default categoryService;
