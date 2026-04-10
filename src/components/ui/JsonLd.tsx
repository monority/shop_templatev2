/**
 * JSON-LD Structured Data — Google rich results & Shopping integration.
 *
 * Schemas implemented:
 *  - Product       → product pages (price, availability, reviews, brand)
 *  - Organization  → homepage (brand identity, contact)
 *  - WebSite       → homepage (sitelinks searchbox)
 *  - BreadcrumbList → all pages with breadcrumbs
 */
import { Helmet } from 'react-helmet-async';

const SITE_URL  = 'https://horloge.com';
const SITE_NAME = 'HORLOGÉ';

// ── Product schema ────────────────────────────────────────────────────────────
interface ProductSchemaProps {
  id: string | number;
  name: string;
  brand: string;
  description: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number | null;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  isNew?: boolean;
  movement?: string;
}

export const ProductJsonLd = ({
  id,
  name,
  brand,
  description,
  image,
  images,
  price,
  originalPrice,
  currency = 'USD',
  rating,
  reviewCount = 3,
  stock = 10,
  isNew,
  movement,
}: ProductSchemaProps) => {
  const availability = stock > 0
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images?.length ? images : [image],
    sku: `HRL-${id}`,
    mpn: `REF-${id}`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${id}`,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      ...(originalPrice && originalPrice > price && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      }),
    },
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toFixed(1),
        reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    }),
    ...(movement && {
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'Movement',
        value: movement,
      },
    }),
    ...(isNew && { itemCondition: 'https://schema.org/NewCondition' }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── Organization + WebSite schema (homepage) ──────────────────────────────────
export const OrganizationJsonLd = () => {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description: 'Curated luxury timepieces — authenticated, insured, delivered.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@horloge.com',
        availableLanguage: ['English', 'French'],
      },
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── BreadcrumbList schema ─────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  path: string;
}

export const BreadcrumbJsonLd = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── ItemList schema (shop/category pages) ─────────────────────────────────────
interface ItemListProduct {
  id: string | number;
  name: string;
  image: string;
  price: number;
}

export const ItemListJsonLd = ({
  items,
  name,
}: {
  items: ItemListProduct[];
  name: string;
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/product/${p.id}`,
      name: p.name,
      image: p.image,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
