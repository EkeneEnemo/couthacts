"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Zap, MapPin, DollarSign, Clock } from "lucide-react";

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

  // Poll for instant jobs when online
  useEffect(() => {
    if (!online) return;
    const poll = setInterval(async () => {
      const res = await fetch("/api/browse?sort=newest&urgent=true").then((r) => r.json()).catch(() => ({ postings: [] }));
      const now = new Date();
      const instant = (res.postings || []).filter((p: InstantJob & { isUrgent: boolean; isBiddingEnabled: boolean }) =>
        p.isUrgent && !p.isBiddingEnabled && new Date(p.expiresAt) > now
      );
      setJobs(instant);
    }, 3000);
    return () => clearInterval(poll);
  }, [online]);

  async function acceptJob(postingId: string) {
    setAccepting(postingId);
    const res = await fetch("/api/instant/accept", {
      method: "POST", headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-sky-500" />
            <h1 className="text-2xl font-display font-bold text-ocean-900">Instant Jobs</h1>
          </div>
          {/* Online toggle */}
          <button
            onClick={() => setOnline(!online)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${online ? "bg-green-500" : "bg-gray-300"}`}
          >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${online ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>

        {!online ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <Zap className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-4 text-sm text-gray-500">You&apos;re offline</p>
            <p className="text-xs text-gray-400 mt-1">Toggle the switch to start receiving instant job requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status bar */}
            <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <p className="text-sm text-green-700 font-medium">Online — listening for instant jobs</p>
            </div>

            {/* Accepted */}
            {accepted && (
              <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
                <p className="text-lg font-display font-bold text-green-800">Job accepted!</p>
                <p className="text-sm text-green-600 mt-1">Tracking: {accepted.trackingCode}</p>
                <a href={`/bookings/${accepted.bookingId}`} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700">
                  View Booking
                </a>
              </div>
            )}

            {/* Job cards */}
            {jobs.length === 0 && !accepted && (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-100">
                <Clock className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-3 text-sm text-gray-500">No instant requests right now</p>
                <p className="text-xs text-gray-400 mt-1">Stay online — jobs appear in real-time.</p>
              </div>
            )}

            {jobs.map((job) => {
              const remaining = Math.max(0, Math.round((new Date(job.expiresAt).getTime() - Date.now()) / 1000));
              return (
                <div key={job.id} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                      {job.mode.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-red-500 font-mono">{remaining}s left</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-ocean-800">{job.originAddress}</p>
                        <p className="text-gray-400">→ {job.destinationAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <p className="font-semibold text-ocean-800">${Number(job.budgetUsd).toFixed(2)}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={() => acceptJob(job.id)} loading={accepting === job.id}>
                    <Zap className="mr-2 h-4 w-4" /> Accept Job
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
