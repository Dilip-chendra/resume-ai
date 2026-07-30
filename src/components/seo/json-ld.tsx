import React from "react";

export type SchemaType =
  | "Organization"
  | "WebSite"
  | "SoftwareApplication"
  | "FAQPage"
  | "Article"
  | "BreadcrumbList";

interface JsonLdProps {
  type: SchemaType;
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
        url: process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com",
        logo: `${process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com"}/icon.png`,
        sameAs: [
          "https://twitter.com/resumeai",
          "https://linkedin.com/company/resumeai",
        ],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  const url = process.env.NEXT_PUBLIC_APP_URL || "https://resume-ai.com";
  return (
    <JsonLd
      type="WebSite"
      data={{
        name: "Resume AI",
        url: url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
