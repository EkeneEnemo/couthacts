import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Dynamic sampling: always trace money-critical paths (escrow, wallet,
  // payouts, disputes). Sample everything else at 10%.
  tracesSampler: (ctx) => {
    const name = ctx.name ?? "";
    if (
      name.startsWith("POST /api/escrow") ||
      name.startsWith("POST /api/wallet") ||
      name.startsWith("POST /api/bookings") ||
      name.startsWith("POST /api/disputes") ||
      name.startsWith("POST /api/admin/disputes") ||
      name.startsWith("payment.") ||
      name.startsWith("lib.escrow.") ||
      name.startsWith("lib.wallet.")
    ) {
      return 1.0;
    }
    return 0.1;
  },
  initialScope: { tags: { service: "couthacts-web" } },
  enabled: process.env.NODE_ENV === "production",
});
