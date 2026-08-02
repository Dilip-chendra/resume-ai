import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const appUrl = SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/sign-in",
          "/sign-up",
        ],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
