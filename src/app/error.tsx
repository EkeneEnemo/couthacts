"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Logo } from "@/components/logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <nav className="border-b border-[#E8E8ED]/60 bg-[#F5F5F7]/80 backdrop-blur-xl px-6 py-3.5">
        <Logo size="sm" />
      </nav>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1F0] mx-auto">
            <span className="text-2xl text-[#FF3B30]">!</span>
          </div>
          <h1 className="mt-5 text-xl font-display font-bold text-[#1D1D1F] tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-3 text-[14px] text-[#6E6E73] leading-relaxed">
            An unexpected error occurred. Our team has been notified.
            Please try again or contact support if the issue persists.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full bg-[#007AFF] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.97] transition-all min-h-[44px]"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#E8E8ED] px-6 py-3 text-[13px] font-semibold text-[#1D1D1F] hover:bg-white active:scale-[0.97] transition-all min-h-[44px]"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
