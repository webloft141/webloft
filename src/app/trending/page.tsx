import type { Metadata } from "next";
import HomeDirectory from "@/components/home-directory";
import { SITE_NAME } from "@/lib/seo";
import { buildCollectionStructuredData } from "@/lib/structured-data";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";

const description = `${SITE_NAME} trending section with top ranked websites across categories.`;

export const metadata: Metadata = {
  title: "Trending Websites",
  description,
  alternates: {
    canonical: "/trending",
  },
};

export default async function TrendingPage() {
  const categories = await getWebsiteCategoriesFromDb();
  const structuredData = buildCollectionStructuredData({
    path: "/trending",
    pageName: "Trending Websites",
    pageDescription: description,
    categories,
    limit: 30,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeDirectory categories={categories} activeRoute="trending" />
    </>
  );
}
