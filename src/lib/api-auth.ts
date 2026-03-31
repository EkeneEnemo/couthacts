import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const MONTHLY_LIMITS: Record<string, number> = { STARTER: 1000, GROWTH: 5000, ENTERPRISE: 999999999 };
const OVERAGE_RATE = 0.20;

export async function validateApiKey(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return { error: NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Missing API key" } }, { status: 401 }) };
  }

  const key = auth.slice(7).trim();
  const apiKey = await db.apiKey.findUnique({ where: { key }, include: { user: true } });

  if (!apiKey || !apiKey.isActive) {
    return { error: NextResponse.json({ success: false, error: { code: "INVALID_KEY", message: "Invalid or deactivated API key" } }, { status: 401 }) };
  }

  const limit = MONTHLY_LIMITS[apiKey.plan] || 1000;

  // STARTER — hard block at limit
  if (apiKey.plan === "STARTER" && apiKey.requestCount >= limit) {
    return { error: NextResponse.json({
      success: false,
      error: { code: "RATE_LIMITED", message: "You have reached your monthly API limit of 1,000 calls. Upgrade to Growth to continue uninterrupted access. Visit couthacts.com/developer to upgrade." },
    }, { status: 429, headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": "0" } }) };
  }

  const responseHeaders: Record<string, string> = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(Math.max(0, limit - apiKey.requestCount - 1)),
    "X-Request-ID": crypto.randomUUID(),
  };

  const updateData: Record<string, unknown> = {
    requestCount: { increment: 1 }, lastUsedAt: new Date(),
  };

  // GROWTH — soft cap with overage at $0.20/call
  if (apiKey.plan === "GROWTH" && apiKey.requestCount >= limit) {
    updateData.overageCallsThisMonth = { increment: 1 };
    const overageAmount = ((apiKey.overageCallsThisMonth + 1) * OVERAGE_RATE).toFixed(2);
    responseHeaders["X-RateLimit-Overage-Charges"] = `$${overageAmount}`;
    responseHeaders["X-RateLimit-Remaining"] = "0 (overage billing active)";
  }

  await db.apiKey.update({ where: { id: apiKey.id }, data: updateData });

  return { user: apiKey.user, apiKey, headers: responseHeaders };
}
