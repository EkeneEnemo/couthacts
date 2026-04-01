"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Avail { date: string; isAvailable: boolean; maxJobs: number; notes: string | null }

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AvailabilityPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [avail, setAvail] = useState<Record<string, Avail>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadMonth() {
      const m = `${year}-${String(month + 1).padStart(2, "0")}`;
      const res = await fetch(`/api/provider/availability?month=${m}`).then((r) => r.json());
      const map: Record<string, Avail> = {};
      for (const a of (res.availability || [])) {
        const key = new Date(a.date).toISOString().split("T")[0];
        map[key] = a;
      }
      setAvail(map);
    }
    loadMonth();
  }, [year, month]);

  function toggleDay(dateStr: string) {
    setSaved(false);
    setAvail((prev) => {
      const existing = prev[dateStr];
      if (existing) {
        return { ...prev, [dateStr]: { ...existing, isAvailable: !existing.isAvailable } };
      }
      return { ...prev, [dateStr]: { date: dateStr, isAvailable: false, maxJobs: 1, notes: null } };
    });
  }

  async function saveAll() {
    setSaving(true);
    const dates = Object.values(avail).map((a) => ({
      date: a.date, isAvailable: a.isAvailable, maxJobs: a.maxJobs, notes: a.notes,
    }));
    await fetch("/api/provider/availability", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates }),
    });
    setSaving(false); setSaved(true);
  }

  function markMonthAvailable() {
    setSaved(false);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newAvail = { ...avail };
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      newAvail[key] = { date: key, isAvailable: true, maxJobs: 1, notes: null };
    }
    setAvail(newAvail);
  }

  function markWeekendsUnavailable() {
    setSaved(false);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newAvail = { ...avail };
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (date.getDay() === 0 || date.getDay() === 6) {
        newAvail[key] = { date: key, isAvailable: false, maxJobs: 0, notes: null };
      }
    }
    setAvail(newAvail);
  }

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthName = new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-[#007AFF]" />
          <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">Availability Calendar</h1>
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); }}
              className="rounded-xl p-2 hover:bg-[#F5F5F7] transition"><ChevronLeft className="h-4 w-4 text-[#86868B]" /></button>
            <p className="text-[14px] font-semibold text-[#1D1D1F]">{monthName}</p>
            <button onClick={() => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); }}
              className="rounded-xl p-2 hover:bg-[#F5F5F7] transition"><ChevronRight className="h-4 w-4 text-[#86868B]" /></button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => <div key={d} className="text-center text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] py-1">{d}</div>)}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const a = avail[key];
              const isAvailable = a ? a.isAvailable : true; // Default available
              const isPast = new Date(key) < new Date(new Date().toISOString().split("T")[0]);
              return (
                <button key={i} onClick={() => !isPast && toggleDay(key)} disabled={isPast}
                  className={`aspect-square rounded-xl text-[14px] font-medium transition flex items-center justify-center ${
                    isPast ? "text-[#E8E8ED] cursor-not-allowed" :
                    isAvailable ? "bg-[#EEFBF1] text-[#34C759] hover:bg-[#34C759]/20 border border-[#34C759]/20" :
                    "bg-[#FFF1F0] text-[#FF3B30] hover:bg-[#FF3B30]/10 border border-[#FF3B30]/20"
                  }`}>
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend + bulk actions */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-[11px] text-[#86868B]">
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-md bg-[#EEFBF1] border border-[#34C759]/20" /> Available</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-md bg-[#FFF1F0] border border-[#FF3B30]/20" /> Unavailable</span>
            </div>
            <div className="flex gap-2">
              <button onClick={markMonthAvailable} className="text-[13px] text-[#007AFF] hover:text-[#0055D4] font-medium">Mark month available</button>
              <button onClick={markWeekendsUnavailable} className="text-[13px] text-[#FF3B30] hover:text-[#FF3B30]/80 font-medium">Weekends off</button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button onClick={saveAll} loading={saving} size="sm">Save calendar</Button>
            {saved && <span className="text-[13px] text-[#34C759] font-medium">Saved!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
