import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * GET /api/academy/courses — List all published courses.
 */
export async function GET() {
  const session = await getSession();
  const userId = session?.user.id;

  const courses = await db.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { lessons: true, enrollments: true } },
    },
  });

  // If logged in, include enrollment status
  const enrollments: Record<string, { progress: number; examPassed: boolean; certificateId: string | null }> = {};
  if (userId) {
    const userEnrollments = await db.enrollment.findMany({
      where: { userId },
      select: { courseId: true, progress: true, examPassed: true, certificateId: true },
    });
    for (const e of userEnrollments) {
      enrollments[e.courseId] = { progress: e.progress, examPassed: e.examPassed, certificateId: e.certificateId };
    }
  }

  return NextResponse.json({
    courses: courses.map((c) => ({
      id: c.id, title: c.title, slug: c.slug, description: c.description,
      whatYouLearn: c.whatYouLearn, category: c.category, priceUsd: Number(c.priceUsd),
      duration: c.duration, totalLessons: c.totalLessons, level: c.level,
      thumbnailUrl: c.thumbnailUrl, lessonsCount: c._count.lessons,
      enrolledCount: c._count.enrollments,
      enrollment: enrollments[c.id] || null,
    })),
  });
}
