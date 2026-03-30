"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Users,
  Truck,
  Package,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Shield,
  Activity,
  Search,
  XCircle,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalProviders: number;
  verifiedUsers: number;
  verifiedProviders: number;
  totalPostings: number;
  openPostings: number;
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  disputedBookings: number;
  totalBids: number;
  totalReviews: number;
  totalDisputes: number;
  escrowRevenue: number;
  postingFeeRevenue: number;
  totalRevenue: number;
}

interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  kycStatus: string;
  isActive: boolean;
  trustScore: number;
  createdAt: string;
  provider: { id: string; businessName: string; isVerified: boolean; kybStatus: string } | null;
}

interface RecentBooking {
  id: string;
  status: string;
  createdAt: string;
  posting: { title: string; mode: string };
  customer: { firstName: string; lastName: string };
  provider: { businessName: string };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [kycFilter, setKycFilter] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.status === 403) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      const statsData = await statsRes.json();
      const usersData = await fetch("/api/admin/users").then((r) => r.json());
      setStats(statsData.stats);
      setRecentBookings(statsData.recentBookings || []);
      setUsers(usersData.users || []);
    } catch {
      setAccessDenied(true);
    }
    setLoading(false);
  }

  async function searchUsers() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (roleFilter) params.set("role", roleFilter);
    if (kycFilter) params.set("kyc", kycFilter);
    const res = await fetch(`/api/admin/users?${params}`).then((r) => r.json());
    setUsers(res.users || []);
  }

  async function userAction(userId: string, action: string, role?: string) {
    setActionLoading(`${userId}-${action}`);
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action, role }),
    });
    await searchUsers();
    setActionLoading("");
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
          <p className="mt-2 text-sm text-gray-500">
            You don&apos;t have admin access. Make sure you&apos;re logged in with an admin account.
          </p>
          <a
            href="/dashboard"
            className="mt-6 inline-block rounded-lg bg-ocean-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-ocean-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Admin header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-ocean-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="white" href="/admin" />
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
              Admin
            </span>
          </div>
          <a href="/dashboard" className="text-sm text-sky-300 hover:text-white transition">
            Exit admin
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Platform Dashboard
        </h1>

        {/* Stats grid */}
        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: Users, label: "Users", value: stats.totalUsers, sub: `${stats.verifiedUsers} verified` },
              { icon: Truck, label: "Providers", value: stats.totalProviders, sub: `${stats.verifiedProviders} verified` },
              { icon: Package, label: "Postings", value: stats.totalPostings, sub: `${stats.openPostings} open` },
              { icon: Activity, label: "Bookings", value: stats.totalBookings, sub: `${stats.activeBookings} active` },
              { icon: CheckCircle, label: "Completed", value: stats.completedBookings, sub: `${stats.totalReviews} reviews` },
              { icon: DollarSign, label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, sub: `Fees + Escrow` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-400">
                  <s.icon className="h-4 w-4" />
                  <p className="text-xs font-medium">{s.label}</p>
                </div>
                <p className="mt-2 text-xl font-display font-bold text-ocean-800">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>
        )}

        {stats && stats.disputedBookings > 0 && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700 font-medium">
              {stats.disputedBookings} disputed booking{stats.disputedBookings !== 1 && "s"} require attention
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* User management */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
              User Management
            </h2>

            {/* Search + filters */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchUsers()}
                  className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => { setRoleFilter(e.target.value); }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
              >
                <option value="">All roles</option>
                <option value="CUSTOMER">Customer</option>
                <option value="PROVIDER">Provider</option>
                <option value="ADMIN">Admin</option>
              </select>
              <select
                value={kycFilter}
                onChange={(e) => { setKycFilter(e.target.value); }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
              >
                <option value="">All KYC</option>
                <option value="PENDING">Pending</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <Button size="sm" onClick={searchUsers}>Search</Button>
            </div>

            {/* User list */}
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-gray-400">No users found</p>
                ) : (
                  users.map((u: UserRow) => (
                    <div key={u.id} className="px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-ocean-800 truncate">
                            {u.firstName} {u.lastName}
                          </p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            u.role === "ADMIN" ? "bg-purple-50 text-purple-700" :
                            u.role === "PROVIDER" ? "bg-sky-50 text-sky-700" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            {u.role}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            u.kycStatus === "APPROVED" ? "bg-green-50 text-green-700" :
                            u.kycStatus === "IN_REVIEW" ? "bg-amber-50 text-amber-700" :
                            u.kycStatus === "REJECTED" ? "bg-red-50 text-red-700" :
                            "bg-gray-100 text-gray-500"
                          }`}>
                            {u.kycStatus}
                          </span>
                          {!u.isActive && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                              Suspended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        {u.provider && (
                          <p className="text-xs text-ocean-600">
                            {u.provider.businessName} — KYB: {u.provider.kybStatus}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {u.kycStatus === "PENDING" || u.kycStatus === "IN_REVIEW" ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => userAction(u.id, "approve_kyc")}
                              loading={actionLoading === `${u.id}-approve_kyc`}
                              className="text-green-600 text-xs"
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => userAction(u.id, "reject_kyc")}
                              loading={actionLoading === `${u.id}-reject_kyc`}
                              className="text-red-500 text-xs"
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </>
                        ) : null}
                        {u.provider && u.provider.kybStatus !== "APPROVED" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => userAction(u.id, "approve_business")}
                            loading={actionLoading === `${u.id}-approve_business`}
                            className="text-sky-600 text-xs"
                          >
                            <Shield className="h-3 w-3 mr-1" /> KYB
                          </Button>
                        )}
                        {u.isActive ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => userAction(u.id, "suspend")}
                            loading={actionLoading === `${u.id}-suspend`}
                            className="text-red-400 text-xs"
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => userAction(u.id, "activate")}
                            loading={actionLoading === `${u.id}-activate`}
                            className="text-green-600 text-xs"
                          >
                            Activate
                          </Button>
                        )}
                        <select
                          defaultValue={u.role}
                          onChange={(e) => userAction(u.id, "set_role", e.target.value)}
                          className="rounded border border-gray-200 px-2 py-1 text-xs outline-none"
                        >
                          <option value="CUSTOMER">Customer</option>
                          <option value="PROVIDER">Provider</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
              Recent Activity
            </h2>
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 divide-y divide-gray-100">
              {recentBookings.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-400">No recent bookings</p>
              ) : (
                recentBookings.map((b: RecentBooking) => (
                  <div key={b.id} className="px-4 py-3">
                    <p className="text-sm font-medium text-ocean-800 truncate">{b.posting.title}</p>
                    <p className="text-xs text-gray-500">
                      {b.customer.firstName} {b.customer.lastName} → {b.provider.businessName}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        b.status === "COMPLETED" ? "bg-green-50 text-green-700" :
                        b.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" :
                        b.status === "DISPUTED" ? "bg-red-50 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {b.status}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {b.posting.mode.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
