import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getSession();
  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: {
      lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, order: true, durationMins: true, content: true } },
      _count: { select: { enrollments: true } },
    },
  });

  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let enrollment = null;
  const lessonProgress: Record<string, boolean> = {};
  if (session) {
    const e = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      include: { lessonProgress: true },
    });
    if (e) {
      enrollment = {
        id: e.id, progress: e.progress, lessonsComplete: e.lessonsComplete,
        examScore: e.examScore, examPassed: e.examPassed, examAttempts: e.examAttempts,
        lastExamAt: e.lastExamAt, certificateId: e.certificateId,
      };
      for (const lp of e.lessonProgress) {
        lessonProgress[lp.lessonId] = lp.completed;
      }
    }
  }

  // Lock lesson content for non-enrolled users (show only first lesson)
  const lessons = course.lessons.map((l, i) => ({
    id: l.id, title: l.title, order: l.order, durationMins: l.durationMins,
    content: enrollment || i === 0 ? l.content : null, // First lesson free preview
    isLocked: !enrollment && i > 0,
    isCompleted: !!lessonProgress[l.id],
  }));

  return NextResponse.json({
    course: {
      id: course.id, title: course.title, slug: course.slug, description: course.description,
      whatYouLearn: course.whatYouLearn, category: course.category, priceUsd: Number(course.priceUsd),
      duration: course.duration, totalLessons: course.totalLessons, level: course.level,
      enrolledCount: course._count.enrollments,
    },
    lessons, enrollment,
  });
}
