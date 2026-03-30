import { getSession } from "@/lib/auth";
import { createEscrow, releaseEscrow, refundEscrow } from "@/lib/escrow";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/escrow — Create escrow (called when a booking is confirmed)
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const { escrow, clientSecret } = await createEscrow({
      postingId: body.postingId,
      bookingId: body.bookingId,
      totalAmountUsd: parseFloat(body.totalAmountUsd),
      customerId: session.user.id,
      paymentTerm: body.paymentTerm,
    });

    return NextResponse.json({ escrow, clientSecret }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Escrow creation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/**
 * PATCH /api/escrow — Release or refund escrow
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { escrowId, action } = await req.json();

  try {
    if (action === "release") {
      const result = await releaseEscrow(escrowId);
      return NextResponse.json({ success: true, ...result });
    }

    if (action === "refund") {
      await refundEscrow(escrowId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Operation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
