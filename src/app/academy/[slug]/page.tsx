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
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  if (!course)
    return (
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-gray-500">Course not found</p>
        </div>
      </div>
    );

  const activeLessonIdx = activeLesson
    ? lessons.findIndex((l) => l.id === activeLesson.id)
    : -1;
  const allComplete = enrollment?.progress === 100;
  const canTakeExam = allComplete && enrollment && !enrollment.examPassed;

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-700 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Academy
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ═══ Sidebar ═══ */}
          <div className="lg:col-span-1 space-y-4">
            {/* Course info */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-ocean-600" />
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    course.level === "BEGINNER"
                      ? "text-green-600"
                      : course.level === "INTERMEDIATE"
                      ? "text-sky-600"
                      : "text-purple-600"
                  }`}
                >
                  {course.level}
                </span>
              </div>
              <h1 className="text-xl font-display font-bold text-ocean-900">
                {course.title}
              </h1>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
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
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <Award className="h-5 w-5" /> Certified &mdash;{" "}
                    {enrollment.examScore}%
                  </div>
                  {enrollment.certificateId && (
                    <Link
                      href={`/academy/certificate/${enrollment.certificateId}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-ocean-600 px-4 py-2 text-xs font-semibold text-white hover:bg-ocean-700 transition"
                    >
                      <Award className="h-3.5 w-3.5" />
                      View Certificate
                    </Link>
                  )}
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-ocean-700">
                      {enrollment.progress}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-ocean-500 transition-all duration-500"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {enrollment.lessonsComplete} of {course.totalLessons}{" "}
                    lessons completed
                  </p>
                  {canTakeExam && (
                    <Link
                      href={`/academy/${course.slug}/exam`}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ocean-600 px-4 py-3 text-sm font-semibold text-white hover:bg-ocean-700 transition"
                    >
                      <Award className="h-4 w-4" />
                      Take Final Exam
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* What you'll learn */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-ocean-800 mb-3">
                What you&apos;ll learn
              </p>
              <ul className="space-y-2">
                {course.whatYouLearn.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lesson list */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-ocean-800">
                  Course Outline
                </p>
              </div>
              {lessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => !l.isLocked && setActiveLesson(l)}
                  disabled={l.isLocked}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 text-sm flex items-center gap-3 transition ${
                    activeLesson?.id === l.id
                      ? "bg-ocean-50 border-l-2 border-l-ocean-600"
                      : "hover:bg-gray-50"
                  } ${l.isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {/* Status icon */}
                  {l.isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : l.isLocked ? (
                    <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  ) : activeLesson?.id === l.id ? (
                    <span className="h-4 w-4 rounded-full bg-ocean-600 flex-shrink-0 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  ) : (
                    <span className="h-4 w-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block truncate ${
                        l.isCompleted
                          ? "text-green-700"
                          : l.isLocked
                          ? "text-gray-400"
                          : activeLesson?.id === l.id
                          ? "text-ocean-800 font-medium"
                          : "text-ocean-700"
                      }`}
                    >
                      {i + 1}. {l.title}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {l.durationMins} min
                    </span>
                  </div>
                  {!l.isLocked && !l.isCompleted && (
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ Main Content ═══ */}
          <div className="lg:col-span-2">
            {activeLesson && activeLesson.content ? (
              <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                {/* Lesson header */}
                <div className="border-b border-gray-100 px-8 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Lesson {activeLesson.order} of {lessons.length}
                      </p>
                      <h2 className="text-lg font-display font-bold text-ocean-900">
                        {activeLesson.title}
                      </h2>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {activeLesson.durationMins} min
                    </span>
                  </div>
                  {/* Lesson progress bar */}
                  <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-ocean-400 transition-all"
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
                <div className="border-t border-gray-100 px-8 py-5">
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
                        <span className="text-sm text-green-600 font-medium flex items-center gap-1">
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
                            className="inline-flex items-center gap-2 rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-700 transition"
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
              <div className="rounded-2xl bg-white p-12 shadow-sm border border-gray-100 text-center">
                <Lock className="mx-auto h-12 w-12 text-gray-200" />
                <h2 className="mt-4 text-lg font-display font-bold text-ocean-900">
                  Enroll to access course content
                </h2>
                <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
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
              <div className="rounded-2xl bg-white p-12 shadow-sm border border-gray-100 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-200" />
                <p className="mt-4 text-gray-500">
                  Select a lesson from the sidebar to continue learning.
                </p>
              </div>
            )}

            {/* Exam CTA after all lessons complete */}
            {canTakeExam && activeLesson?.isCompleted && activeLessonIdx === lessons.length - 1 && (
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-ocean-700 to-sky-600 p-8 text-center text-white">
                <Award className="mx-auto h-10 w-10" />
                <h3 className="mt-3 text-lg font-display font-bold">
                  All lessons complete!
                </h3>
                <p className="mt-2 text-sm text-sky-100/80">
                  You&apos;re ready for the final exam. Score 70% or higher to
                  earn your CouthActs Academy certificate.
                </p>
                <Link
                  href={`/academy/${course.slug}/exam`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-ocean-700 transition hover:scale-[1.02]"
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
