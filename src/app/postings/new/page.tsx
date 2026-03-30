"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TRANSPORT_CATEGORIES } from "@/lib/transport-modes";
import { calculatePostingFee, getMinimumBudgetUsd } from "@/lib/posting-fees";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

const STEPS = ["Mode", "Route", "Details", "Schedule & Budget", "Options"];

const TRACKING_OPTIONS = [
  { value: "MOBILE_GPS", label: "Mobile GPS", active: true },
  { value: "QR_PIN_CONFIRMATION", label: "QR/PIN Confirmation", active: true },
  { value: "AIS_MARITIME", label: "Maritime AIS", active: false },
  { value: "FLIGHT_TRACKING", label: "Flight Tracking", active: false },
  { value: "ELD_INTEGRATION", label: "ELD (Trucking)", active: false },
  { value: "IOT_DEVICE", label: "IoT Device", active: false },
  { value: "SATELLITE", label: "Satellite", active: false },
];

/* ─── Per-mode config — every mode gets its own unique wording ─── */

interface ModeLabels {
  title: string;
  titlePlaceholder: string;
  descPlaceholder: string;
  origin: string;
  destination: string;
  dateLabel: string;
  date2Label: string | null;
  showCargo: boolean;
  showPassengers: boolean;
  showSpecialHandling: boolean;
}

const MODE_LABELS: Record<string, ModeLabels> = {
  TAXI_RIDE: {
    title: "Where do you need a ride?",
    titlePlaceholder: "e.g. Ride to JFK Airport from downtown Manhattan",
    descPlaceholder: "Any stops along the way? Luggage? Child seat needed?",
    origin: "Pickup location",
    destination: "Drop-off location",
    dateLabel: "Pickup date & time",
    date2Label: null,
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  LIMOUSINE: {
    title: "Where would you like to be chauffeured?",
    titlePlaceholder: "e.g. Limo for wedding, Brooklyn → The Plaza Hotel",
    descPlaceholder: "Occasion, vehicle preference (SUV, stretch, sedan), any amenities needed",
    origin: "Pickup address",
    destination: "Destination address",
    dateLabel: "Pickup date & time",
    date2Label: "Return pickup (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  COURIER_LAST_MILE: {
    title: "What are you sending?",
    titlePlaceholder: "e.g. Deliver a birthday gift from Brooklyn to Queens",
    descPlaceholder: "Package contents, size, fragility — anything the courier should know",
    origin: "Pickup address",
    destination: "Delivery address",
    dateLabel: "Pickup date & time",
    date2Label: "Deliver by (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  MOVING: {
    title: "Tell us about your move",
    titlePlaceholder: "e.g. 2-bedroom apartment move, Brooklyn → New Jersey",
    descPlaceholder: "Number of rooms, heavy items (piano, fridge, washer), stairs or elevator, parking situation",
    origin: "Current address",
    destination: "New address",
    dateLabel: "Moving date",
    date2Label: null,
    showCargo: false, showPassengers: false, showSpecialHandling: true,
  },
  FREIGHT_TRUCKING: {
    title: "What freight do you need shipped?",
    titlePlaceholder: "e.g. 2 pallets of electronics, NYC → Los Angeles",
    descPlaceholder: "Cargo type, packaging, loading dock availability, any stacking restrictions",
    origin: "Origin warehouse or address",
    destination: "Destination warehouse or address",
    dateLabel: "Pickup date",
    date2Label: "Delivery deadline (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  HEAVY_HAUL: {
    title: "Describe your heavy haul requirement",
    titlePlaceholder: "e.g. 80,000 lb transformer from Houston to Dallas",
    descPlaceholder: "Equipment type, exact weight, dimensions, permit requirements, escort needs",
    origin: "Loading site address",
    destination: "Delivery site address",
    dateLabel: "Planned load date",
    date2Label: "Required delivery date (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  ARMORED: {
    title: "What needs secure transport?",
    titlePlaceholder: "e.g. Secure transport of valuables from vault to bank",
    descPlaceholder: "Type of valuables, estimated value, security clearance level, armed escort preference",
    origin: "Secure pickup location",
    destination: "Secure delivery location",
    dateLabel: "Transport date & time",
    date2Label: null,
    showCargo: true, showPassengers: false, showSpecialHandling: false,
  },
  MEDICAL: {
    title: "Tell us about the medical transport needed",
    titlePlaceholder: "e.g. Non-emergency patient transport to Mount Sinai Hospital",
    descPlaceholder: "Patient mobility (wheelchair, stretcher, ambulatory), medical equipment needed, oxygen, attendant required",
    origin: "Pickup location",
    destination: "Medical facility or address",
    dateLabel: "Transport date & time",
    date2Label: "Return transport (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  PRIVATE_JET: {
    title: "Plan your private flight",
    titlePlaceholder: "e.g. Private jet from Teterboro to Miami for 6 guests",
    descPlaceholder: "Preferred aircraft (light jet, midsize, heavy), catering requests, pet on board, luggage volume",
    origin: "Departure airport or city",
    destination: "Arrival airport or city",
    dateLabel: "Departure date & time",
    date2Label: "Return flight date (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  HELICOPTER: {
    title: "Where do you need helicopter service?",
    titlePlaceholder: "e.g. Helicopter transfer from Manhattan heliport to JFK",
    descPlaceholder: "Purpose (transfer, aerial tour, medevac), landing zone details, weight of passengers + luggage",
    origin: "Departure heliport or location",
    destination: "Landing zone or destination",
    dateLabel: "Flight date & time",
    date2Label: "Return flight (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  COMMERCIAL_AIRLINE: {
    title: "Book your commercial flight",
    titlePlaceholder: "e.g. Round-trip flights for 3 from NYC to London",
    descPlaceholder: "Class preference (economy, business, first), airline preference, flexible dates, special assistance needed",
    origin: "Departure city or airport",
    destination: "Arrival city or airport",
    dateLabel: "Departure date",
    date2Label: "Return date (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  AIR_CARGO: {
    title: "What cargo needs to fly?",
    titlePlaceholder: "e.g. 500kg medical supplies LAX → London Heathrow",
    descPlaceholder: "Commodity type, dangerous goods class (if any), temperature requirements, customs documentation status",
    origin: "Origin airport or city",
    destination: "Destination airport or city",
    dateLabel: "Ship by date",
    date2Label: "Must arrive by (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  CARGO_SHIP: {
    title: "What are you shipping by sea?",
    titlePlaceholder: "e.g. 20ft container of textiles, Shanghai → Los Angeles",
    descPlaceholder: "Container type (20ft, 40ft, reefer), commodity, port preferences, Incoterms",
    origin: "Origin port or city",
    destination: "Destination port or city",
    dateLabel: "Target sailing date",
    date2Label: "Must arrive by (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  YACHT_CHARTER: {
    title: "Plan your yacht experience",
    titlePlaceholder: "e.g. Weekend yacht charter for 8 guests, Miami to Bahamas",
    descPlaceholder: "Occasion, number of guests, preferred yacht size, crew needs, catering, water toys, itinerary preferences",
    origin: "Departure marina or port",
    destination: "Destination or cruising area",
    dateLabel: "Charter start date",
    date2Label: "Charter end date (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  FERRY: {
    title: "Book your ferry crossing",
    titlePlaceholder: "e.g. Car + 4 passengers, Dover to Calais",
    descPlaceholder: "Vehicle type (car, van, truck, foot passenger), number of passengers, cabin preference, pet on board",
    origin: "Departure port or terminal",
    destination: "Arrival port or terminal",
    dateLabel: "Departure date & time",
    date2Label: "Return crossing (optional)",
    showCargo: false, showPassengers: true, showSpecialHandling: false,
  },
  FREIGHT_RAIL: {
    title: "What needs to move by rail?",
    titlePlaceholder: "e.g. Intermodal container, Chicago → Houston",
    descPlaceholder: "Cargo type, railcar type needed (flatcar, boxcar, tank car, intermodal), siding access at origin/destination",
    origin: "Origin rail terminal or siding",
    destination: "Destination rail terminal or siding",
    dateLabel: "Ship by date",
    date2Label: "Delivery deadline (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  HAZMAT: {
    title: "Describe your hazardous materials transport",
    titlePlaceholder: "e.g. Class 3 flammable liquids, 2 drums, Houston → Chicago",
    descPlaceholder: "UN number, hazard class, packing group, quantity, SDS available, placarding requirements",
    origin: "Origin facility address",
    destination: "Destination facility address",
    dateLabel: "Ship date",
    date2Label: "Must arrive by (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
  OVERSIZED_CARGO: {
    title: "Tell us about your oversized load",
    titlePlaceholder: "e.g. Wind turbine blade, 160ft, Port of Houston → wind farm in Oklahoma",
    descPlaceholder: "Exact dimensions (L×W×H), weight, permit status, escort requirements, route survey needed",
    origin: "Loading site address",
    destination: "Delivery site address",
    dateLabel: "Planned load date",
    date2Label: "Required delivery date (optional)",
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  },
};

function getModeLabels(mode: string): ModeLabels {
  return MODE_LABELS[mode] || {
    title: "Describe your transport need",
    titlePlaceholder: "e.g. What do you need transported?",
    descPlaceholder: "Provide all relevant details",
    origin: "Pickup location",
    destination: "Destination",
    dateLabel: "Service date",
    date2Label: null,
    showCargo: true, showPassengers: false, showSpecialHandling: true,
  };
}

export default function NewPostingPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [userCurrency, setUserCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setWalletBalance(d.user.walletBalance ?? 0);
          setUserCurrency(d.user.preferredCurrency || "USD");
          if (d.user.preferredCurrency && d.user.preferredCurrency !== "USD") {
            fetch(`/api/currency?amount=1&from=USD&to=${d.user.preferredCurrency}`)
              .then((r) => r.json())
              .then((c) => setExchangeRate(c.rate || null));
          }
        }
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
      body: JSON.stringify({ ...form, currency: userCurrency }),
    });
    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Failed to create posting");
      setSubmitting(false);
      return;
    }
    window.location.href = "/dashboard";
  }

  const labels = form.mode ? getModeLabels(form.mode) : null;

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Post a Transportation Need
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
                What type of transportation do you need?
              </p>
              {TRANSPORT_CATEGORIES.map((catGroup) => (
                <div key={catGroup.name}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
                    {catGroup.name}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {catGroup.modes.map((m) => (
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

          {/* Step 1: Route — mode-aware labels */}
          {step === 1 && labels && (
            <div className="space-y-4">
              <Input
                label={labels.title}
                placeholder={labels.titlePlaceholder}
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder={labels.descPlaceholder}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  value={form.description}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </div>
              <Input
                label={labels.origin}
                placeholder="Full address, city, or port"
                value={form.originAddress}
                onChange={(e) => update({ originAddress: e.target.value })}
              />
              <Input
                label={labels.destination}
                placeholder="Full address, city, or port"
                value={form.destinationAddress}
                onChange={(e) => update({ destinationAddress: e.target.value })}
              />
            </div>
          )}

          {/* Step 2: Details — mode-aware */}
          {step === 2 && labels && (
            <div className="space-y-4">
              {labels.showPassengers && (
                <Input
                  label="Number of passengers"
                  type="number"
                  placeholder="How many people?"
                  value={form.passengerCount}
                  onChange={(e) => update({ passengerCount: e.target.value })}
                />
              )}

              {labels.showCargo && (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      label="Weight (kg)"
                      type="number"
                      value={form.weightKg}
                      onChange={(e) => update({ weightKg: e.target.value })}
                    />
                    <Input
                      label="Length (cm)"
                      type="number"
                      value={form.lengthCm}
                      onChange={(e) => update({ lengthCm: e.target.value })}
                    />
                    <Input
                      label="Width (cm)"
                      type="number"
                      value={form.widthCm}
                      onChange={(e) => update({ widthCm: e.target.value })}
                    />
                    <Input
                      label="Height (cm)"
                      type="number"
                      value={form.heightCm}
                      onChange={(e) => update({ heightCm: e.target.value })}
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
                      onChange={(e) => update({ cargoDescription: e.target.value })}
                    />
                  </div>
                </>
              )}

              {!labels.showCargo && !labels.showPassengers && (
                <p className="text-sm text-gray-500">
                  Describe any special requirements in the instructions below.
                </p>
              )}

              {labels.showSpecialHandling && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    Special handling
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {([
                      ["isHazmat", "Hazmat"],
                      ["isTemperatureControlled", "Temperature controlled"],
                      ["isFragile", "Fragile"],
                      ["isOversized", "Oversized"],
                    ] as const).map(([key, label]) => (
                      <label
                        key={key}
                        className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm cursor-pointer transition ${
                          form[key] ? "border-ocean-600 bg-ocean-50" : "border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form[key]}
                          onChange={(e) => update({ [key]: e.target.checked })}
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
                  onChange={(e) => update({ specialInstructions: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Schedule & Budget — mode-aware date labels, no payment terms */}
          {step === 3 && labels && (
            <div className="space-y-4">
              <div className={`grid gap-3 ${labels.date2Label ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                <Input
                  label={labels.dateLabel}
                  type="datetime-local"
                  value={form.pickupDate}
                  onChange={(e) => update({ pickupDate: e.target.value })}
                />
                {labels.date2Label && (
                  <Input
                    label={labels.date2Label}
                    type="datetime-local"
                    value={form.deliveryDate}
                    onChange={(e) => update({ deliveryDate: e.target.value })}
                  />
                )}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFlexibleDate}
                  onChange={(e) => update({ isFlexibleDate: e.target.checked })}
                  className="accent-ocean-600"
                />
                Dates are flexible
              </label>

              <Input
                label={`Budget (${userCurrency})`}
                type="number"
                placeholder={`Min ${userCurrency !== "USD" && exchangeRate ? (getMinimumBudgetUsd(form.mode) * exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 0 }) : getMinimumBudgetUsd(form.mode)} ${userCurrency}`}
                value={form.budgetUsd}
                onChange={(e) => update({ budgetUsd: e.target.value })}
              />
              {(() => {
                const minUsd = getMinimumBudgetUsd(form.mode);
                const enteredLocal = parseFloat(form.budgetUsd) || 0;
                const enteredUsd = exchangeRate && userCurrency !== "USD"
                  ? enteredLocal / exchangeRate : enteredLocal;
                const belowMin = enteredLocal > 0 && enteredUsd < minUsd;
                const minLocal = exchangeRate && userCurrency !== "USD"
                  ? minUsd * exchangeRate : minUsd;
                return (
                  <>
                    {userCurrency !== "USD" && exchangeRate && form.budgetUsd && (
                      <p className={`text-xs -mt-2 ${belowMin ? "text-red-500" : "text-gray-500"}`}>
                        ≈ ${enteredUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        {belowMin && (
                          <span className="font-medium"> — below minimum of ${minUsd.toFixed(2)} USD ({minLocal.toLocaleString(undefined, { maximumFractionDigits: 0 })} {userCurrency})</span>
                        )}
                      </p>
                    )}
                    {userCurrency === "USD" && form.budgetUsd && enteredUsd < minUsd && (
                      <p className="text-xs text-red-500 -mt-2">
                        Minimum budget for {form.mode.replace(/_/g, " ")} is ${minUsd.toFixed(2)}
                      </p>
                    )}
                    {!form.budgetUsd && (
                      <p className="text-xs text-gray-400 -mt-2">
                        Minimum: {userCurrency !== "USD" && exchangeRate
                          ? `${minLocal.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${userCurrency} (~$${minUsd} USD)`
                          : `$${minUsd.toFixed(2)} USD`}
                      </p>
                    )}
                  </>
                );
              })()}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isUrgent}
                  onChange={(e) => update({ isUrgent: e.target.checked })}
                  className="accent-ocean-600"
                />
                Mark as urgent
              </label>

              <p className="text-xs text-gray-400 mt-2 p-3 rounded-lg bg-gray-50">
                Payment is released to the provider only when both parties confirm completion. No upfront payment to the provider.
              </p>
            </div>
          )}

          {/* Step 4: Options + Fee Summary */}
          {step === 4 && (() => {
            const enteredLocal = parseFloat(form.budgetUsd) || 0;
            const budgetUsdEst = exchangeRate && userCurrency !== "USD"
              ? enteredLocal / exchangeRate : enteredLocal;
            const fee = form.mode && budgetUsdEst > 0
              ? calculatePostingFee(form.mode, budgetUsdEst) : 0;
            const totalDebit = fee + budgetUsdEst;
            const hasEnough = walletBalance !== null && walletBalance >= totalDebit;

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
                        className={`flex items-center gap-2 rounded-lg border-2 p-3 text-sm transition ${
                          !t.active
                            ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : form.trackingLayers.includes(t.value)
                            ? "border-ocean-600 bg-ocean-50 cursor-pointer"
                            : "border-gray-200 cursor-pointer"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.trackingLayers.includes(t.value)}
                          onChange={() => t.active && toggleTracking(t.value)}
                          disabled={!t.active}
                          className="accent-ocean-600"
                        />
                        <span className="flex-1">{t.label}</span>
                        {!t.active && (
                          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                            Coming Soon
                          </span>
                        )}
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
                    onChange={(e) => update({ isBiddingEnabled: e.target.checked })}
                    className="accent-ocean-600"
                  />
                  Allow providers to bid
                </label>

                {/* Fee summary */}
                {fee > 0 && (
                  <div className="mt-2 rounded-xl border border-ocean-200 bg-ocean-50/50 p-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ocean-600">
                      Payment Summary
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Budget hold</span>
                      <span className="font-medium text-ocean-800">
                        ${budgetUsdEst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Posting fee</span>
                      <span className="font-medium text-ocean-800">
                        ${fee.toFixed(2)}
                      </span>
                    </div>
                    <hr className="border-ocean-200" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-semibold">Total deducted</span>
                      <span className="font-bold text-ocean-700">
                        ${totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Wallet balance</span>
                      <span className={`font-semibold ${hasEnough ? "text-green-600" : "text-red-500"}`}>
                        ${walletBalance !== null
                          ? walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })
                          : "—"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Budget is held in your wallet until a provider is matched. If a provider bids lower, the difference is refunded. Provider is paid only when both parties confirm completion.
                    </p>
                    {!hasEnough && (
                      <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 mt-1">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-red-700 font-medium">Insufficient balance</p>
                          <p className="text-xs text-red-600 mt-0.5">
                            You need ${(totalDebit - (walletBalance ?? 0)).toFixed(2)} more.{" "}
                            <Link href="/wallet" className="underline font-medium">Top up your wallet</Link>
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
              const enteredLocal = parseFloat(form.budgetUsd) || 0;
              const enteredUsd = exchangeRate && userCurrency !== "USD"
                ? enteredLocal / exchangeRate : enteredLocal;
              const fee = form.mode && enteredUsd > 0
                ? calculatePostingFee(form.mode, enteredUsd) : 0;
              const totalNeeded = fee + enteredUsd;
              const hasEnough = walletBalance !== null && walletBalance >= totalNeeded;
              const minUsd = getMinimumBudgetUsd(form.mode);
              const belowMin = enteredLocal > 0 && enteredUsd < minUsd;
              const buttonLabel = belowMin
                ? "Below minimum budget"
                : !hasEnough ? "Insufficient balance" : "Post job";
              return (
                <Button
                  onClick={handleSubmit}
                  loading={submitting}
                  disabled={!form.title || !form.budgetUsd || !form.pickupDate || !hasEnough || belowMin}
                >
                  {buttonLabel}
                </Button>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
