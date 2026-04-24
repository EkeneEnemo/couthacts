import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dispute console — Admin | CouthActs",
  robots: { index: false, follow: false },
};

const STATUS_COLOR: Record<string, string> = {
  OPEN: "#FF7A59",
  UNDER_REVIEW: "#FFB020",
  ESCALATED: "#FF3B30",
  RESOLVED_CUSTOMER: "#34C759",
  RESOLVED_PROVIDER: "#007AFF",
};

const SLA_HOURS = 24;

function hoursSince(d: Date): number {
  return Math.round((Date.now() - d.getTime()) / 36e5);
}

export default async function AdminDisputesPage() {
  await requireAdmin();

  const disputes = await db.dispute.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 100,
    include: {
      booking: {
        include: {
          posting: { select: { title: true, mode: true } },
          escrow: { select: { totalAmountUsd: true, status: true } },
        },
      },
      customer: { select: { firstName: true, lastName: true, email: true } },
      provider: { select: { businessName: true } },
    },
  });

  const openCount = disputes.filter((d) => d.status === "OPEN" || d.status === "UNDER_REVIEW").length;
  const escalatedCount = disputes.filter((d) => d.status === "ESCALATED").length;
  const slaBreaches = disputes.filter(
    (d) =>
      (d.status === "OPEN" || d.status === "UNDER_REVIEW") &&
      hoursSince(d.createdAt) > SLA_HOURS,
  ).length;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF3B30]">
            Admin console
          </p>
          <h1 className="mt-2 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
            Dispute resolution
          </h1>
          <p className="mt-2 text-[13px] text-[#6E6E73]">
            Target resolution SLA: {SLA_HOURS} hours. Full evidence chain + escrow actions are
            logged on every decision.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          <div className="rounded-2xl bg-white p-5 border border-[#E8E8ED]/60 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7A59]">
              Open / In review
            </p>
            <p className="mt-2 text-3xl font-display font-black tabular-nums text-[#1D1D1F]">
              {openCount}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-[#E8E8ED]/60 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF3B30]">
              Escalated
            </p>
            <p className="mt-2 text-3xl font-display font-black tabular-nums text-[#1D1D1F]">
              {escalatedCount}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-[#E8E8ED]/60 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FFB020]">
              SLA breaches
            </p>
            <p className="mt-2 text-3xl font-display font-black tabular-nums text-[#1D1D1F]">
              {slaBreaches}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-[#E8E8ED]/60 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Parties</th>
                <th className="px-4 py-3 text-left">Booking</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-right">Age</th>
                <th className="px-4 py-3 text-right">&nbsp;</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F7]">
              {disputes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[13px] text-[#86868B]">
                    No disputes on file. All quiet.
                  </td>
                </tr>
              )}
              {disputes.map((d) => {
                const age = hoursSince(d.createdAt);
                const breach = (d.status === "OPEN" || d.status === "UNDER_REVIEW") && age > SLA_HOURS;
                const color = STATUS_COLOR[d.status] ?? "#86868B";
                return (
                  <tr key={d.id} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ backgroundColor: `${color}18`, color }}
                      >
                        {d.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#1D1D1F] max-w-xs truncate">
                      {d.reason}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#6E6E73]">
                      <div className="flex flex-col">
                        <span>{d.customer.firstName} {d.customer.lastName}</span>
                        <span className="text-[#86868B]">vs {d.provider.businessName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[#6E6E73] max-w-xs truncate">
                      {d.booking?.posting.title ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-[13px] font-semibold text-[#1D1D1F] tabular-nums">
                      {d.booking?.escrow ? `$${Number(d.booking.escrow.totalAmountUsd).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-[12px]">
                      <span className={breach ? "inline-flex items-center gap-1 text-[#FF3B30] font-semibold" : "text-[#86868B]"}>
                        {breach ? <AlertTriangle className="h-3 w-3" aria-hidden="true" /> : <Clock className="h-3 w-3" aria-hidden="true" />}
                        {age}h
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/disputes/${d.id}`}
                        className="inline-flex items-center gap-1 rounded-full bg-[#1D1D1F] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#007AFF] transition-colors"
                      >
                        Review <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
