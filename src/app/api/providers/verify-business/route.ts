import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/providers/verify-business — Submit business documents for review.
 * Stores license/insurance URLs and sets kybStatus to IN_REVIEW.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = await db.provider.findUnique({
    where: { userId: session.user.id },
  });
  if (!provider) {
    return NextResponse.json({ error: "Provider profile not found" }, { status: 404 });
  }

  if (provider.kybStatus === "APPROVED") {
    return NextResponse.json({ status: "APPROVED", message: "Business already verified" });
  }

  const { insuranceCertUrl, licenseUrl } = await req.json();

  if (!insuranceCertUrl && !licenseUrl) {
    return NextResponse.json(
      { error: "Please upload at least one document (insurance certificate or business license)" },
      { status: 400 }
    );
  }

  await db.provider.update({
    where: { id: provider.id },
    data: {
      insuranceCertUrl: insuranceCertUrl || provider.insuranceCertUrl,
      licenseUrl: licenseUrl || provider.licenseUrl,
      kybStatus: "IN_REVIEW",
    },
  });

  return NextResponse.json({
    status: "IN_REVIEW",
    message: "Business documents submitted for review. Our team will verify within 1-3 business days.",
  });
}

/**
 * GET /api/providers/verify-business — Check business verification status.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = await db.provider.findUnique({
    where: { userId: session.user.id },
  });
  if (!provider) {
    return NextResponse.json({ kybStatus: null });
  }

  return NextResponse.json({
    kybStatus: provider.kybStatus,
    isVerified: provider.isVerified,
    insuranceCertUrl: provider.insuranceCertUrl,
    licenseUrl: provider.licenseUrl,
  });
}
