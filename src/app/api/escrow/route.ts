import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createEscrow, releaseEscrow, refundEscrow } from "@/lib/escrow";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const totalAmountUsd = parseFloat(body.totalAmountUsd);

  if (!Number.isFinite(totalAmountUsd) || totalAmountUsd <= 0 || totalAmountUsd > 100000) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Verify user owns the posting
  const posting = await db.posting.findUnique({ where: { id: body.postingId } });
  if (!posting || posting.customerId !== session.user.id) {
    return NextResponse.json({ error: "Not your posting" }, { status: 403 });
  }

  try {
    const { escrow, clientSecret } = await createEscrow({
      postingId: body.postingId,
      bookingId: body.bookingId,
      totalAmountUsd,
      customerId: session.user.id,
      paymentTerm: body.paymentTerm,
    });

    return NextResponse.json({ escrow, clientSecret }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Escrow creation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { escrowId, action } = await req.json();

  // Verify the user is authorized for this escrow
  const escrow = await db.escrow.findUnique({
    where: { id: escrowId },
    include: { booking: true },
  });
  if (!escrow) {
    return NextResponse.json({ error: "Escrow not found" }, { status: 404 });
  }

  const isCustomer = escrow.booking?.customerId === session.user.id;
  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  const isProvider = escrow.booking?.providerId === provider?.id;

  if (!isCustomer && !isProvider && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    if (action === "release") {
      // Only customer or admin can release
      if (!isCustomer && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Only the customer can release escrow" }, { status: 403 });
      }
      if (escrow.booking?.status !== "COMPLETED") {
        return NextResponse.json({ error: "Booking must be completed before releasing escrow" }, { status: 400 });
      }
      const result = await releaseEscrow(escrowId);
      return NextResponse.json({ success: true, ...result });
    }

    if (action === "refund") {
      if (!isCustomer && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Only the customer or admin can refund" }, { status: 403 });
      }
      await refundEscrow(escrowId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Operation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
