"use client";

import { useState } from "react";
import { Download, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

export function DataControls() {
  const [exportBusy, setExportBusy] = useState(false);
  const [exportedAt, setExportedAt] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleExport() {
    setExportBusy(true);
    try {
      const res = await fetch("/api/me/data", { cache: "no-store" });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const filename =
        res.headers
          .get("content-disposition")
          ?.match(/filename="([^"]+)"/)?.[1] ?? "couthacts-data-export.json";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setExportedAt(new Date().toLocaleString());
    } catch {
      alert("Couldn't generate your export. Please try again or email privacy@couthacts.com.");
    } finally {
      setExportBusy(false);
    }
  }

  async function handleDelete() {
    setDeleteError(null);
    setDeleteBusy(true);
    try {
      const res = await fetch("/api/me/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      const body = await res.json();
      if (!res.ok) {
        if (res.status === 409 && body?.details) {
          setDeleteError(
            `You have ${body.details.activeBookings ?? 0} active booking(s), ${body.details.escrowInFlight ?? 0} escrow hold(s), and ${body.details.openDisputes ?? 0} open dispute(s). Resolve these before deleting.`,
          );
        } else {
          setDeleteError(body?.error ?? "Unable to delete account.");
        }
        return;
      }
      window.location.href = "/?deleted=1";
    } catch {
      setDeleteError("Network error. Please try again.");
    } finally {
      setDeleteBusy(false);
    }
  }

  const canDelete = deleteConfirm.trim().toUpperCase() === "DELETE MY ACCOUNT";

  return (
    <div className="mt-10 space-y-6">
      {/* Export card */}
      <section className="rounded-[1.5rem] bg-white border border-[#1D1D1F]/8 p-6 sm:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#007AFF]/10 text-[#007AFF]">
            <Download className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 className="text-[17px] font-display font-bold text-[#1D1D1F]">
              Download my data
            </h2>
            <p className="mt-1 text-[13px] text-[#1D1D1F]/60 leading-relaxed">
              A complete JSON export of your account: profile, bookings, postings, wallet
              transactions, messages, reviews, disputes, and more. Typically &lt; 2&nbsp;MB.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExport}
                disabled={exportBusy}
                className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#007AFF] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {exportBusy ? "Preparing your export…" : "Download JSON"}
              </button>
              {exportedAt && (
                <span className="inline-flex items-center gap-1.5 text-[12px] text-[#34C759]">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Exported {exportedAt}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delete card */}
      <section className="rounded-[1.5rem] bg-white border border-[#FF3B30]/25 p-6 sm:p-7 shadow-[0_4px_30px_rgba(255,59,48,0.08)]">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FF3B30]/10 text-[#FF3B30]">
            <Trash2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 className="text-[17px] font-display font-bold text-[#1D1D1F]">
              Delete my account
            </h2>
            <p className="mt-1 text-[13px] text-[#1D1D1F]/60 leading-relaxed">
              Permanently deletes your profile and anonymizes related records. This cannot be
              undone. Financial records retained for compliance are stripped of personal
              information.
            </p>

            <div className="mt-5">
              <label
                htmlFor="deleteConfirm"
                className="block text-[12px] font-semibold text-[#1D1D1F]/70 mb-2"
              >
                Type <span className="font-mono text-[#FF3B30]">DELETE MY ACCOUNT</span> to confirm
              </label>
              <input
                id="deleteConfirm"
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="DELETE MY ACCOUNT"
                autoComplete="off"
                className="w-full rounded-xl border border-[#1D1D1F]/15 bg-white px-4 py-2.5 text-[14px] font-mono text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/20 transition-colors"
              />
            </div>

            {deleteError && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FF3B30]/8 border border-[#FF3B30]/20 p-3">
                <AlertTriangle className="h-4 w-4 text-[#FF3B30] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[12px] text-[#1D1D1F]/80 leading-relaxed">{deleteError}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleDelete}
              disabled={!canDelete || deleteBusy}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF3B30] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#D70015] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              {deleteBusy ? "Deleting…" : "Permanently delete my account"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
