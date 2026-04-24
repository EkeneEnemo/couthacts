"use client";

import { useEffect, useState } from "react";

/**
 * Unified money display. Always renders the USD value verbatim (derived from
 * our internal USD-denominated ledger) and optionally appends the viewer's
 * preferred-currency equivalent in muted text.
 *
 * The component is resilient: if the currency fetch fails or the user has
 * preferredCurrency = USD, it renders only the USD amount.
 *
 * Usage:
 *   <Price usd={500} />                          // "$500.00"
 *   <Price usd={500} showLocal />                 // "$500.00 ≈ ₦825,000"
 *   <Price usd={500} showLocal preferred="EUR" />
 */
export function Price({
  usd,
  showLocal = false,
  preferred,
  className,
  fractionDigits = 2,
  localClassName,
}: {
  usd: number;
  showLocal?: boolean;
  /** Override the viewer's preferred currency. Defaults to auto-detection. */
  preferred?: string;
  className?: string;
  fractionDigits?: number;
  localClassName?: string;
}) {
  const [local, setLocal] = useState<string | null>(null);

  useEffect(() => {
    if (!showLocal) return;
    let cancelled = false;
    async function run() {
      // Determine preferred currency. If explicit prop, use it. Else fetch.
      let currency = preferred;
      if (!currency) {
        try {
          const r = await fetch("/api/auth", { cache: "no-store" });
          const d = await r.json();
          currency = d?.user?.preferredCurrency;
        } catch {
          /* ignore */
        }
      }
      if (!currency || currency === "USD") return;

      try {
        const r = await fetch(
          `/api/currency?amount=${usd}&from=USD&to=${encodeURIComponent(currency)}`,
          { cache: "no-store" },
        );
        const d = await r.json();
        if (!cancelled && d?.formatted) setLocal(d.formatted);
      } catch {
        /* ignore */
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [usd, showLocal, preferred]);

  const formatted = usd.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return (
    <span className={className}>
      <span className="tabular-nums">${formatted}</span>
      {local && (
        <span className={localClassName ?? "ml-1.5 text-[#86868B] tabular-nums"}>
          ≈ {local}
        </span>
      )}
    </span>
  );
}
