"use client";

import { useEffect, useRef, useState } from "react";

const MENU_ITEMS = [
  { label: "Profile", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Logout", href: "#" },
];

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      firstItemRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="cursor-pointer rounded-full border border-white/50 bg-white/30 p-2 text-white transition hover:bg-white/45"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open user menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        </svg>
      </button>

      {isOpen ? (
        <ul
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/30 bg-white/85 text-sm text-slate-800 shadow-xl backdrop-blur-xl"
          role="menu"
          aria-label="User actions"
        >
          {MENU_ITEMS.map((item, index) => (
            <li key={item.label}>
              <a
                ref={index === 0 ? firstItemRef : undefined}
                href={item.href}
                role="menuitem"
                className="block px-4 py-2 outline-none hover:bg-slate-100/80 focus:bg-slate-100/80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
