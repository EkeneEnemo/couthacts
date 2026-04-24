"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAvailableTiers, getInsuranceFee } from "@/lib/insurance";
import { Zap, Clock, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const MODES = [
  { key: "TAXI_RIDE", label: "Taxi", emoji: "🚕", tagline: "Around town" },
  { key: "LIMOUSINE", label: "Limo", emoji: "🚘", tagline: "Arrive in style" },
  { key: "COURIER_LAST_MILE", label: "Courier", emoji: "📦", tagline: "Same-day drop" },
];

export default function InstantPage() {
  const [mode, setMode] = useState("TAXI_RIDE");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [note, setNote] = useState("");
  const [insurance, setInsurance] = useState("NONE");
  const [requesting, setRequesting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [countdown, setCountdown] = useState(90);
  const [matched, setMatched] = useState<{ bookingId: string; providerName: string; trackingCode: string } | null>(null);
  const [expired, setExpired] = useState(false);
  const [postingId, setPostingId] = useState<string | null>(null);

  useEffect(() => {
    if (!searching) return;
    if (countdown <= 0) {
      setSearching(false);
      setExpired(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [searching, countdown]);

  useEffect(() => {
    if (!searching || !postingId) return;
    const poll = setInterval(async () => {
      const res = await fetch(`/api/postings/${postingId}`).then((r) => r.json()).catch(() => null);
      if (res?.posting?.booking) {
        setMatched({
          bookingId: res.posting.booking.id,
          providerName: res.posting.booking.provider?.businessName || "Provider",
          trackingCode: res.posting.booking.trackingCode || "",
        });
        setSearching(false);
        clearInterval(poll);
      }
    }, 3000);
    return () => clearInterval(poll);
  }, [searching, postingId]);

  async function handleRequest() {
    if (!origin || !destination || !budget) return;
    setRequesting(true);
    try {
      const res = await fetch("/api/instant/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          originAddress: origin,
          destinationAddress: destination,
          budgetUsd: parseFloat(budget),
          insuranceTier: insurance,
          description: note,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Request failed");
        setRequesting(false);
        return;
      }
      setPostingId(data.postingId);
      setSearching(true);
      setCountdown(90);
    } catch {
      alert("Something went wrong");
    }
    setRequesting(false);
  }

  const budgetNum = parseFloat(budget) || 0;
  const insFee = getInsuranceFee(insurance, budgetNum);
  const activeMode = MODES.find((m) => m.key === mode) ?? MODES[0];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
        <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-10">
          <div className="pointer-events-none absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#B5E3FF]/50 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute top-10 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-[#FFB8C9]/35 blur-3xl" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF7A59] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF7A59]" />
              </span>
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                CouthActs Instant · 90-second match
              </span>
            </div>
            <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl lg:text-6xl">
              Need one{" "}
              <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
                right now?
              </span>
            </h1>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55 max-w-xl mx-auto">
              Tell us where you are and where you&rsquo;re going. Verified drivers near you respond in
              under 90 seconds.
            </p>
          </div>
        </section>

        <section className="relative pb-20">
          <div className="mx-auto max-w-xl px-6">
            {/* Matched state */}
            {matched && (
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#EEFBF1] via-white to-[#E8F7EC] border border-[#34C759]/25 p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(52,199,89,0.15)]">
                <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#34C759]/20 blur-3xl" aria-hidden="true" />
                <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-lg text-3xl" aria-hidden="true">🎉</span>
                <h2 className="relative mt-5 text-3xl font-display font-black text-[#1D1D1F]">
                  You&rsquo;re matched!
                </h2>
                <p className="relative mt-3 text-[15px] text-[#1D1D1F]/65">
                  <span className="font-semibold text-[#1D1D1F]">{matched.providerName}</span> accepted your request.
                </p>
                <div className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white border border-[#34C759]/25 px-4 py-2 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F]/50">Tracking code</span>
                  <span className="font-mono font-bold text-[#1D1D1F]">{matched.trackingCode}</span>
                </div>
                <Link
                  href={`/bookings/${matched.bookingId}`}
                  className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg hover:bg-[#34C759] transition-colors"
                >
                  View booking
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Expired state */}
            {expired && !matched && (
              <div className="rounded-[2rem] bg-gradient-to-br from-[#FFF3E0] via-white to-[#FFF1E8] border border-[#FF9500]/20 p-8 sm:p-10 text-center shadow-[0_12px_40px_rgba(255,149,0,0.12)]">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-lg text-3xl" aria-hidden="true">⏰</span>
                <h2 className="mt-5 text-2xl font-display font-black text-[#1D1D1F]">
                  No one free right now
                </h2>
                <p className="mt-3 text-[14px] text-[#1D1D1F]/65 max-w-sm mx-auto">
                  We&rsquo;ve saved your request as a regular posting. Drivers can still bid on it the
                  normal way.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg hover:bg-[#007AFF] transition-colors"
                >
                  Go to dashboard
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Searching state */}
            {searching && !matched && (
              <div className="relative overflow-hidden rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(0,122,255,0.12)]">
                <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-[#B5E3FF]/50 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#FFD8B5]/40 blur-3xl" aria-hidden="true" />

                <div className="relative mx-auto h-40 w-40">
                  <div className="absolute inset-0 rounded-full border-2 border-[#007AFF]/25 animate-ping opacity-30" />
                  <div className="absolute inset-5 rounded-full border-2 border-[#007AFF]/35 animate-ping opacity-40 animation-delay-300" />
                  <div className="absolute inset-10 rounded-full border-2 border-[#007AFF]/50 animate-ping opacity-50 animation-delay-600" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#EAF4FF] to-[#FFF1E3] flex items-center justify-center">
                    <div>
                      <p className="text-4xl font-display font-black text-[#1D1D1F] tabular-nums">{countdown}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">seconds</p>
                    </div>
                  </div>
                </div>

                <p className="relative mt-6 text-[16px] font-display font-bold text-[#1D1D1F]">
                  Finding a {activeMode.label.toLowerCase()} near you…
                </p>
                <p className="relative mt-1 text-[13px] text-[#1D1D1F]/55">
                  Verified providers within range are getting your ping right now.
                </p>

                <div className="relative mt-6 h-2 w-full overflow-hidden rounded-full bg-[#F5F5F7]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] transition-all duration-1000"
                    style={{ width: `${(countdown / 90) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={countdown}
                    aria-valuemin={0}
                    aria-valuemax={90}
                  />
                </div>
              </div>
            )}

            {/* Request form */}
            {!searching && !matched && !expired && (
              <div className="relative overflow-hidden rounded-[2rem] bg-white/85 backdrop-blur-xl border border-white p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#FFD8B5]/30 blur-3xl" aria-hidden="true" />

                <div className="relative space-y-5">
                  {/* Mode toggle */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50 mb-2">
                      I need a
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {MODES.map((m) => {
                        const isActive = mode === m.key;
                        return (
                          <button
                            key={m.key}
                            type="button"
                            onClick={() => setMode(m.key)}
                            className={`relative rounded-2xl border p-3 text-center transition-all ${
                              isActive
                                ? "border-transparent bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] text-white shadow-[0_8px_24px_rgba(0,122,255,0.28)]"
                                : "border-[#1D1D1F]/8 bg-white hover:border-[#007AFF]/30 hover:-translate-y-0.5"
                            }`}
                          >
                            <span className="text-2xl" aria-hidden="true">{m.emoji}</span>
                            <p className={`mt-1 text-[13px] font-display font-bold ${isActive ? "text-white" : "text-[#1D1D1F]"}`}>
                              {m.label}
                            </p>
                            <p className={`text-[10px] ${isActive ? "text-white/75" : "text-[#1D1D1F]/50"}`}>
                              {m.tagline}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="absolute left-4 top-[42px] text-lg" aria-hidden="true">📍</span>
                      <Input
                        label="Pickup"
                        placeholder="Address or landmark"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="pl-11"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-[42px] text-lg" aria-hidden="true">🎯</span>
                      <Input
                        label="Drop-off"
                        placeholder="Address or landmark"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-11"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-[42px] text-lg" aria-hidden="true">💵</span>
                    <Input
                      label="Your budget (USD)"
                      type="number"
                      placeholder="0.00"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="pl-11"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-1.5">
                      Note (optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Luggage, stops, special requests…"
                      className="w-full rounded-xl border border-[#1D1D1F]/10 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 resize-none"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  {/* Protection */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-[#34C759]" aria-hidden="true" />
                      <p className="text-[13px] font-semibold text-[#1D1D1F]">Protection</p>
                    </div>
                    <div className="space-y-2">
                      {getAvailableTiers(mode).map((t) => {
                        const isActive = insurance === t.key;
                        return (
                          <label
                            key={t.key}
                            className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer text-[14px] transition-all ${
                              isActive
                                ? "border-[#34C759] bg-[#EEFBF1]"
                                : "border-[#1D1D1F]/8 hover:border-[#34C759]/30"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="ins"
                                checked={isActive}
                                onChange={() => setInsurance(t.key)}
                                className="sr-only"
                              />
                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                                  isActive ? "border-[#34C759] bg-[#34C759]" : "border-[#1D1D1F]/20"
                                }`}
                              >
                                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                              </span>
                              <span className="font-semibold text-[#1D1D1F]">{t.label}</span>
                            </div>
                            <span className={`text-[13px] font-semibold ${isActive ? "text-[#34C759]" : "text-[#1D1D1F]/55"}`}>
                              {t.key === "NONE" ? "Free" : `$${t.fee(budgetNum).toFixed(2)}`}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {budgetNum > 0 && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#FFFBF5] to-white border border-[#1D1D1F]/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50 mb-2">
                        Payment summary
                      </p>
                      <div className="space-y-1.5 text-[13px]">
                        <div className="flex justify-between">
                          <span className="text-[#1D1D1F]/65">Budget</span>
                          <span className="font-semibold text-[#1D1D1F] tabular-nums">${budgetNum.toFixed(2)}</span>
                        </div>
                        {insFee > 0 && (
                          <div className="flex justify-between">
                            <span className="text-[#1D1D1F]/65">Insurance</span>
                            <span className="font-semibold text-[#1D1D1F] tabular-nums">${insFee.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="h-px bg-[#1D1D1F]/8 my-2" />
                        <div className="flex justify-between font-display font-bold text-[#1D1D1F]">
                          <span>Total from wallet</span>
                          <span className="tabular-nums">${(budgetNum + insFee).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleRequest}
                    loading={requesting}
                    disabled={!origin || !destination || !budget}
                  >
                    <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                    Request now
                  </Button>

                  <div className="flex items-center gap-2 justify-center text-[11px] text-[#1D1D1F]/45">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>90-second match window. No match? Converts to standard posting.</span>
                  </div>
                </div>
              </div>
            )}

            {/* How it works footer (shown with form only) */}
            {!searching && !matched && !expired && (
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { emoji: "⚡", title: "Instant ping", desc: "Drivers get your request within 90s" },
                  { emoji: "🛡️", title: "Escrow-safe", desc: "Money held until you arrive" },
                  { emoji: "📍", title: "Live track", desc: "Watch your ride on a live map" },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl bg-white/70 backdrop-blur border border-white px-4 py-3 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                  >
                    <span className="text-lg" aria-hidden="true">{s.emoji}</span>
                    <p className="mt-1 text-[12px] font-display font-bold text-[#1D1D1F]">{s.title}</p>
                    <p className="text-[10px] text-[#1D1D1F]/50 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
