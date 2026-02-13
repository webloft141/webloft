import type { WebsiteCategory } from "@/lib/website-categories";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function categoryPath(categoryTitle: string) {
  return `/categories/${slugify(categoryTitle)}`;
}

export function subcategoryPath(categoryTitle: string, subcategoryTitle: string) {
  return `/categories/${slugify(categoryTitle)}/${slugify(subcategoryTitle)}`;
}

export function websitePath(websiteSlug: string) {
  return `/site/${websiteSlug}`;
}

export function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] ?? url;
  }
}

export function buildWebsiteSlug(name: string, url: string, used?: Set<string>) {
  const base = slugify(name);
  const domain = domainFromUrl(url);
  const domainRoot = slugify(domain.split(".")[0] ?? "");
  let slug = base;
  if (used?.has(slug)) {
    slug = domainRoot ? `${base}-${domainRoot}` : `${base}-${slugify(domain)}`;
  }
  if (used?.has(slug)) {
    slug = `${slug}-${Math.abs(hashString(url))}`;
  }
  used?.add(slug);
  return slug;
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function flattenDirectory(categories: WebsiteCategory[]) {
  const used = new Set<string>();
  return categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.sites.map((site) => ({
        websiteSlug: buildWebsiteSlug(site.name, site.url, used),
        name: site.name,
        url: site.url,
        shortDescription: site.shortDescription ?? "",
        categoryTitle: category.title,
        subcategoryTitle: subcategory.title,
      })),
    ),
  );
}

