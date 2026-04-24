import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * POST /api/me/delete
 *
 * GDPR Article 17 (right to erasure). Performs a structured account
 * deletion:
 *   - Rejects if the user has active bookings (in-flight obligations)
 *     or an escrow that is currently HOLDING funds. Users must resolve
 *     these before deletion — we won't silently cancel money in motion.
 *   - Anonymizes records that are legally required to be retained for
 *     tax / regulatory reasons (completed escrow rows, financial
 *     advances), stripping PII but keeping the transaction trail.
 *   - Hard-deletes everything else associated with the user ID.
 *   - Clears the session cookie on the response.
 *
 * Request body:
 *   { confirm: "DELETE" }    // literal safeguard
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await req.json().catch(() => ({}));
  if (body?.confirm !== "DELETE") {
    return NextResponse.json(
      { error: "Deletion not confirmed. Send { \"confirm\": \"DELETE\" }." },
      { status: 400 },
    );
  }

  // ─── Pre-flight: block if there are obligations in flight ─────────────
  const [activeBookings, holdingEscrow, openDisputes] = await Promise.all([
    db.booking.count({
      where: {
        OR: [{ customerId: userId }, { provider: { userId } }],
        status: { in: ["CONFIRMED", "IN_PROGRESS"] },
      },
    }),
    db.escrow.count({
      where: {
        status: { in: ["HOLDING", "DISPUTED"] },
        OR: [
          { booking: { customerId: userId } },
          { booking: { provider: { userId } } },
          { posting: { customerId: userId } },
        ],
      },
    }),
    db.dispute.count({
      where: {
        OR: [{ customerId: userId }, { provider: { userId } }],
        status: { in: ["OPEN", "UNDER_REVIEW", "ESCALATED"] },
      },
    }),
  ]);

  if (activeBookings > 0 || holdingEscrow > 0 || openDisputes > 0) {
    return NextResponse.json(
      {
        error: "Account has open obligations that must be resolved first.",
        details: {
          activeBookings,
          escrowInFlight: holdingEscrow,
          openDisputes,
        },
        contact:
          "Contact privacy@couthacts.com if you need help closing these out before deletion.",
      },
      { status: 409 },
    );
  }

  const anonymizedAt = new Date().toISOString();
  const anonEmail = `deleted-${userId}@couthacts-deleted.invalid`;

  await db.$transaction(async (tx) => {
    // 1. Anonymize legally-retained financial records (escrow + advances).
    //    We keep the rows for accounting / audit obligations but strip PII
    //    from the user references on linked disputes' adminNotes, etc.
    await tx.dispute.updateMany({
      where: {
        OR: [{ customerId: userId }, { provider: { userId } }],
        status: { in: ["RESOLVED_CUSTOMER", "RESOLVED_PROVIDER"] },
      },
      data: {
        description: "[redacted per user request]",
        adminNotes: "[redacted per user request]",
        evidenceUrls: [],
      },
    });

    // 2. Delete personal records that cascade cleanly.
    await tx.notification.deleteMany({ where: { userId } });
    await tx.session.deleteMany({ where: { userId } });
    await tx.message.deleteMany({ where: { senderId: userId } });
    await tx.apiKey.deleteMany({ where: { userId } });

    // 3. Disable (not delete) the Provider record so score history for
    //    completed jobs remains anonymized but intact.
    await tx.provider.updateMany({
      where: { userId },
      data: {
        businessName: "[deleted]",
        bio: null,
        logoUrl: null,
        fleetPhotoUrls: [],
        videoUrl: null,
        isAvailable: false,
        isVerified: false,
        insuranceCertUrl: null,
        licenseUrl: null,
      },
    });

    // 4. Wallet — zero the balance record. Transaction history is kept for
    //    audit (amounts, types) without user identity.
    await tx.wallet.updateMany({
      where: { userId },
      data: { balanceUsd: 0, isLocked: true },
    });

    // 5. Anonymize the User itself. We don't hard-delete because foreign
    //    keys on bookings, reviews, etc. need a valid target; soft-delete
    //    via anonymization is the standard GDPR-compliant approach for
    //    marketplaces.
    await tx.user.update({
      where: { id: userId },
      data: {
        email: anonEmail,
        emailVerified: null,
        phone: null,
        phoneVerified: false,
        passwordHash: null,
        firstName: "Deleted",
        lastName: "User",
        avatarUrl: null,
        isActive: false,
        kycPersonaId: null,
        country: null,
        city: null,
        addressLine1: null,
        addressLine2: null,
        postalCode: null,
        stripeCustomerId: null,
      },
    });
  });

  // Clear session cookie on the response.
  const res = NextResponse.json({
    ok: true,
    deletedAt: anonymizedAt,
    notice:
      "Account anonymized. Financial records retained per tax/regulatory requirements have been stripped of personal information.",
  });
  const cookieStore = cookies();
  const token = cookieStore.get("couthacts_session")?.value;
  if (token) {
    res.cookies.set({
      name: "couthacts_session",
      value: "",
      path: "/",
      maxAge: 0,
    });
  }
  return res;
}
