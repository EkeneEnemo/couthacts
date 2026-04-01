"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAvailableTiers, getInsuranceFee } from "@/lib/insurance";
import { Zap, Clock, CheckCircle, Shield } from "lucide-react";

const MODES = [
  { key: "TAXI_RIDE", label: "Taxi", icon: "🚕" },
  { key: "LIMOUSINE", label: "Limo", icon: "🚗" },
  { key: "COURIER_LAST_MILE", label: "Courier", icon: "📦" },
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

  // Countdown timer during search
  useEffect(() => {
    if (!searching) return;
    if (countdown <= 0) { setSearching(false); setExpired(true); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [searching, countdown]);

  // Poll for match during search
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
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, originAddress: origin, destinationAddress: destination, budgetUsd: parseFloat(budget), insuranceTier: insurance, description: note }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Request failed"); setRequesting(false); return; }
      setPostingId(data.postingId);
      setSearching(true);
      setCountdown(90);
    } catch { alert("Something went wrong"); }
    setRequesting(false);
  }

  const budgetNum = parseFloat(budget) || 0;
  const insFee = getInsuranceFee(insurance, budgetNum);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-xl px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="h-5 w-5 text-[#007AFF]" />
          <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">CouthActs Instant</h1>
        </div>

        {/* Matched state */}
        {matched && (
          <div className="rounded-3xl bg-[#EEFBF1] border border-[#34C759]/20 p-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-[#34C759]" />
            <h2 className="mt-4 text-xl font-display font-bold tracking-tight text-[#1D1D1F]">You&apos;re matched!</h2>
            <p className="mt-2 text-[14px] text-[#6E6E73]">{matched.providerName} has accepted your request.</p>
            <p className="mt-1 text-[11px] text-[#86868B]">Tracking code: <span className="font-mono font-bold">{matched.trackingCode}</span></p>
            <a href={`/bookings/${matched.bookingId}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#34C759] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition">
              View Booking
            </a>
          </div>
        )}

        {/* Expired state */}
        {expired && !matched && (
          <div className="rounded-3xl bg-[#FFF3E0] border border-[#FF9500]/20 p-8 text-center">
            <Clock className="mx-auto h-10 w-10 text-[#FF9500]" />
            <h2 className="mt-4 text-lg font-display font-bold tracking-tight text-[#1D1D1F]">No providers available right now</h2>
            <p className="mt-2 text-[14px] text-[#6E6E73]">Your request has been saved as a standard posting. Providers can still bid on it.</p>
            <a href="/dashboard" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-6 py-3 text-sm font-medium text-white hover:bg-[#0055D4] transition">
              Go to Dashboard
            </a>
          </div>
        )}

        {/* Searching state */}
        {searching && !matched && (
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 text-center shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            <div className="relative mx-auto h-32 w-32">
              {/* Radar pulse */}
              <div className="absolute inset-0 rounded-full border-2 border-[#007AFF]/30 animate-ping opacity-20" />
              <div className="absolute inset-4 rounded-full border-2 border-[#007AFF]/40 animate-ping opacity-30 animation-delay-300" />
              <div className="absolute inset-8 rounded-full border-2 border-[#007AFF]/50 animate-ping opacity-40 animation-delay-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-[#1D1D1F]">{countdown}s</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-[14px] font-medium text-[#1D1D1F]">Searching for providers near you...</p>
            <p className="text-[13px] text-[#86868B] mt-1">Hang tight — verified providers are being notified.</p>
            {/* Countdown ring */}
            <div className="mt-4 h-1.5 w-full rounded-full bg-[#F5F5F7] overflow-hidden">
              <div className="h-full rounded-full bg-[#007AFF] transition-all duration-1000" style={{ width: `${(countdown / 90) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Request form */}
        {!searching && !matched && !expired && (
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 space-y-5">
            {/* Mode toggle */}
            <div className="flex gap-2">
              {MODES.map((m) => (
                <button key={m.key} onClick={() => setMode(m.key)}
                  className={`flex-1 rounded-xl border-2 p-3 text-center transition ${mode === m.key ? "border-[#007AFF] bg-[#007AFF]/5" : "border-[#E8E8ED] hover:border-[#86868B]"}`}>
                  <span className="text-xl">{m.icon}</span>
                  <p className="text-[13px] font-medium mt-1 text-[#1D1D1F]">{m.label}</p>
                </button>
              ))}
            </div>

            <Input label="Pickup location" placeholder="Address or landmark" value={origin} onChange={(e) => setOrigin(e.target.value)} />
            <Input label="Drop-off location" placeholder="Address or landmark" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <Input label="Your budget (USD)" type="number" placeholder="Suggested fare" value={budget} onChange={(e) => setBudget(e.target.value)} />

            <div>
              <label className="block text-[14px] font-medium text-[#1D1D1F] mb-1">Note (optional)</label>
              <textarea rows={2} placeholder="Luggage, stops, special requests..." className="w-full rounded-xl border border-[#E8E8ED] bg-white px-4 py-2.5 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>

            {/* Protection */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-[#007AFF]" />
                <p className="text-[14px] font-medium text-[#1D1D1F]">Protection</p>
              </div>
              <div className="space-y-2">
                {getAvailableTiers(mode).map((t) => (
                  <label key={t.key} className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer text-[14px] transition ${insurance === t.key ? "border-[#007AFF] bg-[#007AFF]/5" : "border-[#E8E8ED]"}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="ins" checked={insurance === t.key} onChange={() => setInsurance(t.key)} className="accent-[#007AFF]" />
                      <span className="font-medium text-[#1D1D1F]">{t.label}</span>
                    </div>
                    <span className="text-[13px] text-[#86868B]">{t.key === "NONE" ? "Free" : `$${t.fee(budgetNum).toFixed(2)}`}</span>
                  </label>
                ))}
              </div>
            </div>

            {budgetNum > 0 && (
              <div className="rounded-xl bg-[#F5F5F7] p-3 text-[13px] space-y-1">
                <div className="flex justify-between"><span className="text-[#6E6E73]">Budget</span><span className="font-medium text-[#1D1D1F]">${budgetNum.toFixed(2)}</span></div>
                {insFee > 0 && <div className="flex justify-between"><span className="text-[#6E6E73]">Insurance</span><span className="font-medium text-[#1D1D1F]">${insFee.toFixed(2)}</span></div>}
                <div className="flex justify-between font-semibold text-[#1D1D1F]"><span>Total from wallet</span><span>${(budgetNum + insFee).toFixed(2)}</span></div>
              </div>
            )}

            <Button className="w-full" size="lg" onClick={handleRequest} loading={requesting} disabled={!origin || !destination || !budget}>
              <Zap className="mr-2 h-4 w-4" /> Request Now
            </Button>

            <p className="text-[11px] text-[#86868B] text-center">
              Providers have 90 seconds to accept. If no match, your request becomes a standard posting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
