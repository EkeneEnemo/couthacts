"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const features = [
  { emoji: "👤", title: "Dedicated account manager", desc: "A single human who knows your logistics inside out.", color: "#007AFF", bg: "#E8F1FF" },
  { emoji: "📊", title: "Volume-based pricing", desc: "Custom escrow rates for high-volume operations.", color: "#34C759", bg: "#E8F7EC" },
  { emoji: "🛡️", title: "Priority dispute resolution", desc: "4-hour SLA on reviews. Dedicated compliance team.", color: "#FF7A59", bg: "#FFF1E8" },
  { emoji: "🔌", title: "API & integrations", desc: "Plug into your ERP, WMS, or TMS. Webhook-driven.", color: "#FF6B9D", bg: "#FFE8F0" },
];

export default function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/enterprise-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        company: form.get("company"),
        email: form.get("email"),
        phone: form.get("phone"),
        volume: form.get("volume"),
        modes: form.get("modes"),
        message: form.get("message"),
      }),
    }).catch(() => {});
    setSending(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left — value prop */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <span className="text-base">🏢</span>
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                Enterprise
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
              Move a lot? <br />
              <span className="text-[#007AFF]">We scale with you.</span>
            </h1>
            <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed">
              Volume pricing, a dedicated human, custom integrations, and priority
              support for organizations shipping at serious volume.
            </p>

            <div className="mt-12 space-y-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group flex items-start gap-4 rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-5 shadow-[0_2px_14px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                    style={{ backgroundColor: f.bg }}
                  >
                    {f.emoji}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[14px] font-display font-bold text-[#1D1D1F]">{f.title}</p>
                    <p className="mt-1 text-[13px] text-[#1D1D1F]/60">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            {submitted ? (
              <div className="rounded-[2rem] bg-gradient-to-br from-[#E8F7EC] via-white to-[#EAF4FF] p-12 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-white text-center">
                <span className="text-5xl">🎉</span>
                <h2 className="mt-4 text-2xl font-display font-bold text-[#1D1D1F]">
                  We&apos;ll be in touch.
                </h2>
                <p className="mt-3 text-[14px] text-[#1D1D1F]/60">
                  Our enterprise team replies within 24 hours &mdash; usually faster.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] bg-white p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[#1D1D1F]/5 space-y-4"
              >
                <div>
                  <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
                    Let&rsquo;s talk.
                  </h2>
                  <p className="mt-1 text-[13px] text-[#1D1D1F]/55">
                    Tell us a bit about you &mdash; we&rsquo;ll set up a call.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input name="name" label="Your name" placeholder="Jane Doe" required />
                  <Input name="company" label="Company" placeholder="Acme Logistics" required />
                </div>
                <Input name="email" label="Work email" type="email" placeholder="jane@acme.com" required />
                <Input name="phone" label="Phone" placeholder="+1 555 000 0000" />
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Monthly shipping volume</label>
                  <select
                    name="volume"
                    className="w-full rounded-2xl border border-[#1D1D1F]/10 bg-[#FFFBF5] px-4 py-2.5 text-[13px] outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20 transition"
                  >
                    <option value="">Select volume</option>
                    <option value="<50">Less than 50 jobs</option>
                    <option value="50-200">50–200 jobs</option>
                    <option value="200-1000">200–1,000 jobs</option>
                    <option value="1000+">1,000+ jobs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Transport modes needed</label>
                  <select
                    name="modes"
                    className="w-full rounded-2xl border border-[#1D1D1F]/10 bg-[#FFFBF5] px-4 py-2.5 text-[13px] outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20 transition"
                  >
                    <option value="">Select primary mode</option>
                    <option value="ground">Ground (Trucking, Freight, Courier)</option>
                    <option value="air">Air (Cargo, Charter)</option>
                    <option value="maritime">Maritime (Container, Bulk)</option>
                    <option value="multi">Multi-modal</option>
                    <option value="specialty">Specialty (Hazmat, Armored, Medical)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Tell us about your needs</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Current challenges, volume details, integration requirements..."
                    className="w-full rounded-2xl border border-[#1D1D1F]/10 bg-[#FFFBF5] px-4 py-2.5 text-[13px] outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20 transition"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" loading={sending}>
                  Contact sales
                </Button>
                <p className="text-[11px] text-[#1D1D1F]/45 text-center">We reply within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
