import type { Metadata } from "next";
import HomeDirectory from "@/components/home-directory";
import { SITE_NAME } from "@/lib/seo";
import { buildCollectionStructuredData } from "@/lib/structured-data";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";

const description = `${SITE_NAME} favourites page for saved websites and personalized quick access.`;

export const metadata: Metadata = {
  title: "Favourites",
  description,
  alternates: {
    canonical: "/favourites",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function FavouritesPage() {
  const categories = await getWebsiteCategoriesFromDb();
  const structuredData = buildCollectionStructuredData({
    path: "/favourites",
    pageName: "Favourite Websites",
    pageDescription: description,
    categories,
    limit: 20,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeDirectory categories={categories} activeRoute="favourites" />
    </>
  );
}
