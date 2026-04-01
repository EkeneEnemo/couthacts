import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const VALID_PLANS = ["BASIC", "PROFESSIONAL", "ENTERPRISE"];
const PLAN_LIMITS: Record<string, number> = {
  BASIC: 500,
  PROFESSIONAL: 5000,
  ENTERPRISE: 999999999,
};

/**
 * PATCH /api/provider/api-keys/plan — Upgrade or change an API key's plan.
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const { keyId, plan } = await req.json();

  if (!keyId || !plan || !VALID_PLANS.includes(plan)) {
    return NextResponse.json(
      { error: `Invalid plan. Must be one of: ${VALID_PLANS.join(", ")}` },
      { status: 400 }
    );
  }

  const apiKey = await db.providerApiKey.findUnique({ where: { id: keyId } });
  if (!apiKey || apiKey.providerId !== provider.id) {
    return NextResponse.json({ error: "API key not found" }, { status: 404 });
  }

  if (apiKey.plan === plan) {
    return NextResponse.json({ error: `Already on ${plan} plan` }, { status: 400 });
  }

  await db.providerApiKey.update({
    where: { id: keyId },
    data: { plan, monthlyLimit: PLAN_LIMITS[plan] || 500 },
  });

  return NextResponse.json({
    success: true,
    plan,
    monthlyLimit: PLAN_LIMITS[plan],
    message: `Plan upgraded to ${plan}. New monthly limit: ${PLAN_LIMITS[plan].toLocaleString()} requests.`,
  });
}
