import type { Metadata } from "next";
import HomeDirectory from "@/components/home-directory";
import { SITE_NAME } from "@/lib/seo";
import { buildCollectionStructuredData } from "@/lib/structured-data";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";

const description = `${SITE_NAME} categories page with all website categories and subcategories in one place.`;

export const metadata: Metadata = {
  title: "Website Categories",
  description,
  alternates: {
    canonical: "/categories",
  },
};

export default async function CategoriesPage() {
  const categories = await getWebsiteCategoriesFromDb();
  const structuredData = buildCollectionStructuredData({
    path: "/categories",
    pageName: "Website Categories",
    pageDescription: description,
    categories,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeDirectory categories={categories} activeRoute="categories" />
    </>
  );
}
