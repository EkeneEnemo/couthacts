"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Share2, Mail } from "lucide-react";

type RecentRedemption = {
  status: "PENDING" | "QUALIFIED" | "REVOKED";
  firstName: string;
  qualifiedAt: string | null;
  createdAt: string;
  reward: number;
};

export function InvitePanel({
  code,
  shareUrl,
  redeemCount,
}: {
  code: string;
  shareUrl: string;
  redeemCount: number;
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [recent, setRecent] = useState<RecentRedemption[]>([]);

  useEffect(() => {
    fetch("/api/referrals", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setRecent(d.recent ?? []))
      .catch(() => {});
  }, []);

  async function copy(text: string, which: "code" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      if (which === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 1800);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 1800);
      }
    } catch {
      /* ignore */
    }
  }

  async function shareNative() {
    const data = {
      title: "Try CouthActs — the friendliest way to move anything",
      text: `Use my code ${code} for $25 off your first move on CouthActs.`,
      url: shareUrl,
    };
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(data);
      } catch {
        /* user cancelled */
      }
    } else {
      await copy(shareUrl, "link");
    }
  }

  return (
    <div className="mt-12 rounded-[2rem] bg-white border border-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8 text-left">
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
            Your invite code
          </p>
          <p className="mt-2 font-display font-black text-[#1D1D1F] text-4xl sm:text-5xl tracking-[0.05em] tabular-nums">
            {code}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => copy(code, "code")}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#007AFF] transition-colors"
            aria-label="Copy invite code"
          >
            {copiedCode ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copiedCode ? "Copied" : "Copy code"}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#FFFBF5] border border-[#1D1D1F]/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1D1D1F]/50">
          Share link
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <code className="flex-1 min-w-0 truncate text-[13px] text-[#1D1D1F] font-mono">
            {shareUrl}
          </code>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => copy(shareUrl, "link")}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#1D1D1F]/15 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-colors"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copiedLink ? "Copied" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={shareNative}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#007AFF] text-white px-4 py-2 text-[12px] font-semibold hover:bg-[#0055D4] transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              Share
            </button>
            <a
              href={`mailto:?subject=${encodeURIComponent("Try CouthActs — $25 off your first move")}&body=${encodeURIComponent(
                `I've been using CouthActs to book moves, couriers, even a private jet once. Try it — my code ${code} gets you $25 off your first booking:\n\n${shareUrl}`,
              )}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#1D1D1F]/15 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#FFFBF5] border border-[#1D1D1F]/5 p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
            Qualified
          </dt>
          <dd className="mt-1 text-2xl font-display font-black text-[#34C759] tabular-nums">
            {redeemCount}
          </dd>
        </div>
        <div className="rounded-2xl bg-[#FFFBF5] border border-[#1D1D1F]/5 p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
            Pending
          </dt>
          <dd className="mt-1 text-2xl font-display font-black text-[#FFB020] tabular-nums">
            {recent.filter((r) => r.status === "PENDING").length}
          </dd>
        </div>
        <div className="rounded-2xl bg-[#FFFBF5] border border-[#1D1D1F]/5 p-4 col-span-2 sm:col-span-1">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
            Earned
          </dt>
          <dd className="mt-1 text-2xl font-display font-black text-[#007AFF] tabular-nums">
            ${redeemCount * 25}
          </dd>
        </div>
      </dl>

      {recent.length > 0 && (
        <section className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1D1D1F]/50">
            Recent invites
          </p>
          <ul className="mt-3 divide-y divide-[#1D1D1F]/5 border border-[#1D1D1F]/5 rounded-2xl overflow-hidden">
            {recent.slice(0, 6).map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-4 px-4 py-3 text-[13px]">
                <span className="text-[#1D1D1F]/80">{r.firstName}</span>
                <span className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      r.status === "QUALIFIED"
                        ? "bg-[#34C759]/10 text-[#1B8D36]"
                        : r.status === "PENDING"
                        ? "bg-[#FFB020]/15 text-[#8C5E00]"
                        : "bg-[#1D1D1F]/10 text-[#1D1D1F]/50"
                    }`}
                  >
                    {r.status.toLowerCase()}
                  </span>
                  {r.status === "QUALIFIED" && (
                    <span className="text-[#34C759] font-semibold tabular-nums">
                      +${r.reward.toFixed(0)}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
