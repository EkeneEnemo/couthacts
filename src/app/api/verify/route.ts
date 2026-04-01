import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet, getOrCreateWallet } from "@/lib/wallet";
import { createPersonaInquiry, getPersonaInquiry } from "@/lib/persona";
import { sendVerificationApprovedEmail } from "@/lib/email";
import { NextResponse } from "next/server";

const VERIFICATION_FEE_USD = 20;

/**
 * POST /api/verify — Start Persona identity verification.
 * Charges $20 from wallet, creates a Persona inquiry, returns the hosted URL.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  if (!user.avatarUrl) {
    return NextResponse.json(
      { error: "Please upload a profile photo before verifying your identity" },
      { status: 400 }
    );
  }

  if (user.kycStatus === "APPROVED") {
    return NextResponse.json({ status: "APPROVED", message: "Already verified" });
  }

  // Charge $20 verification fee
  await getOrCreateWallet(user.id);
  try {
    await debitWallet({
      userId: user.id,
      amountUsd: VERIFICATION_FEE_USD,
      type: "POSTING_FEE",
      description: `Identity verification fee ($${VERIFICATION_FEE_USD}) — non-refundable`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Insufficient wallet balance";
    return NextResponse.json(
      { error: `$${VERIFICATION_FEE_USD} verification fee required. ${message}` },
      { status: 400 }
    );
  }

  // Create Persona inquiry
  try {
    const { inquiryId, url } = await createPersonaInquiry({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        kycStatus: "IN_REVIEW",
        kycPersonaId: inquiryId,
      },
    });

    return NextResponse.json({
      status: "IN_REVIEW",
      message: "Verification started. Complete the identity check in the Persona window.",
      personaId: inquiryId,
      url,
      feeCharged: VERIFICATION_FEE_USD,
    });
  } catch (err: unknown) {
    // Persona failed — fee is still non-refundable
    const message = err instanceof Error ? err.message : "Verification service unavailable";
    await db.user.update({
      where: { id: user.id },
      data: { kycStatus: "PENDING" },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/verify — Check verification status.
 * If status is IN_REVIEW, poll Persona for the result.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
  });

  // If in review, check Persona for updates
  if (user.kycStatus === "IN_REVIEW" && user.kycPersonaId) {
    try {
      const inquiry = await getPersonaInquiry(user.kycPersonaId);

      if (inquiry.status === "completed" || inquiry.status === "approved") {
        // Check name match
        const firstNameMatch = inquiry.firstName?.toLowerCase().trim() === user.firstName.toLowerCase().trim();
        const lastNameMatch = inquiry.lastName?.toLowerCase().trim() === user.lastName.toLowerCase().trim();

        if (firstNameMatch && lastNameMatch) {
          // Approved — names match
          await db.user.update({
            where: { id: user.id },
            data: { kycStatus: "APPROVED" },
          });
          await db.provider.updateMany({
            where: { userId: user.id },
            data: { isVerified: true, kybStatus: "APPROVED" },
          });

          sendVerificationApprovedEmail(user.email, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));

          return NextResponse.json({
            kycStatus: "APPROVED",
            kycPersonaId: user.kycPersonaId,
            avatarUrl: user.avatarUrl,
            isVerified: true,
            verificationFee: VERIFICATION_FEE_USD,
          });
        } else {
          // Rejected — name mismatch
          await db.user.update({
            where: { id: user.id },
            data: { kycStatus: "REJECTED" },
          });

          return NextResponse.json({
            kycStatus: "REJECTED",
            kycPersonaId: user.kycPersonaId,
            avatarUrl: user.avatarUrl,
            isVerified: false,
            verificationFee: VERIFICATION_FEE_USD,
            rejectionReason: `Name on ID (${inquiry.firstName} ${inquiry.lastName}) does not match your account name (${user.firstName} ${user.lastName}). Update your name in Settings to match your government ID, then verify again. The $${VERIFICATION_FEE_USD} fee is non-refundable.`,
          });
        }
      }

      if (inquiry.status === "declined" || inquiry.status === "failed") {
        await db.user.update({
          where: { id: user.id },
          data: { kycStatus: "REJECTED" },
        });

        return NextResponse.json({
          kycStatus: "REJECTED",
          kycPersonaId: user.kycPersonaId,
          avatarUrl: user.avatarUrl,
          isVerified: false,
          verificationFee: VERIFICATION_FEE_USD,
          rejectionReason: `Verification declined by Persona. The $${VERIFICATION_FEE_USD} fee is non-refundable. You may try again.`,
        });
      }
    } catch {
      // Persona API error — keep status as IN_REVIEW
    }
  }

  return NextResponse.json({
    kycStatus: user.kycStatus,
    kycPersonaId: user.kycPersonaId,
    avatarUrl: user.avatarUrl,
    isVerified: user.kycStatus === "APPROVED",
    verificationFee: VERIFICATION_FEE_USD,
  });
}
