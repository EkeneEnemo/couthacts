import { db } from "@/lib/db";
import { validateProviderApiKey } from "@/lib/provider-api-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/provider/v1/jobs — List open jobs matching provider's modes.
 */
export async function GET(req: NextRequest) {
  const auth = await validateProviderApiKey(req);
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  const where: Record<string, unknown> = {
    status: { in: ["OPEN", "BIDDING"] },
    expiresAt: { gt: new Date() },
    mode: mode ? mode : { in: auth.provider.modes },
  };

  const [postings, total] = await Promise.all([
    db.posting.findMany({
      where, orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit, take: limit,
      select: {
        id: true, mode: true, title: true, description: true, status: true,
        originAddress: true, destinationAddress: true,
        pickupDate: true, deliveryDate: true, budgetUsd: true,
        weightKg: true, lengthCm: true, widthCm: true, heightCm: true,
        isHazmat: true, isTemperatureControlled: true, isOversized: true,
        isFragile: true, cargoDescription: true, insuranceTier: true,
        isUrgent: true, createdAt: true,
        _count: { select: { bids: true } },
      },
    }),
    db.posting.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: postings,
    meta: { page, limit, total, pages: Math.ceil(total / limit), requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
