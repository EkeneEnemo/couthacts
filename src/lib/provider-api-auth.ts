import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const MONTHLY_LIMITS: Record<string, number> = {
  BASIC: 500,
  PROFESSIONAL: 5000,
  ENTERPRISE: 999999999,
};

/**
 * Validate a Provider API key from the Authorization header.
 * Returns the provider record or a NextResponse error.
 */
export async function validateProviderApiKey(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return { error: NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Missing or invalid API key" } }, { status: 401 }) };
  }

  const key = auth.slice(7).trim();
  const apiKey = await db.providerApiKey.findUnique({
    where: { key },
    include: { provider: { include: { user: true } } },
  });

  if (!apiKey || !apiKey.isActive) {
    return { error: NextResponse.json({ success: false, error: { code: "INVALID_KEY", message: "API key is invalid or deactivated" } }, { status: 401 }) };
  }

  // Check rate limit
  const limit = MONTHLY_LIMITS[apiKey.plan] || 500;
  if (apiKey.requestCount >= limit) {
    return { error: NextResponse.json({
      success: false,
      error: { code: "RATE_LIMITED", message: `Monthly limit of ${limit} requests exceeded. Upgrade your plan.` },
    }, {
      status: 429,
      headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": "0" },
    }) };
  }

  // Increment request count
  await db.providerApiKey.update({
    where: { id: apiKey.id },
    data: { requestCount: { increment: 1 }, lastUsedAt: new Date() },
  });

  return {
    provider: apiKey.provider,
    apiKey,
    headers: {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(Math.max(0, limit - apiKey.requestCount - 1)),
    },
  };
}
