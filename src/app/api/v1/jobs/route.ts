import { db } from "@/lib/db";
import { validateApiKey } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/v1/jobs — List customer's jobs via API.
 */
export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  const where: Record<string, unknown> = { customerId: auth.user.id };
  if (status) where.status = status;

  const [postings, total] = await Promise.all([
    db.posting.findMany({
      where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit,
      include: { _count: { select: { bids: true } }, booking: { select: { id: true, status: true, trackingCode: true } } },
    }),
    db.posting.count({ where }),
  ]);

  return NextResponse.json({
    success: true, data: postings,
    meta: { page, limit, total, requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}

/**
 * POST /api/v1/jobs — Create a posting via API.
 */
export async function POST(req: NextRequest) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const body = await req.json();
  // Minimal validation
  if (!body.mode || !body.title || !body.originAddress || !body.destinationAddress || !body.budgetUsd) {
    return NextResponse.json({ success: false, error: { code: "INVALID_INPUT", message: "mode, title, originAddress, destinationAddress, budgetUsd required" } }, { status: 400 });
  }

  const posting = await db.posting.create({
    data: {
      customerId: auth.user.id, mode: body.mode, title: body.title,
      description: body.description || "", originAddress: body.originAddress,
      destinationAddress: body.destinationAddress,
      pickupDate: body.pickupDate ? new Date(body.pickupDate) : new Date(),
      budgetUsd: parseFloat(body.budgetUsd), postingFeeUsd: 0, postingFeePaid: true,
      isBiddingEnabled: true, insuranceTier: body.insuranceTier || "NONE",
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  return NextResponse.json({
    success: true, data: { id: posting.id, status: posting.status },
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { status: 201, headers: auth.headers });
}
