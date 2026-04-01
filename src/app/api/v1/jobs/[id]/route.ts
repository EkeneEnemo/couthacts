import { db } from "@/lib/db";
import { validateApiKey } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/v1/jobs/:id — Get a single job by ID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const { id } = await params;

  const posting = await db.posting.findUnique({
    where: { id },
    include: {
      bids: {
        select: {
          id: true, amountUsd: true, estimatedDelivery: true, message: true,
          isAccepted: true, isWithdrawn: true, createdAt: true,
          provider: { select: { id: true, businessName: true, couthActsScore: true, scoreTier: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      booking: {
        select: { id: true, status: true, trackingCode: true, agreedAmountUsd: true },
      },
    },
  });

  if (!posting || posting.customerId !== auth.user.id) {
    return NextResponse.json({
      success: false, error: { code: "NOT_FOUND", message: "Job not found" },
    }, { status: 404, headers: auth.headers });
  }

  return NextResponse.json({
    success: true, data: posting,
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}

/**
 * PATCH /api/v1/jobs/:id — Update a job (budget, description) or cancel it.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const body = await req.json();

  const posting = await db.posting.findUnique({ where: { id } });
  if (!posting || posting.customerId !== auth.user.id) {
    return NextResponse.json({
      success: false, error: { code: "NOT_FOUND", message: "Job not found" },
    }, { status: 404, headers: auth.headers });
  }

  // Cancel action
  if (body.action === "cancel") {
    if (posting.status === "COMPLETED" || posting.status === "CANCELLED") {
      return NextResponse.json({
        success: false, error: { code: "INVALID_STATUS", message: `Cannot cancel a ${posting.status.toLowerCase()} job` },
      }, { status: 400, headers: auth.headers });
    }
    await db.posting.update({ where: { id }, data: { status: "CANCELLED" } });
    return NextResponse.json({
      success: true, data: { id, status: "CANCELLED" },
      meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
    }, { headers: auth.headers });
  }

  // Update fields (only on OPEN/BIDDING postings)
  if (posting.status !== "OPEN" && posting.status !== "BIDDING") {
    return NextResponse.json({
      success: false, error: { code: "INVALID_STATUS", message: "Can only update OPEN or BIDDING jobs" },
    }, { status: 400, headers: auth.headers });
  }

  const updateData: Record<string, unknown> = {};
  if (body.budgetUsd !== undefined) updateData.budgetUsd = parseFloat(body.budgetUsd);
  if (body.description !== undefined) updateData.description = body.description;
  if (body.title !== undefined) updateData.title = body.title;

  const updated = await db.posting.update({ where: { id }, data: updateData });

  return NextResponse.json({
    success: true, data: { id: updated.id, status: updated.status, title: updated.title, budgetUsd: updated.budgetUsd },
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
