"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, CheckCircle2, AlertTriangle } from "lucide-react";

export function DisputeActions({
  disputeId,
  escrowTotal,
  disputeStatus,
  adminNotes: initialNotes,
}: {
  disputeId: string;
  escrowTotal: number;
  disputeStatus: string;
  adminNotes: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [customerRefund, setCustomerRefund] = useState<string>(String(Math.round(escrowTotal / 2)));
  const [notes, setNotes] = useState(initialNotes);
  const resolved = disputeStatus.startsWith("RESOLVED");

  async function run(action: string, extra: Record<string, unknown> = {}) {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/disputes/${disputeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, adminNotes: notes, ...extra }),
      });
      const d = await res.json();
      if (!res.ok) {
        setErr(d?.error ?? "Failed to apply action.");
        return;
      }
      router.refresh();
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }

  if (resolved) {
    return (
      <div className="mt-6 rounded-2xl bg-[#EEFBF1] border border-[#34C759]/30 p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#34C759]" aria-hidden="true" />
          <p className="text-[13px] font-semibold text-[#1B8D36]">
            Resolved · {disputeStatus.replace(/_/g, " ").toLowerCase()}
          </p>
        </div>
      </div>
    );
  }

  const refundNum = Number(customerRefund);
  const refundOk = Number.isFinite(refundNum) && refundNum >= 0 && refundNum <= escrowTotal;

  return (
    <div className="mt-6 rounded-2xl bg-white border border-[#E8E8ED]/60 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Scale className="h-4 w-4 text-[#1D1D1F]/70" aria-hidden="true" />
        <h2 className="text-[15px] font-display font-bold text-[#1D1D1F]">
          Resolution actions
        </h2>
      </div>

      {err && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-[#FF3B30]/8 border border-[#FF3B30]/20 p-3">
          <AlertTriangle className="h-4 w-4 text-[#FF3B30] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[12px] text-[#1D1D1F]/80">{err}</p>
        </div>
      )}

      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
          Admin notes (internal)
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Rationale, evidence reviewed, contact log…"
          className="mt-1 w-full rounded-xl border border-[#1D1D1F]/15 bg-white px-3 py-2 text-[13px] text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-colors"
        />
      </label>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => run("RESOLVE_CUSTOMER")}
          disabled={busy}
          className="rounded-xl bg-[#FFFBF5] border border-[#FF7A59]/25 p-4 text-left hover:bg-[#FF7A59]/5 hover:border-[#FF7A59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <p className="text-[13px] font-semibold text-[#FF7A59]">Full refund to customer</p>
          <p className="mt-1 text-[12px] text-[#6E6E73]">
            Refund ${escrowTotal.toFixed(2)} · booking → CANCELLED
          </p>
        </button>
        <button
          type="button"
          onClick={() => run("RESOLVE_PROVIDER")}
          disabled={busy}
          className="rounded-xl bg-[#FFFBF5] border border-[#34C759]/25 p-4 text-left hover:bg-[#34C759]/5 hover:border-[#34C759] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <p className="text-[13px] font-semibold text-[#34C759]">Release to provider</p>
          <p className="mt-1 text-[12px] text-[#6E6E73]">
            Pay out (minus fee) · booking → COMPLETED
          </p>
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-[#FFFBF5] border border-[#007AFF]/20 p-4">
        <p className="text-[13px] font-semibold text-[#007AFF]">Partial split</p>
        <label className="mt-2 block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
            Refund to customer (USD)
          </span>
          <input
            type="number"
            min={0}
            max={escrowTotal}
            step="0.01"
            value={customerRefund}
            onChange={(e) => setCustomerRefund(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#1D1D1F]/15 bg-white px-3 py-2 text-[13px] tabular-nums focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-colors"
          />
        </label>
        <p className="mt-2 text-[11px] text-[#6E6E73]">
          Provider receives ${(escrowTotal - (Number.isFinite(refundNum) ? refundNum : 0)).toFixed(2)}{" "}
          minus proportional escrow fee.
        </p>
        <button
          type="button"
          disabled={busy || !refundOk}
          onClick={() => run("PARTIAL_SPLIT", { customerRefundUsd: refundNum })}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#007AFF] px-5 py-2 text-[12px] font-semibold text-white hover:bg-[#0055D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply split
        </button>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => run("ESCALATE")}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#FF3B30]/30 text-[#FF3B30] px-4 py-2 text-[12px] font-semibold hover:bg-[#FF3B30]/5 transition-colors disabled:opacity-50"
        >
          Escalate for legal review
        </button>
        <button
          type="button"
          onClick={() => run("REOPEN")}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#1D1D1F]/15 text-[#1D1D1F]/70 px-4 py-2 text-[12px] font-semibold hover:bg-[#F5F5F7] transition-colors disabled:opacity-50"
        >
          Mark under review
        </button>
      </div>
    </div>
  );
}
