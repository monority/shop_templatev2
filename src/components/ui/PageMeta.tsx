import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

const SITE_NAME    = 'HORLOGÉ';
const SITE_URL     = 'https://horloge.com';
const DEFAULT_DESC = 'Curated luxury timepieces for the modern collector. Shop exclusive watch drops at HORLOGÉ — authenticated, insured, delivered.';
const DEFAULT_IMG  = 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp';

const PageMeta = ({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMG,
  noIndex = false,
  canonical,
}: PageMetaProps) => {
  const pageTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Luxury Timepieces`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:url"         content={canonicalUrl ?? SITE_URL} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  );
};

export default PageMeta;
