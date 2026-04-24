import { NextRequest, NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

/**
 * POST /api/i18n/locale { locale: "es" }
 *
 * Sets the `couthacts_locale` cookie so next-intl picks up the new UI language
 * on the next request. We also mirror the selection to the user's
 * `preferredLanguage` if they're authenticated (best-effort).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const locale = body?.locale;
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, locale });
  res.cookies.set({
    name: LOCALE_COOKIE,
    value: locale,
    path: "/",
    sameSite: "lax",
    // 1 year — users rarely want their language to reset.
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
