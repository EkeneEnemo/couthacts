import { NextRequest, NextResponse } from "next/server";
import { TransportMode } from "@prisma/client";
import { getQuote } from "@/lib/quote-engine";
import { selectDistanceMatrix } from "@/lib/distance-matrix";

export const runtime = "nodejs";
export const revalidate = 60;

/**
 * POST /api/quote
 *
 * Body:
 *   {
 *     mode: TransportMode,
 *     origin: { lat, lng },
 *     destination: { lat, lng },
 *     weightKg?: number,
 *     attributes?: { temperatureControlled, hazmat, fragile, oversized, liveAnimals, urgent },
 *     surgeMultiplier?: number
 *   }
 *
 * Returns: QuoteResult (low/mid/high USD estimate with breakdown).
 *
 * Public, unauthenticated — but rate-limited and only estimates. Real bids
 * come from authenticated posting workflow.
 */
function isTransportMode(v: unknown): v is TransportMode {
  return typeof v === "string" && Object.values(TransportMode).includes(v as TransportMode);
}

function isCoord(v: unknown): v is { lat: number; lng: number } {
  if (!v || typeof v !== "object") return false;
  const o = v as { lat?: unknown; lng?: unknown };
  return (
    typeof o.lat === "number" &&
    typeof o.lng === "number" &&
    Math.abs(o.lat) <= 90 &&
    Math.abs(o.lng) <= 180
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  if (!isTransportMode(body.mode)) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }
  if (!isCoord(body.origin) || !isCoord(body.destination)) {
    return NextResponse.json({ error: "Invalid origin/destination coordinates" }, { status: 400 });
  }
  const weightKg = typeof body.weightKg === "number" && body.weightKg >= 0 ? body.weightKg : 0;
  const surgeMultiplier =
    typeof body.surgeMultiplier === "number" && body.surgeMultiplier > 0 && body.surgeMultiplier < 5
      ? body.surgeMultiplier
      : undefined;

  try {
    const quote = await getQuote({
      mode: body.mode,
      origin: body.origin,
      destination: body.destination,
      weightKg,
      attributes: body.attributes,
      surgeMultiplier,
      distanceMatrix: selectDistanceMatrix(),
    });
    return NextResponse.json(quote);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to compute quote";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
