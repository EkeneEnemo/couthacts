"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, BookOpen, Award, CheckCircle, Lock } from "lucide-react";

interface Lesson { id: string; title: string; order: number; durationMins: number; content: string | null; isLocked: boolean; isCompleted: boolean }
interface CourseData {
  id: string; title: string; slug: string; description: string; whatYouLearn: string[];
  category: string; priceUsd: number; duration: string; totalLessons: number; level: string; enrolledCount: number;
}
interface Enrollment { id: string; progress: number; lessonsComplete: number; examPassed: boolean; examScore: number | null; examAttempts: number; certificateId: string | null }

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
    fetch(`/api/academy/courses/${params.slug}`).then((r) => r.json()).then((d) => {
      setCourse(d.course); setLessons(d.lessons || []); setEnrollment(d.enrollment);
      setLoading(false);
    });
  }, [params.slug]);

  async function handleEnroll() {
    if (!course) return;
    setEnrolling(true);
    const res = await fetch("/api/academy/enroll", {
      method: "POST", headers: { "Content-Type": "application/json" },
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
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollmentId: enrollment.id, lessonId: lesson.id }),
    });
    // Refresh
    const res = await fetch(`/api/academy/courses/${params.slug}`).then((r) => r.json());
    setLessons(res.lessons); setEnrollment(res.enrollment);
    setMarking(false);
    // Auto-advance
    const idx = lessons.findIndex((l) => l.id === lesson.id);
    if (idx < lessons.length - 1) setActiveLesson(lessons[idx + 1]);
  }

  if (loading) return <div className="min-h-screen bg-cream-50"><Navbar /><div className="mx-auto max-w-4xl px-6 py-20 text-center"><div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" /></div></div>;
  if (!course) return <div className="min-h-screen bg-cream-50"><Navbar /><div className="mx-auto max-w-4xl px-6 py-20 text-center"><p className="text-gray-500">Course not found</p></div></div>;

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-ocean-600" />
                <span className="text-xs font-bold text-ocean-600 uppercase">{course.level}</span>
              </div>
              <h1 className="text-xl font-display font-bold text-ocean-900">{course.title}</h1>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.totalLessons} lessons</span>
              </div>
              {!enrollment ? (
                <Button className="w-full mt-4" size="lg" onClick={handleEnroll} loading={enrolling}>
                  Enroll — ${course.priceUsd}
                </Button>
              ) : enrollment.examPassed ? (
                <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
                  <Award className="h-5 w-5" /> Certified
                </div>
              ) : (
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-ocean-500 transition-all" style={{ width: `${enrollment.progress}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{enrollment.progress}% complete</p>
                  {enrollment.progress === 100 && !enrollment.examPassed && (
                    <a href={`/academy/${course.slug}/exam`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ocean-600 hover:text-ocean-700">
                      Take Exam <Award className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* What you'll learn */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-ocean-800 mb-3">What you&apos;ll learn</p>
              <ul className="space-y-2">
                {course.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lesson list */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-ocean-800">Lessons</p>
              </div>
              {lessons.map((l) => (
                <button key={l.id} onClick={() => !l.isLocked && setActiveLesson(l)}
                  disabled={l.isLocked}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 text-sm flex items-center gap-3 transition ${activeLesson?.id === l.id ? "bg-ocean-50" : "hover:bg-gray-50"} ${l.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                  {l.isCompleted ? <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" /> : l.isLocked ? <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" /> : <span className="h-4 w-4 rounded-full border-2 border-gray-300 flex-shrink-0" />}
                  <span className={l.isCompleted ? "text-green-700" : l.isLocked ? "text-gray-400" : "text-ocean-800"}>{l.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            {activeLesson && activeLesson.content ? (
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Lesson {activeLesson.order}</p>
                <h2 className="text-xl font-display font-bold text-ocean-900 mb-6">{activeLesson.title}</h2>
                <div className="prose prose-sm prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {activeLesson.content}
                </div>
                {enrollment && !activeLesson.isCompleted && (
                  <Button className="mt-6" onClick={() => markComplete(activeLesson)} loading={marking}>
                    Mark Lesson Complete
                  </Button>
                )}
                {activeLesson.isCompleted && (
                  <p className="mt-6 text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" /> Lesson completed
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-12 shadow-sm border border-gray-100 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">
                  {enrollment ? "Select a lesson from the sidebar to start learning." : "Enroll to unlock all lessons."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
