"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { getModeByEnum, type TransportModeKey } from "@/lib/seo/modes";
import { Zap, MapPin, Clock, ArrowRight } from "lucide-react";

interface InstantJob {
  id: string;
  mode: string;
  originAddress: string;
  destinationAddress: string;
  budgetUsd: string;
  createdAt: string;
  expiresAt: string;
}

export default function ProviderInstantPage() {
  const [online, setOnline] = useState(false);
  const [jobs, setJobs] = useState<InstantJob[]>([]);
  const [accepting, setAccepting] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<{ bookingId: string; trackingCode: string } | null>(null);

  useEffect(() => {
    if (!online) return;
    const poll = setInterval(async () => {
      const res = await fetch("/api/browse?sort=newest&urgent=true").then((r) => r.json()).catch(() => ({ postings: [] }));
      const now = new Date();
      const instant = (res.postings || []).filter(
        (p: InstantJob & { isUrgent: boolean; isBiddingEnabled: boolean }) =>
          p.isUrgent && !p.isBiddingEnabled && new Date(p.expiresAt) > now,
      );
      setJobs(instant);
    }, 3000);
    return () => clearInterval(poll);
  }, [online]);

  async function acceptJob(postingId: string) {
    setAccepting(postingId);
    const res = await fetch("/api/instant/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postingId }),
    });
    const data = await res.json();
    if (res.ok) {
      setAccepted({ bookingId: data.bookingId, trackingCode: data.trackingCode });
      setJobs((prev) => prev.filter((j) => j.id !== postingId));
    } else {
      alert(data.error || "Could not accept job");
    }
    setAccepting(null);
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
        <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-10">
          <div className="pointer-events-none absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute top-10 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                  <Zap className="h-3.5 w-3.5 text-[#FF7A59]" aria-hidden="true" />
                  <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                    Provider instant feed
                  </span>
                </div>
                <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl">
                  Jobs, as they{" "}
                  <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
                    happen.
                  </span>
                </h1>
                <p className="mt-3 text-[15px] text-[#1D1D1F]/55 max-w-md">
                  Go online and we&rsquo;ll ping you when a customer nearby needs a ride or a delivery
                  right now. First to accept wins the job.
                </p>
              </div>

              {/* Online toggle */}
              <button
                type="button"
                onClick={() => setOnline(!online)}
                aria-pressed={online}
                aria-label={online ? "Go offline" : "Go online"}
                className={`flex-shrink-0 rounded-full border p-1.5 transition-all ${
                  online
                    ? "bg-gradient-to-r from-[#34C759] to-[#5AC8FA] border-transparent shadow-[0_8px_24px_rgba(52,199,89,0.35)]"
                    : "bg-white/80 backdrop-blur border-[#1D1D1F]/10 hover:border-[#1D1D1F]/30"
                }`}
              >
                <span className="flex items-center gap-2 pl-3 pr-1.5">
                  <span
                    className={`text-[12px] font-display font-bold uppercase tracking-wider ${
                      online ? "text-white" : "text-[#1D1D1F]/50"
                    }`}
                  >
                    {online ? "Online" : "Offline"}
                  </span>
                  <span
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      online ? "bg-white/25" : "bg-[#1D1D1F]/10"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                        online ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="relative pb-20">
          <div className="mx-auto max-w-2xl px-6">
            {!online ? (
              <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white p-10 sm:p-12 text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FFFBF5] text-3xl shadow-sm" aria-hidden="true">
                  💤
                </span>
                <h2 className="mt-5 text-2xl font-display font-black text-[#1D1D1F]">
                  You&rsquo;re offline
                </h2>
                <p className="mt-3 text-[14px] text-[#1D1D1F]/55 max-w-sm mx-auto">
                  Flip the toggle above to start receiving instant requests in your area. You&rsquo;ll
                  see each one here with a 90-second window to accept.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { emoji: "⚡", title: "Instant pings", desc: "Pop up in seconds" },
                    { emoji: "🎯", title: "First-to-accept", desc: "Win the job" },
                    { emoji: "💰", title: "Paid fast", desc: "Escrow releases on arrival" },
                  ].map((s) => (
                    <div key={s.title} className="rounded-2xl bg-[#FFFBF5] border border-[#1D1D1F]/5 px-3 py-3">
                      <span className="text-lg" aria-hidden="true">{s.emoji}</span>
                      <p className="mt-1 text-[11px] font-display font-bold text-[#1D1D1F]">{s.title}</p>
                      <p className="text-[10px] text-[#1D1D1F]/50 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Online pulse bar */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEFBF1] via-white to-[#E8F7EC] border border-[#34C759]/25 px-5 py-3.5 shadow-[0_2px_16px_rgba(52,199,89,0.08)]">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3 flex-shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34C759] opacity-70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#34C759]" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] font-display font-bold text-[#1D1D1F]">
                        You&rsquo;re live
                      </p>
                      <p className="text-[11px] text-[#1D1D1F]/55">
                        Listening for instant requests within your service area.
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#34C759]">
                      {jobs.length} open
                    </span>
                  </div>
                </div>

                {/* Accepted banner */}
                {accepted && (
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#EEFBF1] via-white to-[#E8F7EC] border border-[#34C759]/25 p-6 shadow-[0_12px_40px_rgba(52,199,89,0.12)]">
                    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#34C759]/15 blur-3xl" aria-hidden="true" />
                    <div className="relative flex items-start gap-4">
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow text-2xl" aria-hidden="true">
                        🎉
                      </span>
                      <div className="flex-1">
                        <p className="text-[17px] font-display font-black text-[#1D1D1F]">Job accepted!</p>
                        <p className="mt-1 text-[12px] text-[#1D1D1F]/55">
                          Tracking{" "}
                          <span className="font-mono font-bold text-[#1D1D1F]">{accepted.trackingCode}</span>
                        </p>
                        <Link
                          href={`/bookings/${accepted.bookingId}`}
                          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-5 py-2 text-[12px] font-semibold text-white hover:bg-[#34C759] transition-colors"
                        >
                          Open booking
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {jobs.length === 0 && !accepted && (
                  <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white p-10 text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFFBF5] text-2xl shadow-sm" aria-hidden="true">
                      🎧
                    </span>
                    <p className="mt-4 text-[14px] font-display font-bold text-[#1D1D1F]">
                      Nothing yet — you&rsquo;re on deck
                    </p>
                    <p className="mt-1 text-[12px] text-[#1D1D1F]/55">
                      Keep this tab open and we&rsquo;ll light it up the moment a request comes in.
                    </p>
                  </div>
                )}

                {/* Job cards */}
                {jobs.map((job) => {
                  const info = getModeByEnum(job.mode as TransportModeKey);
                  const remaining = Math.max(0, Math.round((new Date(job.expiresAt).getTime() - Date.now()) / 1000));
                  const pct = Math.min(100, Math.max(0, (remaining / 90) * 100));
                  const urgent = remaining < 30;
                  return (
                    <div
                      key={job.id}
                      className="relative overflow-hidden rounded-[1.5rem] bg-white/85 backdrop-blur-xl border border-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                    >
                      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#B5E3FF]/45 blur-3xl" aria-hidden="true" />

                      <div className="relative flex items-start gap-4">
                        <span
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FFFBF5] text-2xl shadow-sm"
                          aria-hidden="true"
                        >
                          {info?.emoji ?? "📦"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-[#1D1D1F] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                              {info?.label ?? job.mode.replace(/_/g, " ")}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                urgent ? "bg-[#FF3B30] text-white" : "bg-[#007AFF]/10 text-[#007AFF]"
                              }`}
                            >
                              <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                              {remaining}s
                            </span>
                          </div>

                          <div className="mt-3 flex items-start gap-2 text-[13px]">
                            <MapPin className="h-4 w-4 text-[#FF7A59] mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#1D1D1F] truncate">{job.originAddress}</p>
                              <p className="mt-0.5 text-[#1D1D1F]/50">
                                → <span className="text-[#1D1D1F]/80">{job.destinationAddress}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F]/40">
                            Budget
                          </p>
                          <p className="text-2xl font-display font-black text-[#34C759] tabular-nums">
                            ${Number(job.budgetUsd).toFixed(0)}
                          </p>
                        </div>
                      </div>

                      {/* Countdown bar */}
                      <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F5F7]">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            urgent ? "bg-[#FF3B30]" : "bg-gradient-to-r from-[#34C759] to-[#007AFF]"
                          }`}
                          style={{ width: `${pct}%` }}
                          role="progressbar"
                          aria-valuenow={remaining}
                          aria-valuemin={0}
                          aria-valuemax={90}
                        />
                      </div>

                      <Button
                        className="w-full mt-4"
                        size="lg"
                        onClick={() => acceptJob(job.id)}
                        loading={accepting === job.id}
                      >
                        <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                        Accept job
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
