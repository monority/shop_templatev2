import type { Product } from '../types';

const BASE = 'https://dummyjson.com';

const cache = new Map<string, unknown>();
const fetchJSON = async (url: string): Promise<unknown> => {
  if (cache.has(url)) return cache.get(url);
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.statusText);
  const data = await r.json();
  cache.set(url, data);
  return data;
};

interface DummyProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images?: string[];
  description: string;
  rating: number;
  reviews?: { length: number }[];
  stock: number;
  category?: string;
  tags?: string[];
}

const MOVEMENTS = ['Automatic', 'Quartz', 'Mechanical', 'Solar', 'Automatic', 'Quartz'];
const getMovement = (id: number): string => MOVEMENTS[id % MOVEMENTS.length];

const CASE_SIZES = [36, 38, 40, 42, 44];
const STRAP_COLORS = ['Black Leather', 'Brown Leather', 'Steel Bracelet', 'Rubber'];

const normalize = (p: DummyProduct): Product => ({
  id: p.id,
  name: p.title,
  brand: p.brand,
  price: p.price,
  originalPrice: p.discountPercentage > 0
    ? +(p.price / (1 - p.discountPercentage / 100)).toFixed(2)
    : null,
  discount: Math.round(p.discountPercentage || 0),
  image: p.thumbnail,
  images: p.images?.length ? p.images : [p.thumbnail],
  description: p.description,
  rating: p.rating,
  reviews: p.reviews?.length ?? 0,
  stock: p.stock,
  isNew: p.rating >= 4.5,
  category: p.category?.includes('womens') ? 'women' : 'men',
  movement: getMovement(p.id),
  sizes: CASE_SIZES,
  colors: STRAP_COLORS,
  features: p.tags ?? [],
});

interface CategoryResponse {
  products: DummyProduct[];
}

const fetchCategory = (slug: string, limit = 30): Promise<Product[]> =>
  fetchJSON(`${BASE}/products/category/${slug}?limit=${limit}`).then(
    (d: unknown) => (d as CategoryResponse).products.map(normalize)
  );

const fetchBoth = (): Promise<Product[]> => Promise.all([
  fetchCategory('mens-watches'),
  fetchCategory('womens-watches'),
]).then(([m, w]) => [...m, ...w]);

export type CategoryFilter = 'all' | 'men' | 'women' | 'new' | 'sale';

export const productService = {
  getAll: fetchBoth,

  getFeatured: async (): Promise<Product[]> => {
    const [m, w] = await Promise.all([
      fetchCategory('mens-watches', 12),
      fetchCategory('womens-watches', 12),
    ]);
    const out: Product[] = [];
    for (let i = 0; i < Math.max(m.length, w.length); i++) {
      if (m[i]) out.push(m[i]);
      if (w[i]) out.push(w[i]);
    }
    return out.slice(0, 16);
  },

  getById: async (id: number): Promise<Product> => {
    const p = await fetchJSON(`${BASE}/products/${id}`);
    return normalize(p as DummyProduct);
  },

  getByCategory: async (category: CategoryFilter): Promise<Product[]> => {
    if (category === 'new') {
      const all = await fetchBoth();
      return all.filter((p) => p.isNew);
    }
    if (category === 'sale') {
      const all = await fetchBoth();
      return all.filter((p) => p.discount > 5);
    }
    if (category === 'all') return fetchBoth();
    const slug = category === 'men' ? 'mens-watches' : 'womens-watches';
    return fetchCategory(slug);
  },

  search: async (query: string): Promise<Product[]> => {
    if (!query?.trim()) return [];
    const data = await fetchJSON(`${BASE}/products/search?q=${encodeURIComponent(query)}&limit=30`) as { products: DummyProduct[] };
    return data.products
      .filter((p) => p.category?.includes('watches'))
      .map(normalize);
  },
};

export default productService;
