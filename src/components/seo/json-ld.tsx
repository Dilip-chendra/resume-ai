import React from "react";
import { SITE_URL } from "@/config/site";

export type SchemaType =
  | "Organization"
  | "WebSite"
  | "SoftwareApplication"
  | "FAQPage"
  | "Article"
  | "BreadcrumbList";

interface JsonLdProps {
  type: SchemaType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      type="Organization"
      data={{
        name: "Resume AI",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        sameAs: [
          "https://twitter.com/resumeai",
          "https://linkedin.com/company/resumeai",
        ],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      type="WebSite"
      data={{
        name: "Resume AI",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
