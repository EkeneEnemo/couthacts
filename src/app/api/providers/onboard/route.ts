import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Solopreneur modes — personal name only, no business name
const SOLOPRENEUR_MODES = [
  "TAXI_RIDE",
  "LIMOUSINE",
  "COURIER_LAST_MILE",
  "MEDICAL",
];

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "PROVIDER") {
    return NextResponse.json(
      { error: "Only provider accounts can onboard" },
      { status: 403 }
    );
  }

  const existing = await db.provider.findUnique({
    where: { userId: session.user.id },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Provider profile already exists" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const modes = body.modes || [];

  // Determine if solopreneur — all selected modes are solopreneur-eligible
  const isSolopreneur = modes.length > 0 && modes.every((m: string) => SOLOPRENEUR_MODES.includes(m));

  // For solopreneurs: business name = personal name, no custom business name allowed
  const user = session.user;
  const businessName = isSolopreneur
    ? `${user.firstName} ${user.lastName}`
    : body.businessName;

  if (!isSolopreneur && !body.businessName) {
    return NextResponse.json(
      { error: "Business name is required for non-solopreneur services. Business license verification will be required." },
      { status: 400 }
    );
  }

  const provider = await db.provider.create({
    data: {
      userId: session.user.id,
      businessName,
      businessRegNumber: isSolopreneur ? null : (body.businessRegNumber || null),
      dotNumber: body.dotNumber || null,
      mcNumber: body.mcNumber || null,
      fmcsaNumber: body.fmcsaNumber || null,
      imoNumber: body.imoNumber || null,
      faaNumber: body.faaNumber || null,
      modes,
      certifications: body.certifications || [],
      fleetSize: body.fleetSize ? parseInt(body.fleetSize) : null,
      serviceArea: body.serviceArea || [],
      bio: body.bio || null,
    },
  });

  return NextResponse.json({
    provider,
    isSolopreneur,
    message: isSolopreneur
      ? `Registered as a solopreneur under "${businessName}". Complete identity verification to start bidding.`
      : `Registered as "${businessName}". Complete business verification and identity verification to start bidding.`,
  }, { status: 201 });
}
