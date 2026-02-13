"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
};

type Subcategory = {
  id: string;
  category_id: string;
  title: string;
  sort_order: number;
};

type Website = {
  id: string;
  subcategory_id: string;
  name: string;
  url: string;
  domain: string;
  short_description: string | null;
  is_featured: boolean;
  tags: string[];
  badges: string[];
  is_new: boolean;
  global_trending_rank: number | null;
  sort_order: number;
};

type DirectoryResponse = {
  categories: Category[];
  subcategories: Subcategory[];
  websites: Website[];
};

function parseCommaList(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.toLowerCase()),
    ),
  );
}

export default function AdminDashboardClient() {
  const [data, setData] = useState<DirectoryResponse>({
    categories: [],
    subcategories: [],
    websites: [],
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [subcategoryCategoryId, setSubcategoryCategoryId] = useState("");
  const [subcategoryTitle, setSubcategoryTitle] = useState("");

  const [websiteSubcategoryId, setWebsiteSubcategoryId] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [websiteTags, setWebsiteTags] = useState("");
  const [websiteBadges, setWebsiteBadges] = useState("");
  const [websiteIsNew, setWebsiteIsNew] = useState(false);
  const [websiteIsFeatured, setWebsiteIsFeatured] = useState(false);
  const [websiteTrendingRank, setWebsiteTrendingRank] = useState("");

  const [editWebsiteId, setEditWebsiteId] = useState("");
  const [editWebsiteTags, setEditWebsiteTags] = useState("");
  const [editWebsiteBadges, setEditWebsiteBadges] = useState("");
  const [editWebsiteIsNew, setEditWebsiteIsNew] = useState(false);
  const [editWebsiteIsFeatured, setEditWebsiteIsFeatured] = useState(false);
  const [editWebsiteTrendingRank, setEditWebsiteTrendingRank] = useState("");

  const [bulkJson, setBulkJson] = useState("");

  const categoryMap = useMemo(() => {
    return new Map(data.categories.map((category) => [category.id, category]));
  }, [data.categories]);

  const applySelectedWebsiteToForm = useCallback(
    (websiteId: string, websites: Website[]) => {
      const selected = websites.find((website) => website.id === websiteId);
      if (!selected) return;
      setEditWebsiteId(selected.id);
      setEditWebsiteTags((selected.tags ?? []).join(", "));
      setEditWebsiteBadges((selected.badges ?? []).join(", "));
      setEditWebsiteIsNew(selected.is_new);
      setEditWebsiteIsFeatured(selected.is_featured);
      setEditWebsiteTrendingRank(selected.global_trending_rank?.toString() ?? "");
    },
    [],
  );

  const fetchDirectory = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      setError("");
      const response = await fetch("/api/admin/directory", { cache: "no-store" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setError(payload.error ?? "Failed to load admin directory.");
        setLoading(false);
        return;
      }
      const payload = (await response.json()) as DirectoryResponse;
      setData(payload);
      if (!subcategoryCategoryId && payload.categories[0]) {
        setSubcategoryCategoryId(payload.categories[0].id);
      }
      if (!websiteSubcategoryId && payload.subcategories[0]) {
        setWebsiteSubcategoryId(payload.subcategories[0].id);
      }
      if (!editWebsiteId && payload.websites[0]) {
        applySelectedWebsiteToForm(payload.websites[0].id, payload.websites);
      }
      setLoading(false);
    },
    [applySelectedWebsiteToForm, editWebsiteId, subcategoryCategoryId, websiteSubcategoryId],
  );

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void fetchDirectory();
    }, 0);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [fetchDirectory]);

  async function callAdminApi(method: "POST" | "DELETE", body: unknown) {
    setError("");
    setMessage("");
    const response = await fetch("/api/admin/directory", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string; inserted?: number };
    if (!response.ok) {
      setError(payload.error ?? "Request failed.");
      return false;
    }
    setMessage(payload.inserted ? `Success. Inserted ${payload.inserted} websites.` : "Success.");
    await fetchDirectory(false);
    return true;
  }

  async function handleCreateCategory(event: React.FormEvent) {
    event.preventDefault();
    const ok = await callAdminApi("POST", {
      action: "create_category",
      title: categoryTitle,
      description: categoryDescription,
    });
    if (ok) {
      setCategoryTitle("");
      setCategoryDescription("");
    }
  }

  async function handleCreateSubcategory(event: React.FormEvent) {
    event.preventDefault();
    const ok = await callAdminApi("POST", {
      action: "create_subcategory",
      category_id: subcategoryCategoryId,
      title: subcategoryTitle,
    });
    if (ok) {
      setSubcategoryTitle("");
    }
  }

  async function handleCreateWebsite(event: React.FormEvent) {
    event.preventDefault();
    const rank = websiteTrendingRank.trim() ? Number(websiteTrendingRank) : null;
    const ok = await callAdminApi("POST", {
      action: "create_website",
      subcategory_id: websiteSubcategoryId,
      name: websiteName,
      url: websiteUrl,
      short_description: websiteDescription,
      is_featured: websiteIsFeatured,
      tags: parseCommaList(websiteTags),
      badges: parseCommaList(websiteBadges),
      is_new: websiteIsNew,
      global_trending_rank: Number.isFinite(rank) ? rank : null,
    });
    if (ok) {
      setWebsiteName("");
      setWebsiteUrl("");
      setWebsiteDescription("");
      setWebsiteTags("");
      setWebsiteBadges("");
      setWebsiteIsNew(false);
      setWebsiteIsFeatured(false);
      setWebsiteTrendingRank("");
    }
  }

  async function handleUpdateWebsite(event: React.FormEvent) {
    event.preventDefault();
    if (!editWebsiteId) {
      setError("Select website first.");
      return;
    }
    const rank = editWebsiteTrendingRank.trim() ? Number(editWebsiteTrendingRank) : null;
    await callAdminApi("POST", {
      action: "update_website",
      id: editWebsiteId,
      tags: parseCommaList(editWebsiteTags),
      badges: parseCommaList(editWebsiteBadges),
      is_new: editWebsiteIsNew,
      is_featured: editWebsiteIsFeatured,
      global_trending_rank: Number.isFinite(rank) ? rank : null,
    });
  }

  async function handleBulkUpload(event: React.FormEvent) {
    event.preventDefault();
    try {
      const rows = JSON.parse(bulkJson) as unknown;
      if (!Array.isArray(rows)) {
        setError("Bulk JSON must be an array.");
        return;
      }
      const ok = await callAdminApi("POST", {
        action: "bulk_insert_websites",
        rows,
      });
      if (ok) setBulkJson("");
    } catch {
      setError("Invalid JSON format.");
    }
  }

  async function deleteItem(action: "delete_category" | "delete_subcategory" | "delete_website", id: string) {
    await callAdminApi("DELETE", { action, id });
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Categories: <span className="font-semibold">{data.categories.length}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Subcategories: <span className="font-semibold">{data.subcategories.length}</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Websites: <span className="font-semibold">{data.websites.length}</span>
        </div>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading directory...</p> : null}
      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={handleCreateCategory} className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Add Category</h2>
          <input
            value={categoryTitle}
            onChange={(event) => setCategoryTitle(event.target.value)}
            placeholder="Category title"
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            value={categoryDescription}
            onChange={(event) => setCategoryDescription(event.target.value)}
            placeholder="Category description"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            rows={3}
          />
          <button type="submit" className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
            Create Category
          </button>
        </form>

        <form onSubmit={handleCreateSubcategory} className="rounded-xl border border-slate-200 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Add Subcategory</h2>
          <select
            value={subcategoryCategoryId}
            onChange={(event) => setSubcategoryCategoryId(event.target.value)}
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Select category</option>
            {data.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <input
            value={subcategoryTitle}
            onChange={(event) => setSubcategoryTitle(event.target.value)}
            placeholder="Subcategory title"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button type="submit" className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
            Create Subcategory
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-900">Add Website</h2>
        <form onSubmit={handleCreateWebsite} className="mt-3 grid gap-2 md:grid-cols-2">
          <select
            value={websiteSubcategoryId}
            onChange={(event) => setWebsiteSubcategoryId(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Select subcategory</option>
            {data.subcategories.map((subcategory) => {
              const category = categoryMap.get(subcategory.category_id);
              return (
                <option key={subcategory.id} value={subcategory.id}>
                  {category?.title ?? "Category"} / {subcategory.title}
                </option>
              );
            })}
          </select>
          <input
            value={websiteName}
            onChange={(event) => setWebsiteName(event.target.value)}
            placeholder="Website name"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="https://example.com"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={websiteDescription}
            onChange={(event) => setWebsiteDescription(event.target.value)}
            placeholder="Short description"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={websiteTags}
            onChange={(event) => setWebsiteTags(event.target.value)}
            placeholder="tags: ai, coding"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={websiteBadges}
            onChange={(event) => setWebsiteBadges(event.target.value)}
            placeholder="badges: trending, new"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={websiteTrendingRank}
            onChange={(event) => setWebsiteTrendingRank(event.target.value)}
            placeholder="global trending rank (optional)"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="number"
            min={1}
          />
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <input type="checkbox" checked={websiteIsFeatured} onChange={(event) => setWebsiteIsFeatured(event.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <input type="checkbox" checked={websiteIsNew} onChange={(event) => setWebsiteIsNew(event.target.checked)} />
            New
          </label>
          <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white md:col-span-2">
            Create Website
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-900">Update Website Labels</h2>
        <form onSubmit={handleUpdateWebsite} className="mt-3 grid gap-2 md:grid-cols-2">
          <select
            value={editWebsiteId}
            onChange={(event) => applySelectedWebsiteToForm(event.target.value, data.websites)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          >
            <option value="">Select website</option>
            {data.websites.map((website) => (
              <option key={website.id} value={website.id}>
                {website.name}
              </option>
            ))}
          </select>
          <input
            value={editWebsiteTags}
            onChange={(event) => setEditWebsiteTags(event.target.value)}
            placeholder="tags: ai, productivity"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={editWebsiteBadges}
            onChange={(event) => setEditWebsiteBadges(event.target.value)}
            placeholder="badges: trending, editor-choice"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            value={editWebsiteTrendingRank}
            onChange={(event) => setEditWebsiteTrendingRank(event.target.value)}
            placeholder="global trending rank"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="number"
            min={1}
          />
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
            <input type="checkbox" checked={editWebsiteIsFeatured} onChange={(event) => setEditWebsiteIsFeatured(event.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 md:col-span-2">
            <input type="checkbox" checked={editWebsiteIsNew} onChange={(event) => setEditWebsiteIsNew(event.target.checked)} />
            New
          </label>
          <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white md:col-span-2">
            Update Website
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-900">Bulk Upload Websites (JSON Array)</h2>
        <p className="mt-1 text-xs text-slate-500">
          Fields: subcategory_id, name, url, short_description, is_featured, tags[], badges[], is_new, global_trending_rank, sort_order
        </p>
        <form onSubmit={handleBulkUpload}>
          <textarea
            value={bulkJson}
            onChange={(event) => setBulkJson(event.target.value)}
            placeholder='[{"subcategory_id":"...","name":"Example","url":"https://example.com","tags":["ai"],"badges":["new"]}]'
            className="mt-3 h-36 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
          />
          <button type="submit" className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
            Bulk Insert
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-900">Manage Data</h2>
        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-semibold text-slate-600">Categories</p>
            <div className="space-y-2">
              {data.categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                  <span className="truncate pr-2">{category.title}</span>
                  <button type="button" onClick={() => deleteItem("delete_category", category.id)} className="text-red-600">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-slate-600">Subcategories</p>
            <div className="space-y-2">
              {data.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                  <span className="truncate pr-2">{subcategory.title}</span>
                  <button type="button" onClick={() => deleteItem("delete_subcategory", subcategory.id)} className="text-red-600">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-slate-600">Websites</p>
            <div className="max-h-72 space-y-2 overflow-y-auto">
              {data.websites.map((website) => (
                <div key={website.id} className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-2 font-semibold">{website.name}</span>
                    <button type="button" onClick={() => deleteItem("delete_website", website.id)} className="text-red-600">
                      Delete
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">tags: {(website.tags ?? []).join(", ") || "-"}</p>
                  <p className="text-[11px] text-slate-500">badges: {(website.badges ?? []).join(", ") || "-"}</p>
                  <p className="text-[11px] text-slate-500">
                    new: {website.is_new ? "yes" : "no"} | trending: {website.global_trending_rank ?? "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
