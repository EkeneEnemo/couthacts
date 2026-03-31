import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * PATCH /api/academy/progress — Mark a lesson as complete.
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { enrollmentId, lessonId } = await req.json();

  const enrollment = await db.enrollment.findUnique({ where: { id: enrollmentId } });
  if (!enrollment || enrollment.userId !== session.user.id) {
    return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
  }

  // Upsert lesson progress
  await db.lessonProgress.upsert({
    where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
    update: { completed: true, completedAt: new Date() },
    create: { enrollmentId, lessonId, completed: true, completedAt: new Date() },
  });

  // Count completed lessons
  const completedCount = await db.lessonProgress.count({
    where: { enrollmentId, completed: true },
  });

  const course = await db.course.findUnique({ where: { id: enrollment.courseId } });
  const totalLessons = course?.totalLessons || 1;
  const progress = Math.round((completedCount / totalLessons) * 100);

  await db.enrollment.update({
    where: { id: enrollmentId },
    data: { lessonsComplete: completedCount, progress },
  });

  return NextResponse.json({ progress, lessonsComplete: completedCount, totalLessons });
}
