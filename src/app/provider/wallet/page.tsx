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
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7]"><Navbar /><div className="mx-auto max-w-2xl px-6 py-20 text-center"><div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" /></div></div>}>
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

  if (loading) return <div className="min-h-screen bg-[#F5F5F7]"><Navbar /><div className="mx-auto max-w-2xl px-6 py-20 text-center"><div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" /></div></div>;

  const bal = wallet?.balanceUsd ?? 0;
  const amt = parseFloat(amount) || 0;
  const fee = instant ? Math.round(amt * 0.015 * 100) / 100 : 0;
  const net = amt - fee;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Wallet className="h-5 w-5 text-[#007AFF]" />
          <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">Provider Wallet</h1>
        </div>

        {/* Balance */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#3A3A3C] p-8 text-white shadow-[0_4px_30px_rgba(0,0,0,.12)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">Available Balance</p>
          <p className="mt-2 text-4xl font-display font-bold tracking-tight">${bal.toFixed(2)}</p>
        </div>

        {/* Stripe return success */}
        {stripeReturn === "complete" && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#EEFBF1] border border-[#34C759]/20 p-4">
            <CheckCircle className="h-5 w-5 text-[#34C759] flex-shrink-0" />
            <div>
              <p className="text-[14px] font-medium text-[#1D1D1F]">Stripe Connect setup complete!</p>
              <p className="text-[13px] text-[#34C759]">Your bank account is now connected. You can withdraw your earnings below.</p>
            </div>
          </div>
        )}
        {stripeReturn === "refresh" && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#FFF3E0] border border-[#FF9500]/20 p-4">
            <Zap className="h-5 w-5 text-[#FF9500] flex-shrink-0" />
            <div>
              <p className="text-[14px] font-medium text-[#1D1D1F]">Stripe setup needs to be completed</p>
              <p className="text-[13px] text-[#FF9500]">Click &quot;Set Up Payouts&quot; below to continue where you left off.</p>
            </div>
          </div>
        )}

        {/* Stripe Connect setup */}
        {!stripeReady && (
          <div className="mt-4 rounded-3xl bg-[#FFF3E0] border border-[#FF9500]/20 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-semibold text-[#1D1D1F]">Connect your bank account</p>
                <p className="text-[13px] text-[#FF9500] mt-1">Set up Stripe Connect to withdraw your earnings to your bank.</p>
              </div>
              <Button size="sm" onClick={setupStripeConnect} loading={connectLoading} className="flex-shrink-0">
                Set Up Payouts
              </Button>
            </div>
          </div>
        )}

        {/* Withdrawal form */}
        {stripeReady && (
          <div className="mt-4 rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
            <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Withdraw to Bank</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input label="Amount (USD)" type="number" placeholder="Min $10.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button onClick={() => setAmount(String(bal))} className="self-end rounded-xl border border-[#E8E8ED] px-3 py-2.5 text-[13px] font-medium text-[#007AFF] hover:bg-[#F5F5F7] transition">
                  Withdraw All
                </button>
              </div>

              {/* Payout type toggle */}
              <div className="space-y-2">
                <label className={`flex items-center justify-between rounded-2xl border-2 p-4 cursor-pointer transition ${!instant ? "border-[#007AFF] bg-[#007AFF]/5" : "border-[#E8E8ED]"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={!instant} onChange={() => setInstant(false)} className="accent-[#007AFF]" />
                    <div>
                      <p className="text-[14px] font-medium text-[#1D1D1F]">Standard Payout</p>
                      <p className="text-[13px] text-[#6E6E73]">Free — arrives in 2-5 business days</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-[#34C759]">Free</span>
                </label>
                <label className={`flex items-center justify-between rounded-2xl border-2 p-4 cursor-pointer transition ${instant ? "border-[#007AFF] bg-[#007AFF]/5" : "border-[#E8E8ED]"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={instant} onChange={() => setInstant(true)} className="accent-[#007AFF]" />
                    <div>
                      <p className="text-[14px] font-medium text-[#1D1D1F] flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-[#FF9500]" /> Instant Payout</p>
                      <p className="text-[13px] text-[#6E6E73]">1.5% fee — arrives within 30 minutes</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-[#FF9500]">{amt > 0 ? `$${fee.toFixed(2)}` : "1.5%"}</span>
                </label>
              </div>

              {amt >= 10 && (
                <div className="rounded-xl bg-[#F5F5F7] p-3 text-[13px] space-y-1">
                  <div className="flex justify-between"><span className="text-[#6E6E73]">Withdrawal</span><span className="text-[#1D1D1F]">${amt.toFixed(2)}</span></div>
                  {fee > 0 && <div className="flex justify-between"><span className="text-[#6E6E73]">Instant fee (1.5%)</span><span className="text-[#FF9500]">-${fee.toFixed(2)}</span></div>}
                  <hr className="border-[#E8E8ED]" />
                  <div className="flex justify-between font-semibold text-[#1D1D1F]"><span>You receive</span><span>${net.toFixed(2)}</span></div>
                </div>
              )}

              <Button className="w-full" size="lg" onClick={handleWithdraw} loading={withdrawing} disabled={amt < 10 || amt > bal}>
                {amt > bal ? "Insufficient balance" : `Withdraw $${(amt || 0).toFixed(2)}`}
              </Button>
              <p className="text-[11px] text-[#86868B] text-center">Funds typically arrive in {instant ? "30 minutes" : "2-5 business days"} depending on your bank.</p>
            </div>
          </div>
        )}

        {/* Transaction history */}
        <div className="mt-6">
          <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-3">Recent Transactions</h2>
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden divide-y divide-[#E8E8ED]">
            {transactions.length === 0 ? (
              <p className="px-4 py-8 text-center text-[14px] text-[#86868B]">No transactions yet</p>
            ) : (
              transactions.slice(0, 20).map((t) => {
                const isCredit = t.amountUsd > 0;
                return (
                  <div key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#F5F5F7] transition">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isCredit ? "bg-[#EEFBF1] text-[#34C759]" : "bg-[#FFF1F0] text-[#FF3B30]"}`}>
                        {isCredit ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-[14px] text-[#1D1D1F]">{t.description}</p>
                        <p className="text-[11px] text-[#86868B]">{new Date(t.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-[14px] font-semibold ${isCredit ? "text-[#34C759]" : "text-[#FF3B30]"}`}>
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
