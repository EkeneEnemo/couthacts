import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { saveLogo } from "@/lib/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const { image } = await req.json();
  if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

  try {
    const url = await saveLogo(provider.id, image);
    return NextResponse.json({ success: true, logoUrl: url });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 400 });
  }
}
