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
  FileText,
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
  TOPUP: { label: "Top-up", color: "text-[#34C759] bg-[#EEFBF1]" },
  POSTING_FEE: { label: "Posting Fee", color: "text-[#FF9500] bg-[#FFF3E0]" },
  ESCROW_HOLD: { label: "Escrow Hold", color: "text-[#007AFF] bg-[#007AFF]/10" },
  ESCROW_RELEASE: { label: "Escrow Release", color: "text-[#007AFF] bg-[#007AFF]/10" },
  ESCROW_REFUND: { label: "Refund", color: "text-[#34C759] bg-[#EEFBF1]" },
  PAYOUT: { label: "Payout", color: "text-[#34C759] bg-[#EEFBF1]" },
  ADVANCE: { label: "Advance", color: "text-[#AF52DE] bg-[#AF52DE]/10" },
  ADVANCE_REPAYMENT: { label: "Repayment", color: "text-[#FF9500] bg-[#FFF3E0]" },
  REFUND: { label: "Refund", color: "text-[#34C759] bg-[#EEFBF1]" },
  ADJUSTMENT: { label: "Adjustment", color: "text-[#86868B] bg-[#F5F5F7]" },
};

export default function WalletPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" />
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
  const [userRole, setUserRole] = useState("CUSTOMER");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const topupStatus = searchParams.get("topup");

  // Fetch wallet + auth data, then handle post-topup confirmation
  useEffect(() => {
    async function loadData() {
      const [walletData, authData] = await Promise.all([
        fetch("/api/wallet").then((r) => r.json()),
        fetch("/api/auth").then((r) => r.json()),
      ]);

      setWallet(walletData.wallet);
      setTransactions(walletData.transactions || []);
      const currency = authData.user?.preferredCurrency || "USD";
      setUserCurrency(currency);
      setUserRole(authData.user?.role || "CUSTOMER");

      if (currency !== "USD" && walletData.wallet) {
        fetch(`/api/currency?amount=${walletData.wallet.balanceUsd}&from=USD&to=${currency}`)
          .then((r) => r.json())
          .then((c) => setLocalBalanceStr(c.formatted || null));
      }

      setLoading(false);

      // If returning from Stripe success, confirm the payment and credit wallet
      if (topupStatus === "success") {
        const storedSessionId = sessionStorage.getItem("couthacts_topup_session");
        if (storedSessionId) {
          sessionStorage.removeItem("couthacts_topup_session");
          try {
            const confirmRes = await fetch("/api/wallet/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: storedSessionId }),
            });
            const confirmData = await confirmRes.json();
            if (confirmData.success) {
              // Immediately update the displayed balance
              setWallet((prev) =>
                prev ? { ...prev, balanceUsd: confirmData.balance } : prev
              );
              return;
            }
          } catch {
            // Fall through to polling
          }
        }

        // Fallback: poll for balance update (webhook may credit it)
        let attempts = 0;
        const initialBalance = walletData.wallet?.balanceUsd || 0;
        const poll = setInterval(async () => {
          attempts++;
          if (attempts > 5) {
            clearInterval(poll);
            return;
          }
          const fresh = await fetch("/api/wallet").then((r) => r.json());
          if (fresh.wallet && fresh.wallet.balanceUsd > initialBalance) {
            setWallet(fresh.wallet);
            setTransactions(fresh.transactions || []);
            clearInterval(poll);
          }
        }, 2000);
      }
    }

    loadData();
  }, [topupStatus]);

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
        // Store session ID for post-checkout confirmation
        if (data.sessionId) {
          sessionStorage.setItem("couthacts_topup_session", data.sessionId);
        }
        window.location.href = data.url;
        return; // Don't reset loading — page is navigating away
      }
      alert(data.error || "Failed to start top-up. Please try again.");
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setTopupLoading(false);
  }

  async function handleWithdraw() {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount < 1) return;
    setWithdrawLoading(true);
    try {
      const res = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: amount }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`$${amount.toFixed(2)} withdrawn to your bank account.`);
        setWithdrawAmount("");
        // Refresh wallet
        const fresh = await fetch("/api/wallet").then((r) => r.json());
        setWallet(fresh.wallet);
        setTransactions(fresh.transactions || []);
      } else {
        alert(data.error || "Withdrawal failed.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setWithdrawLoading(false);
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

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Top-up result banners */}
        {topupStatus === "success" && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-[#EEFBF1] border border-[#34C759]/20 p-4">
            <CheckCircle className="h-5 w-5 text-[#34C759]" />
            <p className="text-[13px] text-[#34C759]">
              Top-up successful! Your balance will update shortly.
            </p>
          </div>
        )}
        {topupStatus === "cancelled" && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-[#FFF3E0] border border-[#FF9500]/20 p-4">
            <XCircle className="h-5 w-5 text-[#FF9500]" />
            <p className="text-[13px] text-[#FF9500]">Top-up was cancelled.</p>
          </div>
        )}

        <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">
          Wallet
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Balance card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl bg-[#1D1D1F] p-6 text-white shadow-[0_2px_20px_rgba(0,0,0,.12)]">
              <div className="flex items-center gap-2 text-white/60">
                <Wallet className="h-5 w-5" />
                <p className="text-[13px] font-medium">Available Balance</p>
              </div>
              <p className="mt-3 text-4xl font-display font-bold tabular-nums">
                ${wallet?.balanceUsd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              {localBalanceStr && (
                <p className="mt-1 text-lg text-white/50 font-medium tabular-nums">
                  ≈ {localBalanceStr}
                </p>
              )}
              <p className="mt-1 text-[13px] text-white/40">
                USD {userCurrency !== "USD" && `· ${userCurrency}`}
              </p>
              {wallet?.isLocked && (
                <p className="mt-2 text-[11px] text-[#FF9500] font-medium">
                  Wallet is temporarily locked
                </p>
              )}
            </div>

            {/* Top-up form */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">
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
                      className={`flex-1 rounded-full border py-1.5 text-[11px] font-medium transition ${
                        topupAmount === String(amt)
                          ? "border-[#007AFF] bg-[#007AFF]/5 text-[#007AFF]"
                          : "border-[#E8E8ED] text-[#86868B] hover:border-[#86868B]"
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

            {/* Withdrawal — providers only */}
            {userRole === "PROVIDER" && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h3 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">
                  Withdraw to Bank
                </h3>
                <div className="space-y-3">
                  <Input
                    label="Amount (USD)"
                    type="number"
                    placeholder="Min $1.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleWithdraw}
                    loading={withdrawLoading}
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) < 1}
                  >
                    Withdraw to Stripe
                  </Button>
                  <p className="text-[11px] text-[#86868B]">
                    Funds are transferred to your connected Stripe bank account.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Transaction history */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-display font-semibold tracking-tight text-[#1D1D1F] mb-4">
              Transaction History
            </h2>
            {transactions.length === 0 ? (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-12 text-center shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <Wallet className="mx-auto h-12 w-12 text-[#86868B]" />
                <p className="mt-4 text-[14px] text-[#6E6E73]">No transactions yet</p>
                <p className="mt-1 text-[13px] text-[#86868B]">
                  Top up your wallet to get started
                </p>
              </div>
            ) : (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
                <div className="divide-y divide-[#E8E8ED]/60">
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
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                              isCredit
                                ? "bg-[#EEFBF1] text-[#34C759]"
                                : "bg-[#FFF1F0] text-[#FF3B30]"
                            }`}
                          >
                            {isCredit ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-[#1D1D1F]">
                              {tx.description}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${typeInfo.color}`}
                              >
                                {typeInfo.label}
                              </span>
                              <span className="text-[11px] text-[#86868B]">
                                {new Date(tx.createdAt).toLocaleDateString()}{" "}
                                {new Date(tx.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZoneName: "short",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p
                              className={`text-[13px] font-semibold tabular-nums ${
                                isCredit ? "text-[#34C759]" : "text-[#FF3B30]"
                              }`}
                            >
                              {isCredit ? "+" : ""}$
                              {Math.abs(tx.amountUsd).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                            <p className="text-[11px] text-[#86868B] tabular-nums">
                              Bal: $
                              {tx.balanceAfter.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                          <a
                            href={`/api/wallet/receipt?id=${tx.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Download receipt"
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#86868B] hover:bg-[#007AFF]/5 hover:text-[#007AFF] transition-colors"
                          >
                            <FileText className="h-4 w-4" />
                          </a>
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
