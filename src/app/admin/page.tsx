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
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-[#E8E8ED]" />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Shield className="mx-auto h-12 w-12 text-[#FF3B30]" />
          <h1 className="mt-4 text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">Access Denied</h1>
          <p className="mt-2 text-[14px] text-[#6E6E73]">You don&apos;t have admin access.</p>
          <a href="/dashboard" className="mt-6 inline-block rounded-full bg-[#007AFF] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0055D4] transition">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-[#1D1D1F]/95 backdrop-blur-xl text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="white" href="/admin" />
            <span className="rounded-full bg-[#5856D6]/20 px-3 py-1 text-[11px] font-semibold text-[#BDB6FF] uppercase tracking-[0.1em]">Admin</span>
          </div>
          <a href="/dashboard" className="text-[14px] text-[#007AFF] hover:text-[#0055D4] transition">Exit admin</a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Back button when viewing detail */}
        {activeView ? (
          <button onClick={() => setActiveView(null)} className="flex items-center gap-1 text-[14px] text-[#007AFF] hover:text-[#0055D4] mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to overview
          </button>
        ) : (
          <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">Platform Dashboard</h1>
        )}

        {/* -- OVERVIEW -- */}
        {!activeView && stats && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {([
                { key: "users" as DetailView, icon: Users, label: "Users", value: stats.totalUsers, sub: `${stats.verifiedUsers} verified` },
                { key: "providers" as DetailView, icon: Truck, label: "Providers", value: stats.totalProviders, sub: `${stats.verifiedProviders} verified` },
                { key: "postings" as DetailView, icon: Package, label: "Postings", value: stats.totalPostings, sub: `${stats.openPostings} open` },
                { key: "bookings" as DetailView, icon: Activity, label: "Bookings", value: stats.totalBookings, sub: `${stats.activeBookings} active` },
                { key: "completed" as DetailView, icon: CheckCircle, label: "Completed", value: stats.completedBookings, sub: `${stats.totalReviews} reviews` },
                { key: "pending" as DetailView, icon: Clock, label: "Pending", value: stats.pendingBookings, sub: "Awaiting start" },
                { key: "revenue" as DetailView, icon: DollarSign, label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, sub: `$${stats.inEscrow.toLocaleString()} in escrow` },
                { key: "wallets" as DetailView, icon: Wallet, label: "Wallet Balances", value: `$${stats.totalWalletBalance.toLocaleString()}`, sub: "All users combined" },
              ]).map((s) => (
                <button
                  key={s.key}
                  onClick={() => openDetail(s.key)}
                  className="rounded-3xl bg-white/80 backdrop-blur-xl p-4 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 text-left transition-all hover:shadow-[0_4px_30px_rgba(0,0,0,.08)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-[#86868B]">
                    <s.icon className="h-4 w-4" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em]">{s.label}</p>
                  </div>
                  <p className="mt-2 text-xl font-display font-bold tracking-tight text-[#1D1D1F]">{s.value}</p>
                  <p className="text-[11px] text-[#86868B]">{s.sub}</p>
                </button>
              ))}
            </div>

            {stats.disputedBookings > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#FFF1F0] border border-[#FF3B30]/20 p-4">
                <AlertTriangle className="h-5 w-5 text-[#FF3B30]" />
                <p className="text-[14px] text-[#FF3B30] font-medium">
                  {stats.disputedBookings} disputed booking{stats.disputedBookings !== 1 && "s"} require attention
                </p>
              </div>
            )}

            {/* Revenue by mode */}
            {Object.keys(stats.revenueByMode).length > 0 && (
              <div className="mt-6 rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Revenue by Transport Mode</h2>
                <div className="space-y-2">
                  {Object.entries(stats.revenueByMode).sort(([,a], [,b]) => b - a).map(([mode, amount]) => (
                    <div key={mode} className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6E6E73]">{mode.replace(/_/g, " ")}</span>
                      <span className="text-[14px] font-semibold text-[#1D1D1F]">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent activity */}
            <div className="mt-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <div className="px-4 py-3 border-b border-[#E8E8ED]">
                <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em]">Recent Activity</h2>
              </div>
              <div className="divide-y divide-[#E8E8ED]">
                {recentBookings.map((b: RecentBooking) => (
                  <div key={b.id} className="px-4 py-3 flex items-center justify-between hover:bg-[#F5F5F7] transition">
                    <div>
                      <p className="text-[14px] font-medium text-[#1D1D1F]">{b.posting.title}</p>
                      <p className="text-[11px] text-[#86868B]">
                        {b.customer.firstName} {b.customer.lastName} → {b.provider.businessName} · {b.posting.mode.replace(/_/g, " ")}
                      </p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      b.status === "COMPLETED" ? "bg-[#EEFBF1] text-[#34C759]" :
                      b.status === "IN_PROGRESS" ? "bg-[#007AFF]/10 text-[#007AFF]" :
                      b.status === "DISPUTED" ? "bg-[#FFF1F0] text-[#FF3B30]" :
                      b.status === "CANCELLED" ? "bg-[#F5F5F7] text-[#86868B]" :
                      "bg-[#FFF3E0] text-[#FF9500]"
                    }`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* -- DETAIL VIEWS -- */}
        {activeView && (
          <div className="mt-4">
            <h2 className="text-xl font-display font-bold tracking-tight text-[#1D1D1F] capitalize mb-4">
              {activeView === "completed" ? "Completed Bookings" :
               activeView === "pending" ? "Pending Bookings" :
               activeView === "wallets" ? "All Wallet Balances" :
               activeView}
            </h2>

            {detailLoading ? (
              <div className="py-12 text-center">
                <div className="h-6 w-32 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" />
              </div>
            ) : (
              <>
                {/* Users detail */}
                {activeView === "users" && (
                  <>
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868B]" />
                        <input
                          type="text" placeholder="Search users..."
                          value={search} onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && searchUsers()}
                          className="w-full rounded-xl border border-[#E8E8ED] bg-white pl-10 pr-4 py-2 text-[14px] outline-none focus:border-[#007AFF] transition"
                        />
                      </div>
                      <Button size="sm" onClick={searchUsers}>Search</Button>
                    </div>
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-x-auto">
                      <table className="w-full text-[14px]">
                        <thead>
                          <tr className="border-b border-[#E8E8ED]">
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Email</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Role</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">KYC</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Score</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Posts</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Bookings</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Joined</th>
                            <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E8ED]">
                          {(detailData as { id: string; firstName: string; lastName: string; email: string; role: string; kycStatus: string; isActive: boolean; trustScore: number; createdAt: string; _count: { postings: number; bookings: number } }[]).map((u) => (
                            <tr key={u.id} className={`hover:bg-[#F5F5F7] transition ${!u.isActive ? "bg-[#FFF1F0]/30" : ""}`}>
                              <td className="px-4 py-3 font-medium text-[#1D1D1F]">{u.firstName} {u.lastName}</td>
                              <td className="px-4 py-3 text-[#6E6E73]">{u.email}</td>
                              <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.role === "ADMIN" ? "bg-[#5856D6]/10 text-[#5856D6]" : u.role === "PROVIDER" ? "bg-[#007AFF]/10 text-[#007AFF]" : "bg-[#F5F5F7] text-[#6E6E73]"}`}>{u.role}</span></td>
                              <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.kycStatus === "APPROVED" ? "bg-[#EEFBF1] text-[#34C759]" : u.kycStatus === "IN_REVIEW" ? "bg-[#FFF3E0] text-[#FF9500]" : u.kycStatus === "REJECTED" ? "bg-[#FFF1F0] text-[#FF3B30]" : "bg-[#F5F5F7] text-[#86868B]"}`}>{u.kycStatus}</span></td>
                              <td className="px-4 py-3 text-[#1D1D1F]">{u.trustScore}</td>
                              <td className="px-4 py-3 text-[#1D1D1F]">{u._count.postings}</td>
                              <td className="px-4 py-3 text-[#1D1D1F]">{u._count.bookings}</td>
                              <td className="px-4 py-3 text-[11px] text-[#86868B]">{new Date(u.createdAt).toLocaleDateString()}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  {u.kycStatus !== "APPROVED" && <button onClick={() => userAction(u.id, "approve_kyc")} className="text-[#34C759] text-[13px] hover:underline" disabled={actionLoading === `${u.id}-approve_kyc`}>Approve</button>}
                                  {u.isActive ? <button onClick={() => userAction(u.id, "suspend")} className="text-[#FF3B30] text-[13px] hover:underline">Suspend</button> : <button onClick={() => userAction(u.id, "activate")} className="text-[#34C759] text-[13px] hover:underline">Activate</button>}
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
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-x-auto">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="border-b border-[#E8E8ED]">
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Business</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Owner</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Modes</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Score</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">KYB</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Bids</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Bookings</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Reviews</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8ED]">
                        {(detailData as { id: string; userId: string; businessName: string; couthActsScore: number; scoreTier: string; isVerified: boolean; kybStatus: string; modes: string[]; user: { firstName: string; lastName: string; email: string; kycStatus: string }; _count: { bids: number; bookings: number; reviews: number } }[]).map((p) => (
                          <tr key={p.id} className="hover:bg-[#F5F5F7] transition">
                            <td className="px-4 py-3 font-medium text-[#1D1D1F]">{p.businessName}</td>
                            <td className="px-4 py-3 text-[#6E6E73]">{p.user.firstName} {p.user.lastName}<br/><span className="text-[11px] text-[#86868B]">{p.user.email}</span></td>
                            <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{p.modes.slice(0, 3).map((m: string) => <span key={m} className="rounded-full bg-[#007AFF]/10 px-2 py-0.5 text-[10px] text-[#007AFF]">{m.replace(/_/g, " ")}</span>)}{p.modes.length > 3 && <span className="text-[10px] text-[#86868B]">+{p.modes.length - 3}</span>}</div></td>
                            <td className="px-4 py-3 text-[#1D1D1F]">{p.couthActsScore} <span className="text-[11px] text-[#86868B]">{p.scoreTier}</span></td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.kybStatus === "APPROVED" ? "bg-[#EEFBF1] text-[#34C759]" : p.kybStatus === "IN_REVIEW" ? "bg-[#FFF3E0] text-[#FF9500]" : "bg-[#F5F5F7] text-[#86868B]"}`}>{p.kybStatus}</span></td>
                            <td className="px-4 py-3 text-[#1D1D1F]">{p._count.bids}</td>
                            <td className="px-4 py-3 text-[#1D1D1F]">{p._count.bookings}</td>
                            <td className="px-4 py-3 text-[#1D1D1F]">{p._count.reviews}</td>
                            <td className="px-4 py-3">
                              {p.kybStatus !== "APPROVED" && <button onClick={() => userAction(p.userId, "approve_business")} className="text-[#007AFF] text-[13px] hover:underline" disabled={actionLoading === `${p.userId}-approve_business`}>Approve KYB</button>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Postings detail */}
                {activeView === "postings" && (
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-x-auto">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="border-b border-[#E8E8ED]">
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Title</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Mode</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Customer</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Budget</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Bids</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8ED]">
                        {(detailData as { id: string; title: string; mode: string; status: string; budgetUsd: unknown; createdAt: string; customer: { firstName: string; lastName: string; email: string }; _count: { bids: number } }[]).map((p) => (
                          <tr key={p.id} className="hover:bg-[#F5F5F7] transition">
                            <td className="px-4 py-3 font-medium text-[#1D1D1F] max-w-[200px] truncate">{p.title}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-[#007AFF]/10 px-2 py-0.5 text-[10px] text-[#007AFF]">{p.mode.replace(/_/g, " ")}</span></td>
                            <td className="px-4 py-3 text-[#6E6E73]">{p.customer.firstName} {p.customer.lastName}</td>
                            <td className="px-4 py-3 font-semibold text-[#1D1D1F]">${Number(p.budgetUsd).toLocaleString()}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.status === "OPEN" || p.status === "BIDDING" ? "bg-[#007AFF]/10 text-[#007AFF]" : p.status === "MATCHED" ? "bg-[#EEFBF1] text-[#34C759]" : p.status === "COMPLETED" ? "bg-[#EEFBF1] text-[#34C759]" : "bg-[#F5F5F7] text-[#86868B]"}`}>{p.status}</span></td>
                            <td className="px-4 py-3 text-[#1D1D1F]">{p._count.bids}</td>
                            <td className="px-4 py-3 text-[11px] text-[#86868B]">{new Date(p.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Bookings / Completed / Pending detail */}
                {(activeView === "bookings" || activeView === "completed" || activeView === "pending") && (
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-x-auto">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="border-b border-[#E8E8ED]">
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Job</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Mode</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Customer</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Provider</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Escrow</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8ED]">
                        {(detailData as { id: string; status: string; agreedAmountUsd: unknown; createdAt: string; posting: { title: string; mode: string }; customer: { firstName: string; lastName: string }; provider: { businessName: string }; escrow: { status: string; totalAmountUsd: unknown; escrowFeeUsd: unknown } | null }[]).map((b) => (
                          <tr key={b.id} className="hover:bg-[#F5F5F7] transition">
                            <td className="px-4 py-3 font-medium text-[#1D1D1F] max-w-[180px] truncate">{b.posting.title}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-[#007AFF]/10 px-2 py-0.5 text-[10px] text-[#007AFF]">{b.posting.mode.replace(/_/g, " ")}</span></td>
                            <td className="px-4 py-3 text-[#6E6E73]">{b.customer.firstName} {b.customer.lastName}</td>
                            <td className="px-4 py-3 text-[#6E6E73]">{b.provider.businessName}</td>
                            <td className="px-4 py-3 font-semibold text-[#1D1D1F]">${Number(b.agreedAmountUsd).toLocaleString()}</td>
                            <td className="px-4 py-3">{b.escrow ? <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.escrow.status === "HOLDING" ? "bg-[#FFF3E0] text-[#FF9500]" : b.escrow.status === "RELEASED" ? "bg-[#EEFBF1] text-[#34C759]" : "bg-[#F5F5F7] text-[#86868B]"}`}>{b.escrow.status}</span> : "—"}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.status === "COMPLETED" ? "bg-[#EEFBF1] text-[#34C759]" : b.status === "IN_PROGRESS" ? "bg-[#007AFF]/10 text-[#007AFF]" : b.status === "DISPUTED" ? "bg-[#FFF1F0] text-[#FF3B30]" : "bg-[#FFF3E0] text-[#FF9500]"}`}>{b.status}</span></td>
                            <td className="px-4 py-3 text-[11px] text-[#86868B]">{new Date(b.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Revenue detail */}
                {activeView === "revenue" && (
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-x-auto">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="border-b border-[#E8E8ED]">
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Job</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Mode</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Total</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Platform Fee</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Escrow Status</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Booking</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8ED]">
                        {(detailData as { id: string; status: string; totalAmountUsd: unknown; escrowFeeUsd: unknown; posting: { mode: string; title: string }; booking: { status: string; customer: { firstName: string; lastName: string }; provider: { businessName: string } } | null }[]).map((e) => (
                          <tr key={e.id} className="hover:bg-[#F5F5F7] transition">
                            <td className="px-4 py-3 font-medium text-[#1D1D1F] max-w-[180px] truncate">{e.posting.title}</td>
                            <td className="px-4 py-3"><span className="rounded-full bg-[#007AFF]/10 px-2 py-0.5 text-[10px] text-[#007AFF]">{e.posting.mode.replace(/_/g, " ")}</span></td>
                            <td className="px-4 py-3 font-semibold text-[#1D1D1F]">${Number(e.totalAmountUsd).toLocaleString()}</td>
                            <td className="px-4 py-3 text-[#34C759] font-semibold">${Number(e.escrowFeeUsd).toFixed(2)}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${e.status === "HOLDING" ? "bg-[#FFF3E0] text-[#FF9500]" : e.status === "RELEASED" ? "bg-[#EEFBF1] text-[#34C759]" : e.status === "REFUNDED" ? "bg-[#F5F5F7] text-[#86868B]" : "bg-[#FFF1F0] text-[#FF3B30]"}`}>{e.status}</span></td>
                            <td className="px-4 py-3 text-[13px] text-[#6E6E73]">{e.booking ? `${e.booking.customer.firstName} → ${e.booking.provider.businessName}` : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Wallets detail */}
                {activeView === "wallets" && (
                  <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-x-auto">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="border-b border-[#E8E8ED]">
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">User</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Role</th>
                          <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E8ED]">
                        {(detailData as { id: string; balanceUsd: unknown; user: { firstName: string; lastName: string; email: string; role: string } }[]).map((w) => (
                          <tr key={w.id} className="hover:bg-[#F5F5F7] transition">
                            <td className="px-4 py-3 font-medium text-[#1D1D1F]">{w.user.firstName} {w.user.lastName}</td>
                            <td className="px-4 py-3 text-[#6E6E73]">{w.user.email}</td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${w.user.role === "ADMIN" ? "bg-[#5856D6]/10 text-[#5856D6]" : w.user.role === "PROVIDER" ? "bg-[#007AFF]/10 text-[#007AFF]" : "bg-[#F5F5F7] text-[#6E6E73]"}`}>{w.user.role}</span></td>
                            <td className="px-4 py-3 font-semibold text-[#1D1D1F]">${Number(w.balanceUsd).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {detailData.length === 0 && !detailLoading && (
                  <div className="py-12 text-center">
                    <p className="text-[14px] text-[#86868B]">No data found</p>
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
