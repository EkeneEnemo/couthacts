import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyNewBid } from "@/lib/notifications";
import { pushToPosting } from "@/lib/pusher-server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/bids — Provider places a bid on a posting
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = await db.provider.findUnique({
    where: { userId: session.user.id },
  });
  if (!provider) {
    return NextResponse.json(
      { error: "Only providers can bid" },
      { status: 403 }
    );
  }

  const body = await req.json();

  const posting = await db.posting.findUnique({
    where: { id: body.postingId },
  });
  if (!posting || posting.status !== "OPEN") {
    return NextResponse.json(
      { error: "Posting is not open for bids" },
      { status: 400 }
    );
  }

  const bid = await db.bid.create({
    data: {
      postingId: body.postingId,
      providerId: provider.id,
      amountUsd: parseFloat(body.amountUsd),
      message: body.message || null,
      estimatedPickup: body.estimatedPickup
        ? new Date(body.estimatedPickup)
        : null,
      estimatedDelivery: body.estimatedDelivery
        ? new Date(body.estimatedDelivery)
        : null,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
    },
  });

  // Update posting to BIDDING if first bid
  if (posting.status === "OPEN") {
    await db.posting.update({
      where: { id: body.postingId },
      data: { status: "BIDDING" },
    });
  }

  // Notify customer + real-time push
  await notifyNewBid(body.postingId, provider.businessName);
  pushToPosting(body.postingId, "new-bid", {
    bidId: bid.id,
    amount: Number(bid.amountUsd),
    providerName: provider.businessName,
  }).catch(() => {});

  return NextResponse.json({ bid }, { status: 201 });
}

/**
 * GET /api/bids?postingId=xxx — Get bids for a posting
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const postingId = searchParams.get("postingId");

  if (!postingId) {
    return NextResponse.json({ error: "postingId required" }, { status: 400 });
  }

  const bids = await db.bid.findMany({
    where: { postingId, isWithdrawn: false },
    orderBy: { createdAt: "desc" },
    include: {
      provider: {
        select: {
          id: true,
          businessName: true,
          couthActsScore: true,
          scoreTier: true,
          completionRate: true,
          onTimeRate: true,
          totalJobs: true,
          logoUrl: true,
          isVerified: true,
        },
      },
    },
  });

  return NextResponse.json({ bids });
}
