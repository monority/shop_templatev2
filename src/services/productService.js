import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getNewArrivals,
  getProductsOnSale,
  searchProducts,
} from '../data/products';

export const productService = {
  getAll:        ()         => Promise.resolve(getAllProducts()),
  getFeatured:   ()         => Promise.resolve(getFeaturedProducts()),
  getNewArrivals:()         => Promise.resolve(getNewArrivals()),
  getOnSale:     ()         => Promise.resolve(getProductsOnSale()),

  getById: (id) => {
    const product = getProductById(id);
    return product
      ? Promise.resolve(product)
      : Promise.reject(new Error(`Produit introuvable (id: ${id})`));
  },

  getByCategory: (category) => {
    if (category === 'new')  return Promise.resolve(getNewArrivals());
    if (category === 'sale') return Promise.resolve(getProductsOnSale());
    return Promise.resolve(getProductsByCategory(category));
  },

  search: (query) => {
    if (!query?.trim()) return Promise.resolve([]);
    return Promise.resolve(searchProducts(query.trim().toLowerCase()));
  },
};

export default productService;
