"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Users, Truck, Package, DollarSign, CheckCircle, AlertTriangle,
  Shield, Activity, Search, Clock, Wallet, ArrowLeft,
} from "lucide-react";

interface Stats {
  totalUsers: number; totalProviders: number; verifiedUsers: number; verifiedProviders: number;
  totalPostings: number; openPostings: number;
  totalBookings: number; activeBookings: number; completedBookings: number;
  disputedBookings: number; pendingBookings: number; cancelledBookings: number;
  totalBids: number; totalReviews: number; totalDisputes: number;
  escrowRevenue: number; postingFeeRevenue: number; totalRevenue: number;
  inEscrow: number; totalWalletBalance: number;
  revenueByMode: Record<string, number>;
}

interface RecentBooking {
  id: string; status: string; createdAt: string;
  posting: { title: string; mode: string };
  customer: { firstName: string; lastName: string };
  provider: { businessName: string };
}

type DetailView = "users" | "providers" | "postings" | "bookings" | "completed" | "pending" | "revenue" | "wallets" | null;

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [activeView, setActiveView] = useState<DetailView>(null);
  const [detailData, setDetailData] = useState<unknown[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // Admin user management
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => { loadStats(); }, []);

  async function loadStats() {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 403) { setAccessDenied(true); setLoading(false); return; }
      const data = await res.json();
      setStats(data.stats);
      setRecentBookings(data.recentBookings || []);
    } catch { setAccessDenied(true); }
    setLoading(false);
  }

  async function openDetail(view: DetailView) {
    setActiveView(view);
    setDetailLoading(true);
    const param = view === "completed" ? "view=bookings&status=COMPLETED"
      : view === "pending" ? "view=bookings&status=CONFIRMED"
      : `view=${view}`;
    const res = await fetch(`/api/admin/detail?${param}`);
    const data = await res.json();
    setDetailData(data.data || []);
    setDetailLoading(false);
  }

  async function userAction(userId: string, action: string, role?: string) {
    setActionLoading(`${userId}-${action}`);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action, role }),
    });
    if (activeView === "users") await openDetail("users");
    setActionLoading("");
  }

  async function searchUsers() {
    setDetailLoading(true);
    const res = await fetch(`/api/admin/detail?view=users`);
    const data = await res.json();
    const filtered = search
      ? (data.data || []).filter((u: { firstName: string; lastName: string; email: string }) =>
          `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
        )
      : data.data || [];
    setDetailData(filtered);
    setDetailLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Shield className="mx-auto h-12 w-12 text-red-400" />
          <h1 className="mt-4 text-2xl font-display font-bold text-ocean-900">Access Denied</h1>
          <p className="mt-2 text-sm text-gray-500">You don&apos;t have admin access.</p>
          <a href="/dashboard" className="mt-6 inline-block rounded-lg bg-ocean-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-ocean-700">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-ocean-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="white" href="/admin" />
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Admin</span>
          </div>
          <a href="/dashboard" className="text-sm text-sky-300 hover:text-white transition">Exit admin</a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Back button when viewing detail */}
        {activeView ? (
          <button onClick={() => setActiveView(null)} className="flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-700 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to overview
          </button>
        ) : (
          <h1 className="text-2xl font-display font-bold text-ocean-900">Platform Dashboard</h1>
        )}

        {/* ── OVERVIEW ── */}
        {!activeView && stats && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {([
                { key: "users" as DetailView, icon: Users, label: "Users", value: stats.totalUsers, sub: `${stats.verifiedUsers} verified`, color: "hover:border-sky-300" },
                { key: "providers" as DetailView, icon: Truck, label: "Providers", value: stats.totalProviders, sub: `${stats.verifiedProviders} verified`, color: "hover:border-sky-300" },
                { key: "postings" as DetailView, icon: Package, label: "Postings", value: stats.totalPostings, sub: `${stats.openPostings} open`, color: "hover:border-sky-300" },
                { key: "bookings" as DetailView, icon: Activity, label: "Bookings", value: stats.totalBookings, sub: `${stats.activeBookings} active`, color: "hover:border-blue-300" },
                { key: "completed" as DetailView, icon: CheckCircle, label: "Completed", value: stats.completedBookings, sub: `${stats.totalReviews} reviews`, color: "hover:border-green-300" },
                { key: "pending" as DetailView, icon: Clock, label: "Pending", value: stats.pendingBookings, sub: "Awaiting start", color: "hover:border-amber-300" },
                { key: "revenue" as DetailView, icon: DollarSign, label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, sub: `$${stats.inEscrow.toLocaleString()} in escrow`, color: "hover:border-green-300" },
                { key: "wallets" as DetailView, icon: Wallet, label: "Wallet Balances", value: `$${stats.totalWalletBalance.toLocaleString()}`, sub: "All users combined", color: "hover:border-purple-300" },
              ]).map((s) => (
                <button
                  key={s.key}
                  onClick={() => openDetail(s.key)}
                  className={`rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-left transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${s.color}`}
                >
                  <div className="flex items-center gap-2 text-gray-400">
                    <s.icon className="h-4 w-4" />
                    <p className="text-xs font-medium">{s.label}</p>
                  </div>
                  <p className="mt-2 text-xl font-display font-bold text-ocean-800">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </button>
              ))}
            </div>

            {stats.disputedBookings > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-700 font-medium">
                  {stats.disputedBookings} disputed booking{stats.disputedBookings !== 1 && "s"} require attention
                </p>
              </div>
            )}

            {/* Revenue by mode */}
            {Object.keys(stats.revenueByMode).length > 0 && (
              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-ocean-800 mb-4">Revenue by Transport Mode</h2>
                <div className="space-y-2">
                  {Object.entries(stats.revenueByMode).sort(([,a], [,b]) => b - a).map(([mode, amount]) => (
                    <div key={mode} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{mode.replace(/_/g, " ")}</span>
                      <span className="text-sm font-semibold text-ocean-700">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent activity */}
            <div className="mt-6 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-ocean-800">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentBookings.map((b: RecentBooking) => (
                  <div key={b.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ocean-800">{b.posting.title}</p>
                      <p className="text-xs text-gray-500">
                        {b.customer.firstName} {b.customer.lastName} → {b.provider.businessName} · {b.posting.mode.replace(/_/g, " ")}
                      </p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      b.status === "COMPLETED" ? "bg-green-50 text-green-700" :
                      b.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" :
                      b.status === "DISPUTED" ? "bg-red-50 text-red-700" :
                      b.status === "CANCELLED" ? "bg-gray-100 text-gray-500" :
                      "bg-amber-50 text-amber-700"
                    }`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── DETAIL VIEWS ── */}
        {activeView && (
          <div className="mt-4">
            <h2 className="text-xl font-display font-bold text-ocean-900 capitalize mb-4">
              {activeView === "completed" ? "Completed Bookings" :
               activeView === "pending" ? "Pending Bookings" :
               activeView === "wallets" ? "All Wallet Balances" :
               activeView}
            </h2>

            {detailLoading ? (
              <div className="py-12 text-center">
                <div className="h-6 w-32 mx-auto animate-pulse rounded bg-gray-200" />
              </div>
            ) : (
              <>
                {/* Users detail */}
                {activeView === "users" && (
                  <>
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text" placeholder="Search users..."
                          value={search} onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && searchUsers()}
                          className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-sky-500"
                        />
                      </div>
                      <Button size="sm" onClick={searchUsers}>Search</Button>
                    </div>
                    <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left text-xs text-gray-500">
                          <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">KYC</th>
                            <th className="px-4 py-3">Score</th>
                            <th className="px-4 py-3">Posts</th>
                            <th className="px-4 py-3">Bookings</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {(detailData as { id: string; firstName: string; lastName: string; email: string; role: string; kycStatus: string; isActive: boolean; trustScore: number; createdAt: string; _count: { postings: number; bookings: number } }[]).map((u) => (
                            <tr key={u.id} className={!u.isActive ? "bg-red-50/30" : ""}>
                              <td className="px-4 py-3 font-medium text-ocean-800">{u.firstName} {u.lastName}</td>
                              <td className="px-4 py-3 text-gray-500">{u.email}</td>
                              <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.role === "ADMIN" ? "bg-purple-50 text-purple-700" : u.role === "PROVIDER" ? "bg-sky-50 text-sky-700" : "bg-gray-100 text-gray-600"}`}>{u.role}</span></td>
                              <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.kycStatus === "APPROVED" ? "bg-green-50 text-green-700" : u.kycStatus === "IN_REVIEW" ? "bg-amber-50 text-amber-700" : u.kycStatus === "REJECTED" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-500"}`}>{u.kycStatus}</span></td>
                              <td className="px-4 py-3">{u.trustScore}</td>
                              <td className="px-4 py-3">{u._count.postings}</td>
                              <td className="px-4 py-3">{u._count.bookings}</td>
                              <td className="px-4 py-3 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  {u.kycStatus !== "APPROVED" && <button onClick={() => userAction(u.id, "approve_kyc")} className="text-green-600 text-xs hover:underline" disabled={actionLoading === `${u.id}-approve_kyc`}>Approve</button>}
                                  {u.isActive ? <button onClick={() => userAction(u.id, "suspend")} className="text-red-500 text-xs hover:underline">Suspend</button> : <button onClick={() => userAction(u.id, "activate")} className="text-green-600 text-xs hover:underline">Activate</button>}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Providers detail */}
                {activeView === "providers" && (
                  <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-left text-xs text-gray-500">
                        <tr>
                          <th className="px-4 py-3">Business</th>
                          <th className="px-4 py-3">Owner</th>
                          <th className="px-4 py-3">Modes</th>
                          <th className="px-4 py-3">Score</th>
                          <th className="px-4 py-3">KYB</th>
                          <th className="px-4 py-3">Bids</th>
                          <th className="px-4 py-3">Bookings</th>
                          <th className="px-4 py-3">Reviews</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(detailData as { id: string; userId: string; businessName: string; couthActsScore: number; scoreTier: string; isVerified: boolean; kybStatus: string; modes: string[]; user: { firstName: string; lastName: string; email: string; kycStatus: string }; _count: { bids: number; bookings: number; reviews: number } }[]).map((p) => (
                          <tr key={p.id}>
                            <td className="px-4 py-3 font-medium text-ocean-800">{p.businessName}</td>
                            <td className="px-4 py-3 text-gray-500">{p.user.firstName} {p.user.lastName}<br/><span className="text-xs">{p.user.email}</span></td>
                            <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{p.modes.slice(0, 3).map((m: string) => <span key={m} className="rounded-full bg-ocean-50 px-2 py-0.5 text-[10px] text-ocean-600">{m.replace(/_/g, " ")}</span>)}{p.modes.length > 3 && <span className="text-[10px] text-gray-400">+{p.modes.length - 3}</span>}</div></td>
                            <td className="px-4 py-3">{p.couthActsScore} <span className="text-xs text-gray-400">{p.scoreTier}</span></td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.kybStatus === "APPROVED" ? "bg-green-50 text-green-700" : p.kybStatus === "IN_REVIEW" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{p.kybStatus}</span></td>
                            <td className="px-4 py-3">{p._count.bids}</td>
                            <td className="px-4 py-3">{p._count.bookings}</td>
                            <td className="px-4 py-3">{p._count.reviews}</td>
                            <td className="px-4 py-3">
                              {p.kybStatus !== "APPROVED" && <button onClick={() => userAction(p.userId, "approve_business")} className="text-sky-600 text-xs hover:underline" disabled={actionLoading === `${p.userId}-approve_business`}>Approve KYB</button>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Postings detail */}
                {activeView === "postings" && (
                  <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-left text-xs text-gray-500">
                        <tr>
                          <th className="px-4 py-3">Title</th>
                          <th className="px-4 py-3">Mode</th>
                          <th className="px-4 py-3">Customer</th>
                          <th className="px-4 py-3">Budget</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Bids</th>
                          <th className="px-4 py-3">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(detailData as { id: string; title: string; mode: string; status: string; budgetUsd: unknown; createdAt: string; customer: { firstName: string; lastName: string; email: string }; _count: { bids: number } }[]).map((p) => (
                          <tr key={p.id}>
                            <td className="px-4 py-3 font-medium text-ocean-800 max-w-[200px] truncate">{p.title}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-ocean-50 px-2 py-0.5 text-[10px] text-ocean-600">{p.mode.replace(/_/g, " ")}</span></td>
                            <td className="px-4 py-3 text-gray-500">{p.customer.firstName} {p.customer.lastName}</td>
                            <td className="px-4 py-3 font-semibold">${Number(p.budgetUsd).toLocaleString()}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.status === "OPEN" || p.status === "BIDDING" ? "bg-sky-50 text-sky-700" : p.status === "MATCHED" ? "bg-green-50 text-green-700" : p.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{p.status}</span></td>
                            <td className="px-4 py-3">{p._count.bids}</td>
                            <td className="px-4 py-3 text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Bookings / Completed / Pending detail */}
                {(activeView === "bookings" || activeView === "completed" || activeView === "pending") && (
                  <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-left text-xs text-gray-500">
                        <tr>
                          <th className="px-4 py-3">Job</th>
                          <th className="px-4 py-3">Mode</th>
                          <th className="px-4 py-3">Customer</th>
                          <th className="px-4 py-3">Provider</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Escrow</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(detailData as { id: string; status: string; agreedAmountUsd: unknown; createdAt: string; posting: { title: string; mode: string }; customer: { firstName: string; lastName: string }; provider: { businessName: string }; escrow: { status: string; totalAmountUsd: unknown; escrowFeeUsd: unknown } | null }[]).map((b) => (
                          <tr key={b.id}>
                            <td className="px-4 py-3 font-medium text-ocean-800 max-w-[180px] truncate">{b.posting.title}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-ocean-50 px-2 py-0.5 text-[10px] text-ocean-600">{b.posting.mode.replace(/_/g, " ")}</span></td>
                            <td className="px-4 py-3 text-gray-500">{b.customer.firstName} {b.customer.lastName}</td>
                            <td className="px-4 py-3 text-gray-500">{b.provider.businessName}</td>
                            <td className="px-4 py-3 font-semibold">${Number(b.agreedAmountUsd).toLocaleString()}</td>
                            <td className="px-4 py-3">{b.escrow ? <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.escrow.status === "HOLDING" ? "bg-amber-50 text-amber-700" : b.escrow.status === "RELEASED" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{b.escrow.status}</span> : "—"}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.status === "COMPLETED" ? "bg-green-50 text-green-700" : b.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" : b.status === "DISPUTED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{b.status}</span></td>
                            <td className="px-4 py-3 text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Revenue detail */}
                {activeView === "revenue" && (
                  <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-left text-xs text-gray-500">
                        <tr>
                          <th className="px-4 py-3">Job</th>
                          <th className="px-4 py-3">Mode</th>
                          <th className="px-4 py-3">Total</th>
                          <th className="px-4 py-3">Platform Fee</th>
                          <th className="px-4 py-3">Escrow Status</th>
                          <th className="px-4 py-3">Booking</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(detailData as { id: string; status: string; totalAmountUsd: unknown; escrowFeeUsd: unknown; posting: { mode: string; title: string }; booking: { status: string; customer: { firstName: string; lastName: string }; provider: { businessName: string } } | null }[]).map((e) => (
                          <tr key={e.id}>
                            <td className="px-4 py-3 font-medium text-ocean-800 max-w-[180px] truncate">{e.posting.title}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-ocean-50 px-2 py-0.5 text-[10px] text-ocean-600">{e.posting.mode.replace(/_/g, " ")}</span></td>
                            <td className="px-4 py-3 font-semibold">${Number(e.totalAmountUsd).toLocaleString()}</td>
                            <td className="px-4 py-3 text-green-600 font-semibold">${Number(e.escrowFeeUsd).toFixed(2)}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${e.status === "HOLDING" ? "bg-amber-50 text-amber-700" : e.status === "RELEASED" ? "bg-green-50 text-green-700" : e.status === "REFUNDED" ? "bg-gray-100 text-gray-500" : "bg-red-50 text-red-700"}`}>{e.status}</span></td>
                            <td className="px-4 py-3 text-xs text-gray-500">{e.booking ? `${e.booking.customer.firstName} → ${e.booking.provider.businessName}` : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Wallets detail */}
                {activeView === "wallets" && (
                  <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-left text-xs text-gray-500">
                        <tr>
                          <th className="px-4 py-3">User</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Role</th>
                          <th className="px-4 py-3">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(detailData as { id: string; balanceUsd: unknown; user: { firstName: string; lastName: string; email: string; role: string } }[]).map((w) => (
                          <tr key={w.id}>
                            <td className="px-4 py-3 font-medium text-ocean-800">{w.user.firstName} {w.user.lastName}</td>
                            <td className="px-4 py-3 text-gray-500">{w.user.email}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${w.user.role === "ADMIN" ? "bg-purple-50 text-purple-700" : w.user.role === "PROVIDER" ? "bg-sky-50 text-sky-700" : "bg-gray-100 text-gray-600"}`}>{w.user.role}</span></td>
                            <td className="px-4 py-3 font-semibold text-ocean-700">${Number(w.balanceUsd).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {detailData.length === 0 && !detailLoading && (
                  <div className="py-12 text-center">
                    <p className="text-sm text-gray-400">No data found</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
