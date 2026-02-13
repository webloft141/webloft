"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [label, setLabel] = useState("Copy Link");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setLabel("Copied");
      window.setTimeout(() => setLabel("Copy Link"), 1200);
    } catch {
      setLabel("Copy failed");
      window.setTimeout(() => setLabel("Copy Link"), 1200);
    }
  }

  return (
    <button
      type="button"
      className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700"
      onClick={handleCopy}
    >
      {label}
    </button>
  );
}

