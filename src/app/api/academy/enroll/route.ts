import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet, getOrCreateWallet } from "@/lib/wallet";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/academy/enroll — Enroll in a course. Charges wallet.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId } = await req.json();
  const course = await db.course.findUnique({ where: { id: courseId } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  // Check already enrolled
  const existing = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });
  if (existing) return NextResponse.json({ error: "Already enrolled", enrollmentId: existing.id });

  const price = Number(course.priceUsd);
  await getOrCreateWallet(session.user.id);

  // Charge wallet
  if (price > 0) {
    try {
      await debitWallet({
        userId: session.user.id, amountUsd: price,
        type: "POSTING_FEE", // Reuse posting fee type for course purchase
        description: `Academy: ${course.title} — $${price.toFixed(2)}`,
      });
    } catch (err: unknown) {
      return NextResponse.json({ error: err instanceof Error ? err.message : "Insufficient balance" }, { status: 400 });
    }
  }

  const enrollment = await db.enrollment.create({
    data: { userId: session.user.id, courseId, paidUsd: price },
  });

  return NextResponse.json({ enrollmentId: enrollment.id }, { status: 201 });
}
