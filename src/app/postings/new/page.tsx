"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TRANSPORT_CATEGORIES } from "@/lib/transport-modes";
import { calculatePostingFee } from "@/lib/posting-fees";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

const STEPS = ["Mode", "Route", "Cargo", "Schedule & Budget", "Options"];

const PAYMENT_TERMS = [
  { value: "FULL_UPFRONT", label: "Full upfront" },
  { value: "SPLIT_50_50", label: "50/50 split" },
  { value: "FULL_ON_COMPLETION", label: "Full on completion" },
];

const TRACKING_OPTIONS = [
  { value: "MOBILE_GPS", label: "Mobile GPS" },
  { value: "AIS_MARITIME", label: "Maritime AIS" },
  { value: "FLIGHT_TRACKING", label: "Flight Tracking" },
  { value: "ELD_INTEGRATION", label: "ELD (Trucking)" },
  { value: "QR_PIN_CONFIRMATION", label: "QR/PIN Confirmation" },
  { value: "IOT_DEVICE", label: "IoT Device" },
  { value: "SATELLITE", label: "Satellite" },
];

export default function NewPostingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setWalletBalance(d.user.walletBalance ?? 0);
      });
  }, []);
  const [form, setForm] = useState({
    mode: "",
    title: "",
    description: "",
    originAddress: "",
    destinationAddress: "",
    weightKg: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    isHazmat: false,
    isTemperatureControlled: false,
    isFragile: false,
    isOversized: false,
    cargoDescription: "",
    specialInstructions: "",
    passengerCount: "",
    pickupDate: "",
    deliveryDate: "",
    isFlexibleDate: false,
    budgetUsd: "",
    isUrgent: false,
    paymentTerm: "FULL_UPFRONT",
    isBiddingEnabled: true,
    trackingLayers: [] as string[],
    insuranceTier: "BASIC",
  });

  function update(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function toggleTracking(layer: string) {
    setForm((prev) => ({
      ...prev,
      trackingLayers: prev.trackingLayers.includes(layer)
        ? prev.trackingLayers.filter((l) => l !== layer)
        : [...prev.trackingLayers, layer],
    }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/postings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Failed to create posting");
      setSubmitting(false);
      return;
    }
    router.push("/dashboard");
  }

  const isPassengerMode = [
    "TAXI_RIDE",
    "LIMOUSINE",
    "PRIVATE_JET",
    "HELICOPTER",
    "COMMERCIAL_AIRLINE",
    "YACHT_CHARTER",
    "FERRY",
  ].includes(form.mode);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Post a Transport Job
        </h1>

        {/* Progress bar */}
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
          {/* Step 0: Mode selection */}
          {step === 0 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                Select the transport mode you need:
              </p>
              {TRANSPORT_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
                    {cat.name}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cat.modes.map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => update({ mode: m.key })}
                        className={`rounded-lg border-2 p-3 text-left text-sm font-medium transition ${
                          form.mode === m.key
                            ? "border-ocean-600 bg-ocean-50 text-ocean-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 1: Route */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                label="Job title"
                placeholder="e.g. Ship 2 pallets NYC → LA"
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what needs to be transported..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={form.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </div>
              <Input
                label="Pickup address"
                placeholder="Full address or city"
                value={form.originAddress}
                onChange={(e) => update({ originAddress: e.target.value })}
              />
              <Input
                label="Delivery address"
                placeholder="Full address or city"
                value={form.destinationAddress}
                onChange={(e) =>
                  update({ destinationAddress: e.target.value })
                }
              />
            </div>
          )}

          {/* Step 2: Cargo */}
          {step === 2 && (
            <div className="space-y-4">
              {isPassengerMode ? (
                <Input
                  label="Number of passengers"
                  type="number"
                  value={form.passengerCount}
                  onChange={(e) =>
                    update({ passengerCount: e.target.value })
                  }
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      label="Weight (kg)"
                      type="number"
                      value={form.weightKg}
                      onChange={(e) =>
                        update({ weightKg: e.target.value })
                      }
                    />
                    <Input
                      label="Length (cm)"
                      type="number"
                      value={form.lengthCm}
                      onChange={(e) =>
                        update({ lengthCm: e.target.value })
                      }
                    />
                    <Input
                      label="Width (cm)"
                      type="number"
                      value={form.widthCm}
                      onChange={(e) =>
                        update({ widthCm: e.target.value })
                      }
                    />
                    <Input
                      label="Height (cm)"
                      type="number"
                      value={form.heightCm}
                      onChange={(e) =>
                        update({ heightCm: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-800 mb-1">
                      Cargo description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What are you shipping?"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                      value={form.cargoDescription}
                      onChange={(e) =>
                        update({ cargoDescription: e.target.value })
                      }
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    Special handling
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {(
                      [
                        ["isHazmat", "Hazmat"],
                        ["isTemperatureControlled", "Temperature controlled"],
                        ["isFragile", "Fragile"],
                        ["isOversized", "Oversized"],
                      ] as const
                    ).map(([key, label]) => (
                      <label
                        key={key}
                        className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm cursor-pointer transition ${
                          form[key]
                            ? "border-ocean-600 bg-ocean-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form[key]}
                          onChange={(e) =>
                            update({ [key]: e.target.checked })
                          }
                          className="accent-ocean-600"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">
                  Special instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Anything the provider should know..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={form.specialInstructions}
                  onChange={(e) =>
                    update({ specialInstructions: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* Step 3: Schedule & Budget */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Pickup date"
                  type="datetime-local"
                  value={form.pickupDate}
                  onChange={(e) => update({ pickupDate: e.target.value })}
                />
                <Input
                  label="Delivery date (optional)"
                  type="datetime-local"
                  value={form.deliveryDate}
                  onChange={(e) =>
                    update({ deliveryDate: e.target.value })
                  }
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFlexibleDate}
                  onChange={(e) =>
                    update({ isFlexibleDate: e.target.checked })
                  }
                  className="accent-ocean-600"
                />
                Dates are flexible
              </label>
              <Input
                label="Budget (USD)"
                type="number"
                placeholder="Your max budget"
                value={form.budgetUsd}
                onChange={(e) => update({ budgetUsd: e.target.value })}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isUrgent}
                  onChange={(e) =>
                    update({ isUrgent: e.target.checked })
                  }
                  className="accent-ocean-600"
                />
                Mark as urgent
              </label>
              <div>
                <p className="text-sm font-medium text-ocean-800 mb-2">
                  Payment terms
                </p>
                <div className="flex gap-2">
                  {PAYMENT_TERMS.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => update({ paymentTerm: pt.value })}
                      className={`flex-1 rounded-lg border-2 p-2.5 text-xs font-medium transition ${
                        form.paymentTerm === pt.value
                          ? "border-ocean-600 bg-ocean-50 text-ocean-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Options + Fee Summary */}
          {step === 4 && (() => {
            const budget = parseFloat(form.budgetUsd) || 0;
            const fee = form.mode && budget > 0
              ? calculatePostingFee(form.mode, budget)
              : 0;
            const hasEnough = walletBalance !== null && walletBalance >= fee;

            return (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-ocean-800 mb-2">
                    Tracking layers
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {TRACKING_OPTIONS.map((t) => (
                      <label
                        key={t.value}
                        className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm cursor-pointer transition ${
                          form.trackingLayers.includes(t.value)
                            ? "border-ocean-600 bg-ocean-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.trackingLayers.includes(t.value)}
                          onChange={() => toggleTracking(t.value)}
                          className="accent-ocean-600"
                        />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-ocean-800 mb-2">
                    Insurance tier
                  </p>
                  <div className="flex gap-2">
                    {["BASIC", "STANDARD", "PREMIUM"].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => update({ insuranceTier: tier })}
                        className={`flex-1 rounded-lg border-2 p-2.5 text-xs font-medium transition ${
                          form.insuranceTier === tier
                            ? "border-ocean-600 bg-ocean-50 text-ocean-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.isBiddingEnabled}
                    onChange={(e) =>
                      update({ isBiddingEnabled: e.target.checked })
                    }
                    className="accent-ocean-600"
                  />
                  Allow providers to bid
                </label>

                {/* Fee summary */}
                {fee > 0 && (
                  <div className="mt-2 rounded-xl border border-ocean-200 bg-ocean-50/50 p-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ocean-600">
                      Posting Fee Summary
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Budget</span>
                      <span className="font-medium text-ocean-800">
                        ${budget.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Posting fee</span>
                      <span className="font-semibold text-ocean-700">
                        ${fee.toFixed(2)}
                      </span>
                    </div>
                    <hr className="border-ocean-200" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Wallet balance</span>
                      <span className={`font-semibold ${hasEnough ? "text-green-600" : "text-red-500"}`}>
                        ${walletBalance !== null
                          ? walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })
                          : "—"}
                      </span>
                    </div>

                    {!hasEnough && (
                      <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 mt-1">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-red-700 font-medium">
                            Insufficient balance
                          </p>
                          <p className="text-xs text-red-600 mt-0.5">
                            You need ${(fee - (walletBalance ?? 0)).toFixed(2)} more.{" "}
                            <Link href="/wallet" className="underline font-medium">
                              Top up your wallet
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 0 && !form.mode}
              >
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (() => {
              const budget = parseFloat(form.budgetUsd) || 0;
              const fee = form.mode && budget > 0
                ? calculatePostingFee(form.mode, budget)
                : 0;
              const hasEnough = walletBalance !== null && walletBalance >= fee;
              return (
                <Button
                  onClick={handleSubmit}
                  loading={submitting}
                  disabled={!form.title || !form.budgetUsd || !form.pickupDate || !hasEnough}
                >
                  {hasEnough ? "Post job" : "Insufficient balance"}
                </Button>
              );
            })(
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
