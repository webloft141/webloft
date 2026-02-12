"use client";

import { useMemo, useState } from "react";
import UserMenu from "@/components/user-menu";
import type { WebsiteCategory } from "@/lib/website-categories";

type HomeDirectoryProps = {
  categories: WebsiteCategory[];
};

export default function HomeDirectory({ categories }: HomeDirectoryProps) {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories
      .map((category) => {
        const matchesCategory =
          category.title.toLowerCase().includes(normalizedQuery) ||
          category.description.toLowerCase().includes(normalizedQuery);

        const matchingSites = category.sites.filter(
          (site) =>
            site.name.toLowerCase().includes(normalizedQuery) ||
            site.url.toLowerCase().includes(normalizedQuery),
        );

        if (matchesCategory) {
          return category;
        }

        return { ...category, sites: matchingSites };
      })
      .filter((category) => category.sites.length > 0);
  }, [categories, query]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#bfd9ff,_#89a7e3_42%,_#2a2f66_100%)] px-4 py-6 text-slate-900 sm:px-8 sm:py-8">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/20 px-4 py-3 shadow-lg shadow-black/15 backdrop-blur-xl sm:px-6">
        <p className="text-lg font-bold tracking-[0.2em] text-white sm:text-xl">
          WEBLOFT
        </p>

        <label className="flex w-full max-w-sm items-center gap-2 rounded-full border border-white/50 bg-white/35 px-4 py-2 text-white shadow-inner shadow-white/10 backdrop-blur-md">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 flex-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search websites or categories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/80"
            aria-label="Search websites"
          />
        </label>

        <UserMenu />
      </header>

      <main className="mx-auto mt-10 w-full max-w-6xl">
        <section className="rounded-3xl border border-white/30 bg-white/10 p-6 text-white backdrop-blur-sm sm:p-10">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Discover Websites by Category
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            WEBLOFT is a curated directory where you can discover useful
            websites, neatly organized by category.
          </p>
        </section>

        {filteredCategories.length > 0 ? (
          <section
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            aria-label="Website categories"
          >
            {filteredCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl border border-white/35 bg-white/20 p-5 text-white shadow-lg shadow-black/15 backdrop-blur-md"
              >
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <p className="mt-1 text-sm text-white/90">
                  {category.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {category.sites.map((site) => (
                    <li key={site.name}>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-white/30 bg-white/15 px-3 py-2 text-sm transition hover:bg-white/30"
                      >
                        {site.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        ) : (
          <section className="mt-6 rounded-2xl border border-white/35 bg-white/20 p-6 text-white backdrop-blur-md">
            <p className="text-sm sm:text-base">
              No results found for &quot;{query}&quot;. Try another keyword.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
