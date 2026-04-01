"use client";

import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/animated-counter";

interface Stats {
  totalJobs: number;
  totalCountries: number;
  verifiedProviders: number;
  totalVolumeUsd: number;
}

export function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch {}
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center gap-8 py-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-5 w-24 animate-pulse rounded-lg bg-white/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px]">
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34C759]" />
        </span>
        <span className="text-white/50">
          <span className="font-semibold text-white tabular-nums"><AnimatedCounter end={stats.totalJobs} /></span> jobs posted
        </span>
      </span>
      <span className="text-white/20">&middot;</span>
      <span className="text-white/50">
        <span className="font-semibold text-white tabular-nums"><AnimatedCounter end={stats.totalCountries} /></span> countries
      </span>
      <span className="text-white/20">&middot;</span>
      <span className="text-white/50">
        <span className="font-semibold text-white tabular-nums"><AnimatedCounter end={stats.verifiedProviders} /></span> verified providers
      </span>
      {stats.totalVolumeUsd > 0 && (
        <>
          <span className="text-white/20">&middot;</span>
          <span className="text-white/50">
            <span className="font-semibold text-white tabular-nums">
              $<AnimatedCounter end={Math.round(stats.totalVolumeUsd)} />
            </span> secured
          </span>
        </>
      )}
    </div>
  );
}
