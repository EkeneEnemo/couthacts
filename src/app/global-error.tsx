"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body style={{ fontFamily: "sans-serif", background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h1 style={{ color: "#1D1D1F", fontSize: 20 }}>Something went wrong</h1>
          <p style={{ color: "#6E6E73", fontSize: 14, marginTop: 12 }}>
            An unexpected error occurred. Our team has been notified.
          </p>
          <button
            onClick={reset}
            style={{ marginTop: 24, padding: "12px 24px", background: "#007AFF", color: "white", border: "none", borderRadius: 24, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
