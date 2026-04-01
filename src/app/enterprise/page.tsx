"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Building2, Globe, Shield, Truck } from "lucide-react";

export default function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    // In production, this would send to a CRM or email
    // For now, we'll use the notification system
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
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — value prop */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">Enterprise</p>
            <h1 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
              Transportation infrastructure for organizations that move at scale.
            </h1>
            <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
              Dedicated account management, volume-based pricing, custom integrations, and priority support for organizations shipping at enterprise volume.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Building2, title: "Dedicated Account Manager", desc: "A single point of contact who understands your logistics operation." },
                { icon: Globe, title: "Volume-Based Pricing", desc: "Custom escrow fee rates for organizations with consistent high-volume jobs." },
                { icon: Shield, title: "Priority Dispute Resolution", desc: "4-hour SLA on dispute review. Dedicated compliance team for regulatory requirements." },
                { icon: Truck, title: "API & Integration", desc: "Connect CouthActs directly to your ERP, WMS, or TMS. Webhook-driven automation." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F5F7] flex-shrink-0">
                    <f.icon className="h-5 w-5 text-[#1D1D1F]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1D1D1F]">{f.title}</p>
                    <p className="text-[13px] text-[#6E6E73]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            {submitted ? (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-12 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-[#34C759]" />
                <h2 className="mt-4 text-xl font-display font-bold text-[#1D1D1F]">We&apos;ll be in touch.</h2>
                <p className="mt-2 text-[13px] text-[#6E6E73]">
                  Our enterprise team typically responds within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 space-y-4">
                <h2 className="text-lg font-display font-bold text-[#1D1D1F]">Contact Enterprise Sales</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Input name="name" label="Your name" placeholder="Jane Doe" required />
                  <Input name="company" label="Company" placeholder="Acme Logistics" required />
                </div>
                <Input name="email" label="Work email" type="email" placeholder="jane@acme.com" required />
                <Input name="phone" label="Phone" placeholder="+1 555 000 0000" />
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Monthly shipping volume</label>
                  <select name="volume" className="w-full rounded-2xl border border-[#E8E8ED]/60 px-4 py-2.5 text-[13px] outline-none focus:border-[#007AFF]">
                    <option value="">Select volume</option>
                    <option value="<50">Less than 50 jobs</option>
                    <option value="50-200">50–200 jobs</option>
                    <option value="200-1000">200–1,000 jobs</option>
                    <option value="1000+">1,000+ jobs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">Transport modes needed</label>
                  <select name="modes" className="w-full rounded-2xl border border-[#E8E8ED]/60 px-4 py-2.5 text-[13px] outline-none focus:border-[#007AFF]">
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
                  <textarea name="message" rows={3} placeholder="Current challenges, volume details, integration requirements..." className="w-full rounded-2xl border border-[#E8E8ED]/60 bg-white px-4 py-2.5 text-[13px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20" />
                </div>
                <Button type="submit" className="w-full" size="lg" loading={sending}>
                  Contact Sales
                </Button>
                <p className="text-[11px] text-[#86868B] text-center">We typically respond within 24 hours.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
