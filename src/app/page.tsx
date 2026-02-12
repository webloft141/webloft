import type { Metadata } from "next";
import HomeDirectory from "@/components/home-directory";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { WEBSITE_CATEGORIES } from "@/lib/website-categories";

export const metadata: Metadata = {
  title: "100 Best Websites by Category",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const totalSites = WEBSITE_CATEGORIES.reduce(
    (count, category) => count + category.sites.length,
    0,
  );

  const itemListElements = WEBSITE_CATEGORIES.flatMap((category) =>
    category.sites.map((site) => ({
      "@type": "ListItem",
      name: site.name,
      url: site.url,
    })),
  );

  const structuredData = {
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
        name: `${SITE_NAME} Curated Website Directory`,
        description: `${SITE_NAME} lists ${totalSites} websites organized by category.`,
        url: SITE_URL,
      },
      {
        "@type": "ItemList",
        name: `${SITE_NAME} Top ${totalSites} Websites`,
        itemListElement: itemListElements.map((item, index) => ({
          ...item,
          position: index + 1,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeDirectory categories={WEBSITE_CATEGORIES} />
    </>
  );
}
