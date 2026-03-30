import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload/avatar — Upload profile photo.
 * Accepts base64 image data and stores it as a data URL.
 * In production with Vercel Blob, replace with put() call.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { image } = await req.json();

  if (!image || !image.startsWith("data:image/")) {
    return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
  }

  // Check size — limit to 2MB base64 (~1.5MB actual)
  if (image.length > 2_800_000) {
    return NextResponse.json({ error: "Image too large. Max 2MB." }, { status: 400 });
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: image },
  });

  return NextResponse.json({ success: true, avatarUrl: image });
}
