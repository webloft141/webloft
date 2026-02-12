"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WebsiteCategory } from "@/lib/website-categories";

type HomeDirectoryProps = {
  categories: WebsiteCategory[];
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function HomeDirectory({ categories }: HomeDirectoryProps) {
  const [isDark, setIsDark] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [sideHidden, setSideHidden] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeControl, setActiveControl] = useState<
    "theme" | "notifications" | "account" | null
  >(null);

  const headerRef = useRef<HTMLElement>(null);
  const sideRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const preparedCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        id: slugify(category.title),
      })),
    [categories],
  );

  const totalSites = useMemo(
    () =>
      preparedCategories.reduce((count, category) => count + category.sites.length, 0),
    [preparedCategories],
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      const beyondThreshold = currentY > 100;

      if (scrollingDown && beyondThreshold) {
        setHeaderHidden(true);
        setSideHidden(true);
      } else {
        setHeaderHidden(false);
        setSideHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (notificationOpen && !headerRef.current?.contains(targetNode)) {
        setNotificationOpen(false);
      }
      if (accountOpen && !headerRef.current?.contains(targetNode)) {
        setAccountOpen(false);
      }
      if (mobileNavOpen && !sideRef.current?.contains(targetNode)) {
        setMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [accountOpen, mobileNavOpen, notificationOpen]);

  const surfaceClass = isDark
    ? "bg-[#0b1324] text-slate-100"
    : "bg-[#eef4f6] text-slate-800";

  const cardClass = isDark
    ? "border border-slate-700/80 bg-slate-900/80 text-slate-100"
    : "border border-[#d8e4e8] bg-white text-slate-800";

  const mutedTextClass = isDark ? "text-slate-300" : "text-slate-600";

  const controlActiveClass = isDark
    ? "bg-white text-[#0f172a]"
    : "bg-[#f6bd60] text-[#0f172a]";

  const controlInactiveClass = "bg-white/10 text-white hover:bg-white/20";

  const controlClass = (control: "theme" | "notifications" | "account") =>
    `rounded-full px-3 py-2 transition ${
      activeControl === control ? controlActiveClass : controlInactiveClass
    }`;

  const notifications = [
    "New AI tools were added in AI & Automation.",
    "Daily trending websites list is refreshed.",
    "Category cards now include 100 curated links.",
  ];

  return (
    <div className={`min-h-screen transition-colors ${surfaceClass}`}>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-40 mx-auto flex h-16 items-center justify-between border-b border-white/25 bg-[#335c67] px-4 text-white shadow-md transition-transform duration-300 sm:px-6 ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full px-3 py-2 text-sm font-semibold tracking-[0.2em] text-white transition hover:bg-white/15"
            aria-label="Refresh WEBLOFT"
          >
            WEBLOFT
          </button>
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="rounded-full px-3 py-2 text-sm text-white transition hover:bg-white/15 lg:hidden"
          >
            Categories
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={controlClass("theme")}
            onClick={() => {
              setIsDark((prev) => !prev);
              setActiveControl("theme");
            }}
            aria-label="Toggle dark mode"
          >
            {isDark ? "Light" : "Dark"}
          </button>

          <div className="relative">
            <button
              type="button"
              className={controlClass("notifications")}
              onClick={() => {
                setNotificationOpen((prev) => !prev);
                setAccountOpen(false);
                setActiveControl("notifications");
              }}
              aria-label="Open notifications"
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M6 9a6 6 0 1 1 12 0v4l1.5 2.5H4.5L6 13V9Z" />
                  <path d="M10 18a2 2 0 0 0 4 0" />
                </svg>
                <span className="text-xs font-semibold">3</span>
              </span>
            </button>
            {notificationOpen ? (
              <div
                className={`absolute right-0 mt-2 w-72 rounded-2xl p-3 shadow-xl ${cardClass}`}
              >
                <p className="text-sm font-semibold">Notifications</p>
                <ul className={`mt-2 space-y-2 text-sm ${mutedTextClass}`}>
                  {notifications.map((item) => (
                    <li key={item} className="rounded-lg px-2 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              className={controlClass("account")}
              onClick={() => {
                setAccountOpen((prev) => !prev);
                setNotificationOpen(false);
                setActiveControl("account");
              }}
              aria-label="Open account menu"
            >
              Riya Sharma
            </button>
            {accountOpen ? (
              <ul
                className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl py-1 text-sm shadow-xl ${cardClass}`}
              >
                {["Profile", "Saved Websites", "Settings", "Log Out"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`block px-4 py-2 transition ${
                        isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <aside
        ref={sideRef}
        className={`fixed left-4 top-24 z-30 h-[calc(100vh-7rem)] w-64 overflow-y-auto rounded-2xl p-4 shadow-xl transition-transform duration-300 ${cardClass} ${
          sideHidden ? "-translate-x-[120%]" : "translate-x-0"
        } ${mobileNavOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"}`}
      >
        <p className="text-sm font-semibold uppercase tracking-wide">Categories</p>
        <nav className="mt-3">
          <ul className="space-y-1 text-sm">
            {preparedCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className={`block rounded-lg px-3 py-2 transition ${
                    isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="px-4 pb-10 pt-24 lg:ml-72 lg:px-8">
        <section className={`rounded-3xl p-6 shadow-sm sm:p-8 ${cardClass}`}>
          <p className={`text-sm font-medium uppercase tracking-wide ${mutedTextClass}`}>
            Curated Discovery Hub
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            100 Websites. 10 Categories. One Clean Directory.
          </h1>
          <p className={`mt-3 max-w-3xl text-sm sm:text-base ${mutedTextClass}`}>
            WEBLOFT helps you find quality websites faster with organized category
            containers, attractive cards, and a distraction-free clean interface.
          </p>
          <div className={`mt-4 text-sm font-medium ${mutedTextClass}`}>
            {preparedCategories.length} categories • {totalSites} curated websites
          </div>
        </section>

        <div className="mt-6 space-y-6">
          {preparedCategories.map((category) => (
            <section
              id={category.id}
              key={category.id}
              className={`rounded-3xl p-5 shadow-sm sm:p-6 ${cardClass}`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">{category.title}</h2>
                  <p className={`mt-1 text-sm ${mutedTextClass}`}>
                    {category.description}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isDark
                      ? "bg-slate-800 text-slate-200"
                      : "bg-[#edf3f5] text-slate-700"
                  }`}
                >
                  {category.sites.length} sites
                </span>
              </div>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {category.sites.map((site) => (
                  <li key={site.name}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group block rounded-2xl border p-4 transition duration-200 ${
                        isDark
                          ? "border-slate-700 bg-slate-950/80 hover:-translate-y-1 hover:border-slate-500"
                          : "border-[#dde8eb] bg-gradient-to-br from-white to-[#f4f8fa] hover:-translate-y-1 hover:border-[#335c67]/40"
                      }`}
                    >
                      <p className="text-base font-semibold">{site.name}</p>
                      <p className={`mt-1 text-xs ${mutedTextClass}`}>
                        {getDomain(site.url)}
                      </p>
                      <p
                        className={`mt-3 text-xs font-medium ${
                          isDark
                            ? "text-cyan-300 group-hover:text-cyan-200"
                            : "text-[#335c67] group-hover:text-[#1f3c45]"
                        }`}
                      >
                        Visit website
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
