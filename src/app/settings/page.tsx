"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    preferredCurrency: "USD",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setForm({
            firstName: d.user.firstName || "",
            lastName: d.user.lastName || "",
            email: d.user.email || "",
            phone: d.user.phone || "",
            city: d.user.city || "",
            country: d.user.country || "",
            preferredCurrency: d.user.preferredCurrency || "USD",
          });
        }
        setLoading(false);
      });
  }, []);

  function update(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Settings
        </h1>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-100 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              value={form.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
            />
            <Input
              label="Last name"
              value={form.lastName}
              onChange={(e) => update({ lastName: e.target.value })}
            />
          </div>

          <Input label="Email" value={form.email} disabled />

          <Input
            label="Phone"
            placeholder="+1 555 000 0000"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              placeholder="New York"
              value={form.city}
              onChange={(e) => update({ city: e.target.value })}
            />
            <Input
              label="Country"
              placeholder="US"
              value={form.country}
              onChange={(e) => update({ country: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ocean-800 mb-1">
              Preferred currency
            </label>
            <select
              value={form.preferredCurrency}
              onChange={(e) => update({ preferredCurrency: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NGN">NGN</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} loading={saving}>
              Save changes
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Saved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
