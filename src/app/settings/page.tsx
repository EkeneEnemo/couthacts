"use client";

import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Camera, Shield, AlertTriangle, Clock, Bell, Mail } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState("PENDING");
  const [verifying, setVerifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [disabledEmails, setDisabledEmails] = useState<string[]>([]);
  const [prefsSaving, setPrefsSaving] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [stripeConnected, setStripeConnected] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState("");
  const [prefsSaved, setPrefsSaved] = useState(false);
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
    Promise.all([
      fetch("/api/settings").then((r) => r.json()),
      fetch("/api/verify").then((r) => r.json()),
      fetch("/api/notification-prefs").then((r) => r.json()),
    ]).then(([settingsData, verifyData, prefsData]) => {
      if (settingsData.user) {
        setForm({
          firstName: settingsData.user.firstName || "",
          lastName: settingsData.user.lastName || "",
          email: settingsData.user.email || "",
          phone: settingsData.user.phone || "",
          city: settingsData.user.city || "",
          country: settingsData.user.country || "",
          preferredCurrency: settingsData.user.preferredCurrency || "USD",
        });
      }
      setAvatarUrl(verifyData.avatarUrl || null);
      setKycStatus(verifyData.kycStatus || "PENDING");
      setDisabledEmails(prefsData.disabled || []);
      // Load role and Stripe status
      fetch("/api/auth").then((r) => r.json()).then((a) => {
        setUserRole(a.user?.role || "");
        if (a.user?.role === "PROVIDER") {
          fetch("/api/providers/stripe-connect").then((r) => r.json()).then((s) => {
            setStripeConnected(s.onboardingComplete || false);
          }).catch(() => {});
        }
      }).catch(() => {});
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

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setAvatarUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      if (data.avatarUrl) {
        setAvatarUrl(data.avatarUrl);
      } else {
        alert(data.error || "Upload failed");
      }
      setAvatarUploading(false);
    };
    reader.readAsDataURL(file);
  }

  async function startVerification() {
    setVerifying(true);
    const res = await fetch("/api/verify", { method: "POST" });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      setVerifying(false);
      return;
    }
    setKycStatus(data.status);

    // If Persona returned a URL, redirect user to complete verification
    if (data.url) {
      window.open(data.url, "_blank");
      // Poll for completion while user is on Persona
      const poll = setInterval(async () => {
        const check = await fetch("/api/verify").then((r) => r.json());
        if (check.kycStatus === "APPROVED" || check.kycStatus === "REJECTED") {
          setKycStatus(check.kycStatus);
          if (check.rejectionReason) {
            alert(check.rejectionReason);
          }
          clearInterval(poll);
          setVerifying(false);
        }
      }, 3000);
      // Poll for up to 10 minutes
      setTimeout(() => { clearInterval(poll); setVerifying(false); }, 600000);
    } else {
      setVerifying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">
          Settings
        </h1>

        {/* Profile Photo */}
        <div className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
          <p className="text-[12px] font-semibold text-[#1D1D1F] mb-4">Profile Photo</p>
          <div className="flex items-center gap-5">
            <div className="relative">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="h-20 w-20 rounded-2xl object-cover" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F5F5F7] text-[#86868B]">
                  <Camera className="h-8 w-8" />
                </div>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                loading={avatarUploading}
              >
                {avatarUrl ? "Change photo" : "Upload photo"}
              </Button>
              <p className="mt-1 text-[11px] text-[#86868B]">Required for verification.</p>
            </div>
          </div>
        </div>

        {/* Identity Verification */}
        <div className="mt-4 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-[#007AFF]" />
            <p className="text-[12px] font-semibold text-[#1D1D1F]">Identity Verification</p>
          </div>

          {kycStatus === "APPROVED" ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#EEFBF1] p-4 border border-[#34C759]/20">
              <CheckCircle className="h-5 w-5 text-[#34C759]" />
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">Identity verified</p>
                <p className="text-[12px] text-[#34C759]">You can post jobs and place bids.</p>
              </div>
            </div>
          ) : kycStatus === "IN_REVIEW" ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#FF9500]/5 p-4 border border-[#FF9500]/20">
              <Clock className="h-5 w-5 text-[#FF9500] animate-spin" />
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">Verification in progress</p>
                <p className="text-[12px] text-[#FF9500]">This usually takes a few moments.</p>
              </div>
            </div>
          ) : kycStatus === "REJECTED" ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#FFF1F0] p-4 border border-[#FF3B30]/20">
              <AlertTriangle className="h-5 w-5 text-[#FF3B30]" />
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">Verification rejected</p>
                <p className="text-[12px] text-[#FF3B30]">
                  Your name on your government ID did not match your account name, or the ID check was declined.
                  Update your name above to match your ID exactly, then try again.
                </p>
                <p className="text-[12px] text-[#FF3B30] font-medium mt-1">The $20 verification fee is non-refundable.</p>
              </div>
              <Button size="sm" onClick={startVerification} loading={verifying} className="ml-auto flex-shrink-0">
                Retry — $20
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[14px] text-[#6E6E73]">
                Verify your identity to start posting transportation needs or bidding on jobs.
                You must upload a profile photo first.
              </p>
              <div className="rounded-xl bg-[#007AFF]/5 p-3 border border-[#007AFF]/10">
                <p className="text-[12px] text-[#1D1D1F] font-medium">
                  Your first and last name must match exactly what appears on your government-issued ID.
                </p>
                <p className="text-[12px] text-[#6E6E73] mt-1">
                  Update your name above before verifying if it doesn&apos;t match your ID.
                </p>
              </div>
              <div className="rounded-xl bg-[#FFF1F0] p-3 border border-[#FF3B30]/10">
                <p className="text-[12px] text-[#FF3B30] font-medium">
                  The $20 verification fee is non-refundable — even if verification is rejected due to name mismatch or any other reason.
                  Make sure your name is correct before proceeding.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[#FF9500]/5 p-3 border border-[#FF9500]/10">
                <AlertTriangle className="h-4 w-4 text-[#FF9500] flex-shrink-0" />
                <p className="text-[12px] text-[#FF9500]">
                  Unverified accounts cannot post jobs or bid on opportunities.
                </p>
              </div>
              <Button
                onClick={startVerification}
                loading={verifying}
                disabled={!avatarUrl}
              >
                <Shield className="mr-2 h-4 w-4" />
                Verify my identity — $20
              </Button>
              {!avatarUrl && (
                <p className="text-[12px] text-[#FF3B30]">Upload a profile photo above first.</p>
              )}
            </div>
          )}
        </div>

        {/* Profile details */}
        <div className="mt-4 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 space-y-5">
          <p className="text-[12px] font-semibold text-[#1D1D1F]">Profile Details</p>
          {kycStatus === "APPROVED" && (
            <div className="rounded-xl bg-[#FF9500]/5 p-3 border border-[#FF9500]/10">
              <p className="text-[12px] text-[#FF9500] font-medium">
                Changing your name will reset your verification status and require re-verification ($20).
              </p>
            </div>
          )}
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
            <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1">
              Preferred currency
            </label>
            <select
              value={form.preferredCurrency}
              onChange={(e) => update({ preferredCurrency: e.target.value })}
              className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 backdrop-blur-sm px-4 py-2.5 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="NGN">NGN — Nigerian Naira</option>
              <option value="CAD">CAD — Canadian Dollar</option>
              <option value="AUD">AUD — Australian Dollar</option>
              <option value="INR">INR — Indian Rupee</option>
              <option value="KES">KES — Kenyan Shilling</option>
              <option value="GHS">GHS — Ghanaian Cedi</option>
              <option value="ZAR">ZAR — South African Rand</option>
              <option value="BRL">BRL — Brazilian Real</option>
              <option value="MXN">MXN — Mexican Peso</option>
              <option value="JPY">JPY — Japanese Yen</option>
              <option value="CNY">CNY — Chinese Yuan</option>
              <option value="AED">AED — UAE Dirham</option>
              <option value="SAR">SAR — Saudi Riyal</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} loading={saving}>
              Save changes
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-[13px] text-[#34C759]">
                <CheckCircle className="h-4 w-4" />
                Saved
              </span>
            )}
          </div>
        </div>

        {/* Stripe Connect — providers only */}
        {userRole === "PROVIDER" && (
          <div className="mt-4 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-[#007AFF]" />
              <p className="text-[12px] font-semibold text-[#1D1D1F]">Payout Account (Stripe Connect)</p>
            </div>
            {stripeConnected ? (
              <div className="flex items-center gap-3 rounded-xl bg-[#EEFBF1] p-4 border border-[#34C759]/20">
                <CheckCircle className="h-5 w-5 text-[#34C759]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1D1D1F]">Bank account connected</p>
                  <p className="text-[12px] text-[#34C759]">Your earnings can be withdrawn from your <a href="/provider/wallet" className="underline font-medium">Provider Wallet</a>.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[14px] text-[#6E6E73]">
                  Connect your bank account via Stripe to receive payouts from completed jobs.
                  This is required before you can withdraw any earnings.
                </p>
                {stripeError && (
                  <div className="rounded-xl bg-[#FFF1F0] p-4 border border-[#FF3B30]/20">
                    <p className="text-[13px] text-[#FF3B30]">{stripeError}</p>
                  </div>
                )}
                <Button
                  onClick={async () => {
                    setStripeLoading(true);
                    setStripeError("");
                    try {
                      const res = await fetch("/api/providers/stripe-connect", { method: "POST" });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        setStripeError(data.error || "Failed to start Stripe setup. Please try again.");
                      }
                    } catch {
                      setStripeError("Network error. Please check your connection and try again.");
                    }
                    setStripeLoading(false);
                  }}
                  loading={stripeLoading}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Set Up Payout Account
                </Button>
                <p className="text-[11px] text-[#86868B]">
                  You&apos;ll be redirected to Stripe to securely connect your bank account.
                  CouthActs never sees your bank details.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Notification Preferences */}
        <div className="mt-4 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-[#007AFF]" />
            <p className="text-[12px] font-semibold text-[#1D1D1F]">Email Notifications</p>
          </div>
          <p className="text-[14px] text-[#6E6E73] mb-4">
            Choose which email notifications you want to receive. In-app notifications are always on.
          </p>
          <div className="space-y-3">
            {([
              { key: "new_bid", label: "New bid on your posting", desc: "When a provider bids on your job" },
              { key: "bid_accepted", label: "Bid accepted", desc: "When a customer accepts your bid" },
              { key: "booking_confirmed", label: "Booking confirmed", desc: "When a booking is created" },
              { key: "booking_started", label: "Job started", desc: "When the provider starts the job" },
              { key: "booking_completed", label: "Job completed", desc: "When both parties confirm completion" },
              { key: "escrow_released", label: "Payment released", desc: "When escrow funds are released to your wallet" },
              { key: "escrow_refunded", label: "Escrow refunded", desc: "When escrow funds are returned to your wallet" },
              { key: "dispute_filed", label: "Dispute filed", desc: "When a dispute is filed on a booking" },
              { key: "verification_approved", label: "Identity verified", desc: "When your verification is approved" },
            ]).map((n) => {
              const enabled = !disabledEmails.includes(n.key);
              return (
                <label
                  key={n.key}
                  className="flex items-center justify-between rounded-xl border border-[#E8E8ED] p-4 cursor-pointer hover:bg-[#F5F5F7] transition"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#86868B]" />
                    <div>
                      <p className="text-[13px] font-medium text-[#1D1D1F]">{n.label}</p>
                      <p className="text-[11px] text-[#86868B]">{n.desc}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => {
                        setPrefsSaved(false);
                        setDisabledEmails((prev) =>
                          enabled
                            ? [...prev, n.key]
                            : prev.filter((k) => k !== n.key)
                        );
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-[#E8E8ED] rounded-full peer-checked:bg-[#007AFF] transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                  </div>
                </label>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button
              size="sm"
              onClick={async () => {
                setPrefsSaving(true);
                await fetch("/api/notification-prefs", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ disabled: disabledEmails }),
                });
                setPrefsSaving(false);
                setPrefsSaved(true);
              }}
              loading={prefsSaving}
            >
              Save preferences
            </Button>
            {prefsSaved && (
              <span className="flex items-center gap-1 text-[13px] text-[#34C759]">
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
