import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLinkButton from "@/components/copy-link-button";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { buildCollectionStructuredData } from "@/lib/structured-data";
import { flattenDirectory, slugify, websitePath } from "@/lib/directory-paths";
import { getWebsiteCategoriesFromDb } from "@/lib/website-categories-db";

type Params = { slug: string };

export async function generateStaticParams() {
  const categories = await getWebsiteCategoriesFromDb();
  const flat = flattenDirectory(categories);
  return flat.map((site) => ({ slug: site.websiteSlug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getWebsiteCategoriesFromDb();
  const flat = flattenDirectory(categories);
  const site = flat.find((item) => item.websiteSlug === slug);
  if (!site) return {};

  const title = site.name;
  const description =
    site.shortDescription ||
    `${SITE_NAME} directory listing for ${site.name} under ${site.categoryTitle} / ${site.subcategoryTitle}.`;
  const canonical = websitePath(site.websiteSlug);

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

export default async function WebsiteDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const categories = await getWebsiteCategoriesFromDb();
  const flat = flattenDirectory(categories);
  const site = flat.find((item) => item.websiteSlug === slug);
  if (!site) notFound();

  const canonical = websitePath(site.websiteSlug);
  const structuredData = buildCollectionStructuredData({
    path: canonical,
    pageName: `Website: ${site.name}`,
    pageDescription:
      site.shortDescription ||
      `${SITE_NAME} directory listing for ${site.name} under ${site.categoryTitle} / ${site.subcategoryTitle}.`,
    categories,
    limit: 10,
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/categories" className="hover:text-slate-700">
          Categories
        </Link>
        <span className="px-2">/</span>
        <Link href={`/categories/${slugify(site.categoryTitle)}`} className="hover:text-slate-700">
          {site.categoryTitle}
        </Link>
        <span className="px-2">/</span>
        <Link
          href={`/categories/${slugify(site.categoryTitle)}/${slugify(site.subcategoryTitle)}`}
          className="hover:text-slate-700"
        >
          {site.subcategoryTitle}
        </Link>
        <span className="px-2">/</span>
        <span className="font-semibold text-slate-700">{site.name}</span>
      </nav>

      <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{site.name}</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          {site.shortDescription || "Curated website listing in WEBLOFT."}
        </p>

        <dl className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</dt>
            <dd className="mt-1 text-sm font-semibold text-[#52796f]">{site.categoryTitle}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Subcategory</dt>
            <dd className="mt-1 text-sm font-semibold text-[#52796f]">{site.subcategoryTitle}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#52796f] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Visit Website
          </a>
          <CopyLinkButton url={site.url} />
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">More in {site.subcategoryTitle}</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {flat
            .filter((item) => item.subcategoryTitle === site.subcategoryTitle && item.websiteSlug !== site.websiteSlug)
            .slice(0, 6)
            .map((item) => (
              <Link
                key={item.websiteSlug}
                href={websitePath(item.websiteSlug)}
                className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300"
              >
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.shortDescription || "View details"}</p>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
