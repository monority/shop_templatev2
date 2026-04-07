/**
 * Products Data
 * Centralized product data for the application
 */

export const products = [
  {
    id: 1,
    name: "Air Max 2026",
    brand: "Nike",
    price: 189,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600"
    ],
    isNew: true,
    discount: 14,
    category: "men",
    description: "The latest evolution of the iconic Air Max line. Featuring revolutionary cushioning technology and a sleek, modern design that combines comfort with style.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Red", "Black", "White"],
    features: [
      "Revolutionary Air cushioning",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Lightweight design"
    ]
  },
  {
    id: 2,
    name: "Ultra Boost",
    brand: "Adidas",
    price: 179,
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=400",
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"
    ],
    isNew: true,
    category: "men",
    description: "Experience unmatched energy return with the Ultra Boost. The Primeknit upper adapts to your foot for a perfect fit.",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: ["Black", "White", "Grey"],
    features: [
      "Boost midsole technology",
      "Primeknit upper",
      "Stretchweb outsole",
      "Fitcounter heel"
    ]
  },
  {
    id: 3,
    name: "Classic Leather",
    brand: "Reebok",
    price: 89,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600",
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600"
    ],
    discount: 26,
    category: "women",
    description: "A timeless classic that never goes out of style. Premium leather construction meets all-day comfort.",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["White", "Black", "Pink"],
    features: [
      "Premium leather upper",
      "Soft terry lining",
      "Die-cut EVA midsole",
      "Rubber outsole"
    ]
  },
  {
    id: 4,
    name: "RS-X",
    brand: "Puma",
    price: 129,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"
    ],
    category: "men",
    description: "Bold, bulky, and built for comfort. The RS-X reinvents retro running style for today.",
    sizes: [40, 41, 42, 43, 44],
    colors: ["Blue", "Black", "White"],
    features: [
      "Running System technology",
      "Mesh upper with leather overlays",
      "IMEVA midsole",
      "Rubber outsole"
    ]
  },
  {
    id: 5,
    name: "Air Force 1",
    brand: "Nike",
    price: 110,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600"
    ],
    category: "women",
    description: "The legend lives on. The Air Force 1 continues to define street style with its classic design.",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    colors: ["White", "Black", "Red"],
    features: [
      "Leather upper",
      "Air-Sole unit",
      "Rubber outsole",
      "Classic design"
    ]
  },
  {
    id: 6,
    name: "Samba OG",
    brand: "Adidas",
    price: 100,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600"
    ],
    category: "women",
    description: "From the soccer field to the streets. The Samba OG brings vintage athletic style to your everyday look.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["White", "Black", "Green"],
    features: [
      "Full grain leather upper",
      "Suede T-toe overlay",
      "Synthetic lining",
      "Gum rubber outsole"
    ]
  },
  {
    id: 7,
    name: "Chuck 70",
    brand: "Converse",
    price: 85,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"
    ],
    category: "men",
    description: "The Chuck 70 elevates the classic with premium materials and attention to detail.",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Black", "White", "Red"],
    features: [
      "Canvas upper",
      "Higher rubber foxing",
      "Cushioned footbed",
      "Vulcanized rubber outsole"
    ]
  },
  {
    id: 8,
    name: "Old Skool",
    brand: "Vans",
    price: 75,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400",
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
    ],
    category: "women",
    description: "The skate classic that started it all. Features the iconic side stripe and durable construction.",
    sizes: [35, 36, 37, 38, 39, 40, 41],
    colors: ["Black", "White", "Pink"],
    features: [
      "Suede and canvas upper",
      "Iconic side stripe",
      "Padded collar",
      "Vulcanized rubber outsole"
    ]
  }
];

/**
 * Get all products
 */
export const getAllProducts = () => products;

/**
 * Get product by ID
 */
export const getProductById = (id) => {
  return products.find(product => product.id === Number(id));
};

/**
 * Get products by category
 */
export const getProductsByCategory = (category) => {
  if (category === 'all' || !category || category === 'kids') return products;
  return products.filter(product => product.category === category);
};

/**
 * Get featured products (first 4)
 */
export const getFeaturedProducts = () => products.slice(0, 4);

/**
 * Get new arrivals
 */
export const getNewArrivals = () => products.filter(product => product.isNew);

/**
 * Get products on sale
 */
export const getProductsOnSale = () => products.filter(product => product.discount > 0);

/**
 * Search products
 */
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
};

export default products;
