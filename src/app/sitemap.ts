import { MetadataRoute } from "next";
import { seoPages } from "@/content/seo-pages";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = SITE_URL;

  // Core public marketing pages only (no dashboard/auth routes)
  const coreRoutes = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/features", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/templates", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/help", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/careers", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { route: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { route: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
    { route: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${appUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
  }));

  // SEO Landing Pages
  const seoRoutes = Object.keys(seoPages).map((slug) => ({
    url: `${appUrl}/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog Posts — use real post dates
  const blogPosts = getAllPosts().map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...seoRoutes, ...blogPosts];
}
