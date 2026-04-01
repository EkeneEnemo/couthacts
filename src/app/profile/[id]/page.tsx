import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  CheckCircle,
  Shield,
  MapPin,
  Calendar,
  Star,
  Briefcase,
  MessageSquare,
  Truck,
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
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        {/* ── Profile hero ── */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
          <div className="px-5 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6 md:px-10 md:pt-10">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={`${user.firstName}'s profile`}
                    width={88}
                    height={88}
                    className="h-20 w-20 sm:h-[88px] sm:w-[88px] rounded-[22px] sm:rounded-[26px] object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-20 w-20 sm:h-[88px] sm:w-[88px] items-center justify-center rounded-[22px] sm:rounded-[26px] bg-gradient-to-br from-ocean-500 to-ocean-700 text-2xl sm:text-3xl font-display font-bold text-white shadow-lg shadow-ocean-500/20">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                )}
                {isVerified && (
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                    <CheckCircle className="h-5 w-5 text-[#34C759]" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center gap-2.5 justify-center sm:justify-start flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#1D1D1F] tracking-tight">
                    {user.firstName} {user.lastName}
                  </h1>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    isVerified
                      ? "bg-[#EEFBF1] text-[#1B8D36]"
                      : "bg-[#FFF3E0] text-[#E65100]"
                  }`}>
                    {isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-4 justify-center sm:justify-start flex-wrap text-[13px] text-[#86868B]">
                  <span>{user.role === "PROVIDER" ? "Transportation Provider" : "Customer"}</span>
                  {user.city && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {user.city}{user.country && `, ${user.country}`}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Since {memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stat bar ── */}
          <div className="border-t border-[#E8E8ED]/60 bg-[#FAFAFA]/50 px-5 py-4 sm:px-8 sm:py-5 md:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: user.trustScore, label: "Trust Score" },
                { value: user._count.postings, label: "Jobs Posted" },
                { value: user._count.bookings, label: "Bookings" },
                { value: user._count.reviewsGiven, label: "Reviews Given" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-[#1D1D1F]">{s.value}</p>
                  <p className="text-[11px] text-[#86868B] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Provider section ── */}
        {user.provider && (
          <div className="mt-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
            <div className="px-8 pt-8 pb-6 sm:px-10">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5F5F7]">
                  <Shield className="h-4 w-4 text-[#86868B]" />
                </div>
                <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
                  Provider Profile
                </h2>
                {user.provider.isVerified && (
                  <span className="rounded-full bg-[#EEFBF1] px-2.5 py-1 text-[11px] font-semibold text-[#1B8D36]">
                    KYB Verified
                  </span>
                )}
              </div>

              <p className="text-xl font-display font-bold text-[#1D1D1F]">
                {user.provider.businessName}
              </p>
              {user.provider.bio && (
                <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">{user.provider.bio}</p>
              )}
            </div>

            {/* Provider stats */}
            <div className="border-t border-[#E8E8ED]/60 bg-[#FAFAFA]/50 px-8 py-5 sm:px-10">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                {[
                  { label: "CouthActs Score", value: user.provider.couthActsScore, icon: Star },
                  { label: "Tier", value: user.provider.scoreTier, icon: Shield },
                  { label: "Total Jobs", value: user.provider.totalJobs, icon: Briefcase },
                  { label: "On-Time", value: `${(user.provider.onTimeRate * 100).toFixed(0)}%`, icon: MessageSquare },
                  { label: "Fleet Size", value: user.provider.fleetSize || "\u2014", icon: Truck },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80">
                      <s.icon className="h-3.5 w-3.5 text-[#86868B]" />
                    </div>
                    <div>
                      <p className="text-base font-display font-bold text-[#1D1D1F] leading-tight">{s.value}</p>
                      <p className="text-[10px] text-[#86868B]">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider details */}
            <div className="px-8 py-6 sm:px-10 space-y-6">
              {/* Transport modes */}
              {user.provider.modes.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">Transport Modes</p>
                  <div className="flex flex-wrap gap-2">
                    {user.provider.modes.map((m: string) => (
                      <span key={m} className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]">
                        {m.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {user.provider.certifications.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {user.provider.certifications.map((c: string) => (
                      <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-[#EEFBF1] px-3.5 py-1.5 text-[12px] font-medium text-[#1B8D36]">
                        <CheckCircle className="h-3 w-3" /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fleet photos */}
              {user.provider.fleetPhotoUrls.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">Fleet & Equipment</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {user.provider.fleetPhotoUrls.map((url: string, i: number) => (
                      <Image
                        key={i}
                        src={url}
                        alt={`Fleet photo ${i + 1}`}
                        width={400}
                        height={300}
                        className="rounded-2xl object-cover aspect-[4/3] w-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Service areas */}
              {user.provider.serviceArea.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">Service Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {user.provider.serviceArea.map((a: string) => (
                      <span key={a} className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
