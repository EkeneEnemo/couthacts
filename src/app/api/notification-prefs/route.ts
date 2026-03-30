import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/notification-prefs — Get user's disabled email notification types.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pref = await db.notification.findFirst({
    where: { userId: session.user.id, type: "EMAIL_PREFS" },
    orderBy: { createdAt: "desc" },
  });

  let disabled: string[] = [];
  if (pref?.body) {
    try { disabled = JSON.parse(pref.body); } catch { /* empty */ }
  }

  return NextResponse.json({ disabled });
}

/**
 * POST /api/notification-prefs — Save user's disabled email notification types.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { disabled } = await req.json();

  // Delete old prefs
  await db.notification.deleteMany({
    where: { userId: session.user.id, type: "EMAIL_PREFS" },
  });

  // Create new prefs record
  await db.notification.create({
    data: {
      userId: session.user.id,
      title: "Email Preferences",
      body: JSON.stringify(disabled || []),
      type: "EMAIL_PREFS",
      isRead: true,
    },
  });

  return NextResponse.json({ success: true, disabled });
}
