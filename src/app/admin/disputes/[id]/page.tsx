import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { DisputeActions } from "./dispute-actions";
import { ArrowLeft, Paperclip, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Dispute detail — Admin | CouthActs",
  robots: { index: false, follow: false },
};

function hoursSince(d: Date): number {
  return Math.round((Date.now() - d.getTime()) / 36e5);
}

export default async function AdminDisputeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();

  const dispute = await db.dispute.findUnique({
    where: { id: params.id },
    include: {
      booking: {
        include: {
          posting: {
            select: {
              title: true, mode: true, originAddress: true, destinationAddress: true,
              pickupDate: true, deliveryDate: true, budgetUsd: true,
            },
          },
          escrow: true,
          tracking: { orderBy: { recordedAt: "desc" }, take: 20 },
          messages: { orderBy: { createdAt: "asc" }, take: 50, include: { sender: { select: { firstName: true, lastName: true, role: true } } } },
        },
      },
      customer: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, trustScore: true } },
      provider: { select: { id: true, businessName: true, couthActsScore: true, scoreTier: true, user: { select: { email: true, phone: true } } } },
    },
  });

  if (!dispute) notFound();
  const age = hoursSince(dispute.createdAt);
  const escrow = dispute.booking?.escrow;
  const total = escrow ? Number(escrow.totalAmountUsd) : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <Link
          href="/admin/disputes"
          className="group inline-flex items-center gap-1.5 text-sm text-[#007AFF] hover:text-[#0055D4] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back to disputes
        </Link>

        <header className="mt-6 rounded-3xl bg-white border border-[#E8E8ED]/60 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF3B30]">
                Dispute · {dispute.status.replace(/_/g, " ").toLowerCase()}
              </p>
              <h1 className="mt-2 text-2xl font-display font-bold text-[#1D1D1F] sm:text-3xl">
                {dispute.reason}
              </h1>
              <p className="mt-1 text-[12px] text-[#86868B]">
                Filed {age}h ago · booking{" "}
                <Link href={`/bookings/${dispute.bookingId}`} className="underline hover:text-[#007AFF]">
                  {dispute.bookingId.slice(0, 10)}…
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {age > 24 && (dispute.status === "OPEN" || dispute.status === "UNDER_REVIEW") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FF3B30]/10 px-3 py-1 text-[11px] font-semibold text-[#FF3B30]">
                  <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                  SLA breach
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F5F7] px-3 py-1 text-[11px] font-semibold text-[#1D1D1F]/70">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {age}h
              </span>
            </div>
          </div>

          <p className="mt-6 text-[14px] text-[#1D1D1F] leading-relaxed whitespace-pre-wrap">
            {dispute.description}
          </p>

          {dispute.evidenceUrls.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] mb-2">
                Evidence
              </p>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {dispute.evidenceUrls.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block aspect-square relative overflow-hidden rounded-xl bg-[#FAFAFA] border border-[#E8E8ED]/60 hover:border-[#007AFF] transition-colors"
                    >
                      {/\.(jpe?g|png|gif|webp|avif)$/i.test(url) ? (
                        <Image src={url} alt="Evidence" fill className="object-cover" sizes="200px" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Paperclip className="h-5 w-5 text-[#86868B]" aria-hidden="true" />
                        </div>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Parties */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white border border-[#E8E8ED]/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              Customer
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#1D1D1F]">
              {dispute.customer.firstName} {dispute.customer.lastName}
            </p>
            <p className="mt-0.5 text-[12px] text-[#6E6E73]">{dispute.customer.email}</p>
            {dispute.customer.phone && (
              <p className="text-[12px] text-[#6E6E73]">{dispute.customer.phone}</p>
            )}
            <p className="mt-2 text-[11px] text-[#86868B]">
              Trust score: <span className="font-semibold text-[#1D1D1F]">{dispute.customer.trustScore}</span>
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#E8E8ED]/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              Provider
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#1D1D1F]">
              {dispute.provider.businessName}
            </p>
            <p className="mt-0.5 text-[12px] text-[#6E6E73]">{dispute.provider.user.email}</p>
            {dispute.provider.user.phone && (
              <p className="text-[12px] text-[#6E6E73]">{dispute.provider.user.phone}</p>
            )}
            <p className="mt-2 text-[11px] text-[#86868B]">
              CouthActs Score:{" "}
              <span className="font-semibold text-[#1D1D1F]">
                {dispute.provider.couthActsScore} ({dispute.provider.scoreTier.toLowerCase()})
              </span>
            </p>
          </div>
        </div>

        {/* Booking summary */}
        {dispute.booking && (
          <div className="mt-6 rounded-2xl bg-white border border-[#E8E8ED]/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              Booking & escrow
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">
                  {dispute.booking.posting.title}
                </p>
                <p className="mt-1 text-[12px] text-[#6E6E73]">
                  {dispute.booking.posting.mode.replace(/_/g, " ")}
                </p>
                <p className="mt-2 text-[12px] text-[#6E6E73]">
                  {dispute.booking.posting.originAddress} → {dispute.booking.posting.destinationAddress}
                </p>
                <p className="mt-1 text-[11px] text-[#86868B]">
                  Pickup: {new Date(dispute.booking.posting.pickupDate).toLocaleDateString()}
                </p>
              </div>
              {escrow && (
                <div className="rounded-xl bg-[#FAFAFA] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                    Escrow
                  </p>
                  <p className="mt-2 text-2xl font-display font-black tabular-nums text-[#1D1D1F]">
                    ${total.toFixed(2)}
                  </p>
                  <p className="mt-1 text-[11px] text-[#86868B]">
                    Status: <span className="font-semibold text-[#1D1D1F]">{escrow.status}</span>
                  </p>
                  <p className="text-[11px] text-[#86868B]">
                    Fee: ${Number(escrow.escrowFeeUsd).toFixed(2)} · Provider share: ${Number(escrow.providerPayoutUsd).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions (client) */}
        <DisputeActions
          disputeId={dispute.id}
          escrowTotal={total}
          disputeStatus={dispute.status}
          adminNotes={dispute.adminNotes ?? ""}
        />

        {/* Tracking timeline */}
        {dispute.booking?.tracking && dispute.booking.tracking.length > 0 && (
          <div className="mt-6 rounded-2xl bg-white border border-[#E8E8ED]/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              Tracking events (most recent)
            </p>
            <ol className="mt-4 space-y-2">
              {dispute.booking.tracking.map((t) => (
                <li key={t.id} className="flex items-start gap-3 text-[12px]">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#007AFF]" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1D1D1F]">
                      <span className="font-semibold">{t.layer.replace(/_/g, " ")}</span>
                      {t.status && <> · {t.status}</>}
                      {t.note && <> · {t.note}</>}
                    </p>
                    <p className="text-[11px] text-[#86868B]">
                      {new Date(t.recordedAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Messages */}
        {dispute.booking?.messages && dispute.booking.messages.length > 0 && (
          <div className="mt-6 rounded-2xl bg-white border border-[#E8E8ED]/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              Message history
            </p>
            <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {dispute.booking.messages.map((m) => (
                <div key={m.id} className="rounded-xl bg-[#FAFAFA] p-3">
                  <p className="text-[11px] text-[#86868B]">
                    <span className="font-semibold text-[#1D1D1F]">
                      {m.sender.firstName} {m.sender.lastName}
                    </span>{" "}
                    · {m.sender.role.toLowerCase()} · {new Date(m.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-1 text-[13px] text-[#1D1D1F] whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
