import { db } from "@/lib/db";
import { validateApiKey } from "@/lib/api-auth";
import { createEscrow } from "@/lib/escrow";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

/**
 * GET /api/v1/bids — List bids on the customer's postings.
 */
export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(req.url);
  const postingId = searchParams.get("postingId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  const where: Record<string, unknown> = {};
  if (postingId) {
    // Verify the posting belongs to this user
    const posting = await db.posting.findUnique({ where: { id: postingId } });
    if (!posting || posting.customerId !== auth.user.id) {
      return NextResponse.json({
        success: false, error: { code: "NOT_FOUND", message: "Posting not found" },
      }, { status: 404, headers: auth.headers });
    }
    where.postingId = postingId;
  } else {
    where.posting = { customerId: auth.user.id };
  }

  const [bids, total] = await Promise.all([
    db.bid.findMany({
      where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit,
      include: {
        provider: { select: { id: true, businessName: true, couthActsScore: true, scoreTier: true } },
        posting: { select: { id: true, title: true, mode: true } },
      },
    }),
    db.bid.count({ where }),
  ]);

  return NextResponse.json({
    success: true, data: bids,
    meta: { page, limit, total, requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}

/**
 * POST /api/v1/bids — Accept a bid (creates booking with escrow).
 */
export async function POST(req: NextRequest) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const { bidId, action } = await req.json();
  if (!bidId || !action) {
    return NextResponse.json({
      success: false, error: { code: "INVALID_INPUT", message: "bidId and action required" },
    }, { status: 400, headers: auth.headers });
  }

  const bid = await db.bid.findUnique({
    where: { id: bidId },
    include: { posting: true },
  });

  if (!bid || bid.posting.customerId !== auth.user.id) {
    return NextResponse.json({
      success: false, error: { code: "NOT_FOUND", message: "Bid not found" },
    }, { status: 404, headers: auth.headers });
  }

  if (action === "reject") {
    await db.bid.update({ where: { id: bidId }, data: { isWithdrawn: true } });
    return NextResponse.json({
      success: true, data: { bidId, status: "rejected" },
      meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
    }, { headers: auth.headers });
  }

  if (action === "accept") {
    if (bid.isAccepted || bid.isWithdrawn) {
      return NextResponse.json({
        success: false, error: { code: "INVALID_STATUS", message: "Bid already accepted or withdrawn" },
      }, { status: 400, headers: auth.headers });
    }

    const trackingCode = randomBytes(6).toString("hex").toUpperCase();
    const pin = String(Math.floor(100000 + Math.random() * 900000));
    const agreedAmount = Number(bid.amountUsd);

    const booking = await db.booking.create({
      data: {
        postingId: bid.postingId, customerId: auth.user.id, providerId: bid.providerId,
        agreedAmountUsd: agreedAmount, trackingCode, pin,
        paymentTerm: bid.posting.paymentTerm,
        scheduledPickup: bid.posting.pickupDate,
        insuranceTier: bid.posting.insuranceTier,
      },
    });

    await db.bid.update({ where: { id: bidId }, data: { isAccepted: true } });
    await db.posting.update({ where: { id: bid.postingId }, data: { status: "MATCHED" } });

    const { escrow } = await createEscrow({
      postingId: bid.postingId, bookingId: booking.id,
      totalAmountUsd: agreedAmount, customerId: auth.user.id,
      paymentTerm: bid.posting.paymentTerm,
    });

    return NextResponse.json({
      success: true,
      data: { bookingId: booking.id, trackingCode, escrowId: escrow.id, agreedAmount },
      meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
    }, { status: 201, headers: auth.headers });
  }

  return NextResponse.json({
    success: false, error: { code: "INVALID_INPUT", message: "action must be 'accept' or 'reject'" },
  }, { status: 400, headers: auth.headers });
}
