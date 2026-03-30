"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TRANSPORT_CATEGORIES } from "@/lib/transport-modes";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";

const STEPS = ["Business Info", "Transport Modes", "Fleet & Service", "Stripe Connect"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [profileCreated, setProfileCreated] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessRegNumber: "",
    dotNumber: "",
    mcNumber: "",
    fmcsaNumber: "",
    imoNumber: "",
    faaNumber: "",
    modes: [] as string[],
    certifications: [] as string[],
    certInput: "",
    fleetSize: "",
    serviceArea: [] as string[],
    areaInput: "",
    bio: "",
  });

  function update(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function toggleMode(mode: string) {
    setForm((prev) => ({
      ...prev,
      modes: prev.modes.includes(mode)
        ? prev.modes.filter((m) => m !== mode)
        : [...prev.modes, mode],
    }));
  }

  function addCert() {
    if (form.certInput.trim()) {
      update({
        certifications: [...form.certifications, form.certInput.trim()],
        certInput: "",
      });
    }
  }

  function addArea() {
    if (form.areaInput.trim()) {
      update({
        serviceArea: [...form.serviceArea, form.areaInput.trim()],
        areaInput: "",
      });
    }
  }

  async function createProfile() {
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/providers/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: form.businessName,
        businessRegNumber: form.businessRegNumber,
        dotNumber: form.dotNumber,
        mcNumber: form.mcNumber,
        fmcsaNumber: form.fmcsaNumber,
        imoNumber: form.imoNumber,
        faaNumber: form.faaNumber,
        modes: form.modes,
        certifications: form.certifications,
        fleetSize: form.fleetSize,
        serviceArea: form.serviceArea,
        bio: form.bio,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to create profile");
      setSubmitting(false);
      return;
    }
    setProfileCreated(true);
    setSubmitting(false);
    setStep(3);
  }

  async function startStripeConnect() {
    setStripeLoading(true);
    try {
      const res = await fetch("/api/providers/stripe-connect", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      setError(json.error || "Failed to start Stripe onboarding");
    } catch {
      setError("Network error. Please try again.");
    }
    setStripeLoading(false);
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Provider Onboarding
        </h1>

        {/* Progress */}
        <div className="mt-6 flex gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  i <= step ? "bg-ocean-600" : "bg-gray-200"
                }`}
              />
              <p
                className={`mt-1 text-xs ${
                  i <= step ? "text-ocean-700 font-medium" : "text-gray-400"
                }`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          {/* Step 0: Business Info */}
          {step === 0 && (
            <div className="space-y-4">
              <Input
                label="Business name"
                placeholder="Your company name"
                value={form.businessName}
                onChange={(e) => update({ businessName: e.target.value })}
              />
              <Input
                label="Business registration number"
                placeholder="Optional"
                value={form.businessRegNumber}
                onChange={(e) =>
                  update({ businessRegNumber: e.target.value })
                }
              />

              {/* Conditional regulatory fields */}
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 pt-2">
                Regulatory IDs (if applicable)
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label="DOT Number"
                  placeholder="Optional"
                  value={form.dotNumber}
                  onChange={(e) => update({ dotNumber: e.target.value })}
                />
                <Input
                  label="MC Number"
                  placeholder="Optional"
                  value={form.mcNumber}
                  onChange={(e) => update({ mcNumber: e.target.value })}
                />
                <Input
                  label="FMCSA Number"
                  placeholder="Optional"
                  value={form.fmcsaNumber}
                  onChange={(e) =>
                    update({ fmcsaNumber: e.target.value })
                  }
                />
                <Input
                  label="IMO Number"
                  placeholder="Maritime"
                  value={form.imoNumber}
                  onChange={(e) => update({ imoNumber: e.target.value })}
                />
                <Input
                  label="FAA Number"
                  placeholder="Aviation"
                  value={form.faaNumber}
                  onChange={(e) => update({ faaNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">
                  Bio / About your company
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell customers about your services..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={form.bio}
                  onChange={(e) => update({ bio: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 1: Transport Modes */}
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                Select all transport modes you offer:
              </p>
              {TRANSPORT_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
                    {cat.name}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cat.modes.map((m) => (
                      <label
                        key={m.key}
                        className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm cursor-pointer transition ${
                          form.modes.includes(m.key)
                            ? "border-ocean-600 bg-ocean-50 text-ocean-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.modes.includes(m.key)}
                          onChange={() => toggleMode(m.key)}
                          className="accent-ocean-600"
                        />
                        {m.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Fleet & Service Area */}
          {step === 2 && (
            <div className="space-y-4">
              <Input
                label="Fleet size"
                type="number"
                placeholder="Number of vehicles/vessels/aircraft"
                value={form.fleetSize}
                onChange={(e) => update({ fleetSize: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">
                  Certifications
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    placeholder="e.g. HAZMAT certified, ISO 9001..."
                    value={form.certInput}
                    onChange={(e) => update({ certInput: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCert())}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addCert}>
                    Add
                  </Button>
                </div>
                {form.certifications.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.certifications.map((c, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700"
                      >
                        {c}
                        <button
                          type="button"
                          onClick={() =>
                            update({
                              certifications: form.certifications.filter(
                                (_, j) => j !== i
                              ),
                            })
                          }
                          className="text-sky-400 hover:text-sky-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">
                  Service areas
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    placeholder="e.g. US Northeast, Europe, Global..."
                    value={form.areaInput}
                    onChange={(e) => update({ areaInput: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addArea())}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addArea}>
                    Add
                  </Button>
                </div>
                {form.serviceArea.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.serviceArea.map((a, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full bg-ocean-50 px-3 py-1 text-xs text-ocean-700"
                      >
                        {a}
                        <button
                          type="button"
                          onClick={() =>
                            update({
                              serviceArea: form.serviceArea.filter(
                                (_, j) => j !== i
                              ),
                            })
                          }
                          className="text-ocean-400 hover:text-ocean-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Stripe Connect */}
          {step === 3 && (
            <div className="text-center space-y-6 py-4">
              {profileCreated && (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    Provider profile created!
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-display font-semibold text-ocean-800">
                  Connect Stripe to receive payments
                </h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  CouthActs uses Stripe Connect to securely transfer escrow
                  funds to your account after job completion.
                </p>
              </div>

              <Button
                size="lg"
                onClick={startStripeConnect}
                loading={stripeLoading}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Connect with Stripe
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
              >
                Skip for now — I&apos;ll do this later
              </Button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Button>

              {step < 2 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={step === 0 && !form.businessName}
                >
                  Next
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={createProfile}
                  loading={submitting}
                  disabled={!form.businessName || form.modes.length === 0}
                >
                  Create provider profile
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
