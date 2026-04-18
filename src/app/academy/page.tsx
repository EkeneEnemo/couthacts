"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Clock, BookOpen, Award, ChevronRight, User } from "lucide-react";

interface Course {
  id: string; title: string; slug: string; description: string;
  whatYouLearn: string[]; category: string; priceUsd: number;
  duration: string; totalLessons: number; level: string;
  enrollment: { progress: number; examPassed: boolean; certificateId: string | null } | null;
}

const CATEGORIES = [
  { key: "", label: "All", emoji: "✨" },
  { key: "PLATFORM_MASTERY", label: "Platform", emoji: "⚡" },
  { key: "GROUND_TRANSPORT", label: "Ground", emoji: "🚚" },
  { key: "FREIGHT_LOGISTICS", label: "Freight", emoji: "📦" },
  { key: "AIR_TRANSPORT", label: "Air", emoji: "✈️" },
  { key: "MARITIME", label: "Maritime", emoji: "⛵" },
  { key: "COMPLIANCE_SAFETY", label: "Compliance", emoji: "🛡️" },
  { key: "BUSINESS_OPERATIONS", label: "Business", emoji: "💼" },
];

const LEVEL_STYLES: Record<string, { bg: string; color: string; emoji: string }> = {
  BEGINNER: { bg: "#E8F7EC", color: "#34C759", emoji: "🌱" },
  INTERMEDIATE: { bg: "#E8F1FF", color: "#007AFF", emoji: "🚀" },
  ADVANCED: { bg: "#FFE8F0", color: "#FF6B9D", emoji: "💎" },
};

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [tab, setTab] = useState<"all" | "enrolled" | "completed">("all");

  useEffect(() => {
    fetch("/api/academy/courses").then((r) => r.json()).then((d) => {
      setCourses(d.courses || []);
      setLoading(false);
    });
  }, []);

  const enrolled = courses.filter((c) => c.enrollment && !c.enrollment.examPassed);
  const completed = courses.filter((c) => c.enrollment?.examPassed);

  let displayCourses = courses;
  if (tab === "enrolled") displayCourses = enrolled;
  else if (tab === "completed") displayCourses = completed;

  const filtered = category ? displayCourses.filter((c) => c.category === category) : displayCourses;

  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#FFE3A3]/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
            <span className="text-base">🎓</span>
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
              CouthActs Academy
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
            Learn. <span className="text-[#FF6B9D]">Earn.</span> Repeat.
          </h1>
          <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed">
            Real-world courses for transportation pros. Short, focused, and built to
            boost your CouthActs Score &mdash; so bigger jobs come to you.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 text-[13px] text-[#1D1D1F]/50">
            <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {courses.length} courses</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Self-paced</span>
            <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> Real certificates</span>
          </div>

          <p className="mt-4 text-[11px] text-[#1D1D1F]/40 max-w-xl mx-auto">
            Certificates are CouthActs credentials &mdash; they don&rsquo;t constitute government-issued licenses or regulatory approvals.
          </p>
        </div>

        {/* View tabs */}
        <div className="flex items-center justify-center gap-1 mb-6 rounded-full bg-white/70 backdrop-blur p-1 max-w-md mx-auto border border-white shadow-sm">
          {[
            { key: "all" as const, label: "All", icon: BookOpen },
            { key: "enrolled" as const, label: `Enrolled (${enrolled.length})`, icon: User },
            { key: "completed" as const, label: `Completed (${completed.length})`, icon: Award },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
                tab === t.key
                  ? "bg-[#1D1D1F] text-white shadow-sm"
                  : "text-[#1D1D1F]/55 hover:text-[#1D1D1F]"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map((c) => {
            const active = category === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                  active
                    ? "bg-[#FF7A59] text-white shadow-sm scale-[1.03]"
                    : "bg-white border border-[#1D1D1F]/10 text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59]"
                }`}
              >
                <span>{c.emoji}</span>
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Course grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-[1.5rem] bg-white/80 border border-white" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] bg-white border border-[#1D1D1F]/5">
            <span className="text-5xl">📚</span>
            <p className="mt-4 text-[14px] text-[#1D1D1F]/55">No courses here yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const level = LEVEL_STYLES[c.level] || { bg: "#FFFBF5", color: "#1D1D1F", emoji: "📘" };
              return (
                <Link
                  key={c.id}
                  href={`/academy/${c.slug}`}
                  className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: level.bg, color: level.color }}
                    >
                      <span>{level.emoji}</span>
                      {c.level}
                    </span>
                    <span className="rounded-full bg-[#FFF5E6] px-2.5 py-1 text-[10px] font-semibold text-[#FF7A59] uppercase tracking-wider">
                      {c.category.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-display font-bold text-[#1D1D1F] group-hover:text-[#FF7A59] transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#1D1D1F]/60 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-[#1D1D1F]/50">
                      <span>⏱ {c.duration}</span>
                      <span>{c.totalLessons} lessons</span>
                    </div>
                    <span className="text-[16px] font-display font-bold text-[#1D1D1F]">${c.priceUsd}</span>
                  </div>

                  {c.enrollment && (
                    <div className="mt-4">
                      {c.enrollment.examPassed ? (
                        <div className="flex items-center gap-1.5 rounded-full bg-[#E8F7EC] px-3 py-1.5 text-[11px] font-semibold text-[#34C759] w-fit">
                          <Award className="h-3.5 w-3.5" /> Certified 🎉
                        </div>
                      ) : (
                        <div>
                          <div className="h-1.5 rounded-full bg-[#FFFBF5] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FF7A59] to-[#FF6B9D] transition-all"
                              style={{ width: `${c.enrollment.progress}%` }}
                            />
                          </div>
                          <p className="mt-1.5 text-[11px] font-medium text-[#1D1D1F]/55">
                            {c.enrollment.progress}% through &mdash; keep going
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {!c.enrollment && (
                    <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-[#FF7A59] opacity-0 group-hover:opacity-100 transition-all">
                      Enroll <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
