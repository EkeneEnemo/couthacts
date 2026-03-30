import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const [
    totalUsers, totalProviders, verifiedUsers, verifiedProviders,
    totalPostings, openPostings, totalBookings, activeBookings,
    completedBookings, disputedBookings, pendingBookings, cancelledBookings,
    totalBids, totalReviews, totalDisputes,
  ] = await Promise.all([
    db.user.count(),
    db.provider.count(),
    db.user.count({ where: { kycStatus: "APPROVED" } }),
    db.provider.count({ where: { isVerified: true } }),
    db.posting.count(),
    db.posting.count({ where: { status: { in: ["OPEN", "BIDDING"] } } }),
    db.booking.count(),
    db.booking.count({ where: { status: { in: ["CONFIRMED", "IN_PROGRESS"] } } }),
    db.booking.count({ where: { status: "COMPLETED" } }),
    db.booking.count({ where: { status: "DISPUTED" } }),
    db.booking.count({ where: { status: "CONFIRMED" } }),
    db.booking.count({ where: { status: "CANCELLED" } }),
    db.bid.count(),
    db.review.count(),
    db.dispute.count(),
  ]);

  // Revenue by status
  const releasedEscrows = await db.escrow.findMany({
    where: { status: "RELEASED" },
    select: { escrowFeeUsd: true, postingId: true },
  });
  const holdingEscrows = await db.escrow.findMany({
    where: { status: "HOLDING" },
    select: { totalAmountUsd: true, escrowFeeUsd: true },
  });
  const escrowRevenue = releasedEscrows.reduce((s: number, e: { escrowFeeUsd: unknown }) => s + Number(e.escrowFeeUsd), 0);
  const inEscrow = holdingEscrows.reduce((s: number, e: { totalAmountUsd: unknown }) => s + Number(e.totalAmountUsd), 0);

  const postingFeeTxs = await db.walletTransaction.findMany({
    where: { type: "POSTING_FEE" },
    select: { amountUsd: true },
  });
  const postingFeeRevenue = postingFeeTxs.reduce((s: number, t: { amountUsd: unknown }) => s + Math.abs(Number(t.amountUsd)), 0);

  // Revenue by transport mode
  const completedBookingsWithMode = await db.booking.findMany({
    where: { status: "COMPLETED" },
    include: {
      posting: { select: { mode: true } },
      escrow: { select: { escrowFeeUsd: true } },
    },
  });
  const revenueByMode: Record<string, number> = {};
  for (const b of completedBookingsWithMode) {
    const mode = b.posting.mode;
    const fee = b.escrow ? Number(b.escrow.escrowFeeUsd) : 0;
    revenueByMode[mode] = (revenueByMode[mode] || 0) + fee;
  }

  // Total wallet balances
  const wallets = await db.wallet.findMany({ select: { balanceUsd: true } });
  const totalWalletBalance = wallets.reduce((s: number, w: { balanceUsd: unknown }) => s + Number(w.balanceUsd), 0);

  // Recent activity
  const recentBookings = await db.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      posting: { select: { title: true, mode: true } },
      customer: { select: { firstName: true, lastName: true } },
      provider: { select: { businessName: true } },
    },
  });

  return NextResponse.json({
    stats: {
      totalUsers, totalProviders, verifiedUsers, verifiedProviders,
      totalPostings, openPostings,
      totalBookings, activeBookings, completedBookings, disputedBookings, pendingBookings, cancelledBookings,
      totalBids, totalReviews, totalDisputes,
      escrowRevenue: Math.round(escrowRevenue * 100) / 100,
      postingFeeRevenue: Math.round(postingFeeRevenue * 100) / 100,
      totalRevenue: Math.round((escrowRevenue + postingFeeRevenue) * 100) / 100,
      inEscrow: Math.round(inEscrow * 100) / 100,
      totalWalletBalance: Math.round(totalWalletBalance * 100) / 100,
      revenueByMode,
    },
    recentBookings,
  });
}
