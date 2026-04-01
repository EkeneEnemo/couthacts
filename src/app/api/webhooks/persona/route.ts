import { db } from "@/lib/db";
import { sendVerificationApprovedEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhooks/persona — Handle Persona verification webhooks.
 * Persona sends events when an inquiry is completed, approved, or declined.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const inquiry = body?.data?.attributes?.payload?.data;

  if (!inquiry) {
    return NextResponse.json({ received: true });
  }

  const inquiryId = inquiry.id;
  const status = inquiry.attributes?.status;
  const referenceId = inquiry.attributes?.["reference-id"];
  const nameFirst = inquiry.attributes?.["name-first"];
  const nameLast = inquiry.attributes?.["name-last"];

  if (!inquiryId || !referenceId) {
    return NextResponse.json({ received: true });
  }

  // Find the user by their Persona inquiry ID
  const user = await db.user.findFirst({
    where: { kycPersonaId: inquiryId },
  });

  if (!user) {
    return NextResponse.json({ received: true });
  }

  if (status === "completed" || status === "approved") {
    const firstMatch = nameFirst?.toLowerCase().trim() === user.firstName.toLowerCase().trim();
    const lastMatch = nameLast?.toLowerCase().trim() === user.lastName.toLowerCase().trim();

    if (firstMatch && lastMatch) {
      await db.user.update({
        where: { id: user.id },
        data: { kycStatus: "APPROVED" },
      });
      await db.provider.updateMany({
        where: { userId: user.id },
        data: { isVerified: true, kybStatus: "APPROVED" },
      });
      sendVerificationApprovedEmail(user.email, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    } else {
      await db.user.update({
        where: { id: user.id },
        data: { kycStatus: "REJECTED" },
      });
    }
  }

  if (status === "declined" || status === "failed") {
    await db.user.update({
      where: { id: user.id },
      data: { kycStatus: "REJECTED" },
    });
  }

  return NextResponse.json({ received: true });
}
