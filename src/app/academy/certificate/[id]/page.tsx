import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Award, CheckCircle } from "lucide-react";
import { PrintButton } from "@/components/print-button";

export default async function CertificatePage({
  params,
}: {
  params: { id: string };
}) {
  const enrollment = await db.enrollment.findFirst({
    where: { certificateId: params.id },
    include: {
      user: { select: { firstName: true, lastName: true } },
      course: { select: { title: true, category: true, duration: true } },
    },
  });

  if (!enrollment) notFound();

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1D1D1F] to-[#007AFF] p-10 text-center text-white">
            <Award className="mx-auto h-16 w-16" />
            <h1 className="mt-4 text-2xl font-display font-bold tracking-tight">CouthActs Academy</h1>
            <p className="mt-1 text-[14px] text-white/60">Certificate of Completion</p>
          </div>

          {/* Body */}
          <div className="p-10 text-center">
            <p className="text-[13px] text-[#86868B]">This certifies that</p>
            <p className="mt-2 text-3xl font-display font-bold tracking-tight text-[#1D1D1F]">
              {enrollment.user.firstName} {enrollment.user.lastName}
            </p>
            <p className="mt-4 text-[13px] text-[#86868B]">has successfully completed the</p>
            <p className="mt-2 text-xl font-display font-semibold tracking-tight text-[#1D1D1F]">
              {enrollment.course.title}
            </p>
            <p className="mt-1 text-[13px] text-[#86868B]">{enrollment.course.category.replace(/_/g, " ")} &middot; {enrollment.course.duration}</p>

            <div className="mt-6 flex items-center justify-center gap-2 text-[#34C759]">
              <CheckCircle className="h-5 w-5" />
              <p className="text-[14px] font-medium">Exam passed with {enrollment.examScore}%</p>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-4 inline-block">
              <p className="text-[11px] text-[#86868B] uppercase tracking-[0.1em] font-semibold">Certificate ID</p>
              <p className="text-[14px] font-mono font-bold text-[#007AFF]">{enrollment.certificateId}</p>
              <p className="text-[11px] text-[#86868B] mt-1">
                Issued {enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#E8E8ED] px-10 py-6 text-center">
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              This certificate is issued by CouthActs&trade; Academy, operated by CouthActs&trade;, Inc., a wholly owned subsidiary of The Ravine of Willows, Inc.
              <br />
              The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202
            </p>
            <p className="mt-2 text-[11px] text-[#E8E8ED]">Verified by CouthActs&trade; &middot; couthacts.com</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
