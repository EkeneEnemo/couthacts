"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft, Zap, CheckCircle } from "lucide-react";

interface WalletData { balanceUsd: number; currency: string }
interface Transaction { id: string; type: string; amountUsd: number; description: string; createdAt: string }

export default function ProviderWalletPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50"><Navbar /><div className="mx-auto max-w-2xl px-6 py-20 text-center"><div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" /></div></div>}>
      <WalletContent />
    </Suspense>
  );
}

function WalletContent() {
  const searchParams = useSearchParams();
  const stripeReturn = searchParams.get("stripe");
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [instant, setInstant] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/wallet").then((r) => r.json()),
      fetch("/api/providers/stripe-connect").then((r) => r.json()),
    ]).then(([walletData, stripeData]) => {
      setWallet(walletData.wallet);
      setTransactions((walletData.transactions || []).map((t: { id: string; type: string; amountUsd: unknown; description: string; createdAt: string }) => ({ ...t, amountUsd: Number(t.amountUsd) })));
      setStripeReady(stripeData.onboardingComplete || false);
      setLoading(false);
    });
  }, []);

  async function handleWithdraw() {
    const amt = parseFloat(amount);
    if (!amt || amt < 10) return;
    setWithdrawing(true);
    try {
      const res = await fetch("/api/provider/payout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: amt, instant }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`$${data.netPayout.toFixed(2)} withdrawal initiated. Estimated arrival: ${data.estimatedArrival}${data.fee > 0 ? `. Fee: $${data.fee.toFixed(2)}` : ""}`);
        setAmount("");
        // Refresh
        const fresh = await fetch("/api/wallet").then((r) => r.json());
        setWallet(fresh.wallet);
        setTransactions((fresh.transactions || []).map((t: { id: string; type: string; amountUsd: unknown; description: string; createdAt: string }) => ({ ...t, amountUsd: Number(t.amountUsd) })));
      } else {
        alert(data.error || "Withdrawal failed");
      }
    } catch { alert("Something went wrong"); }
    setWithdrawing(false);
  }

  async function setupStripeConnect() {
    setConnectLoading(true);
    const res = await fetch("/api/providers/stripe-connect", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Failed to start setup");
    setConnectLoading(false);
  }

  if (loading) return <div className="min-h-screen bg-cream-50"><Navbar /><div className="mx-auto max-w-2xl px-6 py-20 text-center"><div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" /></div></div>;

  const bal = wallet?.balanceUsd ?? 0;
  const amt = parseFloat(amount) || 0;
  const fee = instant ? Math.round(amt * 0.015 * 100) / 100 : 0;
  const net = amt - fee;

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Wallet className="h-5 w-5 text-ocean-600" />
          <h1 className="text-2xl font-display font-bold text-ocean-900">Provider Wallet</h1>
        </div>

        {/* Balance */}
        <div className="rounded-2xl bg-gradient-to-br from-ocean-700 to-sky-600 p-8 text-white shadow-lg">
          <p className="text-sm text-sky-200">Available Balance</p>
          <p className="mt-2 text-4xl font-display font-bold">${bal.toFixed(2)}</p>
        </div>

        {/* Stripe return success */}
        {stripeReturn === "complete" && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 p-4">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Stripe Connect setup complete!</p>
              <p className="text-xs text-green-600">Your bank account is now connected. You can withdraw your earnings below.</p>
            </div>
          </div>
        )}
        {stripeReturn === "refresh" && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <Zap className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">Stripe setup needs to be completed</p>
              <p className="text-xs text-amber-600">Click &quot;Set Up Payouts&quot; below to continue where you left off.</p>
            </div>
          </div>
        )}

        {/* Stripe Connect setup */}
        {!stripeReady && (
          <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-amber-800">Connect your bank account</p>
                <p className="text-xs text-amber-600 mt-1">Set up Stripe Connect to withdraw your earnings to your bank.</p>
              </div>
              <Button size="sm" onClick={setupStripeConnect} loading={connectLoading} className="flex-shrink-0">
                Set Up Payouts
              </Button>
            </div>
          </div>
        )}

        {/* Withdrawal form */}
        {stripeReady && (
          <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-ocean-800 mb-4">Withdraw to Bank</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input label="Amount (USD)" type="number" placeholder="Min $10.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button onClick={() => setAmount(String(bal))} className="self-end rounded-lg border border-gray-200 px-3 py-2.5 text-xs font-medium text-ocean-600 hover:bg-ocean-50 transition">
                  Withdraw All
                </button>
              </div>

              {/* Payout type toggle */}
              <div className="space-y-2">
                <label className={`flex items-center justify-between rounded-xl border-2 p-4 cursor-pointer transition ${!instant ? "border-ocean-600 bg-ocean-50" : "border-gray-200"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={!instant} onChange={() => setInstant(false)} className="accent-ocean-600" />
                    <div>
                      <p className="text-sm font-medium text-ocean-800">Standard Payout</p>
                      <p className="text-xs text-gray-500">Free — arrives in 2-5 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">Free</span>
                </label>
                <label className={`flex items-center justify-between rounded-xl border-2 p-4 cursor-pointer transition ${instant ? "border-ocean-600 bg-ocean-50" : "border-gray-200"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={instant} onChange={() => setInstant(true)} className="accent-ocean-600" />
                    <div>
                      <p className="text-sm font-medium text-ocean-800 flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-500" /> Instant Payout</p>
                      <p className="text-xs text-gray-500">1.5% fee — arrives within 30 minutes</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">{amt > 0 ? `$${fee.toFixed(2)}` : "1.5%"}</span>
                </label>
              </div>

              {amt >= 10 && (
                <div className="rounded-lg bg-ocean-50 p-3 text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-gray-600">Withdrawal</span><span>${amt.toFixed(2)}</span></div>
                  {fee > 0 && <div className="flex justify-between"><span className="text-gray-600">Instant fee (1.5%)</span><span className="text-amber-600">-${fee.toFixed(2)}</span></div>}
                  <hr className="border-ocean-200" />
                  <div className="flex justify-between font-semibold text-ocean-800"><span>You receive</span><span>${net.toFixed(2)}</span></div>
                </div>
              )}

              <Button className="w-full" size="lg" onClick={handleWithdraw} loading={withdrawing} disabled={amt < 10 || amt > bal}>
                {amt > bal ? "Insufficient balance" : `Withdraw $${(amt || 0).toFixed(2)}`}
              </Button>
              <p className="text-xs text-gray-400 text-center">Funds typically arrive in {instant ? "30 minutes" : "2-5 business days"} depending on your bank.</p>
            </div>
          </div>
        )}

        {/* Transaction history */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-ocean-800 mb-3">Recent Transactions</h2>
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-gray-400">No transactions yet</p>
            ) : (
              transactions.slice(0, 20).map((t) => {
                const isCredit = t.amountUsd > 0;
                return (
                  <div key={t.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isCredit ? "bg-green-50 text-green-500" : "bg-red-50 text-red-400"}`}>
                        {isCredit ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm text-ocean-800">{t.description}</p>
                        <p className="text-[10px] text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${isCredit ? "text-green-600" : "text-red-500"}`}>
                      {isCredit ? "+" : ""}{t.amountUsd < 0 ? "-" : ""}${Math.abs(t.amountUsd).toFixed(2)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
