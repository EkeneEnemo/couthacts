import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { resolveDisputeSplit } from "@/lib/escrow";

export const runtime = "nodejs";

/**
 * Admin-only dispute resolution endpoint.
 *
 * POST /api/admin/disputes/[id]
 *   body: { action: "RESOLVE_CUSTOMER", adminNotes? }
 *   body: { action: "RESOLVE_PROVIDER", adminNotes? }
 *   body: { action: "PARTIAL_SPLIT", customerRefundUsd: number, adminNotes? }
 *   body: { action: "ESCALATE", adminNotes? }
 *   body: { action: "REOPEN", adminNotes? }
 */
async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const action = body?.action as string | undefined;
  const adminNotes = body?.adminNotes as string | undefined;

  const dispute = await db.dispute.findUnique({
    where: { id: params.id },
    include: {
      booking: {
        include: { escrow: true, posting: { select: { title: true, mode: true } } },
      },
    },
  });
  if (!dispute) return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
  if (!dispute.booking?.escrow) {
    return NextResponse.json({ error: "No escrow on this booking" }, { status: 400 });
  }

  const total = Number(dispute.booking.escrow.totalAmountUsd);
  const escrowId = dispute.booking.escrow.id;

  try {
    let resolution: string | null = null;
    let newDisputeStatus: "RESOLVED_CUSTOMER" | "RESOLVED_PROVIDER" | "ESCALATED" | "UNDER_REVIEW" | "OPEN" | null = null;

    switch (action) {
      case "RESOLVE_CUSTOMER": {
        const r = await resolveDisputeSplit(escrowId, total);
        resolution = `Full refund ($${r.customerRefundUsd.toFixed(2)}) issued to customer.`;
        newDisputeStatus = "RESOLVED_CUSTOMER";
        await db.booking.update({
          where: { id: dispute.bookingId },
          data: { status: "CANCELLED", refundAmountUsd: r.customerRefundUsd },
        });
        break;
      }
      case "RESOLVE_PROVIDER": {
        const r = await resolveDisputeSplit(escrowId, 0);
        resolution = `Full release ($${r.providerPayoutUsd.toFixed(2)}) issued to provider.`;
        newDisputeStatus = "RESOLVED_PROVIDER";
        await db.booking.update({
          where: { id: dispute.bookingId },
          data: { status: "COMPLETED", completedAt: new Date() },
        });
        break;
      }
      case "PARTIAL_SPLIT": {
        const customerRefundUsd = Number(body?.customerRefundUsd);
        if (!Number.isFinite(customerRefundUsd) || customerRefundUsd < 0 || customerRefundUsd > total) {
          return NextResponse.json({ error: "customerRefundUsd out of range" }, { status: 400 });
        }
        const r = await resolveDisputeSplit(escrowId, customerRefundUsd);
        resolution = `Split: $${r.customerRefundUsd.toFixed(2)} to customer, $${r.providerPayoutUsd.toFixed(2)} to provider.`;
        newDisputeStatus = r.customerRefundUsd >= total ? "RESOLVED_CUSTOMER" : "RESOLVED_PROVIDER";
        await db.booking.update({
          where: { id: dispute.bookingId },
          data: {
            status: r.customerRefundUsd >= total ? "CANCELLED" : "COMPLETED",
            refundAmountUsd: r.customerRefundUsd > 0 ? r.customerRefundUsd : null,
            completedAt: r.providerPayoutUsd > 0 ? new Date() : null,
          },
        });
        break;
      }
      case "ESCALATE": {
        newDisputeStatus = "ESCALATED";
        resolution = null;
        break;
      }
      case "REOPEN": {
        newDisputeStatus = "UNDER_REVIEW";
        resolution = null;
        break;
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    await db.dispute.update({
      where: { id: dispute.id },
      data: {
        status: newDisputeStatus,
        resolution,
        resolvedBy: newDisputeStatus?.startsWith("RESOLVED") ? session.user.id : null,
        resolvedAt: newDisputeStatus?.startsWith("RESOLVED") ? new Date() : null,
        adminNotes: adminNotes ?? dispute.adminNotes,
      },
    });

    return NextResponse.json({ ok: true, resolution, status: newDisputeStatus });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to resolve dispute";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
