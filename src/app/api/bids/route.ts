import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyNewBid } from "@/lib/notifications";
import { sendNewBidEmail } from "@/lib/email";
import { getMinimumBudgetUsd } from "@/lib/posting-fees";
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

  // Verification gate
  if (!provider.isVerified) {
    return NextResponse.json(
      { error: "Please verify your identity before bidding. Go to Settings → Verify Identity." },
      { status: 403 }
    );
  }

  const body = await req.json();

  const posting = await db.posting.findUnique({
    where: { id: body.postingId },
  });
  if (!posting || (posting.status !== "OPEN" && posting.status !== "BIDDING")) {
    return NextResponse.json(
      { error: "Posting is not open for bids" },
      { status: 400 }
    );
  }

  // Insurance tier check: provider must have matching coverage
  const TIER_RANK: Record<string, number> = { BASIC: 1, STANDARD: 2, PREMIUM: 3 };
  const requiredTier = TIER_RANK[posting.insuranceTier] || 1;
  const providerCerts = provider.certifications.map((c: string) => c.toUpperCase());
  const providerHasPremium = providerCerts.some((c: string) => c.includes("PREMIUM") || c.includes("FULL COVERAGE"));
  const providerHasStandard = providerHasPremium || providerCerts.some((c: string) => c.includes("STANDARD") || c.includes("LIABILITY"));
  const providerTierRank = providerHasPremium ? 3 : providerHasStandard ? 2 : 1;

  if (requiredTier > 1 && providerTierRank < requiredTier) {
    const tierName = posting.insuranceTier;
    return NextResponse.json(
      { error: `This posting requires ${tierName} protection coverage. Update your certifications to include your protection tier.` },
      { status: 400 }
    );
  }

  const bidAmountUsd = parseFloat(body.amountUsd);
  const minBid = getMinimumBudgetUsd(posting.mode);
  if (bidAmountUsd < minBid) {
    return NextResponse.json(
      { error: `Minimum bid for ${posting.mode.replace(/_/g, " ")} is $${minBid.toFixed(2)} USD` },
      { status: 400 }
    );
  }

  const bid = await db.bid.create({
    data: {
      postingId: body.postingId,
      providerId: provider.id,
      amountUsd: bidAmountUsd,
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
  // Notify + email the customer
  await notifyNewBid(body.postingId, provider.businessName);
  const customer = await db.user.findUnique({ where: { id: posting.customerId } });
  if (customer) {
    sendNewBidEmail(
      customer.email,
      customer.firstName,
      posting.title,
      provider.businessName,
      `$${Number(bid.amountUsd).toFixed(2)}`,
      posting.id
    ).catch((err) => console.error("[CouthActs]", err));
  }
  pushToPosting(body.postingId, "new-bid", {
    bidId: bid.id,
    amount: Number(bid.amountUsd),
    providerName: provider.businessName,
  }).catch((err) => console.error("[CouthActs]", err));

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
