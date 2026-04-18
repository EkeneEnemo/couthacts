"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const capabilities = [
  { emoji: "🏛️", title: "Federal agencies", desc: "DOD, GSA, FEMA, and all federal departments.", color: "#007AFF", bg: "#E8F1FF" },
  { emoji: "🌍", title: "International NGOs", desc: "UN agencies, USAID, World Bank partners.", color: "#34C759", bg: "#E8F7EC" },
  { emoji: "🏙️", title: "State & local", desc: "State agencies, cities, transit authorities.", color: "#FF7A59", bg: "#FFF1E8" },
  { emoji: "📑", title: "Audit trail", desc: "Full PDF audit trail per job with digital authenticity.", color: "#FFB020", bg: "#FFF5E6" },
  { emoji: "⏰", title: "Priority support", desc: "24/7 dedicated government account manager.", color: "#FF6B9D", bg: "#FFE8F0" },
  { emoji: "✅", title: "Compliance-ready", desc: "Purchase orders, cost centers, contracting officer routing.", color: "#5AC8FA", bg: "#E8F5FF" },
];

export default function GovernmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSending(true);
    const f = new FormData(e.currentTarget);
    await fetch("/api/enterprise-inquiry", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"), company: f.get("org"), email: f.get("email"),
        phone: f.get("phone"), volume: f.get("spend"), modes: f.get("modes"),
        message: f.get("message"), type: "government",
      }),
    }).catch(() => {});
    setSending(false); setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
            <span className="text-base">🏛️</span>
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
              Government & NGO
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
            Procurement-ready <br />
            <span className="text-[#007AFF]">transportation.</span>
          </h1>
          <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed">
            Built for federal, state, municipal, and humanitarian organizations.
            Full audit trails, purchase-order workflows, and the compliance boxes already ticked.
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                style={{ backgroundColor: c.bg }}
              >
                {c.emoji}
              </span>
              <h3 className="mt-4 text-[15px] font-display font-bold text-[#1D1D1F]">{c.title}</h3>
              <p className="mt-1 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="rounded-[2rem] bg-gradient-to-br from-[#E8F7EC] via-white to-[#EAF4FF] p-12 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-white text-center">
              <span className="text-5xl">🎉</span>
              <h2 className="mt-4 text-2xl font-display font-bold text-[#1D1D1F]">Thank you.</h2>
              <p className="mt-3 text-[14px] text-[#1D1D1F]/60">
                Our government solutions team replies within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] bg-white p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[#1D1D1F]/5 space-y-4"
            >
              <div>
                <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
                  Let&rsquo;s set up a call.
                </h2>
                <p className="mt-1 text-[13px] text-[#1D1D1F]/55">
                  Minimum engagement: $50,000/year.
                </p>
              </div>
              <Input name="name" label="Contact name" required />
              <Input name="org" label="Organization / Agency" required />
              <Input name="email" label="Work email" type="email" required />
              <Input name="phone" label="Phone" />
              <div>
                <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Annual transport spend</label>
                <select
                  name="spend"
                  className="w-full rounded-2xl border border-[#1D1D1F]/10 bg-[#FFFBF5] px-4 py-2.5 text-[13px] outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20 transition"
                >
                  <option value="">Select range</option>
                  <option value="50k-250k">$50,000 – $250,000</option>
                  <option value="250k-1m">$250,000 – $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Describe your transportation requirements..."
                  className="w-full rounded-2xl border border-[#1D1D1F]/10 bg-[#FFFBF5] px-4 py-2.5 text-[13px] outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20 transition"
                />
              </div>
              <Button type="submit" className="w-full" size="lg" loading={sending}>Submit inquiry</Button>
              <p className="text-[11px] text-[#1D1D1F]/45 text-center">
                Contact: <a href="mailto:government@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold">government@couthacts.com</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
