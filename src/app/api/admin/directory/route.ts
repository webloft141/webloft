import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isAdminSession } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function ensureAdmin(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const sessionCookie = parts.find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const cookieValue = sessionCookie?.split("=")[1] ?? null;
  return isAdminSession(cookieValue);
}

function toLabelArray(value: unknown) {
  if (!Array.isArray(value)) return [] as string[];
  return Array.from(
    new Set(
      value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
        .map((item) => item.toLowerCase()),
    ),
  );
}

async function syncGlobalTrending(supabase: ReturnType<typeof createSupabaseAdminClient>, websiteId: string, rank: number | null | undefined) {
  const { error: deleteError } = await supabase
    .from("website_trending")
    .delete()
    .eq("website_id", websiteId)
    .eq("scope", "global");

  if (deleteError) return deleteError.message;

  if (!rank || rank <= 0) return null;

  const rankScore = Math.max(1, 1000 - rank);
  const { error: insertError } = await supabase.from("website_trending").insert({
    website_id: websiteId,
    scope: "global",
    rank_position: rank,
    rank_score: rankScore,
  });

  if (insertError) return insertError.message;
  return null;
}

export async function GET(request: Request) {
  if (!ensureAdmin(request)) return unauthorized();

  const supabase = createSupabaseAdminClient();

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
        .select("id, subcategory_id, name, url, domain, short_description, is_featured, tags, badges, is_new, global_trending_rank, sort_order")
        .order("sort_order", { ascending: true }),
    ]);

  if (categoriesError || subcategoriesError || websitesError) {
    return NextResponse.json(
      {
        error: categoriesError?.message ?? subcategoriesError?.message ?? websitesError?.message ?? "Failed to load directory",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    categories: categories ?? [],
    subcategories: subcategories ?? [],
    websites: websites ?? [],
  });
}

export async function POST(request: Request) {
  if (!ensureAdmin(request)) return unauthorized();

  const supabase = createSupabaseAdminClient();
  const body = (await request.json()) as
    | {
        action: "create_category";
        title: string;
        description?: string;
        sort_order?: number;
      }
    | {
        action: "create_subcategory";
        category_id: string;
        title: string;
        sort_order?: number;
      }
    | {
        action: "create_website";
        subcategory_id: string;
        name: string;
        url: string;
        short_description?: string;
        is_featured?: boolean;
        tags?: string[];
        badges?: string[];
        is_new?: boolean;
        global_trending_rank?: number | null;
        sort_order?: number;
      }
    | {
        action: "bulk_insert_websites";
        rows: Array<{
          subcategory_id: string;
          name: string;
          url: string;
          short_description?: string;
          is_featured?: boolean;
          tags?: string[];
          badges?: string[];
          is_new?: boolean;
          global_trending_rank?: number | null;
          sort_order?: number;
        }>;
      }
    | {
        action: "update_website";
        id: string;
        subcategory_id?: string;
        name?: string;
        url?: string;
        short_description?: string;
        is_featured?: boolean;
        tags?: string[];
        badges?: string[];
        is_new?: boolean;
        global_trending_rank?: number | null;
        sort_order?: number;
      };

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");

  const domainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    }
  };

  if (body.action === "create_category") {
    const { title, description = "", sort_order = 0 } = body;
    if (!title?.trim()) {
      return NextResponse.json({ error: "Category title is required." }, { status: 400 });
    }
    const slug = slugify(title);
    const { error } = await supabase.from("categories").insert({
      title: title.trim(),
      slug,
      description,
      sort_order,
      is_popular: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "create_subcategory") {
    const { category_id, title, sort_order = 0 } = body;
    if (!category_id || !title?.trim()) {
      return NextResponse.json({ error: "Category and subcategory title are required." }, { status: 400 });
    }
    const slug = slugify(title);
    const { error } = await supabase.from("subcategories").insert({
      category_id,
      title: title.trim(),
      slug,
      sort_order,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "create_website") {
    const {
      subcategory_id,
      name,
      url,
      short_description = "",
      is_featured = false,
      tags,
      badges,
      is_new = false,
      global_trending_rank = null,
      sort_order = 0,
    } = body;
    if (!subcategory_id || !name?.trim() || !url?.trim()) {
      return NextResponse.json({ error: "Subcategory, website name and URL are required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("websites")
      .insert({
        subcategory_id,
        name: name.trim(),
        slug: slugify(name),
        url: url.trim(),
        domain: domainFromUrl(url.trim()),
        short_description,
        is_featured,
        tags: toLabelArray(tags),
        badges: toLabelArray(badges),
        is_new,
        global_trending_rank,
        sort_order,
        is_active: true,
        metadata: {},
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const trendingError = await syncGlobalTrending(supabase, data.id, global_trending_rank);
    if (trendingError) {
      return NextResponse.json({ error: trendingError }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  }

  if (body.action === "bulk_insert_websites") {
    const { rows } = body;
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "rows array is required." }, { status: 400 });
    }
    const payload = rows
      .filter((row) => row.subcategory_id && row.name?.trim() && row.url?.trim())
      .map((row) => ({
        subcategory_id: row.subcategory_id,
        name: row.name.trim(),
        slug: slugify(row.name),
        url: row.url.trim(),
        domain: domainFromUrl(row.url.trim()),
        short_description: row.short_description ?? "",
        is_featured: row.is_featured ?? false,
        tags: toLabelArray(row.tags),
        badges: toLabelArray(row.badges),
        is_new: row.is_new ?? false,
        global_trending_rank: row.global_trending_rank ?? null,
        sort_order: row.sort_order ?? 0,
        is_active: true,
        metadata: {},
      }));

    if (payload.length === 0) {
      return NextResponse.json({ error: "No valid rows found." }, { status: 400 });
    }

    const { data, error } = await supabase.from("websites").insert(payload).select("id, global_trending_rank");
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    if (data?.length) {
      for (const site of data) {
        const trendingError = await syncGlobalTrending(supabase, site.id, site.global_trending_rank);
        if (trendingError) {
          return NextResponse.json({ error: trendingError }, { status: 400 });
        }
      }
    }

    return NextResponse.json({ ok: true, inserted: payload.length });
  }

  if (body.action === "update_website") {
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Website id is required." }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {};

    if (typeof updates.subcategory_id === "string" && updates.subcategory_id) {
      updatePayload.subcategory_id = updates.subcategory_id;
    }
    if (typeof updates.name === "string" && updates.name.trim()) {
      updatePayload.name = updates.name.trim();
      updatePayload.slug = slugify(updates.name);
    }
    if (typeof updates.url === "string" && updates.url.trim()) {
      updatePayload.url = updates.url.trim();
      updatePayload.domain = domainFromUrl(updates.url.trim());
    }
    if (typeof updates.short_description === "string") {
      updatePayload.short_description = updates.short_description;
    }
    if (typeof updates.is_featured === "boolean") {
      updatePayload.is_featured = updates.is_featured;
    }
    if (Array.isArray(updates.tags)) {
      updatePayload.tags = toLabelArray(updates.tags);
    }
    if (Array.isArray(updates.badges)) {
      updatePayload.badges = toLabelArray(updates.badges);
    }
    if (typeof updates.is_new === "boolean") {
      updatePayload.is_new = updates.is_new;
    }
    if (typeof updates.sort_order === "number") {
      updatePayload.sort_order = updates.sort_order;
    }
    if (typeof updates.global_trending_rank === "number" || updates.global_trending_rank === null) {
      updatePayload.global_trending_rank = updates.global_trending_rank;
    }

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const { error } = await supabase.from("websites").update(updatePayload).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    if (Object.prototype.hasOwnProperty.call(updatePayload, "global_trending_rank")) {
      const trendingError = await syncGlobalTrending(
        supabase,
        id,
        (updatePayload.global_trending_rank as number | null | undefined) ?? null,
      );
      if (trendingError) {
        return NextResponse.json({ error: trendingError }, { status: 400 });
      }
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}

export async function DELETE(request: Request) {
  if (!ensureAdmin(request)) return unauthorized();

  const supabase = createSupabaseAdminClient();
  const body = (await request.json()) as
    | { action: "delete_category"; id: string }
    | { action: "delete_subcategory"; id: string }
    | { action: "delete_website"; id: string };

  if (!body.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  if (body.action === "delete_category") {
    const { error } = await supabase.from("categories").delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "delete_subcategory") {
    const { error } = await supabase.from("subcategories").delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "delete_website") {
    const { error } = await supabase.from("websites").delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
