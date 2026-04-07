/**
 * Categories Data
 */

export const categories = [
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
    description: 'Trendy sneakers for women',
    slug: 'women'
  },
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    description: 'Classic and modern styles for men',
    slug: 'men'
  },
  {
    id: 'running',
    name: 'Running',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    description: 'High-performance running shoes',
    slug: 'running'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400',
    description: 'Everyday casual sneakers',
    slug: 'lifestyle'
  }
];

/**
 * Get all categories
 */
export const getAllCategories = () => categories;

/**
 * Get category by slug
 */
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

export default categories;
