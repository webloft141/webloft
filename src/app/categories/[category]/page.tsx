import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { buildCollectionStructuredData } from "@/lib/structured-data";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";
import { categoryPath, slugify, subcategoryPath } from "@/lib/directory-paths";

type Params = { category: string };

export async function generateStaticParams() {
  const categories = await getWebsiteCategoriesFromDb();
  return categories.map((category) => ({ category: slugify(category.title) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = await getWebsiteCategoriesFromDb();
  const category = categories.find((c) => slugify(c.title) === categorySlug);
  if (!category) return {};

  const title = `${category.title} Websites`;
  const description = category.description || `${SITE_NAME} directory for ${category.title}.`;
  const canonical = categoryPath(category.title);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: SITE_NAME,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category: categorySlug } = await params;
  const categories = await getWebsiteCategoriesFromDb();
  const category = categories.find((c) => slugify(c.title) === categorySlug);
  if (!category) notFound();

  const canonical = categoryPath(category.title);
  const structuredData = buildCollectionStructuredData({
    path: canonical,
    pageName: `${category.title} Websites`,
    pageDescription: category.description || `${SITE_NAME} directory for ${category.title}.`,
    categories: [category],
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/categories" className="hover:text-slate-700">
          Categories
        </Link>
        <span className="px-2">/</span>
        <span className="font-semibold text-slate-700">{category.title}</span>
      </nav>

      <header className="mt-5">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{category.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{category.description}</p>
      </header>

      <section className="mt-8 space-y-6">
        {category.subcategories.map((subcategory) => (
          <section key={subcategory.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#52796f] sm:text-xl">{subcategory.title}</h2>
                <p className="mt-1 text-xs text-slate-500">{subcategory.sites.length} websites</p>
              </div>
              <Link
                href={subcategoryPath(category.title, subcategory.title)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                View
              </Link>
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {subcategory.sites.map((site) => (
                <li key={site.url} className="rounded-xl border border-slate-200 bg-white p-3">
                  <a href={site.url} target="_blank" rel="noreferrer" className="block">
                    <p className="font-semibold text-slate-900">{site.name}</p>
                    {site.shortDescription ? (
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{site.shortDescription}</p>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </main>
  );
}

