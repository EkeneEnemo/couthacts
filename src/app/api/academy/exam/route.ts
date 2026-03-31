import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/academy/exam?courseId=xxx — Get exam questions for a course.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const courseId = new URL(req.url).searchParams.get("courseId");
  if (!courseId) return NextResponse.json({ error: "courseId required" }, { status: 400 });

  // Check enrollment + all lessons complete
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });
  if (!enrollment) return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
  if (enrollment.progress < 100) return NextResponse.json({ error: "Complete all lessons first" }, { status: 400 });

  // Check 24hr lockout after attempt 2
  if (enrollment.examAttempts >= 2 && enrollment.lastExamAt) {
    const hoursSince = (Date.now() - new Date(enrollment.lastExamAt).getTime()) / (1000 * 60 * 60);
    if (hoursSince < 24) {
      return NextResponse.json({ error: `Please wait ${Math.ceil(24 - hoursSince)} hours before retaking` }, { status: 400 });
    }
  }

  const questions = await db.examQuestion.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    select: { id: true, question: true, optionA: true, optionB: true, optionC: true, optionD: true, order: true },
  });

  return NextResponse.json({ questions, attemptNumber: enrollment.examAttempts + 1 });
}

/**
 * POST /api/academy/exam — Submit exam answers.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId, answers } = await req.json();
  // answers: { [questionId]: "A" | "B" | "C" | "D" }

  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });
  if (!enrollment) return NextResponse.json({ error: "Not enrolled" }, { status: 403 });

  const questions = await db.examQuestion.findMany({
    where: { courseId }, orderBy: { order: "asc" },
  });

  let correct = 0;
  const results = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correct++;
    return {
      questionId: q.id, question: q.question,
      userAnswer, correctAnswer: q.correctAnswer,
      isCorrect, explanation: q.explanation,
    };
  });

  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= 70;

  let certificateId: string | null = null;
  if (passed && !enrollment.examPassed) {
    const year = new Date().getFullYear();
    certificateId = `CA-${year}-${randomBytes(4).toString("hex").toUpperCase()}`;
  }

  await db.enrollment.update({
    where: { id: enrollment.id },
    data: {
      examScore: score, examPassed: passed || enrollment.examPassed,
      examAttempts: { increment: 1 }, lastExamAt: new Date(),
      ...(passed && !enrollment.examPassed ? { completedAt: new Date(), certificateId } : {}),
    },
  });

  return NextResponse.json({
    score, passed, correct, total: questions.length,
    certificateId, results,
  });
}
