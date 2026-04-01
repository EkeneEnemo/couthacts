"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { GraduationCap, Clock, BookOpen, Award, ChevronRight, User } from "lucide-react";

interface Course {
  id: string; title: string; slug: string; description: string;
  whatYouLearn: string[]; category: string; priceUsd: number;
  duration: string; totalLessons: number; level: string;
  enrollment: { progress: number; examPassed: boolean; certificateId: string | null } | null;
}

const CATEGORIES = [
  { key: "", label: "All" },
  { key: "PLATFORM_MASTERY", label: "Platform" },
  { key: "GROUND_TRANSPORT", label: "Ground" },
  { key: "FREIGHT_LOGISTICS", label: "Freight" },
  { key: "AIR_TRANSPORT", label: "Air" },
  { key: "MARITIME", label: "Maritime" },
  { key: "COMPLIANCE_SAFETY", label: "Compliance" },
  { key: "BUSINESS_OPERATIONS", label: "Business" },
];

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "bg-[#EEFBF1] text-[#34C759]",
  INTERMEDIATE: "bg-[#007AFF]/10 text-[#007AFF]",
  ADVANCED: "bg-purple-50 text-purple-600",
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
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-[#007AFF]" />
            <h1 className="text-3xl font-display font-bold tracking-tight text-[#1D1D1F]">CouthActs Academy</h1>
          </div>
          <p className="text-[14px] text-[#6E6E73]">
            Professional education built for the transportation industry.
            Real-world curriculum. Pass the exam. Earn your certificate.
          </p>
          <p className="mt-2 text-[11px] text-[#86868B] max-w-lg mx-auto">
            CouthActs Academy courses are professional development programs offered by CouthActs, Inc. Course completion certificates are CouthActs credentials and do not constitute government-issued licenses, certifications, or regulatory approvals.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[13px] text-[#86868B]">
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {courses.length} courses</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Self-paced</span>
            <span className="flex items-center gap-1"><Award className="h-4 w-4" /> Certificates</span>
          </div>
        </div>

        {/* View tabs — All / My Courses / Completed */}
        <div className="flex items-center justify-center gap-1 mb-6 rounded-2xl bg-white/60 backdrop-blur-xl p-1 max-w-md mx-auto border border-white/60">
          {[
            { key: "all" as const, label: "All Courses", icon: BookOpen },
            { key: "enrolled" as const, label: `Enrolled (${enrolled.length})`, icon: User },
            { key: "completed" as const, label: `Completed (${completed.length})`, icon: Award },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold transition ${
                tab === t.key ? "bg-white text-[#007AFF] shadow-[0_2px_20px_rgba(0,0,0,.04)]" : "text-[#86868B] hover:text-[#6E6E73]"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition ${category === c.key ? "bg-[#007AFF] text-white" : "bg-white/80 backdrop-blur-xl text-[#6E6E73] border border-[#E8E8ED] hover:border-[#86868B]"}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Course grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-64 animate-pulse rounded-3xl bg-white/80 border border-white/60" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="mx-auto h-12 w-12 text-[#E8E8ED]" />
            <p className="mt-4 text-[14px] text-[#6E6E73]">No courses available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link key={c.id} href={`/academy/${c.slug}`}
                className="group rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 hover:shadow-[0_4px_30px_rgba(0,0,0,.08)] hover:-translate-y-0.5 transition">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${LEVEL_COLORS[c.level] || "bg-[#F5F5F7] text-[#6E6E73]"}`}>
                    {c.level}
                  </span>
                  <span className="rounded-full bg-[#007AFF]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#007AFF]">
                    {c.category.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="text-[14px] font-display font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition">{c.title}</h3>
                <p className="mt-2 text-[13px] text-[#6E6E73] line-clamp-2">{c.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-[#86868B]">
                    <span>{c.duration}</span>
                    <span>{c.totalLessons} lessons</span>
                  </div>
                  <span className="text-[14px] font-bold text-[#1D1D1F]">${c.priceUsd}</span>
                </div>
                {/* Enrollment status */}
                {c.enrollment && (
                  <div className="mt-3">
                    {c.enrollment.examPassed ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#34C759]">
                        <Award className="h-3.5 w-3.5" /> Certified
                      </div>
                    ) : (
                      <div>
                        <div className="h-1.5 rounded-full bg-[#F5F5F7] overflow-hidden">
                          <div className="h-full rounded-full bg-[#007AFF]" style={{ width: `${c.enrollment.progress}%` }} />
                        </div>
                        <p className="mt-1 text-[10px] text-[#86868B]">{c.enrollment.progress}% complete</p>
                      </div>
                    )}
                  </div>
                )}
                {!c.enrollment && (
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#007AFF] opacity-0 group-hover:opacity-100 transition">
                    Enroll <ChevronRight className="h-3 w-3" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
