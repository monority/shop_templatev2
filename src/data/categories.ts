import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'men',
    name: "Men's Watches",
    slug: 'men',
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp',
    description: 'Precision timepieces for the modern man',
    count: '30+',
  },
  {
    id: 'women',
    name: "Women's Watches",
    slug: 'women',
    image: 'https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp',
    description: 'Elegant watches crafted for her',
    count: '30+',
  },
  {
    id: 'new',
    name: 'New Arrivals',
    slug: 'new',
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp',
    description: 'The latest additions to our collection',
    count: '12+',
  },
  {
    id: 'sale',
    name: 'On Sale',
    slug: 'sale',
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp',
    description: 'Premium timepieces at reduced prices',
    count: '20+',
  },
];

export const getAllCategories = (): Category[] => categories;

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export default categories;