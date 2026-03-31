import { db } from "@/lib/db";
import { debitWallet } from "@/lib/wallet";
import { NextResponse } from "next/server";

const OVERAGE_RATE = 0.20;

/**
 * POST /api/cron/customer-api-overage
 * Called by Vercel Cron on the 1st of every month.
 * Charges GROWTH plan customers for overage calls and resets counters.
 */
export async function POST() {
  // Find all GROWTH API keys with overage
  const overageKeys = await db.apiKey.findMany({
    where: { plan: "GROWTH", overageCallsThisMonth: { gt: 0 } },
    include: { user: true },
  });

  const results = [];

  for (const key of overageKeys) {
    const overageAmount = key.overageCallsThisMonth * OVERAGE_RATE;

    try {
      await debitWallet({
        userId: key.userId,
        amountUsd: overageAmount,
        type: "API_OVERAGE",
        description: `API overage: ${key.overageCallsThisMonth} calls × $${OVERAGE_RATE}/call = $${overageAmount.toFixed(2)}`,
      });
      results.push({ keyId: key.id, calls: key.overageCallsThisMonth, charged: overageAmount, status: "charged" });
    } catch {
      // Insufficient balance — TODO: send payment failure email, suspend after 7 days
      results.push({ keyId: key.id, calls: key.overageCallsThisMonth, charged: 0, status: "failed" });
    }
  }

  // Reset ALL customer API key counters for the new month
  await db.apiKey.updateMany({
    data: { requestCount: 0, overageCallsThisMonth: 0 },
  });

  return NextResponse.json({ processed: results.length, results });
}
