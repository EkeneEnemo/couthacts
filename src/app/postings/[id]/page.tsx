"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft,
  Send,
} from "lucide-react";

interface Bid {
  id: string;
  amountUsd: string;
  message: string | null;
  estimatedPickup: string | null;
  estimatedDelivery: string | null;
  isAccepted: boolean;
  createdAt: string;
  provider: {
    id: string;
    businessName: string;
    couthActsScore: number;
    scoreTier: string;
    completionRate: number;
    onTimeRate: number;
    totalJobs: number;
    isVerified: boolean;
  };
}

interface Posting {
  id: string;
  customerId: string;
  mode: string;
  title: string;
  description: string;
  status: string;
  originAddress: string;
  destinationAddress: string;
  weightKg: number | null;
  passengerCount: number | null;
  pickupDate: string;
  deliveryDate: string | null;
  budgetUsd: string;
  paymentTerm: string;
  isUrgent: boolean;
  isHazmat: boolean;
  isFragile: boolean;
  isOversized: boolean;
  isTemperatureControlled: boolean;
  insuranceTier: string;
  trackingLayers: string[];
  cargoDescription: string | null;
  specialInstructions: string | null;
  createdAt: string;
  customer: { id: string; firstName: string; lastName: string };
  bids: Bid[];
  booking: {
    id: string;
    status: string;
    trackingCode: string;
    provider: { id: string; businessName: string };
    escrow: { id: string; status: string; totalAmountUsd: string } | null;
  } | null;
}

export default function PostingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [posting, setPosting] = useState<Posting | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    role: string;
    providerId: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [bidSubmitting, setBidSubmitting] = useState(false);
  const [acceptingBidId, setAcceptingBidId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/postings/${params.id}`).then((r) => r.json()),
      fetch("/api/auth").then((r) => r.json()),
    ]).then(([postingData, authData]) => {
      setPosting(postingData.posting);
      setCurrentUser(authData.user);
      setLoading(false);
    });
  }, [params.id]);

  async function placeBid() {
    setBidSubmitting(true);
    const res = await fetch("/api/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postingId: params.id,
        amountUsd: bidAmount,
        message: bidMessage || null,
      }),
    });
    if (res.ok) {
      const updated = await fetch(`/api/postings/${params.id}`).then((r) =>
        r.json()
      );
      setPosting(updated.posting);
      setBidAmount("");
      setBidMessage("");
    }
    setBidSubmitting(false);
  }

  async function acceptBid(bidId: string) {
    setAcceptingBidId(bidId);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bidId }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/bookings/${data.booking.id}`);
    }
    setAcceptingBidId(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!posting) {
    return (
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-gray-500">Posting not found.</p>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id === posting.customerId;
  const isProvider = currentUser?.role === "PROVIDER";
  const alreadyBid = posting.bids.some(
    (b) => b.provider.id === currentUser?.providerId
  );
  const canBid =
    isProvider &&
    !isOwner &&
    !alreadyBid &&
    ["OPEN", "BIDDING"].includes(posting.status);

  const flags = [
    posting.isHazmat && "Hazmat",
    posting.isFragile && "Fragile",
    posting.isOversized && "Oversized",
    posting.isTemperatureControlled && "Temp Controlled",
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-bold text-ocean-900">
                {posting.title}
              </h1>
              {posting.isUrgent && (
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                  Urgent
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {posting.mode.replace(/_/g, " ")} &middot; Posted by{" "}
              {posting.customer.firstName} {posting.customer.lastName}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              posting.status === "OPEN" || posting.status === "BIDDING"
                ? "bg-sky-50 text-sky-700"
                : posting.status === "MATCHED"
                ? "bg-green-50 text-green-700"
                : posting.status === "COMPLETED"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {posting.status}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                {posting.description}
              </p>
              {posting.cargoDescription && (
                <p className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Cargo:</span>{" "}
                  {posting.cargoDescription}
                </p>
              )}
              {posting.specialInstructions && (
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Instructions:</span>{" "}
                  {posting.specialInstructions}
                </p>
              )}
            </div>

            {/* Details grid */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-400">From</p>
                    <p className="text-sm font-medium text-ocean-800">
                      {posting.originAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-ocean-500" />
                  <div>
                    <p className="text-xs text-gray-400">To</p>
                    <p className="text-sm font-medium text-ocean-800">
                      {posting.destinationAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-400">Pickup</p>
                    <p className="text-sm font-medium text-ocean-800">
                      {new Date(posting.pickupDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-4 w-4 text-ocean-500" />
                  <div>
                    <p className="text-xs text-gray-400">Budget</p>
                    <p className="text-sm font-medium text-ocean-800">
                      ${Number(posting.budgetUsd).toLocaleString()}
                    </p>
                  </div>
                </div>
                {posting.weightKg && (
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-4 w-4 text-sky-500" />
                    <div>
                      <p className="text-xs text-gray-400">Weight</p>
                      <p className="text-sm font-medium text-ocean-800">
                        {posting.weightKg} kg
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 text-ocean-500" />
                  <div>
                    <p className="text-xs text-gray-400">Protection</p>
                    <p className="text-sm font-medium text-ocean-800">
                      {posting.insuranceTier}
                    </p>
                  </div>
                </div>
              </div>

              {flags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {flags.map((f) => (
                    <span
                      key={f as string}
                      className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {posting.trackingLayers.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-1">Tracking</p>
                  <div className="flex flex-wrap gap-2">
                    {posting.trackingLayers.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs text-ocean-600"
                      >
                        {t.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking info */}
            {posting.booking && (
              <Link
                href={`/bookings/${posting.booking.id}`}
                className="block rounded-2xl bg-green-50 p-6 shadow-sm border border-green-100 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Booking with {posting.booking.provider.businessName}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Tracking: {posting.booking.trackingCode} &middot;{" "}
                      {posting.booking.status}
                    </p>
                  </div>
                  {posting.booking.escrow && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Escrow: {posting.booking.escrow.status}
                    </span>
                  )}
                </div>
              </Link>
            )}

            {/* Bids */}
            <div>
              <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
                Bids ({posting.bids.length})
              </h2>

              {posting.bids.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-100">
                  <Clock className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-3 text-sm text-gray-500">
                    No bids yet. Providers will start bidding soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {posting.bids.map((bid) => (
                    <div
                      key={bid.id}
                      className={`rounded-xl bg-white p-5 shadow-sm border ${
                        bid.isAccepted
                          ? "border-green-300 bg-green-50/50"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ocean-50 text-sm font-bold text-ocean-700">
                            {bid.provider.couthActsScore}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-ocean-800">
                                {bid.provider.businessName}
                              </p>
                              {bid.provider.isVerified && (
                                <CheckCircle className="h-3.5 w-3.5 text-sky-500" />
                              )}
                              {bid.isAccepted && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                  Accepted
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {bid.provider.scoreTier} &middot;{" "}
                              {bid.provider.totalJobs} jobs &middot;{" "}
                              {(bid.provider.onTimeRate * 100).toFixed(0)}%
                              on-time
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-display font-bold text-ocean-700">
                          ${Number(bid.amountUsd).toLocaleString()}
                        </p>
                      </div>
                      {bid.message && (
                        <p className="mt-3 text-sm text-gray-600">
                          {bid.message}
                        </p>
                      )}
                      {isOwner &&
                        !bid.isAccepted &&
                        !posting.booking &&
                        ["OPEN", "BIDDING"].includes(posting.status) && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => acceptBid(bid.id)}
                              loading={acceptingBidId === bid.id}
                            >
                              Accept bid
                            </Button>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick stats card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-ocean-800 mb-3">
                Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Payment</dt>
                  <dd className="font-medium text-ocean-700">
                    {posting.paymentTerm.replace(/_/g, " ")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bids</dt>
                  <dd className="font-medium text-ocean-700">
                    {posting.bids.length}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="font-medium text-ocean-700">
                    {posting.status}
                  </dd>
                </div>
                {posting.passengerCount && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Passengers</dt>
                    <dd className="font-medium text-ocean-700">
                      {posting.passengerCount}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Place bid form */}
            {canBid && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-ocean-800 mb-3">
                  Place your bid
                </h3>
                <div className="space-y-3">
                  <Input
                    label="Your price (USD)"
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-ocean-800 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Why should they choose you?"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={placeBid}
                    loading={bidSubmitting}
                    disabled={!bidAmount}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit bid
                  </Button>
                </div>
              </div>
            )}

            {alreadyBid && (
              <div className="rounded-2xl bg-sky-50 p-6 border border-sky-100">
                <div className="flex items-center gap-2 text-sky-700">
                  <CheckCircle className="h-4 w-4" />
                  <p className="text-sm font-medium">You&apos;ve bid on this job</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
