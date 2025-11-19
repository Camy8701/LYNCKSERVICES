import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  noindex = false,
}: SEOProps) {
  const siteUrl = 'https://lynckservices.lovable.app';
  const fullUrl = `${siteUrl}${canonicalUrl}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots Meta Tag */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="de" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Lynck Services" />
      
      {/* Article Specific Meta Tags */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LynckServices" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

// Structured Data Helpers
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lynck Services",
    "url": "https://lynckservices.lovable.app",
    "logo": "https://lynckservices.lovable.app/favicon.png",
    "description": "Vergleichen Sie kostenlos Angebote von geprüften Handwerkern in Deutschland. Heizung, Solar, Dach, Klempner, Elektriker und mehr.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+49-30-1234-5678",
      "contactType": "Customer Service",
      "areaServed": "DE",
      "availableLanguage": ["German", "English"]
    },
    "sameAs": []
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export function ServiceSchema({ service }: {
  service: {
    name: string;
    description: string;
    slug: string;
  }
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Lynck Services"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Germany"
    },
    "url": `https://lynckservices.lovable.app/service/${service.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Kostenlose Angebotsvergleiche"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export function ArticleSchema({ article }: {
  article: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    image: string;
    slug: string;
  }
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lynck Services",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lynckservices.lovable.app/favicon.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://lynckservices.lovable.app/blog/${article.slug}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://lynckservices.lovable.app${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
