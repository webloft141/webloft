import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { WebsiteCategory } from "@/lib/website-categories";

function flattenSites(categories: WebsiteCategory[]) {
  return categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.sites.map((site) => ({
        name: site.name,
        url: site.url,
        category: category.title,
        subcategory: subcategory.title,
      })),
    ),
  );
}

export function buildCollectionStructuredData(options: {
  path: string;
  pageName: string;
  pageDescription: string;
  categories: WebsiteCategory[];
  limit?: number;
}) {
  const { path, pageName, pageDescription, categories, limit } = options;
  const allSites = flattenSites(categories);
  const selectedSites = typeof limit === "number" ? allSites.slice(0, limit) : allSites;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
      },
      {
        "@type": "CollectionPage",
        name: pageName,
        description: pageDescription,
        url: `${SITE_URL}${path}`,
      },
      {
        "@type": "ItemList",
        name: `${SITE_NAME} ${pageName}`,
        itemListElement: selectedSites.map((site, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: site.name,
          url: site.url,
        })),
      },
    ],
  };
}
