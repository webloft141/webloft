import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";
import { WEBSITE_CATEGORIES } from "@/lib/website-categories";
import { flattenDirectory, slugify } from "@/lib/directory-paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const categories = await getWebsiteCategoriesFromDb().catch(() => WEBSITE_CATEGORIES);
  const safeCategories = categories?.length ? categories : WEBSITE_CATEGORIES;

  const categoryUrls = safeCategories.map((category) => ({
    url: `${SITE_URL}/categories/${slugify(category.title)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const subcategoryUrls = safeCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      url: `${SITE_URL}/categories/${slugify(category.title)}/${slugify(subcategory.title)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const websiteUrls = flattenDirectory(safeCategories).map((site) => ({
    url: `${SITE_URL}/site/${site.websiteSlug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/trending`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/favourites`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...categoryUrls,
    ...subcategoryUrls,
    ...websiteUrls,
  ];
}
