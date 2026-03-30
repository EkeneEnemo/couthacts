import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await requireAdmin();

  const [
    totalUsers,
    totalProviders,
    verifiedUsers,
    verifiedProviders,
    totalPostings,
    openPostings,
    totalBookings,
    activeBookings,
    completedBookings,
    disputedBookings,
    totalBids,
    totalReviews,
    totalDisputes,
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
    db.bid.count(),
    db.review.count(),
    db.dispute.count(),
  ]);

  // Revenue: sum of all posting fees + escrow fees
  const escrows = await db.escrow.findMany({
    where: { status: "RELEASED" },
    select: { escrowFeeUsd: true },
  });
  const escrowRevenue = escrows.reduce((sum: number, e: { escrowFeeUsd: unknown }) => sum + Number(e.escrowFeeUsd), 0);

  const postingFees = await db.walletTransaction.findMany({
    where: { type: "POSTING_FEE" },
    select: { amountUsd: true },
  });
  const postingFeeRevenue = postingFees.reduce((sum: number, t: { amountUsd: unknown }) => sum + Math.abs(Number(t.amountUsd)), 0);

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

  const recentUsers = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      kycStatus: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    stats: {
      totalUsers,
      totalProviders,
      verifiedUsers,
      verifiedProviders,
      totalPostings,
      openPostings,
      totalBookings,
      activeBookings,
      completedBookings,
      disputedBookings,
      totalBids,
      totalReviews,
      totalDisputes,
      escrowRevenue: Math.round(escrowRevenue * 100) / 100,
      postingFeeRevenue: Math.round(postingFeeRevenue * 100) / 100,
      totalRevenue: Math.round((escrowRevenue + postingFeeRevenue) * 100) / 100,
    },
    recentBookings,
    recentUsers,
  });
}
