import type { WebsiteCategory } from "@/lib/website-categories";
import { WEBSITE_CATEGORIES } from "@/lib/website-categories";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CategoryRow = {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
};

type SubcategoryRow = {
  id: string;
  category_id: string;
  title: string;
  sort_order: number;
};

type WebsiteRow = {
  id: string;
  subcategory_id: string;
  name: string;
  url: string;
  short_description: string | null;
  sort_order: number;
};

export async function getWebsiteCategoriesFromDb(): Promise<WebsiteCategory[]> {
  try {
    const supabase = await createSupabaseServerClient();

    const [{ data: categories, error: categoriesError }, { data: subcategories, error: subcategoriesError }, { data: websites, error: websitesError }] =
      await Promise.all([
        supabase
          .from("categories")
          .select("id, title, description, sort_order")
          .order("sort_order", { ascending: true }),
        supabase
          .from("subcategories")
          .select("id, category_id, title, sort_order")
          .order("sort_order", { ascending: true }),
        supabase
          .from("websites")
          .select("id, subcategory_id, name, url, short_description, sort_order")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

    if (categoriesError || subcategoriesError || websitesError) {
      return WEBSITE_CATEGORIES;
    }

    if (!categories?.length || !subcategories?.length || !websites?.length) {
      return WEBSITE_CATEGORIES;
    }

    const websitesBySubcategory = (websites as WebsiteRow[]).reduce<
      Record<string, { id: string; name: string; url: string; shortDescription?: string }[]>
    >(
      (acc, site) => {
        if (!acc[site.subcategory_id]) acc[site.subcategory_id] = [];
        acc[site.subcategory_id].push({
          id: site.id,
          name: site.name,
          url: site.url,
          shortDescription: site.short_description ?? undefined,
        });
        return acc;
      },
      {},
    );

    const subcategoriesByCategory = (subcategories as SubcategoryRow[]).reduce<
      Record<string, { title: string; sites: { name: string; url: string }[]; sort_order: number }[]>
    >((acc, subcategory) => {
      if (!acc[subcategory.category_id]) acc[subcategory.category_id] = [];
      acc[subcategory.category_id].push({
        title: subcategory.title,
        sites: websitesBySubcategory[subcategory.id] ?? [],
        sort_order: subcategory.sort_order,
      });
      return acc;
    }, {});

    const mapped = (categories as CategoryRow[])
      .map((category) => ({
        title: category.title,
        description: category.description ?? "",
        sort_order: category.sort_order,
        subcategories: (subcategoriesByCategory[category.id] ?? [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(({ title, sites }) => ({
            title,
            sites,
          }))
          .filter((sub) => sub.sites.length > 0),
      }))
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ title, description, subcategories: finalSubcategories }) => ({
        title,
        description,
        subcategories: finalSubcategories,
      }))
      .filter((category) => category.subcategories.length > 0);

    return mapped.length > 0 ? mapped : WEBSITE_CATEGORIES;
  } catch {
    return WEBSITE_CATEGORIES;
  }
}
