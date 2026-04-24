/**
 * Multi-currency display system.
 *
 * INVARIANT: the internal ledger is always USD. All Decimal columns named
 * `*Usd` are USD-denominated. Display conversion happens at the edge
 * (server components or client hooks), never in the database.
 *
 * This module is the single source of truth for:
 *   - currency metadata (symbol, locale, minor-unit precision)
 *   - fetching and caching live exchange rates
 *   - converting USD ↔ local currency for display
 *   - formatting amounts for a given currency
 *   - integer minor-unit helpers (future-proofing for per-currency ledgers)
 */

export interface CurrencyInfo {
  symbol: string;
  name: string;
  locale: string;
  /** Number of decimal places used by the currency (0 for JPY, 2 for USD, 3 for some). */
  decimals: number;
}

/**
 * Expanded to ~35 currencies covering the top global marketplaces.
 * Grouped by region for reading convenience.
 */
const SUPPORTED_CURRENCIES: Record<string, CurrencyInfo> = {
  // North America
  USD: { symbol: "$", name: "US Dollar", locale: "en-US", decimals: 2 },
  CAD: { symbol: "C$", name: "Canadian Dollar", locale: "en-CA", decimals: 2 },
  MXN: { symbol: "MX$", name: "Mexican Peso", locale: "es-MX", decimals: 2 },

  // Europe
  EUR: { symbol: "€", name: "Euro", locale: "de-DE", decimals: 2 },
  GBP: { symbol: "£", name: "British Pound", locale: "en-GB", decimals: 2 },
  CHF: { symbol: "CHF", name: "Swiss Franc", locale: "de-CH", decimals: 2 },
  SEK: { symbol: "kr", name: "Swedish Krona", locale: "sv-SE", decimals: 2 },
  NOK: { symbol: "kr", name: "Norwegian Krone", locale: "nb-NO", decimals: 2 },
  DKK: { symbol: "kr", name: "Danish Krone", locale: "da-DK", decimals: 2 },
  PLN: { symbol: "zł", name: "Polish Złoty", locale: "pl-PL", decimals: 2 },
  CZK: { symbol: "Kč", name: "Czech Koruna", locale: "cs-CZ", decimals: 2 },
  TRY: { symbol: "₺", name: "Turkish Lira", locale: "tr-TR", decimals: 2 },

  // Asia-Pacific
  JPY: { symbol: "¥", name: "Japanese Yen", locale: "ja-JP", decimals: 0 },
  CNY: { symbol: "¥", name: "Chinese Yuan", locale: "zh-CN", decimals: 2 },
  HKD: { symbol: "HK$", name: "Hong Kong Dollar", locale: "en-HK", decimals: 2 },
  TWD: { symbol: "NT$", name: "Taiwan Dollar", locale: "zh-TW", decimals: 2 },
  KRW: { symbol: "₩", name: "South Korean Won", locale: "ko-KR", decimals: 0 },
  SGD: { symbol: "S$", name: "Singapore Dollar", locale: "en-SG", decimals: 2 },
  MYR: { symbol: "RM", name: "Malaysian Ringgit", locale: "ms-MY", decimals: 2 },
  THB: { symbol: "฿", name: "Thai Baht", locale: "th-TH", decimals: 2 },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah", locale: "id-ID", decimals: 2 },
  VND: { symbol: "₫", name: "Vietnamese Dong", locale: "vi-VN", decimals: 0 },
  PHP: { symbol: "₱", name: "Philippine Peso", locale: "en-PH", decimals: 2 },
  INR: { symbol: "₹", name: "Indian Rupee", locale: "en-IN", decimals: 2 },
  PKR: { symbol: "₨", name: "Pakistani Rupee", locale: "en-PK", decimals: 2 },
  AUD: { symbol: "A$", name: "Australian Dollar", locale: "en-AU", decimals: 2 },
  NZD: { symbol: "NZ$", name: "New Zealand Dollar", locale: "en-NZ", decimals: 2 },

  // Middle East
  AED: { symbol: "د.إ", name: "UAE Dirham", locale: "ar-AE", decimals: 2 },
  SAR: { symbol: "ر.س", name: "Saudi Riyal", locale: "ar-SA", decimals: 2 },
  QAR: { symbol: "ر.ق", name: "Qatari Riyal", locale: "ar-QA", decimals: 2 },
  ILS: { symbol: "₪", name: "Israeli Shekel", locale: "he-IL", decimals: 2 },

  // Africa
  NGN: { symbol: "₦", name: "Nigerian Naira", locale: "en-NG", decimals: 2 },
  KES: { symbol: "KSh", name: "Kenyan Shilling", locale: "en-KE", decimals: 2 },
  GHS: { symbol: "GH₵", name: "Ghanaian Cedi", locale: "en-GH", decimals: 2 },
  ZAR: { symbol: "R", name: "South African Rand", locale: "en-ZA", decimals: 2 },
  EGP: { symbol: "E£", name: "Egyptian Pound", locale: "ar-EG", decimals: 2 },

  // Latin America
  BRL: { symbol: "R$", name: "Brazilian Real", locale: "pt-BR", decimals: 2 },
  ARS: { symbol: "$", name: "Argentine Peso", locale: "es-AR", decimals: 2 },
  CLP: { symbol: "$", name: "Chilean Peso", locale: "es-CL", decimals: 0 },
  COP: { symbol: "$", name: "Colombian Peso", locale: "es-CO", decimals: 2 },
  PEN: { symbol: "S/", name: "Peruvian Sol", locale: "es-PE", decimals: 2 },
};

export { SUPPORTED_CURRENCIES };

export function isSupportedCurrency(code: string): boolean {
  return Object.prototype.hasOwnProperty.call(SUPPORTED_CURRENCIES, code);
}

export function getCurrencyInfo(code: string): CurrencyInfo {
  return SUPPORTED_CURRENCIES[code] ?? SUPPORTED_CURRENCIES.USD;
}

// ─── Minor-unit helpers ────────────────────────────────────────
// Forward-compat for a future schema that stores integer minor units per
// currency. JS floating-point math is unsafe for money; these helpers let
// us convert cleanly at API boundaries.

/**
 * Convert a decimal amount to integer minor units for the given currency.
 * e.g. (12.34, "USD") → 1234   (500, "JPY") → 500   (100, "BHD") → 100000
 */
export function toMinorUnits(amount: number, currency: string): number {
  const { decimals } = getCurrencyInfo(currency);
  return Math.round(amount * 10 ** decimals);
}

/**
 * Convert integer minor units back to a decimal amount.
 * e.g. (1234, "USD") → 12.34   (500, "JPY") → 500
 */
export function fromMinorUnits(minor: number, currency: string): number {
  const { decimals } = getCurrencyInfo(currency);
  return minor / 10 ** decimals;
}

// ─── Rate cache (server-side, in-memory) ───────────────────────

interface RateCache {
  rates: Record<string, number>;
  fetchedAt: number;
}

let rateCache: RateCache | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetch exchange rates from a free API. Rates are USD-based.
 * Cached for 1 hour in memory.
 *
 * Fallback table is kept conservative — if the upstream is down we still
 * convert, just with slightly stale figures.
 */
export async function getExchangeRates(): Promise<Record<string, number>> {
  if (rateCache && Date.now() - rateCache.fetchedAt < CACHE_TTL_MS) {
    return rateCache.rates;
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    const data = await res.json();

    if (data.result === "success" && data.rates) {
      rateCache = { rates: data.rates, fetchedAt: Date.now() };
      return data.rates;
    }
  } catch {
    // Fall through to fallback
  }

  const fallback: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, CHF: 0.87, SEK: 10.5, NOK: 10.8, DKK: 6.85,
    PLN: 4.0, CZK: 23.1, TRY: 34.0,
    JPY: 151, CNY: 7.25, HKD: 7.8, TWD: 32.1, KRW: 1340, SGD: 1.35, MYR: 4.7,
    THB: 35.5, IDR: 15800, VND: 25200, PHP: 57, INR: 83.5, PKR: 278,
    AUD: 1.55, NZD: 1.7,
    AED: 3.67, SAR: 3.75, QAR: 3.64, ILS: 3.7,
    NGN: 1650, KES: 153, GHS: 15.4, ZAR: 18.6, EGP: 48.5,
    CAD: 1.36, MXN: 17.2,
    BRL: 5.0, ARS: 1000, CLP: 960, COP: 4100, PEN: 3.75,
  };

  if (!rateCache) {
    rateCache = { rates: fallback, fetchedAt: Date.now() };
  }

  return rateCache.rates;
}

/** Convert USD to a target currency. */
export async function usdToLocal(amountUsd: number, currency: string): Promise<number> {
  if (currency === "USD") return amountUsd;
  const rates = await getExchangeRates();
  const rate = rates[currency];
  if (!rate) return amountUsd;
  return amountUsd * rate;
}

/** Convert a local currency amount to USD. */
export async function localToUsd(amountLocal: number, currency: string): Promise<number> {
  if (currency === "USD") return amountLocal;
  const rates = await getExchangeRates();
  const rate = rates[currency];
  if (!rate) return amountLocal;
  return amountLocal / rate;
}

/** Format an amount in a given currency for display. */
export function formatCurrency(amount: number, currency: string): string {
  const info = SUPPORTED_CURRENCIES[currency];
  if (!info) {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  try {
    return new Intl.NumberFormat(info.locale, {
      style: "currency",
      currency,
      minimumFractionDigits: info.decimals,
      maximumFractionDigits: info.decimals,
    }).format(amount);
  } catch {
    return `${info.symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: info.decimals,
      maximumFractionDigits: info.decimals,
    })}`;
  }
}

/**
 * Convenience: format USD always using en-US. Most of our ledger / invoice
 * surfaces want this (stable output regardless of user locale).
 */
export function formatUsd(amount: number): string {
  return formatCurrency(amount, "USD");
}

/**
 * Format a USD amount with the viewer's local currency shown alongside.
 * Example: "$500.00 (~₦825,000.00)" or just "$500.00" if currency is USD.
 */
export async function formatWithLocal(
  amountUsd: number,
  currency: string,
): Promise<string> {
  const usdStr = formatUsd(amountUsd);
  if (currency === "USD" || !isSupportedCurrency(currency)) return usdStr;
  const localAmount = await usdToLocal(amountUsd, currency);
  const localStr = formatCurrency(localAmount, currency);
  return `${usdStr} (~${localStr})`;
}
