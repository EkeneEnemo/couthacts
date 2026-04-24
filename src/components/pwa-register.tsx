"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Registers the service worker and, when the browser fires
 * `beforeinstallprompt`, shows a small non-intrusive install card. The
 * prompt is suppressed for 14 days after dismissal (stored in
 * localStorage).
 */
const DISMISS_KEY = "couthacts_install_dismissed_at";
const SUPPRESS_MS = 14 * 24 * 60 * 60 * 1000;

export function PwaRegister() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      const register = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .catch((err) => console.error("[CouthActs] SW registration failed", err));
      };
      if (document.readyState === "complete") {
        register();
      } else {
        window.addEventListener("load", register, { once: true });
      }
    }

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
    const suppressed = dismissedAt && Date.now() - dismissedAt < SUPPRESS_MS;

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      if (!suppressed) setVisible(true);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function install() {
    if (!promptEvent) return;
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "dismissed") {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
      }
    } finally {
      setVisible(false);
      setPromptEvent(null);
    }
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Install CouthActs"
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl bg-white border border-[#1D1D1F]/8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-4 flex items-start gap-3"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007AFF]/10 text-[#007AFF] flex-shrink-0">
        <Download className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1D1D1F]">Install CouthActs</p>
        <p className="mt-0.5 text-[12px] text-[#1D1D1F]/60 leading-relaxed">
          Full-screen app, home-screen icon, and offline tracking — no app store needed.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={install}
            className="rounded-full bg-[#1D1D1F] px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-[#007AFF] transition-colors"
          >
            Install
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full bg-white border border-[#1D1D1F]/15 px-4 py-1.5 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#F5F5F7] transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="flex h-7 w-7 items-center justify-center rounded-full text-[#1D1D1F]/50 hover:bg-[#F5F5F7]"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
