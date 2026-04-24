import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma, TransportMode } from "@prisma/client";

export const runtime = "nodejs";
export const revalidate = 60;

/**
 * GET /api/providers/nearby?city=Dallas&country=US&mode=MOVING
 *
 * Returns an anonymous count of verified, available providers whose
 * service area includes the given city/country. Used by the homepage +
 * corridor pages to show "N providers active near you".
 *
 * No PII. No provider names. Just a count.
 */
function isTransportMode(v: string | null): v is TransportMode {
  return v != null && Object.values(TransportMode).includes(v as TransportMode);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");
  const country = url.searchParams.get("country");
  const modeParam = url.searchParams.get("mode");

  const where: Prisma.ProviderWhereInput = {
    isVerified: true,
    isAvailable: true,
  };
  if (isTransportMode(modeParam)) {
    where.modes = { has: modeParam };
  }

  // Prisma's `has` on String[] is case-sensitive; we over-fetch the pool and
  // filter in JS for robust matching. Cheap at our scale (verified providers
  // are bounded; this endpoint caches for 60s).
  const providers = await db.provider.findMany({
    where,
    select: { id: true, serviceArea: true },
    take: 2000,
  });

  const needles: string[] = [];
  if (city) needles.push(city.toLowerCase());
  if (country) needles.push(country.toLowerCase());

  const matched = needles.length
    ? providers.filter((p) => {
        const areas = p.serviceArea.map((a) => a.toLowerCase());
        return needles.some((m) => areas.some((a) => a.includes(m)));
      })
    : providers;

  return NextResponse.json({ count: matched.length, total: providers.length });
}
