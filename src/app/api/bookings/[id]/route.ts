import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const booking = await db.booking.findUnique({
    where: { id: params.id },
    include: {
      posting: {
        select: {
          id: true,
          title: true,
          mode: true,
          originAddress: true,
          destinationAddress: true,
          trackingLayers: true,
        },
      },
      customer: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
      provider: {
        select: {
          id: true,
          userId: true,
          businessName: true,
          couthActsScore: true,
          scoreTier: true,
          isVerified: true,
          stripeConnectId: true,
        },
      },
      escrow: true,
      tracking: {
        orderBy: { recordedAt: "desc" },
        take: 20,
      },
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Only customer or provider can view
  const isCustomer = booking.customerId === session.user.id;
  const isProvider = booking.provider.userId === session.user.id;
  if (!isCustomer && !isProvider && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ booking, role: isCustomer ? "customer" : "provider", userId: session.user.id });
}
