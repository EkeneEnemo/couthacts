import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createEscrow } from "@/lib/escrow";
import { pushToUser } from "@/lib/pusher-server";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

/**
 * POST /api/instant/accept — Provider accepts an instant job.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
    if (!provider || !provider.isVerified) {
      return NextResponse.json({ error: "Verified providers only" }, { status: 403 });
    }

    const { postingId } = await req.json();
    const posting = await db.posting.findUnique({ where: { id: postingId } });

    if (!posting || posting.status !== "OPEN") {
      return NextResponse.json({ error: "Job no longer available" }, { status: 400 });
    }
    if (new Date() > posting.expiresAt) {
      return NextResponse.json({ error: "Job has expired" }, { status: 400 });
    }
    if (!provider.modes.includes(posting.mode as never)) {
      return NextResponse.json({ error: "Mode mismatch" }, { status: 400 });
    }

    // Create booking
    const trackingCode = randomBytes(6).toString("hex").toUpperCase();
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    const booking = await db.booking.create({
      data: {
        postingId, customerId: posting.customerId, providerId: provider.id,
        agreedAmountUsd: posting.budgetUsd, paymentTerm: "FULL_UPFRONT",
        scheduledPickup: posting.pickupDate,
        trackingCode, pin, insuranceTier: posting.insuranceTier,
      },
    });

    await db.posting.update({ where: { id: postingId }, data: { status: "MATCHED" } });

    // Create escrow (budget already held)
    await createEscrow({
      postingId, bookingId: booking.id,
      totalAmountUsd: Number(posting.budgetUsd),
      customerId: posting.customerId,
      paymentTerm: "FULL_UPFRONT",
    });

    // Notify customer
    pushToUser(posting.customerId, "instant-accepted", {
      bookingId: booking.id, providerName: provider.businessName,
      trackingCode, providerId: provider.id,
    }).catch((err) => console.error("[CouthActs]", err));

    // Email customer
    const customer = await db.user.findUnique({ where: { id: posting.customerId } });
    if (customer) {
      sendBookingConfirmationEmail(customer.email, customer.firstName, posting.title, trackingCode, booking.id, customer.id).catch((err) => console.error("[CouthActs]", err));
    }

    return NextResponse.json({
      bookingId: booking.id, trackingCode, pin,
      providerName: provider.businessName,
    }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Accept failed" }, { status: 500 });
  }
}
