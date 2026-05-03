import { Helmet } from 'react-helmet-async';

const SITE_URL = import.meta.env.VITE_SITE_URL || '';

const SEO = ({ title, description, path = '', jsonLd = null }) => {
    const fullTitle = title ? `${title} | markdevs` : 'markdevs | Desarrollador Full-Stack';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`${SITE_URL}${path}`} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`${SITE_URL}${path}`} />
            <meta property="og:site_name" content="markdevs" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export { SEO };
