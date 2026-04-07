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
      "https://images.unsplash.com/photo-1561095884-bb4b8d43c18b?w=600",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
    ],
    isNew: true,
    discount: 14,
    category: "men",
    description: "The latest evolution of the iconic Air Max line. Featuring revolutionary cushioning technology and a sleek, modern design that combines comfort with style.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Red", "Black", "White"],
    features: ["Revolutionary Air cushioning", "Breathable mesh upper", "Durable rubber outsole", "Lightweight design"]
  },
  {
    id: 2,
    name: "Ultra Boost",
    brand: "Adidas",
    price: 179,
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=400",
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"
    ],
    isNew: true,
    category: "men",
    description: "Experience unmatched energy return with the Ultra Boost. The Primeknit upper adapts to your foot for a perfect fit.",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: ["Black", "White", "Grey"],
    features: ["Boost midsole technology", "Primeknit upper", "Stretchweb outsole", "Fitcounter heel"]
  },
  {
    id: 4,
    name: "RS-X",
    brand: "Puma",
    price: 129,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      "https://images.unsplash.com/photo-1572423269807-159d88527aaa?w=600",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"
    ],
    category: "men",
    description: "Bold, bulky, and built for comfort. The RS-X reinvents retro running style for today.",
    sizes: [40, 41, 42, 43, 44],
    colors: ["Blue", "Black", "White"],
    features: ["Running System technology", "Mesh upper with leather overlays", "IMEVA midsole", "Rubber outsole"]
  },
  {
    id: 7,
    name: "Chuck 70",
    brand: "Converse",
    price: 85,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1539868053543-3b54aef9574d?w=600"
    ],
    category: "men",
    description: "The Chuck 70 elevates the classic with premium materials and attention to detail.",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Black", "White", "Red"],
    features: ["Canvas upper", "Higher rubber foxing", "Cushioned footbed", "Vulcanized rubber outsole"]
  },
  {
    id: 25,
    name: "Air Max 90",
    brand: "Nike",
    price: 145,
    image: "https://images.unsplash.com/photo-1603036050855-0d77c10e1eb2?w=400",
    images: [
      "https://images.unsplash.com/photo-1603036050855-0d77c10e1eb2?w=600",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
      "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?w=600"
    ],
    category: "men",
    description: "The iconic visible Air cushioning that changed footwear forever. A timeless silhouette for every wardrobe.",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: ["White", "Black", "Infrared"],
    features: ["Visible Max Air unit", "Leather and mesh upper", "Foam midsole", "Rubber outsole"]
  },
  {
    id: 26,
    name: "Jordan 1 Retro High",
    brand: "Jordan",
    price: 225,
    originalPrice: 270,
    image: "https://images.unsplash.com/photo-1539868053543-3b54aef9574d?w=400",
    images: [
      "https://images.unsplash.com/photo-1539868053543-3b54aef9574d?w=600",
      "https://images.unsplash.com/photo-1604867896102-8841deb4cb10?w=600",
      "https://images.unsplash.com/photo-1582901621692-8abda42cd03c?w=600"
    ],
    discount: 17,
    category: "men",
    description: "The shoe that changed basketball and culture. The Jordan 1 Retro High is the original sneaker icon.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Chicago Red", "Royal Blue", "Shadow"],
    features: ["Full grain leather upper", "Encapsulated Air-Sole unit", "Pivot point outsole", "High-top silhouette"]
  },
  {
    id: 27,
    name: "997H",
    brand: "New Balance",
    price: 92,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400",
    images: [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600",
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600",
      "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?w=600"
    ],
    category: "men",
    description: "Vintage dad-shoe aesthetic with modern craftsmanship. The 997H blends retro style with all-day comfort.",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: ["Grey", "Navy", "Beige"],
    features: ["Suede and mesh upper", "ENCAP midsole", "C-CAP foam", "Rubber outsole"]
  },
  {
    id: 28,
    name: "Run Star Hike",
    brand: "Converse",
    price: 108,
    originalPrice: 125,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1539868053543-3b54aef9574d?w=600"
    ],
    discount: 14,
    isNew: true,
    category: "men",
    description: "The classic Chuck profile elevated with a chunky platform sole. Bold, durable and unmistakably Converse.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black", "White", "Indigo"],
    features: ["Canvas upper", "Platform cupsole", "Medial and lateral eyelets", "Chunky outsole"]
  },
  {
    id: 29,
    name: "Gel-Lyte III",
    brand: "Asics",
    price: 115,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1604867896102-8841deb4cb10?w=600"
    ],
    category: "men",
    description: "Street-ready heritage running style. The Gel-Lyte III split tongue design is instantly recognisable.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["White", "Black", "Sage"],
    features: ["Split-tongue construction", "GEL technology cushioning", "Suede/mesh upper", "Rubber outsole"]
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
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600"
    ],
    discount: 26,
    category: "women",
    description: "A timeless classic that never goes out of style. Premium leather construction meets all-day comfort.",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["White", "Black", "Pink"],
    features: ["Premium leather upper", "Soft terry lining", "Die-cut EVA midsole", "Rubber outsole"]
  },
  {
    id: 5,
    name: "Air Force 1",
    brand: "Nike",
    price: 110,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      "https://images.unsplash.com/photo-1604867896102-8841deb4cb10?w=600",
      "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?w=600"
    ],
    category: "women",
    description: "The legend lives on. The Air Force 1 continues to define street style with its classic design.",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    colors: ["White", "Black", "Red"],
    features: ["Leather upper", "Air-Sole unit", "Rubber outsole", "Classic design"]
  },
  {
    id: 6,
    name: "Samba OG",
    brand: "Adidas",
    price: 100,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600"
    ],
    category: "women",
    description: "From the soccer field to the streets. The Samba OG brings vintage athletic style to your everyday look.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["White", "Black", "Green"],
    features: ["Full grain leather upper", "Suede T-toe overlay", "Synthetic lining", "Gum rubber outsole"]
  },
  {
    id: 8,
    name: "Old Skool",
    brand: "Vans",
    price: 75,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400",
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"
    ],
    category: "women",
    description: "The skate classic that started it all. Features the iconic side stripe and durable construction.",
    sizes: [35, 36, 37, 38, 39, 40, 41],
    colors: ["Black", "White", "Pink"],
    features: ["Suede and canvas upper", "Iconic side stripe", "Padded collar", "Vulcanized rubber outsole"]
  },
  {
    id: 30,
    name: "Air Max 95",
    brand: "Nike",
    price: 160,
    originalPrice: 185,
    image: "https://images.unsplash.com/photo-1511556670410-f6989d6b0766?w=400",
    images: [
      "https://images.unsplash.com/photo-1511556670410-f6989d6b0766?w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      "https://images.unsplash.com/photo-1585702805772-509e021df9b3?w=600"
    ],
    discount: 14,
    category: "women",
    description: "Inspired by human anatomy, the Air Max 95 features a gradient mesh design and multiple Air units.",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    colors: ["Neon Yellow", "Black", "White"],
    features: ["Multi-layer gradient upper", "Forefoot and heel Air units", "Enclosure lacing system", "Waffle rubber outsole"]
  },
  {
    id: 31,
    name: "Ultraboost 24",
    brand: "Adidas",
    price: 190,
    image: "https://images.unsplash.com/photo-1585702805772-509e021df9b3?w=400",
    images: [
      "https://images.unsplash.com/photo-1585702805772-509e021df9b3?w=600",
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600",
      "https://images.unsplash.com/photo-1511556670410-f6989d6b0766?w=600"
    ],
    isNew: true,
    category: "women",
    description: "50% recycled content meets elite energy return. The Ultraboost 24 is engineered for runners and city walkers alike.",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Cloud White", "Core Black", "Wonder Orchid"],
    features: ["Boost midsole", "Primeknit+ upper", "Linear Energy Push system", "Continental rubber outsole"]
  },
  {
    id: 32,
    name: "Mayze Stack",
    brand: "Puma",
    price: 98,
    originalPrice: 115,
    image: "https://images.unsplash.com/photo-1604867896102-8841deb4cb10?w=400",
    images: [
      "https://images.unsplash.com/photo-1604867896102-8841deb4cb10?w=600",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600"
    ],
    discount: 15,
    category: "women",
    description: "A bold platform sole meets a sleek lifestyle upper. The Mayze Stack is pure feminine power.",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["White", "Black", "Pink"],
    features: ["Leather and suede upper", "Stacked platform sole", "Formstrip branding", "EVA midsole"]
  },
  {
    id: 33,
    name: "574",
    brand: "New Balance",
    price: 88,
    image: "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?w=400",
    images: [
      "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?w=600",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600",
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600"
    ],
    category: "women",
    description: "The 574 is a timeless everyday sneaker with a classic silhouette that suits every casual look.",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Sea Salt", "Black", "Burgundy"],
    features: ["Suede and mesh upper", "ENCAP midsole", "Rubber outsole", "Iconic retro design"]
  },
  {
    id: 34,
    name: "Jordan 1 Low",
    brand: "Jordan",
    price: 120,
    isNew: true,
    image: "https://images.unsplash.com/photo-1561095884-bb4b8d43c18b?w=400",
    images: [
      "https://images.unsplash.com/photo-1561095884-bb4b8d43c18b?w=600",
      "https://images.unsplash.com/photo-1539868053543-3b54aef9574d?w=600",
      "https://images.unsplash.com/photo-1585702805772-509e021df9b3?w=600"
    ],
    category: "women",
    description: "The low-top version of the legendary Jordan 1. Streamlined silhouette, all the iconic style.",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    colors: ["White/Gold", "Black/Pink", "Sail"],
    features: ["Leather upper", "Air-Sole unit", "Rubber outsole", "Iconic Swoosh overlay"]
  },
  {
    id: 9,
    name: "Pegasus 41",
    brand: "Nike",
    price: 135,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600"
    ],
    isNew: true,
    discount: 16,
    category: "running",
    description: "The workhorse of Nike running. The Pegasus 41 delivers responsive cushioning for daily training runs.",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: ["Black", "Blue", "Orange"],
    features: ["ReactX foam midsole", "Air Zoom unit in forefoot", "Engineered mesh upper", "Waffle rubber outsole"]
  },
  {
    id: 10,
    name: "Gel-Nimbus 26",
    brand: "Asics",
    price: 175,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600"
    ],
    isNew: true,
    category: "running",
    description: "Maximum cushioning for long-distance comfort. The Gel-Nimbus 26 is engineered for high-mileage runners.",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Blue", "Black", "White"],
    features: ["FF BLAST+ Eco foam", "GEL technology", "PureGEL technology", "AHAR outsole rubber"]
  },
  {
    id: 11,
    name: "Fresh Foam 1080v13",
    brand: "New Balance",
    price: 165,
    originalPrice: 185,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400",
    images: [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"
    ],
    discount: 11,
    category: "running",
    description: "Ultra-plush cushioning meets responsive performance. The 1080v13 is built for your long run days.",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: ["Grey", "White", "Black"],
    features: ["Fresh Foam X midsole", "Engineered hypoknit upper", "Ultra Heel design", "Blown rubber outsole"]
  },
  {
    id: 12,
    name: "Cloudstratus 3",
    brand: "On",
    price: 190,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
    ],
    isNew: true,
    category: "running",
    description: "Double-layer CloudTec cushioning for road runners who demand both comfort and speed.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["White", "Black", "Blue"],
    features: ["Double-layer CloudTec", "Helion superfoam", "Speed lacing system", "Mission Grip rubber"]
  },
  {
    id: 13,
    name: "Clifton 9",
    brand: "HOKA",
    price: 150,
    originalPrice: 170,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600"
    ],
    discount: 12,
    category: "running",
    description: "Lightweight and ultra-cushioned. The Clifton 9 is the go-to shoe for everyday distance.",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: ["Sky Blue", "Black", "Peach"],
    features: ["Compression-molded EVA", "Early stage Meta-Rocker", "Lightweight mesh upper", "Rubberized foam outsole"]
  },
  {
    id: 14,
    name: "Endorphin Speed 4",
    brand: "Saucony",
    price: 195,
    image: "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=400",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
    ],
    isNew: true,
    category: "running",
    description: "Carbon-fiber nylon plate and PWRRUN PB foam deliver race-day performance for every runner.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Yellow", "Black", "White"],
    features: ["PWRRUN PB foam", "Carbon-fiber nylon plate", "FORMFIT technology", "XT-900 outsole"]
  },
  {
    id: 15,
    name: "Ghost 15",
    brand: "Brooks",
    price: 140,
    originalPrice: 155,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600"
    ],
    discount: 10,
    category: "running",
    description: "Trusted cushioning and smooth transitions. The Ghost 15 adapts to every stride for daily training.",
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: ["Grey", "Black", "Blue"],
    features: ["DNA LOFT v3 cushioning", "3D Fit Print upper", "Segmented crash pad", "BioMoGo DNA midsole"]
  },
  {
    id: 16,
    name: "Supernova Rise",
    brand: "Adidas",
    price: 130,
    image: "https://images.unsplash.com/photo-1563677459028-de77510d42e7?w=400",
    images: [
      "https://images.unsplash.com/photo-1563677459028-de77510d42e7?w=600",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
      "https://images.unsplash.com/photo-1587563871167-1ee9c7311efb?w=600"
    ],
    category: "running",
    description: "Versatile daily trainer with a soft feel. The Supernova Rise balances cushion and responsiveness.",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Black", "White", "Purple"],
    features: ["DREAMSTRIKE+ midsole", "Engineered mesh upper", "Flexible outsole", "Continental rubber"]
  },
  {
    id: 17,
    name: "550",
    brand: "New Balance",
    price: 110,
    image: "https://images.unsplash.com/photo-1579338628-040f0659553c?w=400",
    images: [
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600"
    ],
    isNew: true,
    category: "lifestyle",
    description: "Revived from the 80s basketball court. The 550 brings a retro silhouette to modern wardrobes.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["White", "Beige", "Green"],
    features: ["Full grain leather upper", "EVA midsole", "Retro basketball profile", "Rubber outsole"]
  },
  {
    id: 18,
    name: "Dunk Low",
    brand: "Nike",
    price: 115,
    originalPrice: 135,
    image: "https://images.unsplash.com/photo-1582901621692-8abda42cd03c?w=400",
    images: [
      "https://images.unsplash.com/photo-1582901621692-8abda42cd03c?w=600",
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600",
      "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?w=600"
    ],
    discount: 15,
    category: "lifestyle",
    description: "Born on the hardwood, raised on the streets. The Dunk Low is the ultimate streetwear sneaker.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["White/Black", "Green", "Red"],
    features: ["Leather upper", "Foam midsole", "Pivot point outsole", "Classic low-top design"]
  },
  {
    id: 19,
    name: "Stan Smith",
    brand: "Adidas",
    price: 90,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400",
    images: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600"
    ],
    category: "lifestyle",
    description: "One of the most iconic sneakers ever made. The Stan Smith has been defining clean style since 1971.",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["White/Green", "White/Navy", "White/Black"],
    features: ["Leather upper", "Perforated 3-Stripes", "OrthoLite Cushioning", "Rubber outsole"]
  },
  {
    id: 20,
    name: "Suede Classic",
    brand: "Puma",
    price: 80,
    originalPrice: 95,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      "https://images.unsplash.com/photo-1572423269807-159d88527aaa?w=600"
    ],
    discount: 16,
    category: "lifestyle",
    description: "The Suede has been a street icon since 1968 - worn by legends, adopted by generations.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Red", "Black", "Navy"],
    features: ["Suede upper", "Formstrip branding", "EVA midsole", "Rubber outsole"]
  },
  {
    id: 21,
    name: "XT-6",
    brand: "Salomon",
    price: 215,
    image: "https://images.unsplash.com/photo-1572423269807-159d88527aaa?w=400",
    images: [
      "https://images.unsplash.com/photo-1572423269807-159d88527aaa?w=600",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600"
    ],
    isNew: true,
    category: "lifestyle",
    description: "Trail-inspired design goes urban. The XT-6 brings aggressive outdoor grip to city streets.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black", "Olive", "Blue"],
    features: ["Sensifit construction", "EnergyCell+ cushioning", "Contagrip outsole", "Quicklace system"]
  },
  {
    id: 22,
    name: "Classic Heritage",
    brand: "Reebok",
    price: 72,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600"
    ],
    category: "lifestyle",
    description: "Old school cool with everyday wearability. A streamlined silhouette that pairs with anything.",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    colors: ["White", "Black", "Grey"],
    features: ["Nylon upper", "Soft terry lining", "Die-cut EVA midsole", "Herringbone rubber outsole"]
  },
  {
    id: 23,
    name: "Authentic",
    brand: "Vans",
    price: 65,
    originalPrice: 80,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400",
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"
    ],
    discount: 19,
    category: "lifestyle",
    description: "The original Vans shoe, introduced in 1966. Simple, clean, and endlessly wearable.",
    sizes: [35, 36, 37, 38, 39, 40, 41, 42],
    colors: ["Black", "White", "Navy"],
    features: ["Canvas upper", "Metal eyelets", "Padded collar", "Waffle rubber outsole"]
  },
  {
    id: 24,
    name: "Forum Low",
    brand: "Adidas",
    price: 100,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
      "https://images.unsplash.com/photo-1579338628-040f0659553c?w=600"
    ],
    isNew: true,
    category: "lifestyle",
    description: "Basketball heritage meets street attitude. The Forum Low revives a 1984 basketball silhouette.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["White", "Black", "Brown"],
    features: ["Leather upper", "Die-cut EVA midsole", "Ankle X-strap", "Rubber cupsole"]
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
  if (!category || category === 'all') return products;
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
