"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  Lock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { LessonContent } from "@/components/lesson-content";

interface Lesson {
  id: string;
  title: string;
  order: number;
  durationMins: number;
  content: string | null;
  isLocked: boolean;
  isCompleted: boolean;
}
interface CourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  whatYouLearn: string[];
  category: string;
  priceUsd: number;
  duration: string;
  totalLessons: number;
  level: string;
  enrolledCount: number;
}
interface Enrollment {
  id: string;
  progress: number;
  lessonsComplete: number;
  examPassed: boolean;
  examScore: number | null;
  examAttempts: number;
  certificateId: string | null;
}

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetch(`/api/academy/courses/${params.slug}`)
      .then((r) => r.json())
      .then((d) => {
        setCourse(d.course);
        setLessons(d.lessons || []);
        setEnrollment(d.enrollment);
        // Auto-open first incomplete lesson for enrolled users
        if (d.enrollment && d.lessons?.length) {
          const firstIncomplete = d.lessons.find(
            (l: Lesson) => !l.isCompleted && !l.isLocked
          );
          setActiveLesson(firstIncomplete || d.lessons[0]);
        }
        setLoading(false);
      });
  }, [params.slug]);

  async function handleEnroll() {
    if (!course) return;
    setEnrolling(true);
    const res = await fetch("/api/academy/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: course.id }),
    });
    const data = await res.json();
    if (res.ok) window.location.reload();
    else alert(data.error || "Enrollment failed");
    setEnrolling(false);
  }

  async function markComplete(lesson: Lesson) {
    if (!enrollment) return;
    setMarking(true);
    await fetch("/api/academy/progress", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enrollmentId: enrollment.id,
        lessonId: lesson.id,
      }),
    });
    // Refresh data
    const res = await fetch(`/api/academy/courses/${params.slug}`).then((r) =>
      r.json()
    );
    setLessons(res.lessons);
    setEnrollment(res.enrollment);
    setMarking(false);
    // Auto-advance to next lesson
    const idx = res.lessons.findIndex((l: Lesson) => l.id === lesson.id);
    if (idx < res.lessons.length - 1 && !res.lessons[idx + 1].isLocked) {
      setActiveLesson(res.lessons[idx + 1]);
    } else {
      // Update current lesson as completed
      setActiveLesson(res.lessons[idx]);
    }
  }

  function goToLesson(direction: "prev" | "next") {
    if (!activeLesson) return;
    const idx = lessons.findIndex((l) => l.id === activeLesson.id);
    const targetIdx = direction === "next" ? idx + 1 : idx - 1;
    if (targetIdx >= 0 && targetIdx < lessons.length && !lessons[targetIdx].isLocked) {
      setActiveLesson(lessons[targetIdx]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" />
        </div>
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-[14px] text-[#6E6E73]">Course not found</p>
        </div>
      </div>
    );

  const activeLessonIdx = activeLesson
    ? lessons.findIndex((l) => l.id === activeLesson.id)
    : -1;
  const allComplete = enrollment?.progress === 100;
  const canTakeExam = allComplete && enrollment && !enrollment.examPassed;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-1 text-[13px] text-[#007AFF] hover:text-[#0055D4] mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Academy
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ═══ Sidebar ═══ */}
          <div className="lg:col-span-1 space-y-4">
            {/* Course info */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-[#007AFF]" />
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${
                    course.level === "BEGINNER"
                      ? "text-[#34C759]"
                      : course.level === "INTERMEDIATE"
                      ? "text-[#007AFF]"
                      : "text-purple-600"
                  }`}
                >
                  {course.level}
                </span>
              </div>
              <h1 className="text-xl font-display font-bold tracking-tight text-[#1D1D1F]">
                {course.title}
              </h1>
              <p className="mt-2 text-[13px] text-[#6E6E73]">{course.description}</p>
              <div className="mt-4 flex items-center gap-4 text-[11px] text-[#86868B]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> {course.totalLessons}{" "}
                  lessons
                </span>
              </div>

              {/* Enrollment status / CTA */}
              {!enrollment ? (
                <Button
                  className="w-full mt-5"
                  size="lg"
                  onClick={handleEnroll}
                  loading={enrolling}
                >
                  Enroll &mdash; ${course.priceUsd}
                </Button>
              ) : enrollment.examPassed ? (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#34C759] text-[14px] font-semibold">
                    <Award className="h-5 w-5" /> Certified &mdash;{" "}
                    {enrollment.examScore}%
                  </div>
                  {enrollment.certificateId && (
                    <Link
                      href={`/academy/certificate/${enrollment.certificateId}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#0055D4] transition"
                    >
                      <Award className="h-3.5 w-3.5" />
                      View Certificate
                    </Link>
                  )}
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-[11px] text-[#86868B] mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-[#007AFF]">
                      {enrollment.progress}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#F5F5F7] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-[#86868B]">
                    {enrollment.lessonsComplete} of {course.totalLessons}{" "}
                    lessons completed
                  </p>
                  {canTakeExam && (
                    <div className="mt-3">
                      <Link
                        href={`/academy/${course.slug}/exam`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#007AFF] px-4 py-3 text-[14px] font-semibold text-white hover:bg-[#0055D4] transition"
                      >
                        <Award className="h-4 w-4" />
                        {enrollment.examAttempts > 0
                          ? "Retake Exam"
                          : "Take Final Exam"}
                      </Link>
                      {enrollment.examAttempts > 0 &&
                        enrollment.examScore !== null && (
                          <p className="mt-1.5 text-[11px] text-[#86868B] text-center">
                            Last attempt: {enrollment.examScore}% (70%
                            required) &middot; Attempt{" "}
                            {enrollment.examAttempts}
                          </p>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* What you'll learn */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">
                What you&apos;ll learn
              </p>
              <ul className="space-y-2">
                {course.whatYouLearn.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[13px] text-[#6E6E73]"
                  >
                    <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lesson list */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E8E8ED]">
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em]">
                  Course Outline
                </p>
              </div>
              {lessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => !l.isLocked && setActiveLesson(l)}
                  disabled={l.isLocked}
                  className={`w-full text-left px-4 py-3 border-b border-[#F5F5F7] text-[13px] flex items-center gap-3 transition ${
                    activeLesson?.id === l.id
                      ? "bg-[#007AFF]/5 border-l-2 border-l-[#007AFF]"
                      : "hover:bg-[#F5F5F7]"
                  } ${l.isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {/* Status icon */}
                  {l.isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-[#34C759] flex-shrink-0" />
                  ) : l.isLocked ? (
                    <Lock className="h-4 w-4 text-[#86868B] flex-shrink-0" />
                  ) : activeLesson?.id === l.id ? (
                    <span className="h-4 w-4 rounded-full bg-[#007AFF] flex-shrink-0 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  ) : (
                    <span className="h-4 w-4 rounded-full border-2 border-[#E8E8ED] flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block truncate ${
                        l.isCompleted
                          ? "text-[#34C759]"
                          : l.isLocked
                          ? "text-[#86868B]"
                          : activeLesson?.id === l.id
                          ? "text-[#1D1D1F] font-medium"
                          : "text-[#6E6E73]"
                      }`}
                    >
                      {i + 1}. {l.title}
                    </span>
                    <span className="text-[10px] text-[#86868B]">
                      {l.durationMins} min
                    </span>
                  </div>
                  {!l.isLocked && !l.isCompleted && (
                    <ChevronRight className="h-3.5 w-3.5 text-[#E8E8ED] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ Main Content ═══ */}
          <div className="lg:col-span-2">
            {activeLesson && activeLesson.content ? (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
                {/* Lesson header */}
                <div className="border-b border-[#E8E8ED] px-8 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-[#86868B] mb-1">
                        Lesson {activeLesson.order} of {lessons.length}
                      </p>
                      <h2 className="text-lg font-display font-bold tracking-tight text-[#1D1D1F]">
                        {activeLesson.title}
                      </h2>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-[#86868B]">
                      <Clock className="h-3 w-3" />
                      {activeLesson.durationMins} min
                    </span>
                  </div>
                  {/* Lesson progress bar */}
                  <div className="mt-3 h-1 rounded-full bg-[#F5F5F7] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#007AFF] transition-all"
                      style={{
                        width: `${((activeLessonIdx + 1) / lessons.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Lesson content */}
                <div className="px-8 py-6">
                  <LessonContent content={activeLesson.content} />
                </div>

                {/* Lesson footer — navigation + mark complete */}
                <div className="border-t border-[#E8E8ED] px-8 py-5">
                  {enrollment && !activeLesson.isCompleted ? (
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToLesson("prev")}
                        disabled={activeLessonIdx === 0}
                      >
                        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                        Previous
                      </Button>
                      <Button
                        onClick={() => markComplete(activeLesson)}
                        loading={marking}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Complete & Continue
                      </Button>
                    </div>
                  ) : activeLesson.isCompleted ? (
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToLesson("prev")}
                        disabled={activeLessonIdx === 0}
                      >
                        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] text-[#34C759] font-medium flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" /> Completed
                        </span>
                        {activeLessonIdx < lessons.length - 1 ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => goToLesson("next")}
                          >
                            Next Lesson
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        ) : canTakeExam ? (
                          <Link
                            href={`/academy/${course.slug}/exam`}
                            className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition"
                          >
                            <Award className="h-4 w-4" />
                            Take Final Exam
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToLesson("prev")}
                        disabled={activeLessonIdx === 0}
                      >
                        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                        Previous
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToLesson("next")}
                        disabled={activeLessonIdx >= lessons.length - 1}
                      >
                        Next
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : !enrollment ? (
              /* Not enrolled — preview state */
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-12 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 text-center">
                <Lock className="mx-auto h-12 w-12 text-[#E8E8ED]" />
                <h2 className="mt-4 text-lg font-display font-bold tracking-tight text-[#1D1D1F]">
                  Enroll to access course content
                </h2>
                <p className="mt-2 text-[14px] text-[#6E6E73] max-w-sm mx-auto">
                  Get full access to all {course.totalLessons} lessons,
                  the final exam, and your CouthActs Academy certificate
                  upon passing.
                </p>
                <Button
                  className="mt-6"
                  size="lg"
                  onClick={handleEnroll}
                  loading={enrolling}
                >
                  Enroll &mdash; ${course.priceUsd}
                </Button>
              </div>
            ) : (
              /* Enrolled but no lesson selected */
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-12 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-[#E8E8ED]" />
                <p className="mt-4 text-[14px] text-[#6E6E73]">
                  Select a lesson from the sidebar to continue learning.
                </p>
              </div>
            )}

            {/* Exam CTA after all lessons complete */}
            {canTakeExam && activeLesson?.isCompleted && activeLessonIdx === lessons.length - 1 && (
              <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#1D1D1F] to-[#007AFF] p-8 text-center text-white">
                <Award className="mx-auto h-10 w-10" />
                <h3 className="mt-3 text-lg font-display font-bold tracking-tight">
                  All lessons complete!
                </h3>
                <p className="mt-2 text-[14px] text-white/70">
                  You&apos;re ready for the final exam. Score 70% or higher to
                  earn your CouthActs Academy certificate.
                </p>
                <Link
                  href={`/academy/${course.slug}/exam`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-[14px] font-bold text-[#007AFF] transition hover:scale-[1.02]"
                >
                  <Award className="h-4 w-4" />
                  Take Final Exam
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
