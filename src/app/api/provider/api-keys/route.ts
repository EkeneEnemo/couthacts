import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

/**
 * GET /api/provider/api-keys — List provider's API keys.
 */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const keys = await db.providerApiKey.findMany({
    where: { providerId: provider.id },
    select: { id: true, name: true, key: true, isActive: true, plan: true, requestCount: true, monthlyLimit: true, lastUsedAt: true, webhookUrl: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  // Mask keys except last 8 chars
  const masked = keys.map((k) => ({
    ...k, key: `ca_...${k.key.slice(-8)}`,
  }));

  return NextResponse.json({ keys: masked });
}

/**
 * POST /api/provider/api-keys — Generate a new API key.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const { name } = await req.json();
  const key = `ca_provider_${randomBytes(24).toString("hex")}`;

  const apiKey = await db.providerApiKey.create({
    data: { providerId: provider.id, key, name: name || "Default API Key" },
  });

  // Return the FULL key only once — it won't be shown again
  return NextResponse.json({
    id: apiKey.id, key, name: apiKey.name, plan: apiKey.plan,
    message: "Save this key — it will not be shown again.",
  }, { status: 201 });
}
