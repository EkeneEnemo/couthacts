"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { GraduationCap, Clock, BookOpen, Award, ChevronRight } from "lucide-react";

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
  BEGINNER: "bg-green-50 text-green-700",
  INTERMEDIATE: "bg-sky-50 text-sky-700",
  ADVANCED: "bg-purple-50 text-purple-700",
};

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("/api/academy/courses").then((r) => r.json()).then((d) => {
      setCourses(d.courses || []);
      setLoading(false);
    });
  }, []);

  const filtered = category ? courses.filter((c) => c.category === category) : courses;

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-ocean-600" />
            <h1 className="text-3xl font-display font-bold text-ocean-900">CouthActs Academy</h1>
          </div>
          <p className="text-base text-gray-500">
            Professional education built for the transportation industry.
            Real-world curriculum. Pass the exam. Earn your certificate.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {courses.length} courses</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Self-paced</span>
            <span className="flex items-center gap-1"><Award className="h-4 w-4" /> Certificates</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${category === c.key ? "bg-ocean-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Course grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-white border border-gray-100" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-gray-500">No courses available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link key={c.id} href={`/academy/${c.slug}`}
                className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${LEVEL_COLORS[c.level] || "bg-gray-100 text-gray-600"}`}>
                    {c.level}
                  </span>
                  <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-[10px] font-semibold text-ocean-700">
                    {c.category.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="text-base font-display font-semibold text-ocean-900 group-hover:text-ocean-700 transition">{c.title}</h3>
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">{c.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{c.duration}</span>
                    <span>{c.totalLessons} lessons</span>
                  </div>
                  <span className="text-sm font-bold text-ocean-700">${c.priceUsd}</span>
                </div>
                {/* Enrollment status */}
                {c.enrollment && (
                  <div className="mt-3">
                    {c.enrollment.examPassed ? (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                        <Award className="h-3.5 w-3.5" /> Certified
                      </div>
                    ) : (
                      <div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-ocean-500" style={{ width: `${c.enrollment.progress}%` }} />
                        </div>
                        <p className="mt-1 text-[10px] text-gray-400">{c.enrollment.progress}% complete</p>
                      </div>
                    )}
                  </div>
                )}
                {!c.enrollment && (
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-ocean-600 opacity-0 group-hover:opacity-100 transition">
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
