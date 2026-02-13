"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import type { WebsiteCategory } from "@/lib/website-categories";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type HomeDirectoryProps = {
  categories: WebsiteCategory[];
  activeRoute?: "home" | "trending" | "categories" | "favourites";
};

type ViewMode = "cards" | "logo" | "list";

type FlatWebsite = {
  id: string;
  websiteId: string | null;
  name: string;
  url: string;
  category: string;
  subcategory: string;
  description: string;
  domain: string;
  accent: string;
};

type RailItem = {
  key: string;
  label: string;
  active?: boolean;
};

type DirectoryEventType = "search" | "view" | "click" | "favourite_add" | "favourite_remove";

type FavouritesApi = {
  from(table: "user_favourites"): {
    select(columns: "website_id"): {
      eq(
        column: "user_id",
        value: string,
      ): Promise<{ data: Array<{ website_id: string }> | null; error: { message: string } | null }>;
    };
    delete(): {
      eq(column: "user_id", value: string): {
        eq(column: "website_id", value: string): Promise<{ error: { message: string } | null }>;
      };
    };
    insert(values: { user_id: string; website_id: string }): Promise<{ error: { message: string } | null }>;
  };
};

type EventsApi = {
  from(table: "user_events"): {
    insert(values: {
      user_id: string | null;
      website_id: string | null;
      event_type: DirectoryEventType;
      query: string | null;
      context: Record<string, unknown>;
    }): Promise<{ error: { message: string } | null }>;
  };
};

const MENU_ITEMS = [
  "Profile Setting",
  "Account Setting",
  "Premium Setting",
  "Network Setting",
  "Logout",
];

const BRAND_COLORS: Record<string, string> = {
  github: "#24292f",
  google: "#4285f4",
  youtube: "#ff0000",
  figma: "#f24e1e",
  openai: "#10a37f",
  linkedin: "#0a66c2",
  amazon: "#ff9900",
  netflix: "#e50914",
  spotify: "#1db954",
  canva: "#00c4cc",
  vercel: "#000000",
  notion: "#000000",
};

const RAIL_ITEMS: RailItem[] = [
  { key: "home", label: "Home" },
  { key: "chart", label: "Analytics" },
  { key: "stack", label: "Projects" },
  { key: "send", label: "Messages" },
  { key: "users", label: "Members" },
  { key: "folder", label: "Files" },
  { key: "settings", label: "Settings", active: true },
];

const FREE_SITE_LIMIT = 15;
const LOGO_DEV_PUBLIC_KEY = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLIC_KEY ?? "";

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function pickAccent(name: string, domain: string) {
  const normalized = name.toLowerCase().replace(/\s+/g, "");
  const root = domain.split(".")[0]?.toLowerCase() ?? normalized;
  if (BRAND_COLORS[normalized]) return BRAND_COLORS[normalized];
  if (BRAND_COLORS[root]) return BRAND_COLORS[root];

  let hash = 0;
  const key = `${name}-${domain}`;
  for (let i = 0; i < key.length; i += 1) hash = key.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${Math.abs(hash % 360)} 72% 42%)`;
}

function getLogoDevUrl(domain: string, size = 128) {
  const cleanDomain = domain.replace(/^www\./, "").trim();
  if (!cleanDomain) return "";

  const url = new URL(`https://img.logo.dev/${cleanDomain}`);
  url.searchParams.set("size", String(size));
  url.searchParams.set("format", "png");
  if (LOGO_DEV_PUBLIC_KEY) {
    url.searchParams.set("token", LOGO_DEV_PUBLIC_KEY);
  }
  return url.toString();
}

function getRankBadgeTheme(rank: number) {
  const themes = [
    { bg: "#ffd166", border: "#ffe2a8", text: "#4a2a00" },
    { bg: "#ffb4a2", border: "#ffd2c8", text: "#5c1f14" },
    { bg: "#cdb4db", border: "#e3d4ea", text: "#3d2451" },
    { bg: "#a8dadc", border: "#cdecef", text: "#0f3f45" },
    { bg: "#bde0fe", border: "#d8ecff", text: "#123d63" },
    { bg: "#caffbf", border: "#ddffd6", text: "#1d4d1f" },
    { bg: "#fbc4ab", border: "#ffdccc", text: "#5b2c1b" },
    { bg: "#fde4cf", border: "#ffefdf", text: "#5a4020" },
  ];
  return themes[(Math.max(rank, 1) - 1) % themes.length];
}

function UiIcon({ name }: { name: string }) {
  switch (name) {
    case "home":
      return <path d="M4 10l8-6 8 6v9h-5v-5H9v5H4z" />;
    case "chart":
      return <path d="M5 19V9m7 10V5m7 14v-7M3 21h18" />;
    case "stack":
      return <path d="M4 7h16M4 12h16M4 17h16" />;
    case "send":
      return <path d="M21 3L3 11l7 2 2 7 9-17z" />;
    case "users":
      return <path d="M16 11a3 3 0 1 0-3-3m-7 8a4 4 0 0 1 8 0m2 0a4 4 0 0 1 8 0M8 8a3 3 0 1 0 0-6" />;
    case "folder":
      return <path d="M3 7h6l2 2h10v10H3z" />;
    case "settings":
      return <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8 4-2 .6-.4 1.2 1.2 1.6-1.4 1.4-1.6-1.2-1.2.4L14 20h-4l-.6-2-.2-.1-1-.3-1.6 1.2-1.4-1.4 1.2-1.6-.4-1.2L4 12l2-.6.4-1.2-1.2-1.6 1.4-1.4 1.6 1.2 1.2-.4L10 4h4l.6 2 .2.1 1 .3 1.6-1.2 1.4 1.4-1.2 1.6.4 1.2z" />;
    case "search":
      return <path d="M11 19a8 8 0 1 1 5.3-14l5 5" />;
    case "trending":
      return <path d="M13 3c2 3 2 5 0 7 3-1 6 2 6 6a7 7 0 1 1-14 0c0-4 3-7 8-13z" />;
    case "categories":
      return <path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" />;
    case "favourites":
      return <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.4-7 10-7 10z" />;
    case "sun":
      return <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.4 6.4-1.4-1.4M7 7 5.6 5.6m12.8 0L17 7M7 17l-1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
    case "moon":
      return <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z" />;
    case "layout":
      return <path d="M3 4h8v8H3zm10 0h8v5h-8zM3 14h5v6H3zm7 0h11v6H10z" />;
    default:
      return <circle cx="12" cy="12" r="8" />;
  }
}

function WebsiteLogo({
  name,
  domain,
  className = "h-9 w-9 rounded-lg text-xs",
  imageClassName = "h-6 w-6",
  minimal = false,
}: {
  name: string;
  domain: string;
  className?: string;
  imageClassName?: string;
  minimal?: boolean;
}) {
  const letters = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const [logoError, setLogoError] = useState(false);
  const logoUrl = useMemo(() => getLogoDevUrl(domain), [domain]);
  const showImage = Boolean(logoUrl) && !logoError;

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden font-bold ${className} ${
        minimal
          ? "border border-slate-200 bg-white text-slate-500"
          : "border border-slate-200 bg-gradient-to-br from-white to-slate-50 text-slate-500"
      }`}
      aria-hidden="true"
    >
      {showImage ? (
        <Image
          src={logoUrl}
          alt={`${name} logo`}
          width={64}
          height={64}
          unoptimized
          className={`object-contain ${imageClassName}`}
          onError={() => setLogoError(true)}
          key={logoUrl}
        />
      ) : (
        letters
      )}
    </div>
  );
}

function SectionCard({
  site,
  view,
  rank,
  isSpecial,
  isFavourite,
  onToggleFavourite,
  onWebsiteClick,
  onTrackView,
  locked,
  onUnlockRequest,
}: {
  site: FlatWebsite;
  view: ViewMode;
  rank?: number;
  isSpecial?: boolean;
  isFavourite: boolean;
  onToggleFavourite: (site: FlatWebsite) => void;
  onWebsiteClick: (site: FlatWebsite, source: string) => void;
  onTrackView: (site: FlatWebsite, source: string) => void;
  locked?: boolean;
  onUnlockRequest?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const rankTheme = typeof rank === "number" ? getRankBadgeTheme(rank) : null;

  const commonClass =
    "group relative h-full overflow-visible rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_8px_22px_rgba(15,23,42,0.08)]";
  const lockOverlay = locked ? (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
      <button
        type="button"
        onClick={onUnlockRequest}
        className="rounded-full bg-[#52796f] px-4 py-2 text-xs font-semibold text-white"
      >
        Login to Unlock
      </button>
    </div>
  ) : null;

  if (view === "logo") {
    return (
      <div className={`${commonClass} p-2.5 sm:p-3`}>
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer"
          onClick={
            locked
              ? (event) => event.preventDefault()
              : () => {
                  onWebsiteClick(site, "logo_view_card");
                }
          }
          className={`flex flex-col items-center gap-2 text-center ${locked ? "pointer-events-none opacity-70" : ""}`}
        >
          <WebsiteLogo name={site.name} domain={site.domain} className="h-10 w-10 rounded-lg text-[10px]" imageClassName="h-6 w-6" />
          <p className="line-clamp-1 text-xs font-semibold text-slate-800 sm:text-sm">{site.name}</p>
          <p className="line-clamp-1 text-[10px] text-slate-500 sm:text-xs">{site.category}</p>
        </a>
        {lockOverlay}
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className={`${commonClass} flex items-center gap-2 p-2.5 sm:p-3`}>
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer"
          onClick={
            locked
              ? (event) => event.preventDefault()
              : () => {
                  onWebsiteClick(site, "list_view_logo");
                }
          }
          className={`shrink-0 ${locked ? "pointer-events-none opacity-70" : ""}`}
        >
          <WebsiteLogo name={site.name} domain={site.domain} className="h-9 w-9 rounded-lg text-[10px]" imageClassName="h-5 w-5" />
        </a>
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer"
          onClick={
            locked
              ? (event) => event.preventDefault()
              : () => {
                  onWebsiteClick(site, "list_view_title");
                }
          }
          className={`min-w-0 flex-1 ${locked ? "pointer-events-none opacity-70" : ""}`}
        >
          <div className="flex items-center gap-2">
            <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{site.name}</p>
            {typeof rank === "number" ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">#{rank}</span>
            ) : null}
          </div>
          <p className="truncate text-[11px] text-slate-500 sm:text-xs">{site.description}</p>
        </a>
        <button
          type="button"
          onClick={() => onToggleFavourite(site)}
          disabled={locked}
          className={`rounded-lg px-1.5 py-1 text-[10px] font-semibold sm:px-2 sm:text-xs ${isFavourite ? "bg-[#eef5f2] text-[#3f5f57]" : "bg-slate-100 text-slate-600"}`}
        >
          Fav
        </button>
        {lockOverlay}
      </div>
    );
  }

  return (
    <article
      className={`${commonClass} relative`}
      style={
        isSpecial
          ? {
              background: "linear-gradient(180deg, #ffffff 0%, #fcfdfd 100%)",
              borderColor: "color-mix(in srgb, #52796f 22%, #dbe3e9)",
            }
          : undefined
      }
    >
      {typeof rank === "number" && rankTheme ? (
        <div
          className="absolute right-6 -top-3 z-[2] rounded-full border-[4px] px-4 py-1 text-sm font-bold shadow-sm"
          style={{ backgroundColor: rankTheme.bg, borderColor: rankTheme.border, color: rankTheme.text }}
        >
          Trending #{rank}
        </div>
      ) : null}

      <div
        className={`grid grid-cols-[60px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-4 ${
          typeof rank === "number" ? "pt-4" : "pt-0.5"
        }`}
      >
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer"
          onClick={
            locked
              ? (event) => event.preventDefault()
              : () => {
                  onWebsiteClick(site, "card_logo");
                }
          }
          className={`shrink-0 ${locked ? "pointer-events-none opacity-70" : ""}`}
        >
          <WebsiteLogo
            name={site.name}
            domain={site.domain}
            className="h-14 w-14 rounded-full text-sm sm:h-16 sm:w-16"
            imageClassName="h-8 w-8 sm:h-9 sm:w-9"
            minimal
          />
        </a>

        <div className="min-w-0 self-center">
          <div className="flex items-center justify-between gap-2">
            <a
              href={site.url}
              target="_blank"
              rel="noreferrer"
              onClick={
                locked
                  ? (event) => event.preventDefault()
                  : () => {
                      onWebsiteClick(site, "card_title");
                    }
              }
              className={`min-w-0 ${locked ? "pointer-events-none opacity-70" : ""}`}
            >
              <p className="line-clamp-1 text-base font-bold leading-tight text-slate-900 sm:text-lg md:text-[1.35rem]">
                {site.name}
              </p>
            </a>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onToggleFavourite(site)}
                disabled={locked}
                className={`${isFavourite ? "text-[#e05a5a]" : "text-slate-400"} rounded-full p-1.5 transition hover:bg-slate-100`}
                aria-label="Toggle favourite"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill={isFavourite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.4-7 10-7 10z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  setExpanded((prev) => {
                    const next = !prev;
                    if (next) onTrackView(site, "card_expand");
                    return next;
                  })
                }
                disabled={locked}
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100"
                aria-label="Expand website card"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
          <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            onClick={
              locked
                ? (event) => event.preventDefault()
                : () => {
                    onWebsiteClick(site, "card_content");
                  }
            }
            className={`mt-0.5 block ${locked ? "pointer-events-none opacity-70" : ""}`}
          >
            <p className="line-clamp-1 text-xs text-slate-500 sm:text-sm">{site.category}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-500 sm:text-sm">{site.description}</p>
          </a>
        </div>
      </div>

      {expanded ? (
        <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-3">
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(site.url)}
            className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
          >
            Copy Link
          </button>
          <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => onWebsiteClick(site, "card_visit_button")}
            className="rounded-lg bg-[#52796f] px-2 py-1 text-xs font-semibold text-white"
          >
            Visit
          </a>
        </div>
      ) : null}
      {lockOverlay}
    </article>
  );
}

export default function HomeDirectory({ categories, activeRoute = "home" }: HomeDirectoryProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("webloft-theme") === "dark";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChromeVisible, setIsChromeVisible] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentUserId = currentUser?.id ?? null;
  const lastScrollYRef = useRef(0);
  const chromeVisibleRef = useRef(true);
  const scrollRafRef = useRef<number | null>(null);
  const lastTrackedQueryRef = useRef("");
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "cards";
    const saved = window.localStorage.getItem("webloft-view");
    if (saved === "cards" || saved === "logo" || saved === "list") return saved;
    return "cards";
  });
  const [favourites, setFavourites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("webloft-favourites");
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [openSidebarCategories, setOpenSidebarCategories] = useState<string[]>([]);
  const [sidebarInteracted, setSidebarInteracted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("webloft-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    window.localStorage.setItem("webloft-view", viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (currentUserId) return;
    window.localStorage.setItem("webloft-favourites", JSON.stringify(favourites));
  }, [favourites, currentUserId]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    chromeVisibleRef.current = true;

    const updateChrome = () => {
      const y = window.scrollY;
      const delta = y - lastScrollYRef.current;
      if (Math.abs(delta) < 8) {
        scrollRafRef.current = null;
        return;
      }
      const nextVisible = y < 40 || delta < 0;
      if (nextVisible !== chromeVisibleRef.current) {
        chromeVisibleRef.current = nextVisible;
        setIsChromeVisible(nextVisible);
      }
      lastScrollYRef.current = y;
      scrollRafRef.current = null;
    };

    const onScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(updateChrome);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      const mobile = media.matches;
      setIsMobileViewport(mobile);
      if (!mobile) setIsMobileSidebarOpen(false);
    };
    updateViewport();
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  const showTrending = activeRoute === "home" || activeRoute === "trending";
  const showFeatured = activeRoute === "home";
  const showCategories = activeRoute === "home" || activeRoute === "categories";
  const showFavourites = activeRoute === "home" || activeRoute === "favourites";

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setCurrentUser(data.user ?? null);
        setAuthChecked(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setAuthChecked(true);
      if (session?.user) {
        setIsAuthOpen(false);
        setAuthMessage("");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    let cancelled = false;
    const loadFavourites = async () => {
      if (!currentUserId) {
        try {
          const raw = window.localStorage.getItem("webloft-favourites");
          const parsed = raw ? (JSON.parse(raw) as string[]) : [];
          if (!cancelled) setFavourites(Array.isArray(parsed) ? parsed : []);
        } catch {
          if (!cancelled) setFavourites([]);
        }
        return;
      }

      const favouritesApi = supabase as unknown as FavouritesApi;
      const { data, error } = await favouritesApi
        .from("user_favourites")
        .select("website_id")
        .eq("user_id", currentUserId);

      if (cancelled) return;
      if (error) {
        setFavourites([]);
        return;
      }

      const rows = (data ?? []) as Array<{ website_id: string }>;
      setFavourites(rows.map((item) => item.website_id));
    };

    void loadFavourites();
    return () => {
      cancelled = true;
    };
  }, [currentUserId, supabase]);

  const trackEvent = useCallback(
    async (
      eventType: DirectoryEventType,
      websiteId?: string | null,
      queryText?: string | null,
      context?: Record<string, unknown>,
    ) => {
      const eventsApi = supabase as unknown as EventsApi;
      await eventsApi.from("user_events").insert({
        user_id: currentUserId,
        website_id: websiteId ?? null,
        event_type: eventType,
        query: queryText ?? null,
        context: {
          route: activeRoute,
          ...context,
        },
      });
    },
    [supabase, currentUserId, activeRoute],
  );

  const flatSites = useMemo<FlatWebsite[]>(
    () =>
      categories.flatMap((category) =>
        category.subcategories.flatMap((subcategory, subcategoryIndex) =>
          subcategory.sites.map((site, siteIndex) => {
            const domain = domainFromUrl(site.url);
            return {
              id: site.id ?? `${category.title}-${subcategory.title}-${site.name}-${subcategoryIndex}-${siteIndex}`,
              websiteId: site.id ?? null,
              name: site.name,
              url: site.url,
              category: category.title,
              subcategory: subcategory.title,
              description: site.shortDescription ?? `${subcategory.title} • ${category.title}`,
              domain,
              accent: pickAccent(site.name, domain),
            };
          }),
        ),
      ),
    [categories],
  );

  const filteredSites = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return flatSites;
    return flatSites.filter((site) =>
      `${site.name} ${site.category} ${site.subcategory} ${site.domain}`.toLowerCase().includes(normalized),
    );
  }, [flatSites, query]);

  const favouriteSet = useMemo(() => new Set(favourites), [favourites]);
  const getFavouriteKey = useCallback((site: FlatWebsite) => site.websiteId ?? site.id, []);
  const isSiteFavourite = useCallback((site: FlatWebsite) => favouriteSet.has(getFavouriteKey(site)), [favouriteSet, getFavouriteKey]);

  const favouriteSites = useMemo(() => filteredSites.filter((site) => isSiteFavourite(site)), [filteredSites, isSiteFavourite]);

  const trendingSites = filteredSites.slice(0, 8);
  const featuredSites = filteredSites.slice(8, 16);
  const normalSites = filteredSites.slice(16);
  const trendingByCategory = useMemo(
    () =>
      Object.entries(
        filteredSites.reduce<Record<string, FlatWebsite[]>>((acc, site) => {
          if (!acc[site.category]) acc[site.category] = [];
          acc[site.category].push(site);
          return acc;
        }, {}),
      )
        .map(([categoryName, sites]) => ({ categoryName, sites: sites.slice(0, 6) }))
        .sort((a, b) => b.sites.length - a.sites.length),
    [filteredSites],
  );

  const normalGrouped = useMemo(
    () =>
      normalSites.reduce<Record<string, FlatWebsite[]>>((acc, site) => {
        if (!acc[site.category]) acc[site.category] = [];
        acc[site.category].push(site);
        return acc;
      }, {}),
    [normalSites],
  );

  const popularCategories = useMemo(
    () =>
      [...categories]
        .map((category) => ({
          ...category,
          siteCount: category.subcategories.reduce((count, sub) => count + sub.sites.length, 0),
        }))
        .sort((a, b) => b.siteCount - a.siteCount),
    [categories],
  );
  const sidebarCategories = useMemo(() => popularCategories.slice(0, 8), [popularCategories]);
  const effectiveOpenSidebarCategories = sidebarInteracted
    ? openSidebarCategories
    : sidebarCategories.length > 0
      ? [sidebarCategories[0].title]
      : [];

  const gridClass =
    viewMode === "logo"
      ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
      : viewMode === "list"
        ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        : "grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3";

  const toggleFavourite = useCallback(
    async (site: FlatWebsite) => {
      const key = getFavouriteKey(site);
      const alreadyFav = favouriteSet.has(key);

      setFavourites((prev) => (alreadyFav ? prev.filter((x) => x !== key) : [...prev, key]));

      if (currentUserId && site.websiteId) {
        const favouritesApi = supabase as unknown as FavouritesApi;
        if (alreadyFav) {
          await favouritesApi
            .from("user_favourites")
            .delete()
            .eq("user_id", currentUserId)
            .eq("website_id", site.websiteId);
        } else {
          await favouritesApi.from("user_favourites").insert({
            user_id: currentUserId,
            website_id: site.websiteId,
          });
        }
      }

      void trackEvent(alreadyFav ? "favourite_remove" : "favourite_add", site.websiteId, null, {
        name: site.name,
      });
    },
    [currentUserId, favouriteSet, getFavouriteKey, supabase, trackEvent],
  );

  const handleWebsiteClick = useCallback(
    (site: FlatWebsite, source: string) => {
      void trackEvent("click", site.websiteId, query.trim() || null, {
        source,
        url: site.url,
        name: site.name,
      });
    },
    [query, trackEvent],
  );

  const handleWebsiteView = useCallback(
    (site: FlatWebsite, source: string) => {
      void trackEvent("view", site.websiteId, query.trim() || null, {
        source,
        name: site.name,
      });
    },
    [query, trackEvent],
  );
  const cycleViewMode = () => {
    setViewMode((prev) => (prev === "cards" ? "logo" : prev === "logo" ? "list" : "cards"));
  };
  const toggleSidebarCategory = (title: string) => {
    setSidebarInteracted(true);
    setOpenSidebarCategories((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title],
    );
  };

  const unlockedSiteIds = useMemo(
    () => new Set(filteredSites.slice(0, FREE_SITE_LIMIT).map((site) => site.id)),
    [filteredSites],
  );

  useEffect(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized || normalized.length < 2) return;
    if (lastTrackedQueryRef.current === normalized) return;

    const timer = window.setTimeout(() => {
      lastTrackedQueryRef.current = normalized;
      void trackEvent("search", null, normalized, {
        result_count: filteredSites.length,
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [query, filteredSites.length, trackEvent]);

  const handleEmailLogin = async () => {
    if (!email.trim()) {
      setAuthMessage("Enter an email address.");
      return;
    }

    setAuthLoading(true);
    setAuthMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    setAuthLoading(false);
    setAuthMessage(error ? error.message : "Check your email for login link.");
  };

  const handleOAuthLogin = async (provider: "google" | "twitter" | "facebook") => {
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setAuthMessage(error.message);
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  const headerVisible = !isSidebarOpen && !isMobileSidebarOpen && isChromeVisible;
  const bottomNavVisible = !isSidebarOpen && !isMobileSidebarOpen && (isChromeVisible || isMobileViewport);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <aside
        className={`fixed left-0 top-0 z-50 hidden h-screen transition-[width] duration-300 md:block ${isSidebarOpen ? "w-[430px]" : "w-24"}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => {
          setIsSidebarOpen(false);
          setIsUserMenuOpen(false);
        }}
      >
        <div className="absolute left-4 top-6 flex h-[calc(100%-48px)] w-[70px] flex-col items-center rounded-2xl border border-slate-200 bg-white py-3 shadow-sm">
          <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#52796f] text-xs font-black text-white">
            WB
          </div>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
            aria-label="User menu"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
            </svg>
          </button>
          <div className="flex flex-1 flex-col items-center gap-2">
            {RAIL_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                  item.active
                    ? "bg-[#eef5f2] text-[#52796f] ring-1 ring-[#b7ccc5]"
                    : "bg-white text-slate-500 ring-1 ring-slate-200"
                }`}
                title={item.label}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <UiIcon name={item.key} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {isUserMenuOpen ? (
          <div className="absolute left-24 top-14 z-50 w-52 rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-xl">
            {MENU_ITEMS.map((item) => (
              <button key={item} type="button" className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100">
                {item}
              </button>
            ))}
          </div>
        ) : null}

        <div
          className={`absolute left-[100px] top-6 h-[calc(100%-48px)] w-[320px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 ${
            isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0 pointer-events-none"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-[#52796f]">Most Popular Categories</p>
            <div className="flex items-center gap-2 text-slate-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <UiIcon name="search" />
              </svg>
              <span className="rounded-md bg-[#eef5f2] px-2 py-0.5 text-[11px] font-semibold text-[#52796f]">
                {sidebarCategories.length}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-slate-700">
            {sidebarCategories.map((category, categoryIndex) => (
              <section key={category.title} className="rounded-xl border border-slate-200 bg-white p-3">
                <button
                  type="button"
                  onClick={() => toggleSidebarCategory(category.title)}
                  className="mb-2 flex w-full items-center justify-between rounded-lg px-1 py-1 text-left hover:bg-slate-50"
                  aria-expanded={effectiveOpenSidebarCategories.includes(category.title)}
                >
                  <p className="text-sm font-semibold text-[#52796f]">
                    {categoryIndex + 1}. {category.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#eef5f2] px-2 py-0.5 text-[11px] font-semibold text-[#52796f]">
                      {category.siteCount}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 text-slate-500 transition-transform ${effectiveOpenSidebarCategories.includes(category.title) ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {effectiveOpenSidebarCategories.includes(category.title) ? (
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.title} className="rounded-lg bg-slate-50 p-2">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {subcategory.title}
                        </p>
                        <ul className="space-y-1">
                          {subcategory.sites.map((site) => (
                            <li key={site.url}>
                              <a
                                href={site.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-md bg-white px-2 py-1 text-[11px] text-slate-600 ring-1 ring-slate-200 transition hover:bg-[#eef5f2] hover:text-[#52796f]"
                              >
                                {site.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Directory Stats</p>
              <span className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600">
                Total
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full w-full rounded-full bg-[#52796f]" />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {categories.length} categories and {flatSites.length} websites listed.
            </p>
          </div>
        </div>
      </aside>

      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-[80] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/45"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
          <aside className="absolute left-0 top-0 h-full w-[86vw] max-w-[340px] overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-bold text-[#52796f]">Categories</p>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>
            <div className="space-y-3">
              {sidebarCategories.map((category, categoryIndex) => (
                <section key={category.title} className="rounded-xl border border-slate-200 bg-white p-3">
                  <button
                    type="button"
                    onClick={() => toggleSidebarCategory(category.title)}
                    className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-left hover:bg-slate-50"
                    aria-expanded={effectiveOpenSidebarCategories.includes(category.title)}
                  >
                    <p className="text-sm font-semibold text-[#52796f]">
                      {categoryIndex + 1}. {category.title}
                    </p>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 text-slate-500 transition-transform ${effectiveOpenSidebarCategories.includes(category.title) ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {effectiveOpenSidebarCategories.includes(category.title) ? (
                    <div className="mt-2 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.title} className="rounded-lg bg-slate-50 p-2">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{subcategory.title}</p>
                          <ul className="space-y-1">
                            {subcategory.sites.map((site) => (
                              <li key={site.url}>
                                <a
                                  href={site.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block rounded-md bg-white px-2 py-1 text-[11px] text-slate-600 ring-1 ring-slate-200"
                                  onClick={() => setIsMobileSidebarOpen(false)}
                                >
                                  {site.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </aside>
        </div>
      ) : null}

      <header
        className={`sticky top-0 z-30 bg-transparent px-4 pt-3 transition-all duration-300 ${
          headerVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
          <div className="mx-auto flex w-full max-w-5xl items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 md:hidden"
              aria-label="Open sidebar menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <Link href="/" className="text-xl font-black tracking-wide text-[#52796f]">WEBLOFT</Link>
            <label className="relative flex-1">
              <span className="sr-only">Search websites</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search websites, category, subcategory"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none ring-[#52796f] placeholder:text-slate-400 focus:ring-2"
              />
            </label>
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#52796f]"
              aria-label="Toggle dark mode"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <UiIcon name={darkMode ? "sun" : "moon"} />
              </svg>
            </button>
            {currentUser ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 sm:inline-flex"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="hidden rounded-full bg-[#52796f] px-3 py-2 text-xs font-semibold text-white sm:inline-flex"
              >
                Login
              </button>
            )}
          </div>
        </header>

      <main id="home" className="mx-auto w-full max-w-7xl px-4 pb-32 pt-5 sm:pt-6">
        {!authChecked ? (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            Loading account state...
          </section>
        ) : !currentUser ? (
          <section className="mb-6 rounded-2xl border border-[#b7ccc5] bg-[#eef5f2] px-4 py-3 text-sm text-[#3f5f57]">
            Guest mode: first {FREE_SITE_LIMIT} websites are free. Login to unlock everything.
          </section>
        ) : (
          <section className="mb-6 rounded-2xl border border-[#b7ccc5] bg-[#eef5f2] px-4 py-3 text-sm text-[#3f5f57]">
            Signed in as {currentUser.email ?? "user"}. Full access unlocked.
          </section>
        )}

        {showTrending ? (
        <section id="trending" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trending Websites</h2>
            <p className="text-sm text-slate-500">
              {activeRoute === "trending" ? "Category-wise trending list" : "Top picks right now"}
            </p>
          </div>
          {activeRoute === "trending" ? (
            <div className="space-y-9">
              {trendingByCategory.map(({ categoryName, sites }) => (
                <section key={categoryName}>
                  <h3 className="mb-4 text-xl font-bold text-[#52796f]">{categoryName}</h3>
                  <div className={gridClass}>
                    {sites.map((site, index) => (
                      <SectionCard
                        key={site.id}
                        site={site}
                        rank={index + 1}
                        view={viewMode}
                        isSpecial
                        isFavourite={isSiteFavourite(site)}
                        onToggleFavourite={toggleFavourite}
                        onWebsiteClick={handleWebsiteClick}
                        onTrackView={handleWebsiteView}
                        locked={!currentUser && !unlockedSiteIds.has(site.id)}
                        onUnlockRequest={() => setIsAuthOpen(true)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className={gridClass}>
              {trendingSites.map((site, index) => (
                <SectionCard
                  key={site.id}
                  site={site}
                  rank={index + 1}
                  view={viewMode}
                  isSpecial
                  isFavourite={isSiteFavourite(site)}
                  onToggleFavourite={toggleFavourite}
                  onWebsiteClick={handleWebsiteClick}
                  onTrackView={handleWebsiteView}
                  locked={!currentUser && !unlockedSiteIds.has(site.id)}
                  onUnlockRequest={() => setIsAuthOpen(true)}
                />
              ))}
            </div>
          )}
        </section>
        ) : null}

        {showFeatured ? (
        <section id="featured" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Websites</h2>
            <p className="text-sm text-slate-500">Handpicked quality websites</p>
          </div>
          <div className={gridClass}>
            {featuredSites.map((site) => (
              <SectionCard
                key={site.id}
                site={site}
                view={viewMode}
                isSpecial
                isFavourite={isSiteFavourite(site)}
                onToggleFavourite={toggleFavourite}
                onWebsiteClick={handleWebsiteClick}
                onTrackView={handleWebsiteView}
                locked={!currentUser && !unlockedSiteIds.has(site.id)}
                onUnlockRequest={() => setIsAuthOpen(true)}
              />
            ))}
          </div>
        </section>
        ) : null}

        {showCategories ? (
        <section id="categories" className="mb-10 scroll-mt-24">
          {Object.entries(normalGrouped).map(([categoryName, sites]) => (
            <section key={categoryName} className="mb-8">
              <h3 className="mb-4 text-xl font-bold text-[#52796f]">{categoryName}</h3>
              <div className={gridClass}>
                {sites.map((site) => (
                  <SectionCard
                    key={site.id}
                    site={site}
                    view={viewMode}
                    isFavourite={isSiteFavourite(site)}
                    onToggleFavourite={toggleFavourite}
                    onWebsiteClick={handleWebsiteClick}
                    onTrackView={handleWebsiteView}
                    locked={!currentUser && !unlockedSiteIds.has(site.id)}
                    onUnlockRequest={() => setIsAuthOpen(true)}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
        ) : null}

        {showFavourites ? (
        <section id="favourites" className="mb-6 scroll-mt-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Favourites</h2>
            <p className="text-sm text-slate-500">Your saved websites</p>
          </div>
          {favouriteSites.length > 0 ? (
            <div className={gridClass}>
              {favouriteSites.map((site) => (
                <SectionCard
                  key={site.id}
                  site={site}
                  view={viewMode}
                  isFavourite
                  onToggleFavourite={toggleFavourite}
                  onWebsiteClick={handleWebsiteClick}
                  onTrackView={handleWebsiteView}
                  locked={!currentUser && !unlockedSiteIds.has(site.id)}
                  onUnlockRequest={() => setIsAuthOpen(true)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
              No favourites yet. Use Fav button on cards.
            </div>
          )}
        </section>
        ) : null}
      </main>

      {isAuthOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/45 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Login to unlock all websites</h3>
              <button
                type="button"
                onClick={() => setIsAuthOpen(false)}
                className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#52796f]"
                />
              </label>
              <button
                type="button"
                onClick={handleEmailLogin}
                disabled={authLoading}
                className="w-full rounded-xl bg-[#52796f] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {authLoading ? "Please wait..." : "Continue with Email"}
              </button>
            </div>

            <div className="my-4 h-px bg-slate-200" />

            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => handleOAuthLogin("google")} className="rounded-xl border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700">
                Google
              </button>
              <button type="button" onClick={() => handleOAuthLogin("twitter")} className="rounded-xl border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700">
                Twitter
              </button>
              <button type="button" onClick={() => handleOAuthLogin("facebook")} className="rounded-xl border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700">
                Facebook
              </button>
            </div>

            {authMessage ? <p className="mt-3 text-xs text-slate-500">{authMessage}</p> : null}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={cycleViewMode}
        className={`fixed right-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xl transition-all ${
          bottomNavVisible ? "bottom-24 opacity-100" : "bottom-6 opacity-85"
        }`}
        aria-label={`Toggle layout. Current: ${viewMode}`}
        title={`Layout: ${viewMode}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <UiIcon name="layout" />
        </svg>
      </button>

      <nav className={`fixed left-1/2 z-[75] w-[min(500px,92vw)] -translate-x-1/2 rounded-3xl border-2 border-[#00a896] bg-[#00a896] px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.14)] pointer-events-auto transition-all duration-300 ${
        bottomNavVisible ? "bottom-3 opacity-100" : "-bottom-24 opacity-0"
      }`}>
        <ul className="grid grid-cols-4 gap-1 text-[10px] sm:gap-1.5 sm:text-[11px]">
          <li>
            <Link href="/" className={`flex flex-col items-center rounded-xl px-1.5 py-1 transition ${activeRoute === "home" ? "bg-white text-[#00a896] shadow-sm" : "text-slate-300 hover:bg-[#0aaea2] hover:text-slate-200"}`}>
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><UiIcon name="home" /></svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/trending" className={`flex flex-col items-center rounded-xl px-1.5 py-1 transition ${activeRoute === "trending" ? "bg-white text-[#00a896] shadow-sm" : "text-slate-300 hover:bg-[#0aaea2] hover:text-slate-200"}`}>
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><UiIcon name="trending" /></svg>
              <span>Trending</span>
            </Link>
          </li>
          <li>
            <Link href="/categories" className={`flex flex-col items-center rounded-xl px-1.5 py-1 transition ${activeRoute === "categories" ? "bg-white text-[#00a896] shadow-sm" : "text-slate-300 hover:bg-[#0aaea2] hover:text-slate-200"}`}>
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><UiIcon name="categories" /></svg>
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link href="/favourites" className={`flex flex-col items-center rounded-xl px-1.5 py-1 transition ${activeRoute === "favourites" ? "bg-white text-[#00a896] shadow-sm" : "text-slate-300 hover:bg-[#0aaea2] hover:text-slate-200"}`}>
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><UiIcon name="favourites" /></svg>
              <span>Favourites</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

