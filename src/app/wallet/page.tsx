"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface WalletData {
  id: string;
  balanceUsd: number;
  currency: string;
  isLocked: boolean;
}

interface Transaction {
  id: string;
  type: string;
  amountUsd: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  reference: string | null;
  postingId: string | null;
  bookingId: string | null;
  stripeId: string | null;
  createdAt: string;
}

const TX_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  TOPUP: { label: "Top-up", color: "text-green-600 bg-green-50" },
  POSTING_FEE: { label: "Posting Fee", color: "text-amber-600 bg-amber-50" },
  ESCROW_HOLD: { label: "Escrow Hold", color: "text-blue-600 bg-blue-50" },
  ESCROW_RELEASE: { label: "Escrow Release", color: "text-sky-600 bg-sky-50" },
  ESCROW_REFUND: { label: "Refund", color: "text-green-600 bg-green-50" },
  PAYOUT: { label: "Payout", color: "text-emerald-600 bg-emerald-50" },
  ADVANCE: { label: "Advance", color: "text-purple-600 bg-purple-50" },
  ADVANCE_REPAYMENT: { label: "Repayment", color: "text-orange-600 bg-orange-50" },
  REFUND: { label: "Refund", color: "text-green-600 bg-green-50" },
  ADJUSTMENT: { label: "Adjustment", color: "text-gray-600 bg-gray-100" },
};

export default function WalletPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    }>
      <WalletContent />
    </Suspense>
  );
}

function WalletContent() {
  const searchParams = useSearchParams();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState("");
  const [topupLoading, setTopupLoading] = useState(false);
  const [userCurrency, setUserCurrency] = useState("USD");
  const [localBalanceStr, setLocalBalanceStr] = useState<string | null>(null);

  const topupStatus = searchParams.get("topup");

  useEffect(() => {
    Promise.all([
      fetch("/api/wallet").then((r) => r.json()),
      fetch("/api/auth").then((r) => r.json()),
    ]).then(([walletData, authData]) => {
      setWallet(walletData.wallet);
      setTransactions(walletData.transactions || []);
      const currency = authData.user?.preferredCurrency || "USD";
      setUserCurrency(currency);
      // Fetch local balance display
      if (currency !== "USD" && walletData.wallet) {
        fetch(`/api/currency?amount=${walletData.wallet.balanceUsd}&from=USD&to=${currency}`)
          .then((r) => r.json())
          .then((c) => setLocalBalanceStr(c.formatted || null));
      }
      setLoading(false);
    });
  }, []);

  async function handleTopup() {
    const amount = parseFloat(topupAmount);
    if (!amount || amount < 5) return;

    setTopupLoading(true);
    try {
      const res = await fetch("/api/wallet/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: amount }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return; // Don't reset loading — page is navigating away
      }
      alert(data.error || "Failed to start top-up. Please try again.");
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setTopupLoading(false);
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

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Top-up result banners */}
        {topupStatus === "success" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 p-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-700">
              Top-up successful! Your balance will update shortly.
            </p>
          </div>
        )}
        {topupStatus === "cancelled" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <XCircle className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-amber-700">Top-up was cancelled.</p>
          </div>
        )}

        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Wallet
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Balance card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-ocean-700 to-sky-600 p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 text-sky-200">
                <Wallet className="h-5 w-5" />
                <p className="text-sm font-medium">Available Balance</p>
              </div>
              <p className="mt-3 text-4xl font-display font-bold">
                ${wallet?.balanceUsd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              {localBalanceStr && (
                <p className="mt-1 text-lg text-sky-200/80 font-medium">
                  ≈ {localBalanceStr}
                </p>
              )}
              <p className="mt-1 text-sm text-sky-200/60">
                USD {userCurrency !== "USD" && `· ${userCurrency}`}
              </p>
              {wallet?.isLocked && (
                <p className="mt-2 text-xs text-amber-300 font-medium">
                  Wallet is temporarily locked
                </p>
              )}
            </div>

            {/* Top-up form */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-ocean-800 mb-3">
                Add Funds
              </h3>
              <div className="space-y-3">
                <Input
                  label="Amount (USD)"
                  type="number"
                  placeholder="Min $5.00"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                />
                <div className="flex gap-2">
                  {[25, 100, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopupAmount(String(amt))}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition ${
                        topupAmount === String(amt)
                          ? "border-ocean-600 bg-ocean-50 text-ocean-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <Button
                  className="w-full"
                  onClick={handleTopup}
                  loading={topupLoading}
                  disabled={!topupAmount || parseFloat(topupAmount) < 5}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>

          {/* Transaction history */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
              Transaction History
            </h2>
            {transactions.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
                <Wallet className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">No transactions yet</p>
                <p className="mt-1 text-sm text-gray-400">
                  Top up your wallet to get started
                </p>
              </div>
            ) : (
              <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {transactions.map((tx) => {
                    const isCredit = tx.amountUsd > 0;
                    const typeInfo =
                      TX_TYPE_LABELS[tx.type] || TX_TYPE_LABELS.ADJUSTMENT;
                    return (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between px-5 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              isCredit
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >
                            {isCredit ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-ocean-800">
                              {tx.description}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeInfo.color}`}
                              >
                                {typeInfo.label}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(tx.createdAt).toLocaleDateString()}{" "}
                                {new Date(tx.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-semibold ${
                              isCredit ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {isCredit ? "+" : ""}$
                            {Math.abs(tx.amountUsd).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p className="text-xs text-gray-400">
                            Bal: $
                            {tx.balanceAfter.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
