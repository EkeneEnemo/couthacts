import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      city: true,
      country: true,
      preferredLanguage: true,
      preferredCurrency: true,
    },
  });

  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Check if name is changing — triggers re-verification
  const currentUser = session.user;
  const nameChanged =
    (body.firstName && body.firstName !== currentUser.firstName) ||
    (body.lastName && body.lastName !== currentUser.lastName);

  const updateData: Record<string, unknown> = {
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone || null,
    city: body.city || null,
    country: body.country || null,
    preferredCurrency: body.preferredCurrency || "USD",
  };

  // Reset verification if name changed
  if (nameChanged && currentUser.kycStatus === "APPROVED") {
    updateData.kycStatus = "PENDING";
    updateData.kycPersonaId = null;
    // Also reset provider verification
    await db.provider.updateMany({
      where: { userId: session.user.id },
      data: { isVerified: false, kybStatus: "PENDING" },
    });
  }

  const user = await db.user.update({
    where: { id: session.user.id },
    data: updateData,
  });

  return NextResponse.json({ user });
}
