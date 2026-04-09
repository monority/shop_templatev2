import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'Sneakara';
const DEFAULT_DESC = 'Premium sneakers for the modern urban lifestyle. Shop the latest drops at Sneakara.';
const DEFAULT_IMG  = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80';
const SITE_URL     = 'https://sneakara.com';

/**
 * Composant SEO réutilisable — title, meta, Open Graph, Twitter Card.
 */
const PageMeta = ({ title, description = DEFAULT_DESC, image = DEFAULT_IMG, noIndex = false }: PageMetaProps) => {
  const pageTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Premium Sneakers`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:url"         content={SITE_URL} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  );
};

export default PageMeta;
