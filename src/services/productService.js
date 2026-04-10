const BASE = 'https://dummyjson.com';

// ── Simple in-memory cache — avoids re-fetching on every navigation ───────────
const cache = new Map();
const fetchJSON = async (url) => {
  if (cache.has(url)) return cache.get(url);
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.statusText);
  const data = await r.json();
  cache.set(url, data);
  return data;
};

// ── Deterministic movement assignment based on product ID ─────────────────────
// DummyJSON has no movement field — we assign one consistently so filters work
const MOVEMENTS = ['Automatic', 'Quartz', 'Mechanical', 'Solar', 'Automatic', 'Quartz'];
const getMovement = (id) => MOVEMENTS[id % MOVEMENTS.length];

const CASE_SIZES  = [36, 38, 40, 42, 44];
const STRAP_COLORS = ['Black Leather', 'Brown Leather', 'Steel Bracelet', 'Rubber'];

const normalize = (p) => ({
  id:            p.id,
  name:          p.title,
  brand:         p.brand,
  price:         p.price,
  originalPrice: p.discountPercentage > 0
    ? +(p.price / (1 - p.discountPercentage / 100)).toFixed(2)
    : null,
  discount:      Math.round(p.discountPercentage || 0),
  image:         p.thumbnail,
  images:        p.images?.length ? p.images : [p.thumbnail],
  description:   p.description,
  rating:        p.rating,
  reviews:       p.reviews?.length ?? 0,
  stock:         p.stock,
  isNew:         p.rating >= 4.5,
  category:      p.category?.includes('womens') ? 'women' : 'men',
  movement:      getMovement(p.id),   // ← real filterable field
  sizes:         CASE_SIZES,
  colors:        STRAP_COLORS,
  features:      p.tags ?? [],
});

// ── Fetch helpers ─────────────────────────────────────────────────────────────
const fetchCategory = (slug, limit = 30) =>
  fetchJSON(`${BASE}/products/category/${slug}?limit=${limit}`).then((d) => d.products.map(normalize));

const fetchBoth = () => Promise.all([
  fetchCategory('mens-watches'),
  fetchCategory('womens-watches'),
]).then(([m, w]) => [...m, ...w]);

// ── Service ───────────────────────────────────────────────────────────────────
export const productService = {
  getAll: fetchBoth,

  getFeatured: async () => {
    const [m, w] = await Promise.all([
      fetchCategory('mens-watches', 12),
      fetchCategory('womens-watches', 12),
    ]);
    // Interleave for variety
    const out = [];
    for (let i = 0; i < Math.max(m.length, w.length); i++) {
      if (m[i]) out.push(m[i]);
      if (w[i]) out.push(w[i]);
    }
    return out.slice(0, 16);
  },

  getById: async (id) => {
    const p = await fetchJSON(`${BASE}/products/${id}`);
    return normalize(p);
  },

  getByCategory: async (category) => {
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

  search: async (query) => {
    if (!query?.trim()) return [];
    const data = await fetchJSON(`${BASE}/products/search?q=${encodeURIComponent(query)}&limit=30`);
    return data.products
      .filter((p) => p.category?.includes('watches'))
      .map(normalize);
  },
};

export default productService;
