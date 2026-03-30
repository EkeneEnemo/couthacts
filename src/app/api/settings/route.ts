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

  const user = await db.user.update({
    where: { id: session.user.id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone || null,
      city: body.city || null,
      country: body.country || null,
      preferredCurrency: body.preferredCurrency || "USD",
    },
  });

  return NextResponse.json({ user });
}
