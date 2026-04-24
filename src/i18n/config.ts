/**
 * Supported UI locales. Every locale listed here must have a corresponding
 * messages/<locale>.json file (may be empty / partial; missing keys fall
 * back to the default locale).
 *
 * Adding a new locale:
 *   1. Add the code to SUPPORTED_LOCALES below.
 *   2. Create messages/<code>.json (copy messages/en.json as a starting point).
 *   3. If it's right-to-left, add it to RTL_LOCALES.
 *
 * Locale codes follow BCP 47 (two-letter ISO 639-1 where possible).
 */

export const DEFAULT_LOCALE = "en" as const;

export const SUPPORTED_LOCALES = [
  "en", // English (source)
  "es", // Spanish (LatAm + Spain)
  "fr", // French (France + FR-CA)
  "pt", // Portuguese (Brazil + PT)
  "de", // German
  "ar", // Arabic
  "zh", // Simplified Chinese
  "ja", // Japanese
  "hi", // Hindi
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES: readonly Locale[] = ["ar"] as const;

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  de: "Deutsch",
  ar: "العربية",
  zh: "中文",
  ja: "日本語",
  hi: "हिन्दी",
};

export const LOCALE_COOKIE = "couthacts_locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}
