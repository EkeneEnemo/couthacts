import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import {
  CheckCircle,
  Shield,
} from "lucide-react";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await db.user.findUnique({
    where: { id: params.id },
    include: {
      provider: true,
      _count: {
        select: {
          postings: true,
          bookings: true,
          reviewsGiven: true,
        },
      },
    },
  });

  if (!user) notFound();

  const isVerified = user.kycStatus === "APPROVED";

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Profile header */}
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
            {/* Avatar */}
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user.firstName}'s profile`}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-ocean-100 text-3xl font-display font-bold text-ocean-700">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
              )}
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow">
                  <CheckCircle className="h-5 w-5 text-sky-500" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl font-display font-bold text-ocean-900">
                  {user.firstName} {user.lastName}
                </h1>
                {isVerified && (
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                    Verified
                  </span>
                )}
                {!isVerified && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    Unverified
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {user.role === "PROVIDER" ? "Transportation Provider" : "Customer"}
                {user.city && ` · ${user.city}`}
                {user.country && `, ${user.country}`}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-cream-50 p-4 text-center">
              <p className="text-2xl font-display font-bold text-ocean-700">{user.trustScore}</p>
              <p className="text-xs text-gray-500">Trust Score</p>
            </div>
            <div className="rounded-xl bg-cream-50 p-4 text-center">
              <p className="text-2xl font-display font-bold text-ocean-700">{user._count.postings}</p>
              <p className="text-xs text-gray-500">Jobs Posted</p>
            </div>
            <div className="rounded-xl bg-cream-50 p-4 text-center">
              <p className="text-2xl font-display font-bold text-ocean-700">{user._count.bookings}</p>
              <p className="text-xs text-gray-500">Bookings</p>
            </div>
            <div className="rounded-xl bg-cream-50 p-4 text-center">
              <p className="text-2xl font-display font-bold text-ocean-700">{user._count.reviewsGiven}</p>
              <p className="text-xs text-gray-500">Reviews Given</p>
            </div>
          </div>
        </div>

        {/* Provider section */}
        {user.provider && (
          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-ocean-600" />
              <h2 className="text-lg font-display font-semibold text-ocean-800">
                Provider Profile
              </h2>
              {user.provider.isVerified && (
                <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                  KYB Verified
                </span>
              )}
            </div>

            <p className="text-xl font-display font-bold text-ocean-900">
              {user.provider.businessName}
            </p>
            {user.provider.bio && (
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{user.provider.bio}</p>
            )}

            {/* Provider stats */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: "CouthActs Score", value: user.provider.couthActsScore },
                { label: "Tier", value: user.provider.scoreTier },
                { label: "Total Jobs", value: user.provider.totalJobs },
                { label: "On-Time", value: `${(user.provider.onTimeRate * 100).toFixed(0)}%` },
                { label: "Fleet Size", value: user.provider.fleetSize || "—" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-display font-bold text-ocean-700">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Transport modes */}
            {user.provider.modes.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">Transport Modes</p>
                <div className="flex flex-wrap gap-2">
                  {user.provider.modes.map((m: string) => (
                    <span key={m} className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-medium text-ocean-700">
                      {m.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {user.provider.certifications.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {user.provider.certifications.map((c: string) => (
                    <span key={c} className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Fleet photos */}
            {user.provider.fleetPhotoUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">Fleet & Equipment</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {user.provider.fleetPhotoUrls.map((url: string, i: number) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Fleet photo ${i + 1}`}
                      className="rounded-xl object-cover aspect-[4/3] w-full"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Service areas */}
            {user.provider.serviceArea.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  {user.provider.serviceArea.map((a: string) => (
                    <span key={a} className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
