import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

/**
 * Resolve the active locale for a request.
 *
 * Precedence (highest → lowest):
 *   1. `couthacts_locale` cookie set by the LocaleSwitcher.
 *   2. `Accept-Language` header negotiation against our supported locales.
 *   3. DEFAULT_LOCALE.
 */
export async function resolveLocale(): Promise<Locale> {
  const cookieStore = cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const hdrs = headers();
  const accept = hdrs.get("accept-language");
  if (accept) {
    const candidates = accept
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase())
      .filter(Boolean);
    for (const candidate of candidates) {
      // Strip region (e.g. "en-US" → "en") then match.
      const base = candidate.split("-")[0];
      if (isLocale(base)) return base;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * next-intl server config. Loads the matching message catalog and falls back
 * to English for any keys missing in the resolved locale.
 */
export default getRequestConfig(async () => {
  const locale = await resolveLocale();
  const [messages, fallback] = await Promise.all([
    import(`../../messages/${locale}.json`).then((m) => m.default),
    locale === DEFAULT_LOCALE
      ? Promise.resolve({})
      : import(`../../messages/${DEFAULT_LOCALE}.json`).then((m) => m.default),
  ]);
  return {
    locale,
    messages: { ...fallback, ...messages },
  };
});
