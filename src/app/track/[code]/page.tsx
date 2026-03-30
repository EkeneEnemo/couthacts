"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { getPusherClient } from "@/lib/pusher-client";
import {
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Truck,
  Navigation,
} from "lucide-react";

/* ─── Status messages per mode ─────────────────────────── */

const CONFIRMED_MESSAGES: Record<string, string> = {
  TAXI_RIDE: "Your driver is confirmed and on standby",
  LIMOUSINE: "Your driver is confirmed and on standby",
  COURIER_LAST_MILE: "Your delivery is confirmed and being prepared",
  MOVING: "Your move is confirmed — crew is being assigned",
  FREIGHT_TRUCKING: "Your freight is confirmed — carrier is preparing",
  HEAVY_HAUL: "Your freight is confirmed — carrier is preparing",
  ARMORED: "Your secure transport is confirmed",
  MEDICAL: "Your medical transport is confirmed",
  PRIVATE_JET: "Your flight is confirmed",
  HELICOPTER: "Your flight is confirmed",
  COMMERCIAL_AIRLINE: "Your flight is confirmed",
  AIR_CARGO: "Your air cargo is confirmed and being prepared",
  CARGO_SHIP: "Your vessel booking is confirmed",
  YACHT_CHARTER: "Your vessel booking is confirmed",
  FERRY: "Your vessel booking is confirmed",
  FREIGHT_RAIL: "Your rail freight is confirmed",
  HAZMAT: "Your specialized cargo transport is confirmed",
  OVERSIZED_CARGO: "Your specialized cargo transport is confirmed",
};

const IN_PROGRESS_MESSAGES: Record<string, string> = {
  TAXI_RIDE: "Your driver is on the way",
  LIMOUSINE: "Your driver is on the way",
  COURIER_LAST_MILE: "Your delivery is on the way",
  MOVING: "Your move is in progress",
  FREIGHT_TRUCKING: "Your freight is in transit",
  HEAVY_HAUL: "Your freight is in transit",
  ARMORED: "Your secure transport is in progress",
  MEDICAL: "Your medical transport is in progress",
  PRIVATE_JET: "Your flight is in progress",
  HELICOPTER: "Your flight is in progress",
  COMMERCIAL_AIRLINE: "Your flight is in progress",
  AIR_CARGO: "Your air cargo is in the air",
  CARGO_SHIP: "Your vessel is en route",
  YACHT_CHARTER: "Your vessel is en route",
  FERRY: "Your vessel is en route",
  FREIGHT_RAIL: "Your rail freight is in transit",
  HAZMAT: "Your specialized cargo is in transit",
  OVERSIZED_CARGO: "Your specialized cargo is in transit",
};

const GROUND_MODES = ["TAXI_RIDE", "LIMOUSINE", "COURIER_LAST_MILE", "MOVING", "MEDICAL", "ARMORED"];

const LAYER_LABELS: Record<string, string> = {
  MOBILE_GPS: "GPS",
  AIS_MARITIME: "AIS Maritime",
  FLIGHT_TRACKING: "Flight",
  ELD_INTEGRATION: "ELD",
  QR_PIN_CONFIRMATION: "QR/PIN",
  IOT_DEVICE: "IoT",
  SATELLITE: "Satellite",
  DOCUMENT_POD_AI: "POD/AI",
  BIOMETRIC: "Biometric",
};

/* ─── Types ────────────────────────────────────────────── */

interface TrackingEvent {
  id: string;
  layer: string;
  lat: number | null;
  lng: number | null;
  speed: number | null;
  heading: number | null;
  status: string | null;
  note: string | null;
  recordedAt: string;
}

interface TrackingData {
  trackingCode: string;
  status: string;
  mode: string;
  title: string;
  origin: string;
  destination: string;
  scheduledPickup: string;
  scheduledDelivery: string | null;
  providerName: string;
  currentLat: number | null;
  currentLng: number | null;
  lastLocationUpdate: string | null;
  actualPickup: string | null;
  actualDelivery: string | null;
  completedAt: string | null;
  events: TrackingEvent[];
}

/* ─── Progress steps ───────────────────────────────────── */

const PROGRESS_STEPS = ["Confirmed", "In Progress", "Completed"];

function getProgressIndex(status: string): number {
  switch (status) {
    case "CONFIRMED": return 0;
    case "IN_PROGRESS": return 1;
    case "COMPLETED": return 2;
    default: return -1; // DISPUTED / CANCELLED
  }
}

/* ─── Component ────────────────────────────────────────── */

export default function PublicTrackingPage() {
  const params = useParams();
  const code = params.code as string;
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch tracking data
  useEffect(() => {
    fetch(`/api/track/${code}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((d) => {
        if (d) { setData(d); setLoading(false); }
      });
  }, [code]);

  // Subscribe to Pusher for real-time updates
  useEffect(() => {
    if (!data || data.status === "COMPLETED" || data.status === "CANCELLED") return;
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe(`booking-${code}`);
    channel.bind("tracking-update", (event: TrackingEvent & { bookingId: string }) => {
      setData((prev) => {
        if (!prev) return prev;
        const newEvent: TrackingEvent = {
          id: `live-${Date.now()}`,
          layer: event.layer || "MOBILE_GPS",
          lat: event.lat,
          lng: event.lng,
          speed: event.speed,
          heading: event.heading,
          status: event.status || null,
          note: event.note || null,
          recordedAt: event.recordedAt || new Date().toISOString(),
        };
        return {
          ...prev,
          currentLat: event.lat ?? prev.currentLat,
          currentLng: event.lng ?? prev.currentLng,
          lastLocationUpdate: newEvent.recordedAt,
          events: [newEvent, ...prev.events],
        };
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`booking-${code}`);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status, code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" />
          <p className="mt-4 text-sm text-gray-400">Loading tracking data...</p>
        </div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <Logo size="md" />
          <h1 className="mt-8 text-2xl font-display font-bold text-ocean-900">
            Tracking code not found
          </h1>
          <p className="mt-2 text-gray-500">
            The code &quot;{code}&quot; doesn&apos;t match any active job. Please check and try again.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ocean-600 px-6 py-3 text-sm font-medium text-white hover:bg-ocean-700 transition"
          >
            Go to CouthActs
          </Link>
        </div>
      </div>
    );
  }

  const progressIdx = getProgressIndex(data.status);
  const isGround = GROUND_MODES.includes(data.mode);
  const showMap = isGround && data.currentLat && data.currentLng;

  const statusMessage =
    data.status === "CONFIRMED" ? (CONFIRMED_MESSAGES[data.mode] || "Your transport is confirmed")
    : data.status === "IN_PROGRESS" ? (IN_PROGRESS_MESSAGES[data.mode] || "Your transport is in progress")
    : data.status === "COMPLETED" ? "Your job is complete — thank you for using CouthActs"
    : data.status === "DISPUTED" ? "This job is currently under review by CouthActs"
    : data.status === "CANCELLED" ? "This job has been cancelled"
    : "Status unknown";

  const statusIcon =
    data.status === "COMPLETED" ? <CheckCircle className="h-6 w-6 text-emerald-500" />
    : data.status === "IN_PROGRESS" ? <Truck className="h-6 w-6 text-sky-500" />
    : data.status === "CONFIRMED" ? <Clock className="h-6 w-6 text-ocean-500" />
    : data.status === "DISPUTED" ? <AlertTriangle className="h-6 w-6 text-amber-500" />
    : <XCircle className="h-6 w-6 text-gray-400" />;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="border-b border-gray-200/60 bg-cream-100/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Logo size="sm" />
          <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold text-ocean-700">
            {data.trackingCode}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold text-ocean-900 sm:text-3xl">
          Job Tracking
        </h1>

        {/* Progress bar */}
        {progressIdx >= 0 && (
          <div className="mt-8 flex items-center gap-0">
            {PROGRESS_STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      i <= progressIdx
                        ? "bg-ocean-600 text-white shadow-lg shadow-ocean-600/20"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i < progressIdx ? "✓" : i + 1}
                  </div>
                  <p className={`mt-2 text-xs font-medium ${i <= progressIdx ? "text-ocean-700" : "text-gray-400"}`}>
                    {s}
                  </p>
                </div>
                {i < PROGRESS_STEPS.length - 1 && (
                  <div className={`h-1 flex-1 rounded-full mx-2 -mt-5 ${i < progressIdx ? "bg-ocean-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Status message */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            {statusIcon}
            <div>
              <p className="text-lg font-display font-semibold text-ocean-900">
                {statusMessage}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {data.mode.replace(/_/g, " ")} &middot; {data.providerName}
              </p>
            </div>
          </div>
        </div>

        {/* Route info */}
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-ocean-800 mb-3">{data.title}</p>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-sky-500" />
              <div className="w-0.5 h-8 bg-gray-200" />
              <div className="h-3 w-3 rounded-full bg-ocean-600" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-gray-400">From</p>
                <p className="text-sm font-medium text-ocean-800">{data.origin}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">To</p>
                <p className="text-sm font-medium text-ocean-800">{data.destination}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            {data.scheduledPickup && (
              <span>Scheduled: {new Date(data.scheduledPickup).toLocaleDateString()}</span>
            )}
            {data.actualPickup && (
              <span>Started: {new Date(data.actualPickup).toLocaleString()}</span>
            )}
            {data.completedAt && (
              <span>Completed: {new Date(data.completedAt).toLocaleString()}</span>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Live map — ground modes only */}
          {showMap && (
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-sky-500" />
                  <p className="text-sm font-semibold text-ocean-800">Live Location</p>
                  {data.status === "IN_PROGRESS" && (
                    <span className="relative flex h-2.5 w-2.5 ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                  )}
                </div>
              </div>
              <div className="aspect-[4/3] bg-gray-100 relative">
                <iframe
                  src={`https://www.google.com/maps?q=${data.currentLat},${data.currentLng}&z=15&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Live tracking map"
                />
              </div>
              {data.lastLocationUpdate && (
                <p className="px-4 py-2 text-xs text-gray-400">
                  Last updated: {new Date(data.lastLocationUpdate).toLocaleTimeString()}
                </p>
              )}
            </div>
          )}

          {/* Checkpoint timeline */}
          <div className={`rounded-2xl bg-white p-6 shadow-sm border border-gray-100 ${showMap ? "" : "lg:col-span-2"}`}>
            <p className="text-sm font-semibold text-ocean-800 mb-4">Checkpoint Timeline</p>

            {data.events.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm text-gray-500">Awaiting first checkpoint</p>
              </div>
            ) : (
              <div className="space-y-0">
                {data.events.map((event, i) => (
                  <div key={event.id} className="flex gap-3">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      {i === 0 && data.status === "IN_PROGRESS" ? (
                        <span className="relative flex h-3.5 w-3.5 mt-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500" />
                        </span>
                      ) : (
                        <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${
                          i === 0 ? "bg-ocean-500" : "bg-gray-300"
                        }`} />
                      )}
                      {i < data.events.length - 1 && (
                        <div className="w-0.5 flex-1 min-h-[24px] bg-gray-200" />
                      )}
                    </div>

                    {/* Event content */}
                    <div className="pb-5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                          {LAYER_LABELS[event.layer] || event.layer}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(event.recordedAt).toLocaleString()}
                        </span>
                      </div>
                      {(event.note || event.status) && (
                        <p className="mt-1 text-sm text-gray-700">
                          {event.status}{event.status && event.note ? " — " : ""}{event.note}
                        </p>
                      )}
                      {event.lat && event.lng && (
                        <a
                          href={`https://www.google.com/maps?q=${event.lat},${event.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs text-ocean-600 hover:text-ocean-700"
                        >
                          <MapPin className="h-3 w-3" />
                          {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            Powered by <Link href="/" className="text-ocean-600 hover:text-ocean-700 font-medium">CouthActs&#8482;</Link> &middot; Real-time tracking &middot; Escrow-protected payments
          </p>
        </div>
      </div>
    </div>
  );
}
