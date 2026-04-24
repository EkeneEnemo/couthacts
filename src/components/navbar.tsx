"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Wallet, Bell, Menu, X, Settings } from "lucide-react";
import { Logo } from "@/components/logo";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { Locale } from "@/i18n/config";

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

const NOTIFICATION_EMOJI: Record<string, string> = {
  NEW_BID: "👋",
  BID_ACCEPTED: "🎉",
  BOOKING_CONFIRMED: "✅",
  BOOKING_STARTED: "🚚",
  BOOKING_COMPLETED: "🏁",
  ESCROW_RELEASED: "💰",
  ESCROW_REFUNDED: "↩️",
  DISPUTE_FILED: "⚠️",
  REVIEW_RECEIVED: "⭐",
  SCORE_TIER_CHANGE: "🏆",
  PAYOUT_INITIATED: "💸",
  VERIFICATION_APPROVED: "🛡️",
  WALLET_TOPUP: "💳",
  REFERRAL_QUALIFIED: "🎁",
  ADVANCE_DISBURSED: "⚡",
  DEFAULT: "📬",
};

const NOTIFICATION_ACCENT: Record<string, string> = {
  NEW_BID: "#FF7A59",
  BID_ACCEPTED: "#34C759",
  BOOKING_CONFIRMED: "#34C759",
  BOOKING_STARTED: "#007AFF",
  BOOKING_COMPLETED: "#34C759",
  ESCROW_RELEASED: "#34C759",
  ESCROW_REFUNDED: "#FFB020",
  DISPUTE_FILED: "#FF3B30",
  REVIEW_RECEIVED: "#FFB020",
  SCORE_TIER_CHANGE: "#FF6B9D",
  PAYOUT_INITIATED: "#34C759",
  VERIFICATION_APPROVED: "#007AFF",
  WALLET_TOPUP: "#34C759",
  REFERRAL_QUALIFIED: "#FF6B9D",
  ADVANCE_DISBURSED: "#FFB020",
  DEFAULT: "#007AFF",
};

function notificationEmoji(type: string): string {
  return NOTIFICATION_EMOJI[type] ?? NOTIFICATION_EMOJI.DEFAULT;
}

function notificationAccent(type: string): string {
  return NOTIFICATION_ACCENT[type] ?? NOTIFICATION_ACCENT.DEFAULT;
}

function relativeTimeShort(iso: string): string {
  const delta = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.round(delta / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function Navbar() {
  const currentLocale = useLocale() as Locale;
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
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
                {tCommon("dashboard")}
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
                  aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : "Notifications"}
                  aria-haspopup="true"
                  aria-expanded={showNotifs}
                  className="relative rounded-full p-2 text-[#86868B] hover:bg-[#E8E8ED] transition-colors"
                >
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3B30] text-[9px] font-bold text-white" aria-hidden="true">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifs && (
                  <div
                    role="dialog"
                    aria-label="Notifications"
                    className="absolute right-0 mt-3 w-[22rem] rounded-[1.75rem] bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white z-50 overflow-hidden"
                  >
                    {/* Gradient halo */}
                    <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#FFD8B5]/40 blur-3xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#B5E3FF]/45 blur-3xl" aria-hidden="true" />

                    {/* Header */}
                    <div className="relative flex items-center justify-between gap-2 px-5 pt-5 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm text-lg" aria-hidden="true">🔔</span>
                        <div>
                          <p className="text-[14px] font-display font-bold text-[#1D1D1F]">Notifications</p>
                          {unreadCount > 0 ? (
                            <p className="text-[11px] text-[#FF7A59] font-semibold">{unreadCount} new</p>
                          ) : (
                            <p className="text-[11px] text-[#1D1D1F]/45">You&rsquo;re all caught up</p>
                          )}
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="rounded-full bg-[#1D1D1F] text-white px-3 py-1.5 text-[11px] font-semibold hover:bg-[#007AFF] transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Body */}
                    <div className="relative max-h-[22rem] overflow-y-auto px-3 pb-3">
                      {notifications.length === 0 ? (
                        <div className="mx-2 mb-2 mt-2 rounded-2xl bg-white/70 border border-white px-4 py-10 text-center shadow-sm">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFFBF5] text-2xl shadow-sm" aria-hidden="true">✨</span>
                          <p className="mt-3 text-[14px] font-display font-bold text-[#1D1D1F]">Nothing new here</p>
                          <p className="mt-1 text-[12px] text-[#1D1D1F]/55">
                            We&rsquo;ll ping you the moment something happens.
                          </p>
                        </div>
                      ) : (
                        <ul className="space-y-1.5">
                          {notifications.slice(0, 15).map((n) => {
                            const dest = n.link || "/dashboard";
                            const emoji = notificationEmoji(n.type);
                            const accent = notificationAccent(n.type);
                            return (
                              <li key={n.id}>
                                <div
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
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      window.location.href = dest;
                                    }
                                  }}
                                  className={`group relative flex items-start gap-3 rounded-2xl px-3 py-3 cursor-pointer select-none transition-all hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
                                    !n.isRead ? "bg-white/70 border border-white" : "bg-transparent"
                                  }`}
                                >
                                  <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base shadow-sm"
                                    style={{ backgroundColor: `${accent}18` }}
                                    aria-hidden="true"
                                  >
                                    {emoji}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="flex-1 text-[13px] font-semibold text-[#1D1D1F] truncate">
                                        {n.title}
                                      </p>
                                      {!n.isRead && (
                                        <span
                                          className="flex h-2 w-2 flex-shrink-0 rounded-full"
                                          style={{ backgroundColor: accent }}
                                          aria-label="Unread"
                                        />
                                      )}
                                    </div>
                                    <p className="mt-0.5 text-[12px] text-[#1D1D1F]/60 leading-relaxed line-clamp-2">
                                      {n.body}
                                    </p>
                                    <p className="mt-1 text-[10px] text-[#1D1D1F]/40 uppercase tracking-wider">
                                      {relativeTimeShort(n.createdAt)}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    {/* Footer link */}
                    {notifications.length > 0 && (
                      <div className="relative border-t border-[#1D1D1F]/5 bg-white/50 px-5 py-3 text-center">
                        <Link
                          href="/dashboard"
                          onClick={() => setShowNotifs(false)}
                          className="text-[12px] font-semibold text-[#007AFF] hover:text-[#0055D4]"
                        >
                          Open dashboard →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link href="/settings" aria-label="Settings" className="rounded-full p-2 text-[#86868B] hover:bg-[#E8E8ED] transition-colors">
                <Settings className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="text-[13px] text-[#6E6E73]">{user.firstName}</span>
              <Button size="sm" variant="ghost" onClick={handleLogout}>{tCommon("logout")}</Button>
            </>
          ) : (
            <>
              <Link href="/services" className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors px-2 py-1">{tNav("services")}</Link>
              <Link href="/about" className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors px-2 py-1">{tNav("aboutUs")}</Link>
              <LocaleSwitcher currentLocale={currentLocale} />
              <Link href="/login"><Button variant="ghost" size="sm">{tCommon("signIn")}</Button></Link>
              <Link href="/register"><Button size="sm">{tCommon("signUp")}</Button></Link>
            </>
          )}
          {user && <LocaleSwitcher currentLocale={currentLocale} compact />}
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
                  aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : "Notifications"}
                  aria-haspopup="true"
                  aria-expanded={showNotifs}
                  className="relative rounded-full p-2 text-[#86868B]"
                >
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF3B30] text-[9px] font-bold text-white" aria-hidden="true">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="rounded-full p-2 text-[#6E6E73] hover:bg-[#E8E8ED] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — 44pt min touch targets, safe-area aware */}
      {mobileOpen && (
        <div id="mobile-menu" role="menu" className="md:hidden border-t border-[#E8E8ED]/60 bg-[#F5F5F7]/95 backdrop-blur-xl px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] space-y-0.5">
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
              <Link href="/services" onClick={() => setMobileOpen(false)} className="flex items-center min-h-[44px] text-[15px] font-medium text-[#1D1D1F] py-3 px-3 rounded-xl hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors">
                Services
              </Link>
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
          <div className="pt-3 mt-3 border-t border-[#E8E8ED]/60">
            <LocaleSwitcher currentLocale={currentLocale} />
          </div>
        </div>
      )}
    </nav>
  );
}
