"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Bell, Menu, X, Settings } from "lucide-react";
import { Logo } from "@/components/logo";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  providerId: string | null;
  walletBalance: number;
  preferredCurrency: string;
}

interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  link: string | null;
  createdAt: string;
}

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifs, setShowNotifs] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localBalance, setLocalBalance] = useState<string | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => {
        setUser(d.user);
        if (d.user) {
          fetch("/api/notifications")
            .then((r) => r.json())
            .then((n) => {
              setNotifications(n.notifications || []);
              setUnreadCount(n.unreadCount || 0);
            });
          // Fetch local currency balance
          if (d.user.preferredCurrency && d.user.preferredCurrency !== "USD") {
            fetch(`/api/currency?amount=${d.user.walletBalance}&from=USD&to=${d.user.preferredCurrency}`)
              .then((r) => r.json())
              .then((c) => setLocalBalance(c.formatted || null));
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
      credentials: "include",
    });
    window.location.href = "/";
  }

  async function markAllRead() {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_all_read" }),
    });
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-cream-100/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo size="sm" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
          ) : user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-ocean-700 hover:text-ocean-900">
                Dashboard
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-800">
                  Admin
                </Link>
              )}
              {user.role === "PROVIDER" && (
                <Link href="/marketplace" className="text-sm font-medium text-ocean-700 hover:text-ocean-900">
                  Marketplace
                </Link>
              )}
              {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
                <Link href="/postings/new">
                  <Button size="sm" variant="secondary">Post a job</Button>
                </Link>
              )}
              <Link
                href="/wallet"
                className="flex items-center gap-1.5 rounded-lg bg-ocean-50 px-3 py-1.5 text-sm font-semibold text-ocean-700 hover:bg-ocean-100 transition"
                title={localBalance ? `≈ ${localBalance}` : undefined}
              >
                <Wallet className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  ${user.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {localBalance && (
                    <span className="text-xs text-ocean-500 ml-1">≈{localBalance}</span>
                  )}
                </span>
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-ocean-800">Notifications</p>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-sky-600 hover:text-sky-700 font-medium">
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                          <Bell className="mx-auto h-8 w-8 text-gray-300" />
                          <p className="mt-2 text-sm text-gray-400">No notifications for now</p>
                          <p className="text-xs text-gray-300 mt-1">We&apos;ll notify you when something happens</p>
                        </div>
                      ) : (
                        notifications.slice(0, 15).map((n) => {
                          const dest = n.link || "/dashboard";
                          return (
                            <div
                              key={n.id}
                              role="button"
                              tabIndex={0}
                              onMouseDown={() => {
                                // Fire-and-forget mark as read — don't await
                                if (!n.isRead) {
                                  fetch("/api/notifications", {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ action: "mark_read", notificationId: n.id }),
                                  }).catch(() => {});
                                }
                                // Navigate immediately
                                window.location.href = dest;
                              }}
                              className={`block w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer select-none ${!n.isRead ? "bg-sky-50/50" : ""}`}
                            >
                              <div className="flex items-start gap-2">
                                {!n.isRead && (
                                  <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-sky-500" />
                                )}
                                <div className={!n.isRead ? "" : "ml-4"}>
                                  <p className="text-sm font-medium text-ocean-800">{n.title}</p>
                                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.body}</p>
                                  <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/settings" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition">
                <Settings className="h-4 w-4" />
              </Link>
              <span className="text-sm text-gray-500">{user.firstName}</span>
              <Button size="sm" variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
              <Link href="/register"><Button size="sm">Get started</Button></Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <>
              <Link
                href="/wallet"
                className="flex items-center gap-1 rounded-lg bg-ocean-50 px-2.5 py-1.5 text-xs font-semibold text-ocean-700"
              >
                <Wallet className="h-3 w-3" />
                ${user.walletBalance.toFixed(0)}
              </Link>
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative rounded-lg p-2 text-gray-500"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-cream-100 px-6 py-4 space-y-3">
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                Dashboard
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-purple-600 py-2">
                  Admin Dashboard
                </Link>
              )}
              {user.role === "PROVIDER" && (
                <Link href="/marketplace" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                  Marketplace
                </Link>
              )}
              {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
                <Link href="/postings/new" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                  Post a job
                </Link>
              )}
              <Link href="/wallet" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                Wallet — ${user.walletBalance.toFixed(2)}
              </Link>
              <Link href="/settings" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                Settings
              </Link>
              <hr className="border-gray-200" />
              <button onClick={handleLogout} className="block text-sm font-medium text-red-500 py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                Sign in
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-ocean-700 py-2">
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
