import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const view = searchParams.get("view");

  switch (view) {
    case "users": {
      const users = await db.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true, firstName: true, lastName: true, email: true, phone: true,
          role: true, kycStatus: true, isActive: true, trustScore: true,
          city: true, country: true, avatarUrl: true, createdAt: true,
          _count: { select: { postings: true, bookings: true } },
        },
      });
      return NextResponse.json({ data: users });
    }

    case "providers": {
      const providers = await db.provider.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { firstName: true, lastName: true, email: true, kycStatus: true } },
          _count: { select: { bids: true, bookings: true, reviews: true } },
        },
      });
      return NextResponse.json({ data: providers });
    }

    case "postings": {
      const postings = await db.posting.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
          customer: { select: { firstName: true, lastName: true, email: true } },
          _count: { select: { bids: true } },
        },
      });
      return NextResponse.json({ data: postings });
    }

    case "bookings": {
      const status = searchParams.get("status");
      const where: Record<string, unknown> = {};
      if (status) where.status = status;
      const bookings = await db.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
          posting: { select: { title: true, mode: true, budgetUsd: true } },
          customer: { select: { firstName: true, lastName: true } },
          provider: { select: { businessName: true } },
          escrow: { select: { status: true, totalAmountUsd: true, escrowFeeUsd: true } },
        },
      });
      return NextResponse.json({ data: bookings });
    }

    case "revenue": {
      const escrows = await db.escrow.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          posting: { select: { mode: true, title: true } },
          booking: { select: { status: true, customer: { select: { firstName: true, lastName: true } }, provider: { select: { businessName: true } } } },
        },
      });
      return NextResponse.json({ data: escrows });
    }

    case "wallets": {
      const wallets = await db.wallet.findMany({
        orderBy: { balanceUsd: "desc" },
        include: {
          user: { select: { firstName: true, lastName: true, email: true, role: true } },
        },
      });
      return NextResponse.json({ data: wallets });
    }

    default:
      return NextResponse.json({ error: "Invalid view" }, { status: 400 });
  }
}
