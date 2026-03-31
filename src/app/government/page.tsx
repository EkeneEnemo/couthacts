"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Globe, FileText, Clock, Users } from "lucide-react";

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
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Government &amp; NGO</p>
          <h1 className="mt-3 text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
            Procurement-compliant transportation for government and humanitarian organizations
          </h1>
        </div>

        {/* Who we serve */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {[
            { icon: Shield, title: "Federal Agencies", desc: "DOD, GSA, FEMA, and all federal departments" },
            { icon: Globe, title: "International NGOs", desc: "UN agencies, USAID, World Bank partners" },
            { icon: Users, title: "State & Local Government", desc: "State agencies, municipalities, transit authorities" },
            { icon: FileText, title: "Audit Trail", desc: "Full PDF audit trail per job with digital authenticity" },
            { icon: Clock, title: "Priority Support", desc: "24/7 dedicated government account manager" },
            { icon: CheckCircle, title: "Compliance", desc: "Purchase order, cost center, and contracting officer routing" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <f.icon className="h-6 w-6 text-ocean-600" />
              <h3 className="mt-3 text-base font-display font-semibold text-ocean-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="rounded-2xl bg-white p-12 shadow-sm border border-gray-100 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="mt-4 text-xl font-display font-bold text-ocean-900">Thank you.</h2>
              <p className="mt-2 text-sm text-gray-500">Our government solutions team will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-lg font-display font-semibold text-ocean-800">Contact Government Solutions</h2>
              <p className="text-sm text-gray-500">Minimum engagement: $50,000/year.</p>
              <Input name="name" label="Contact name" required />
              <Input name="org" label="Organization / Agency" required />
              <Input name="email" label="Work email" type="email" required />
              <Input name="phone" label="Phone" />
              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">Annual transport spend</label>
                <select name="spend" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-sky-500">
                  <option value="">Select range</option>
                  <option value="50k-250k">$50,000 – $250,000</option>
                  <option value="250k-1m">$250,000 – $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">Message</label>
                <textarea name="message" rows={3} placeholder="Describe your transportation requirements..." className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>
              <Button type="submit" className="w-full" size="lg" loading={sending}>Submit Inquiry</Button>
              <p className="text-xs text-gray-400 text-center">Contact: government@couthacts.com</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
