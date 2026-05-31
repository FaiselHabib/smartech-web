import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/systems",
    "/portfolio",
    "/services",
    "/about",
    "/blog",
    "/contact",
  ].map((r) => ({
    url: `${site.url}${r}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  const articles = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...articles];
}
