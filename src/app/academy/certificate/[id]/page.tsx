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
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-ocean-700 to-sky-600 p-10 text-center text-white">
            <Award className="mx-auto h-16 w-16" />
            <h1 className="mt-4 text-2xl font-display font-bold">CouthActs Academy</h1>
            <p className="mt-1 text-sm text-sky-200">Certificate of Completion</p>
          </div>

          {/* Body */}
          <div className="p-10 text-center">
            <p className="text-sm text-gray-500">This certifies that</p>
            <p className="mt-2 text-3xl font-display font-bold text-ocean-900">
              {enrollment.user.firstName} {enrollment.user.lastName}
            </p>
            <p className="mt-4 text-sm text-gray-500">has successfully completed the</p>
            <p className="mt-2 text-xl font-display font-semibold text-ocean-800">
              {enrollment.course.title}
            </p>
            <p className="mt-1 text-sm text-gray-400">{enrollment.course.category.replace(/_/g, " ")} &middot; {enrollment.course.duration}</p>

            <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Exam passed with {enrollment.examScore}%</p>
            </div>

            <div className="mt-6 rounded-xl bg-cream-50 p-4 inline-block">
              <p className="text-xs text-gray-400">Certificate ID</p>
              <p className="text-sm font-mono font-bold text-ocean-700">{enrollment.certificateId}</p>
              <p className="text-xs text-gray-400 mt-1">
                Issued {enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-10 py-6 text-center">
            <p className="text-xs text-gray-400">
              This certificate is issued by CouthActs Academy, operated by CouthActs, Inc. Intellectual property of Enemo Consulting Group, Inc.
              <br />
              Founded November 27, 2021 &middot; The Adolphus Tower, Dallas, TX
            </p>
            <p className="mt-2 text-xs text-gray-300">Verified by CouthActs&trade; &middot; couthacts.com</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
