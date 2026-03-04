interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://stratumco.com",
    name: "Stratum Co.",
    description:
      "Premium home surfaces — countertops, tile, painting, and flooring — in Bay County, FL. Transparent pricing, free estimates.",
    url: "https://stratumco.com",
    telephone: "+18500000000",
    email: "info@stratumco.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Panama City",
      addressRegion: "FL",
      postalCode: "32401",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.1588,
      longitude: -85.6602,
    },
    areaServed: [
      { "@type": "City", name: "Panama City, FL" },
      { "@type": "City", name: "Panama City Beach, FL" },
      { "@type": "City", name: "Lynn Haven, FL" },
      { "@type": "City", name: "Callaway, FL" },
      { "@type": "City", name: "Springfield, FL" },
      { "@type": "City", name: "Parker, FL" },
      { "@type": "City", name: "Mexico Beach, FL" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "120",
      bestRating: "5",
    },
    sameAs: [],
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: "Stratum Co.",
    },
    areaServed: {
      "@type": "State",
      name: "Florida",
    },
  };

  return <JsonLd data={data} />;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  authorName: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Stratum Co.",
    },
  };

  return <JsonLd data={data} />;
}
