"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Shield,
  Clock,
  Navigation,
  CheckCircle,
  AlertTriangle,
  Copy,
  DollarSign,
  Truck,
} from "lucide-react";
import { BookingChat } from "@/components/booking-chat";

interface Escrow {
  id: string;
  totalAmountUsd: string;
  escrowFeeUsd: string;
  providerPayoutUsd: string;
  status: string;
  stripePaymentIntentId: string | null;
  releasedAt: string | null;
  refundedAt: string | null;
  firstPaymentUsd: string | null;
  firstPaymentReleasedAt: string | null;
  finalPaymentUsd: string | null;
}

interface TrackingEvent {
  id: string;
  layer: string;
  lat: number | null;
  lng: number | null;
  status: string | null;
  note: string | null;
  recordedAt: string;
}

interface Booking {
  id: string;
  status: string;
  agreedAmountUsd: string;
  paymentTerm: string;
  customerMarkedDone: boolean;
  providerMarkedDone: boolean;
  completedAt: string | null;
  scheduledPickup: string;
  scheduledDelivery: string | null;
  actualPickup: string | null;
  actualDelivery: string | null;
  trackingCode: string | null;
  pin: string | null;
  insuranceTier: string;
  sosTriggerred: boolean;
  currentLat: number | null;
  currentLng: number | null;
  lastLocationUpdate: string | null;
  posting: {
    id: string;
    title: string;
    mode: string;
    originAddress: string;
    destinationAddress: string;
    trackingLayers: string[];
  };
  customer: { id: string; firstName: string; lastName: string; email: string };
  provider: {
    id: string;
    businessName: string;
    couthActsScore: number;
    scoreTier: string;
    isVerified: boolean;
  };
  escrow: Escrow | null;
  tracking: TrackingEvent[];
}

const STATUS_CONFIG: Record<
  string,
  { icon: typeof Clock; color: string; label: string }
> = {
  CONFIRMED: {
    icon: CheckCircle,
    color: "text-[#007AFF] bg-[#007AFF]/10",
    label: "Confirmed",
  },
  IN_PROGRESS: {
    icon: Truck,
    color: "text-[#007AFF] bg-[#007AFF]/10",
    label: "In Progress",
  },
  COMPLETED: {
    icon: CheckCircle,
    color: "text-[#34C759] bg-[#EEFBF1]",
    label: "Completed",
  },
  DISPUTED: {
    icon: AlertTriangle,
    color: "text-[#FF3B30] bg-[#FFF1F0]",
    label: "Disputed",
  },
  CANCELLED: {
    icon: AlertTriangle,
    color: "text-[#86868B] bg-[#F5F5F7]",
    label: "Cancelled",
  },
};

export default function BookingDetailPage() {
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [copied, setCopied] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewOnTime, setReviewOnTime] = useState(5);
  const [reviewComms, setReviewComms] = useState(5);
  const [reviewCondition, setReviewCondition] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);
  const [disputeFiled, setDisputeFiled] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);
  const [gpsWatchId, setGpsWatchId] = useState<number | null>(null);
  const [lastGps, setLastGps] = useState<{ lat: number; lng: number } | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/bookings/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setBooking(data.booking);
        setRole(data.role);
        setUserId(data.userId || "");
        if (data.booking?.currentLat && data.booking?.currentLng) {
          setLastGps({ lat: data.booking.currentLat, lng: data.booking.currentLng });
        }
        setLoading(false);
      });
  }, [params.id]);

  // Poll for location updates (customer side)
  useEffect(() => {
    if (!booking || role !== "customer" || booking.status !== "IN_PROGRESS") return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/tracking?bookingId=${params.id}`);
      const data = await res.json();
      if (data.currentLat && data.currentLng) {
        setLastGps({ lat: data.currentLat, lng: data.currentLng });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [booking, role, params.id]);

  function startGpsTracking() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGpsActive(true);
    const id = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude, speed, heading } = pos.coords;
        setLastGps({ lat: latitude, lng: longitude });
        await fetch("/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: params.id,
            lat: latitude,
            lng: longitude,
            speed: speed ?? undefined,
            heading: heading ?? undefined,
          }),
        }).catch(() => {});
      },
      () => {
        alert("Unable to access location. Please enable location services.");
        setGpsActive(false);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    setGpsWatchId(id);
  }

  function stopGpsTracking() {
    if (gpsWatchId !== null) {
      navigator.geolocation.clearWatch(gpsWatchId);
      setGpsWatchId(null);
    }
    setGpsActive(false);
  }

  async function verifyPin() {
    setPinError("");
    if (!booking) return;
    if (pinInput !== booking.pin) {
      setPinError("Incorrect PIN. Please try again.");
      return;
    }
    // PIN matches — mark provider as done
    setActionLoading("pin");
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: params.id, action: "provider_complete" }),
    });
    const data = await fetch(`/api/bookings/${params.id}`).then((r) => r.json());
    setBooking(data.booking);
    setPinSuccess(true);
    setActionLoading("");
    stopGpsTracking();
  }

  async function startJob() {
    setActionLoading("start");
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: params.id, action: "start" }),
    });
    const data = await fetch(`/api/bookings/${params.id}`).then((r) => r.json());
    setBooking(data.booking);
    setActionLoading("");
  }

  async function cancelBooking() {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setActionLoading("cancel");
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: params.id, action: "cancel" }),
    });
    const data = await fetch(`/api/bookings/${params.id}`).then((r) => r.json());
    setBooking(data.booking);
    setActionLoading("");
  }

  async function fileDispute() {
    setDisputeSubmitting(true);
    const res = await fetch("/api/disputes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: params.id,
        reason: disputeReason,
        description: disputeDescription,
      }),
    });
    if (res.ok) {
      setDisputeFiled(true);
      setShowDisputeForm(false);
      const data = await fetch(`/api/bookings/${params.id}`).then((r) => r.json());
      setBooking(data.booking);
    }
    setDisputeSubmitting(false);
  }

  async function submitReview() {
    setReviewSubmitting(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: params.id,
        rating: reviewRating,
        comment: reviewComment,
        onTimeScore: reviewOnTime,
        commsScore: reviewComms,
        conditionScore: reviewCondition,
      }),
    });
    if (res.ok) setReviewSubmitted(true);
    setReviewSubmitting(false);
  }

  async function markComplete() {
    setActionLoading("complete");
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: params.id,
        action: role === "customer" ? "customer_complete" : "provider_complete",
      }),
    });
    // Refresh
    const data = await fetch(`/api/bookings/${params.id}`).then((r) =>
      r.json()
    );
    setBooking(data.booking);
    setActionLoading("");
  }

  async function releaseEscrow() {
    if (!booking?.escrow) return;
    setActionLoading("release");
    await fetch("/api/escrow", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        escrowId: booking.escrow.id,
        action: "release",
      }),
    });
    const data = await fetch(`/api/bookings/${params.id}`).then((r) =>
      r.json()
    );
    setBooking(data.booking);
    setActionLoading("");
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-[14px] text-[#6E6E73]">Booking not found.</p>
        </div>
      </div>
    );
  }

  const statusConf = STATUS_CONFIG[booking.status] || STATUS_CONFIG.CONFIRMED;
  const StatusIcon = statusConf.icon;
  const bothConfirmed =
    booking.customerMarkedDone && booking.providerMarkedDone;
  const myConfirm =
    role === "customer"
      ? booking.customerMarkedDone
      : booking.providerMarkedDone;
  const theirConfirm =
    role === "customer"
      ? booking.providerMarkedDone
      : booking.customerMarkedDone;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-[13px] text-[#007AFF] hover:text-[#0055D4] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">
              {booking.posting.title}
            </h1>
            <p className="mt-1 text-[13px] text-[#86868B]">
              {booking.posting.mode.replace(/_/g, " ")} &middot; Booking{" "}
              {booking.id.slice(0, 8)}
            </p>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusConf.color}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusConf.label}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#007AFF]" />
                    <p className="text-[13px] font-medium text-[#1D1D1F]">
                      {booking.posting.originAddress}
                    </p>
                  </div>
                  <div className="ml-2 my-2 border-l-2 border-dashed border-[#E8E8ED] h-6" />
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#007AFF]" />
                    <p className="text-[13px] font-medium text-[#1D1D1F]">
                      {booking.posting.destinationAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 text-[13px] sm:grid-cols-2">
                <div>
                  <p className="text-[11px] text-[#86868B]">Scheduled pickup</p>
                  <p className="font-medium text-[#1D1D1F]">
                    {new Date(booking.scheduledPickup).toLocaleDateString()}
                  </p>
                </div>
                {booking.scheduledDelivery && (
                  <div>
                    <p className="text-[11px] text-[#86868B]">
                      Scheduled delivery
                    </p>
                    <p className="font-medium text-[#1D1D1F]">
                      {new Date(
                        booking.scheduledDelivery
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking + Codes */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                Tracking & Verification
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {booking.trackingCode && (
                  <div>
                    <p className="text-[11px] text-[#86868B]">Tracking code</p>
                    <div className="flex items-center gap-2">
                      <code className="text-[13px] font-mono font-bold text-[#1D1D1F]">
                        {booking.trackingCode}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            booking.trackingCode!,
                            "tracking"
                          )
                        }
                        className="text-[#86868B] hover:text-[#007AFF]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      {copied === "tracking" && (
                        <span className="text-[11px] text-[#34C759]">
                          Copied!
                        </span>
                      )}
                    </div>
                    <a
                      href={`/track/${booking.trackingCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#007AFF] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#0055D4] transition"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Track This Job
                    </a>
                  </div>
                )}
                {booking.pin && (
                  <div>
                    <p className="text-[11px] text-[#86868B]">
                      Delivery PIN
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-[13px] font-mono font-bold text-[#1D1D1F]">
                        {booking.pin}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(booking.pin!, "pin")
                        }
                        className="text-[#86868B] hover:text-[#007AFF]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      {copied === "pin" && (
                        <span className="text-[11px] text-[#34C759]">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {booking.posting.trackingLayers.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] text-[#86868B] mb-1">
                    Active tracking layers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {booking.posting.trackingLayers.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[#007AFF]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#007AFF]"
                      >
                        {t.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tracking events */}
            {booking.tracking.length > 0 && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                  Recent Tracking Events
                </h3>
                <div className="space-y-3">
                  {booking.tracking.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 text-[13px]"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-[#007AFF] flex-shrink-0" />
                      <div>
                        <p className="font-medium text-[#1D1D1F]">
                          {event.layer.replace(/_/g, " ")}
                          {event.status && ` — ${event.status}`}
                        </p>
                        {event.note && (
                          <p className="text-[#6E6E73]">{event.note}</p>
                        )}
                        <p className="text-[11px] text-[#86868B]">
                          {new Date(event.recordedAt).toLocaleString()}
                          {event.lat &&
                            event.lng &&
                            ` (${event.lat.toFixed(4)}, ${event.lng.toFixed(4)})`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Start job — provider only, CONFIRMED status */}
            {booking.status === "CONFIRMED" && role === "provider" && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-2">
                  Ready to start?
                </h3>
                <p className="text-[13px] text-[#6E6E73] mb-4">
                  Mark this job as in progress once you begin pickup.
                </p>
                <Button
                  onClick={startJob}
                  loading={actionLoading === "start"}
                  variant="secondary"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Start job
                </Button>
              </div>
            )}

            {/* GPS Live Tracking */}
            {(booking.status === "IN_PROGRESS" || booking.status === "CONFIRMED") && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                  Live GPS Tracking
                </h3>

                {/* Provider: Share location button */}
                {role === "provider" && (
                  <div className="space-y-3">
                    {!gpsActive ? (
                      <button
                        onClick={startGpsTracking}
                        className="inline-flex items-center gap-2 rounded-full bg-[#34C759] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#2DB84E] transition"
                      >
                        <MapPin className="h-4 w-4" />
                        Start sharing location
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#34C759]" />
                          </span>
                          <p className="text-[13px] text-[#34C759] font-medium">
                            Sharing location live
                          </p>
                        </div>
                        {lastGps && (
                          <p className="text-[11px] text-[#86868B]">
                            {lastGps.lat.toFixed(6)}, {lastGps.lng.toFixed(6)}
                          </p>
                        )}
                        <button
                          onClick={stopGpsTracking}
                          className="text-[11px] text-[#FF3B30] hover:text-[#FF3B30]/80 font-medium"
                        >
                          Stop sharing
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Customer: See live location */}
                {role === "customer" && (
                  <div>
                    {lastGps ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#007AFF]" />
                          </span>
                          <p className="text-[13px] text-[#007AFF] font-medium">
                            Provider location is live
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[#007AFF]/5 p-4">
                          <p className="text-[13px] font-mono text-[#1D1D1F]">
                            {lastGps.lat.toFixed(6)}, {lastGps.lng.toFixed(6)}
                          </p>
                          <a
                            href={`https://www.google.com/maps?q=${lastGps.lat},${lastGps.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#007AFF] hover:text-[#0055D4] font-medium"
                          >
                            <MapPin className="h-3 w-3" />
                            Open in Google Maps
                          </a>
                        </div>
                        {booking.lastLocationUpdate && (
                          <p className="text-[11px] text-[#86868B]">
                            Last updated: {new Date(booking.lastLocationUpdate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[#6E6E73]">
                        Waiting for provider to share location...
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PIN Delivery Confirmation — provider enters customer's PIN */}
            {role === "provider" && booking.status === "IN_PROGRESS" && !booking.providerMarkedDone && !pinSuccess && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-2">
                  Delivery Confirmation
                </h3>
                <p className="text-[13px] text-[#6E6E73] mb-4">
                  Enter the customer&apos;s delivery PIN to confirm handoff.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="flex-1 rounded-xl border border-[#E8E8ED] px-4 py-2.5 text-center text-lg font-mono tracking-widest outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
                  />
                  <Button
                    onClick={verifyPin}
                    loading={actionLoading === "pin"}
                    disabled={pinInput.length !== 6}
                  >
                    Verify
                  </Button>
                </div>
                {pinError && (
                  <p className="mt-2 text-[13px] text-[#FF3B30]">{pinError}</p>
                )}
              </div>
            )}

            {pinSuccess && (
              <div className="rounded-3xl bg-[#EEFBF1] p-6 border border-[#34C759]/20">
                <div className="flex items-center gap-2 text-[#34C759]">
                  <CheckCircle className="h-5 w-5" />
                  <p className="text-[13px] font-medium">
                    Delivery confirmed via PIN. Job marked as complete.
                  </p>
                </div>
              </div>
            )}

            {/* Customer: Show your PIN to the provider */}
            {role === "customer" && booking.status === "IN_PROGRESS" && booking.pin && !booking.providerMarkedDone && (
              <div className="rounded-3xl bg-[#007AFF]/5 p-6 border border-[#007AFF]/20">
                <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-2">
                  Your Delivery PIN
                </h3>
                <p className="text-[13px] text-[#6E6E73] mb-3">
                  Show this PIN to the provider upon delivery to confirm handoff.
                </p>
                <p className="text-4xl font-mono font-bold text-[#007AFF] tracking-[0.3em] text-center">
                  {booking.pin}
                </p>
              </div>
            )}

            {/* Completion flow */}
            {booking.status !== "COMPLETED" &&
              booking.status !== "CANCELLED" && (
                <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                  <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                    Confirm Completion
                  </h3>
                  <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-4">
                    <div
                      className={`flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium ${
                        booking.customerMarkedDone
                          ? "bg-[#EEFBF1] text-[#34C759]"
                          : "bg-[#F5F5F7] text-[#86868B]"
                      }`}
                    >
                      {booking.customerMarkedDone ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                      Customer{" "}
                      {booking.customerMarkedDone
                        ? "confirmed"
                        : "pending"}
                    </div>
                    <div
                      className={`flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium ${
                        booking.providerMarkedDone
                          ? "bg-[#EEFBF1] text-[#34C759]"
                          : "bg-[#F5F5F7] text-[#86868B]"
                      }`}
                    >
                      {booking.providerMarkedDone ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                      Provider{" "}
                      {booking.providerMarkedDone
                        ? "confirmed"
                        : "pending"}
                    </div>
                  </div>

                  {!myConfirm && (
                    <Button
                      onClick={markComplete}
                      loading={actionLoading === "complete"}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as complete
                    </Button>
                  )}

                  {myConfirm && !theirConfirm && (
                    <p className="text-[13px] text-[#6E6E73]">
                      Waiting for the{" "}
                      {role === "customer" ? "provider" : "customer"} to
                      confirm completion.
                    </p>
                  )}

                  {bothConfirmed && (
                    <p className="text-[13px] text-[#34C759] font-medium">
                      Both parties confirmed! The booking is complete.
                    </p>
                  )}

                  {/* Cancel button */}
                  {!bothConfirmed && (
                    <div className="mt-4 pt-4 border-t border-[#E8E8ED]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={cancelBooking}
                        loading={actionLoading === "cancel"}
                        className="text-[#FF3B30] hover:text-[#FF3B30]/80 hover:bg-[#FFF1F0]"
                      >
                        Cancel booking
                      </Button>
                      {booking.escrow?.status === "HOLDING" && (
                        <p className="mt-1 text-[11px] text-[#86868B]">
                          Escrow funds will be refunded to the customer&apos;s wallet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

            {/* Review form — customer only, after completion */}
            {booking.status === "COMPLETED" && role === "customer" && !reviewSubmitted && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                  Leave a Review
                </h3>
                <div className="space-y-4">
                  {/* Star rating */}
                  <div>
                    <p className="text-[13px] text-[#6E6E73] mb-2">Overall rating</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl transition ${
                            star <= reviewRating ? "text-[#FF9500]" : "text-[#E8E8ED]"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub-scores */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      { label: "On-time", value: reviewOnTime, setter: setReviewOnTime },
                      { label: "Communication", value: reviewComms, setter: setReviewComms },
                      { label: "Condition", value: reviewCondition, setter: setReviewCondition },
                    ].map(({ label, value, setter }) => (
                      <div key={label}>
                        <p className="text-[11px] text-[#86868B] mb-1">{label}</p>
                        <select
                          value={value}
                          onChange={(e) => setter(parseInt(e.target.value))}
                          className="w-full rounded-xl border border-[#E8E8ED] px-3 py-2 text-[13px] text-[#1D1D1F] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
                        >
                          {[1, 2, 3, 4, 5].map((v) => (
                            <option key={v} value={v}>{v}/5</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-[13px] font-medium text-[#1D1D1F] mb-1">
                      Comment (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="How was your experience?"
                      className="w-full rounded-xl border border-[#E8E8ED] bg-white px-4 py-2.5 text-[14px] text-[#1D1D1F] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={submitReview}
                    loading={reviewSubmitting}
                  >
                    Submit review
                  </Button>
                </div>
              </div>
            )}

            {reviewSubmitted && (
              <div className="rounded-3xl bg-[#EEFBF1] p-6 border border-[#34C759]/20 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-[#34C759]" />
                <p className="mt-2 text-[13px] font-medium text-[#34C759]">
                  Review submitted! Thank you.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider / Customer info */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">
                {role === "customer" ? "Provider" : "Customer"}
              </h3>
              {role === "customer" ? (
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#1D1D1F]">
                      {booking.provider.businessName}
                    </p>
                    {booking.provider.isVerified && (
                      <CheckCircle className="h-3.5 w-3.5 text-[#007AFF]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#86868B] mt-1">
                    Score: {booking.provider.couthActsScore} &middot;{" "}
                    {booking.provider.scoreTier}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-[#1D1D1F]">
                    {booking.customer.firstName} {booking.customer.lastName}
                  </p>
                  <p className="text-[11px] text-[#86868B] mt-1">
                    {booking.customer.email}
                  </p>
                </div>
              )}
            </div>

            {/* Chat */}
            {userId && (
              <BookingChat bookingId={booking.id} currentUserId={userId} />
            )}

            {/* Escrow */}
            {booking.escrow && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">
                  Escrow
                </h3>
                <div className="space-y-3 text-[13px]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#007AFF]" />
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        booking.escrow.status === "HOLDING"
                          ? "bg-[#FFF3E0] text-[#FF9500]"
                          : booking.escrow.status === "RELEASED"
                          ? "bg-[#EEFBF1] text-[#34C759]"
                          : booking.escrow.status === "REFUNDED"
                          ? "bg-[#F5F5F7] text-[#86868B]"
                          : "bg-[#FFF1F0] text-[#FF3B30]"
                      }`}
                    >
                      {booking.escrow.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Total</span>
                    <span className="font-medium text-[#1D1D1F] tabular-nums">
                      $
                      {Number(
                        booking.escrow.totalAmountUsd
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Platform fee</span>
                    <span className="text-[#6E6E73] tabular-nums">
                      $
                      {Number(
                        booking.escrow.escrowFeeUsd
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Provider payout</span>
                    <span className="font-medium text-[#1D1D1F] tabular-nums">
                      $
                      {Number(
                        booking.escrow.providerPayoutUsd
                      ).toLocaleString()}
                    </span>
                  </div>
                  {booking.escrow.firstPaymentUsd && (
                    <>
                      <hr className="border-[#E8E8ED]" />
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">1st payment</span>
                        <span className="text-[#1D1D1F] tabular-nums">
                          $
                          {Number(
                            booking.escrow.firstPaymentUsd
                          ).toLocaleString()}
                          {booking.escrow.firstPaymentReleasedAt && (
                            <CheckCircle className="inline ml-1 h-3 w-3 text-[#34C759]" />
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6E6E73]">Final payment</span>
                        <span className="text-[#1D1D1F] tabular-nums">
                          $
                          {Number(
                            booking.escrow.finalPaymentUsd
                          ).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Release button for customer after completion */}
                {role === "customer" &&
                  booking.escrow.status === "HOLDING" &&
                  booking.status === "COMPLETED" && (
                    <Button
                      className="w-full mt-4"
                      onClick={releaseEscrow}
                      loading={actionLoading === "release"}
                    >
                      Release funds to provider
                    </Button>
                  )}
              </div>
            )}

            {/* Payment & Protection */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">
                Payment & Protection
              </h3>
              <dl className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-[#6E6E73]">Agreed price</dt>
                  <dd className="font-medium text-[#1D1D1F] tabular-nums">
                    ${Number(booking.agreedAmountUsd).toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#6E6E73]">Payment term</dt>
                  <dd className="text-[#1D1D1F]">
                    {booking.paymentTerm.replace(/_/g, " ")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#6E6E73]">Protection</dt>
                  <dd className="flex items-center gap-1 text-[#1D1D1F]">
                    <Shield className="h-3.5 w-3.5" />
                    {booking.insuranceTier}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Dispute */}
            {booking.status !== "CANCELLED" && !disputeFiled && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                {booking.status === "DISPUTED" ? (
                  <div className="flex items-center gap-2 text-[#FF3B30]">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="text-[13px] font-medium">Dispute in progress</p>
                  </div>
                ) : !showDisputeForm ? (
                  <button
                    onClick={() => setShowDisputeForm(true)}
                    className="text-[13px] text-[#FF3B30] hover:text-[#FF3B30]/80 font-medium"
                  >
                    File a dispute
                  </button>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-[13px] font-semibold text-[#FF3B30]">
                      File a Dispute
                    </h3>
                    <div>
                      <label className="block text-[11px] text-[#86868B] mb-1">
                        Reason
                      </label>
                      <select
                        value={disputeReason}
                        onChange={(e) => setDisputeReason(e.target.value)}
                        className="w-full rounded-xl border border-[#E8E8ED] px-3 py-2 text-[13px] text-[#1D1D1F] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
                      >
                        <option value="">Select a reason</option>
                        <option value="Non-delivery">Non-delivery</option>
                        <option value="Damage">Cargo damaged</option>
                        <option value="Late delivery">Late delivery</option>
                        <option value="Wrong item">Wrong item delivered</option>
                        <option value="Overcharge">Overcharge</option>
                        <option value="No-show">Provider no-show</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#86868B] mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe the issue..."
                        className="w-full rounded-xl border border-[#E8E8ED] bg-white px-3 py-2 text-[13px] text-[#1D1D1F] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15"
                        value={disputeDescription}
                        onChange={(e) =>
                          setDisputeDescription(e.target.value)
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={fileDispute}
                        loading={disputeSubmitting}
                        disabled={!disputeReason || !disputeDescription}
                        className="bg-[#FF3B30] hover:bg-[#FF3B30]/90 focus:ring-[#FF3B30]"
                      >
                        Submit dispute
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowDisputeForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {disputeFiled && (
              <div className="rounded-3xl bg-[#FFF1F0] p-4 border border-[#FF3B30]/20">
                <p className="text-[13px] text-[#FF3B30] font-medium">
                  Dispute filed. Escrow funds are frozen until resolution.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
