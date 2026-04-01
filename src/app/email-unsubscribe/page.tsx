"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function UnsubscribeForm() {
  const params = useSearchParams();
  const uid = params.get("uid");
  const token = params.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleUnsubscribe() {
    if (!uid || !token) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/email-unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (!uid || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm text-center">
          <h1 className="text-xl font-semibold text-[#1D1D1F]">Invalid Link</h1>
          <p className="mt-2 text-[14px] text-[#6E6E73]">
            This unsubscribe link is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm text-center">
          <h1 className="text-xl font-semibold text-[#1D1D1F]">Unsubscribed</h1>
          <p className="mt-2 text-[14px] text-[#6E6E73]">
            You have been unsubscribed from all CouthActs email notifications.
          </p>
          <p className="mt-4 text-[13px] text-[#86868B]">
            You can re-enable specific notifications anytime from{" "}
            <a href="/settings" className="text-[#007AFF] underline">Settings</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm text-center">
        <h1 className="text-xl font-semibold text-[#1D1D1F]">Unsubscribe from Emails</h1>
        <p className="mt-2 text-[14px] text-[#6E6E73]">
          Click below to unsubscribe from all CouthActs email notifications.
          You will still receive critical security and account alerts.
        </p>
        {status === "error" && (
          <p className="mt-3 text-[13px] text-red-600">
            Something went wrong. Please try again or contact support@couthacts.com.
          </p>
        )}
        <button
          onClick={handleUnsubscribe}
          disabled={status === "loading"}
          className="mt-6 inline-block bg-[#1D1D1F] text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-[#333] transition disabled:opacity-50"
        >
          {status === "loading" ? "Processing..." : "Unsubscribe"}
        </button>
        <p className="mt-6 text-[12px] text-[#86868B]">
          Or <a href="/settings" className="text-[#007AFF] underline">manage individual preferences</a> instead.
        </p>
      </div>
    </div>
  );
}

export default function EmailUnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm text-center">
          <p className="text-[14px] text-[#6E6E73]">Loading...</p>
        </div>
      </div>
    }>
      <UnsubscribeForm />
    </Suspense>
  );
}
