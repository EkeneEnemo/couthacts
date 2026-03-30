import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

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

  const provider = await db.provider.create({
    data: {
      userId: session.user.id,
      businessName: body.businessName,
      businessRegNumber: body.businessRegNumber || null,
      dotNumber: body.dotNumber || null,
      mcNumber: body.mcNumber || null,
      fmcsaNumber: body.fmcsaNumber || null,
      imoNumber: body.imoNumber || null,
      faaNumber: body.faaNumber || null,
      modes: body.modes || [],
      certifications: body.certifications || [],
      fleetSize: body.fleetSize ? parseInt(body.fleetSize) : null,
      serviceArea: body.serviceArea || [],
      bio: body.bio || null,
    },
  });

  return NextResponse.json({ provider }, { status: 201 });
}
