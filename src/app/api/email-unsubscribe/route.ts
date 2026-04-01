import { db } from "@/lib/db";
import { verifyUnsubscribeToken } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/email-unsubscribe — One-click unsubscribe from all emails.
 * Token-based — no login required (CAN-SPAM / RFC 8058 compliant).
 */
export async function POST(req: NextRequest) {
  const { uid, token } = await req.json();

  if (!uid || !token || !verifyUnsubscribeToken(uid, token)) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { id: uid } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get all toggleable notification types and disable them all
  const { EMAIL_NOTIFICATION_TYPES } = await import("@/lib/email");
  const allTypes = Object.keys(EMAIL_NOTIFICATION_TYPES);

  // Delete old prefs and create new with all disabled
  await db.notification.deleteMany({
    where: { userId: uid, type: "EMAIL_PREFS" },
  });
  await db.notification.create({
    data: {
      userId: uid,
      title: "Email Preferences",
      body: JSON.stringify(allTypes),
      type: "EMAIL_PREFS",
      isRead: true,
    },
  });

  return NextResponse.json({ success: true });
}
