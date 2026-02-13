import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { buildCollectionStructuredData } from "@/lib/structured-data";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";
import { slugify, subcategoryPath } from "@/lib/directory-paths";

type Params = { category: string; subcategory: string };

export async function generateStaticParams() {
  const categories = await getWebsiteCategoriesFromDb();
  return categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: slugify(category.title),
      subcategory: slugify(subcategory.title),
    })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const categories = await getWebsiteCategoriesFromDb();
  const category = categories.find((c) => slugify(c.title) === categorySlug);
  const subcategory = category?.subcategories.find((s) => slugify(s.title) === subcategorySlug);
  if (!category || !subcategory) return {};

  const title = `${subcategory.title} in ${category.title}`;
  const description = `${SITE_NAME} directory: ${subcategory.title} websites under ${category.title}.`;
  const canonical = subcategoryPath(category.title, subcategory.title);

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

export default async function SubcategoryPage({ params }: { params: Promise<Params> }) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const categories = await getWebsiteCategoriesFromDb();
  const category = categories.find((c) => slugify(c.title) === categorySlug);
  const subcategory = category?.subcategories.find((s) => slugify(s.title) === subcategorySlug);
  if (!category || !subcategory) notFound();

  const canonical = subcategoryPath(category.title, subcategory.title);
  const structuredData = buildCollectionStructuredData({
    path: canonical,
    pageName: `${subcategory.title} in ${category.title}`,
    pageDescription: `${SITE_NAME} directory: ${subcategory.title} websites under ${category.title}.`,
    categories: [
      {
        ...category,
        subcategories: [{ ...subcategory, sites: subcategory.sites }],
      },
    ],
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/categories" className="hover:text-slate-700">
          Categories
        </Link>
        <span className="px-2">/</span>
        <Link href={`/categories/${slugify(category.title)}`} className="hover:text-slate-700">
          {category.title}
        </Link>
        <span className="px-2">/</span>
        <span className="font-semibold text-slate-700">{subcategory.title}</span>
      </nav>

      <header className="mt-5">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{subcategory.title}</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          {subcategory.sites.length} websites under <span className="font-semibold text-[#52796f]">{category.title}</span>.
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {subcategory.sites.map((site) => (
          <article key={site.url} className="rounded-2xl border border-slate-200 bg-white p-4">
            <a href={site.url} target="_blank" rel="noreferrer" className="block">
              <h2 className="text-base font-bold text-slate-900">{site.name}</h2>
              {site.shortDescription ? (
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{site.shortDescription}</p>
              ) : (
                <p className="mt-2 text-sm text-slate-500">Visit website</p>
              )}
              <p className="mt-3 text-xs font-semibold text-[#52796f]">Open</p>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}

