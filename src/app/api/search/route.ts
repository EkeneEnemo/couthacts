import { NextRequest, NextResponse } from "next/server";
import { parseSearchIntent } from "@/lib/search-intent";

export const runtime = "nodejs";

/**
 * GET /api/search?q=... → structured SearchIntent.
 *
 * Used by the homepage smart-search input. Public, no auth.
 */
export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  if (!q.trim()) {
    return NextResponse.json({ intent: null });
  }
  return NextResponse.json({ intent: parseSearchIntent(q) });
}
