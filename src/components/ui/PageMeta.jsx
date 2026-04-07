import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO meta component.
 * Usage: <PageMeta title="Shop" description="Browse our collection" />
 */
const PageMeta = ({ title, description }) => (
    <Helmet>
        <title>{title ? `${title} · Sneakara` : 'Sneakara — Premium Sneakers'}</title>
        {description && <meta name="description" content={description} />}
    </Helmet>
);

export default PageMeta;
