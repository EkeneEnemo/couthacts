"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { SUPPORTED_LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/config";

/**
 * Language picker. Writes the selected locale to the `couthacts_locale` cookie
 * via POST /api/i18n/locale, then reloads the page so server components pick
 * up the new locale.
 */
export function LocaleSwitcher({
  currentLocale,
  compact = false,
}: {
  currentLocale: Locale;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function pick(locale: Locale) {
    setOpen(false);
    startTransition(async () => {
      await fetch("/api/i18n/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      // Force server components to re-render with the new locale.
      window.location.reload();
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        disabled={isPending}
        className={
          compact
            ? "flex h-9 w-9 items-center justify-center rounded-full border border-[#1D1D1F]/10 bg-white/80 backdrop-blur text-[#1D1D1F]/70 hover:bg-white hover:text-[#1D1D1F] transition-colors disabled:opacity-50"
            : "inline-flex items-center gap-1.5 rounded-full border border-[#1D1D1F]/10 bg-white/80 backdrop-blur px-3.5 py-1.5 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-white hover:text-[#1D1D1F] transition-colors disabled:opacity-50"
        }
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        {!compact && (
          <>
            <span>{LOCALE_NAMES[currentLocale]}</span>
            <ChevronDown className="h-3 w-3 opacity-60" aria-hidden="true" />
          </>
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-[#1D1D1F]/8 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50"
        >
          {SUPPORTED_LOCALES.map((loc) => {
            const isActive = loc === currentLocale;
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => pick(loc)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-[13px] transition-colors ${
                    isActive
                      ? "bg-[#007AFF]/5 font-semibold text-[#007AFF]"
                      : "text-[#1D1D1F] hover:bg-[#FFFBF5]"
                  }`}
                >
                  <span>{LOCALE_NAMES[loc]}</span>
                  {isActive && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
