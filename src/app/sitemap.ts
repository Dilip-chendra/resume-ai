import { MetadataRoute } from "next";
import { seoPages } from "@/content/seo-pages";
import { getAllPosts } from "@/lib/blog";

import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = SITE_URL;

  // Core Pages
  const coreRoutes = [
    "",
    "/dashboard",
    "/pricing",
    "/features",
    "/templates",
    "/about",
    "/contact",
    "/help",
    "/careers",
    "/blog",
  ].map((route) => ({
    url: `${appUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // SEO Landing Pages & Extra Text Pages
  const seoRoutes = Object.keys(seoPages).map((slug) => ({
    url: `${appUrl}/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog Posts
  const blogPosts = getAllPosts().map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...seoRoutes, ...blogPosts];
}
