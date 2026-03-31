import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const MONTHLY_LIMITS: Record<string, number> = { STARTER: 1000, GROWTH: 5000, ENTERPRISE: 999999999 };

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
  if (apiKey.requestCount >= limit) {
    return { error: NextResponse.json({ success: false, error: { code: "RATE_LIMITED", message: `Monthly limit of ${limit} exceeded` } }, { status: 429, headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": "0" } }) };
  }

  await db.apiKey.update({ where: { id: apiKey.id }, data: { requestCount: { increment: 1 }, lastUsedAt: new Date() } });

  return {
    user: apiKey.user, apiKey,
    headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": String(Math.max(0, limit - apiKey.requestCount - 1)), "X-Request-ID": crypto.randomUUID() },
  };
}
