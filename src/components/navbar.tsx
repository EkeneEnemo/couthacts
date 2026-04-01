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
    <nav className="sticky top-0 z-50 border-b border-[#E8E8ED]/60 bg-[#F5F5F7]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Logo size="sm" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-[#E8E8ED]" />
          ) : user ? (
            <>
              <Link href="/dashboard" className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors px-2 py-1">
                Dashboard
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-[13px] font-medium text-[#5856D6] hover:text-[#4B49C9] transition-colors px-2 py-1">
                  Admin
                </Link>
              )}
              {user.role === "PROVIDER" && (
                <Link href="/browse" className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors px-2 py-1">
                  Browse Jobs
                </Link>
              )}
              {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
                <>
                  <Link href="/instant" className="text-[13px] font-medium text-[#007AFF] hover:text-[#0055D4] transition-colors px-2 py-1">
                    Instant
                  </Link>
                  <Link href="/postings/new">
                    <Button size="sm" variant="secondary">Post a job</Button>
                  </Link>
                </>
              )}
              {user.role === "PROVIDER" && (
                <Link href="/instant/provider" className="text-[13px] font-medium text-[#007AFF] hover:text-[#0055D4] transition-colors px-2 py-1">
                  Instant Jobs
                </Link>
              )}
              <Link
                href="/wallet"
                className="flex items-center gap-1.5 rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-semibold text-[#1D1D1F] hover:bg-[#E8E8ED] transition-colors"
                title={localBalance ? `\u2248 ${localBalance}` : undefined}
              >
                <Wallet className="h-3.5 w-3.5 text-[#86868B]" />
                <span className="hidden sm:inline tabular-nums">
                  ${user.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {localBalance && (
                    <span className="text-[#86868B] ml-1">\u2248{localBalance}</span>
                  )}
                </span>
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative rounded-full p-2 text-[#86868B] hover:bg-[#E8E8ED] transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3B30] text-[9px] font-bold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.12)] border border-[#E8E8ED]/60 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8ED]/60">
                      <p className="text-[13px] font-semibold text-[#1D1D1F]">Notifications</p>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-[11px] text-[#007AFF] hover:text-[#0055D4] font-medium transition-colors">
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-12 text-center">
                          <Bell className="mx-auto h-8 w-8 text-[#D2D2D7]" />
                          <p className="mt-2 text-[13px] text-[#86868B]">No notifications</p>
                          <p className="text-[11px] text-[#C7C7CC] mt-1">We&apos;ll notify you when something happens</p>
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
                                if (!n.isRead) {
                                  fetch("/api/notifications", {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ action: "mark_read", notificationId: n.id }),
                                  }).catch(() => {});
                                }
                                window.location.href = dest;
                              }}
                              className={`block w-full text-left px-4 py-3 border-b border-[#F5F5F7] hover:bg-[#F5F5F7] transition cursor-pointer select-none ${!n.isRead ? "bg-[#EDF4FF]/50" : ""}`}
                            >
                              <div className="flex items-start gap-2">
                                {!n.isRead && (
                                  <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-[#007AFF]" />
                                )}
                                <div className={!n.isRead ? "" : "ml-4"}>
                                  <p className="text-[13px] font-medium text-[#1D1D1F]">{n.title}</p>
                                  <p className="text-[11px] text-[#86868B] mt-0.5 line-clamp-2">{n.body}</p>
                                  <p className="text-[10px] text-[#C7C7CC] mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
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

              <Link href="/settings" className="rounded-full p-2 text-[#86868B] hover:bg-[#E8E8ED] transition-colors">
                <Settings className="h-4 w-4" />
              </Link>
              <span className="text-[13px] text-[#6E6E73]">{user.firstName}</span>
              <Button size="sm" variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/about" className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors px-2 py-1">About</Link>
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
                className="flex items-center gap-1 rounded-full bg-[#F5F5F7] px-2.5 py-1.5 text-[11px] font-semibold text-[#1D1D1F]"
              >
                <Wallet className="h-3 w-3 text-[#86868B]" />
                ${user.walletBalance.toFixed(0)}
              </Link>
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="relative rounded-full p-2 text-[#86868B]"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF3B30] text-[9px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-[#6E6E73] hover:bg-[#E8E8ED] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — 44pt min touch targets, safe-area aware */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E8E8ED]/60 bg-[#F5F5F7]/95 backdrop-blur-xl px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] space-y-0.5">
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                Dashboard
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#5856D6] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                  Admin Dashboard
                </Link>
              )}
              {user.role === "PROVIDER" && (
                <Link href="/browse" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                  Browse Jobs
                </Link>
              )}
              {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
                <Link href="/postings/new" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                  Post a job
                </Link>
              )}
              <Link href="/wallet" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                Wallet — ${user.walletBalance.toFixed(2)}
              </Link>
              <Link href="/settings" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                Settings
              </Link>
              <div className="border-t border-[#E8E8ED]/60 mt-1.5 pt-1.5">
                <button onClick={handleLogout} className="flex items-center w-full min-h-[44px] text-left text-[15px] font-medium text-[#FF3B30] py-3 px-3 rounded-xl hover:bg-[#FFF1F0] active:bg-[#FFE5E3] transition-colors">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                About
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                Sign in
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-center min-h-[48px] mt-2 text-[15px] font-semibold text-white bg-[#007AFF] py-3 px-3 rounded-full active:bg-[#0055D4] transition-colors">
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
