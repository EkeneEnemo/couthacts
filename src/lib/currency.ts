/**
 * Multi-currency display system.
 * Internal ledger is always USD. This module handles:
 * - Fetching and caching live exchange rates
 * - Converting USD ↔ local currency for display
 * - Formatting amounts in local currency
 */

const SUPPORTED_CURRENCIES: Record<string, { symbol: string; name: string; locale: string }> = {
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
  EUR: { symbol: "€", name: "Euro", locale: "de-DE" },
  GBP: { symbol: "£", name: "British Pound", locale: "en-GB" },
  NGN: { symbol: "₦", name: "Nigerian Naira", locale: "en-NG" },
  CAD: { symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
  AUD: { symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
  INR: { symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  KES: { symbol: "KSh", name: "Kenyan Shilling", locale: "en-KE" },
  GHS: { symbol: "GH₵", name: "Ghanaian Cedi", locale: "en-GH" },
  ZAR: { symbol: "R", name: "South African Rand", locale: "en-ZA" },
  BRL: { symbol: "R$", name: "Brazilian Real", locale: "pt-BR" },
  MXN: { symbol: "MX$", name: "Mexican Peso", locale: "es-MX" },
  JPY: { symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
  CNY: { symbol: "¥", name: "Chinese Yuan", locale: "zh-CN" },
  AED: { symbol: "د.إ", name: "UAE Dirham", locale: "ar-AE" },
  SAR: { symbol: "﷼", name: "Saudi Riyal", locale: "ar-SA" },
};

export { SUPPORTED_CURRENCIES };

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
 */
export async function getExchangeRates(): Promise<Record<string, number>> {
  if (rateCache && Date.now() - rateCache.fetchedAt < CACHE_TTL_MS) {
    return rateCache.rates;
  }

  try {
    const res = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    if (data.result === "success" && data.rates) {
      rateCache = { rates: data.rates, fetchedAt: Date.now() };
      return data.rates;
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback rates if API is down (approximate, updated March 2026)
  const fallback: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1650, CAD: 1.36, AUD: 1.55,
    INR: 83.5, KES: 153, GHS: 15.4, ZAR: 18.6, BRL: 5.0, MXN: 17.2,
    JPY: 151, CNY: 7.25, AED: 3.67, SAR: 3.75,
  };

  if (!rateCache) {
    rateCache = { rates: fallback, fetchedAt: Date.now() };
  }

  return rateCache.rates;
}

/**
 * Convert USD to a target currency.
 */
export async function usdToLocal(amountUsd: number, currency: string): Promise<number> {
  if (currency === "USD") return amountUsd;
  const rates = await getExchangeRates();
  const rate = rates[currency];
  if (!rate) return amountUsd;
  return amountUsd * rate;
}

/**
 * Convert a local currency amount to USD.
 */
export async function localToUsd(amountLocal: number, currency: string): Promise<number> {
  if (currency === "USD") return amountLocal;
  const rates = await getExchangeRates();
  const rate = rates[currency];
  if (!rate) return amountLocal;
  return amountLocal / rate;
}

/**
 * Format an amount in a given currency for display.
 */
export function formatCurrency(amount: number, currency: string): string {
  const info = SUPPORTED_CURRENCIES[currency];
  if (!info) {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // JPY and similar currencies don't use decimal places
  const noDecimals = ["JPY", "KRW"].includes(currency);

  try {
    return new Intl.NumberFormat(info.locale, {
      style: "currency",
      currency,
      minimumFractionDigits: noDecimals ? 0 : 2,
      maximumFractionDigits: noDecimals ? 0 : 2,
    }).format(amount);
  } catch {
    return `${info.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

/**
 * Format a USD amount with a local currency equivalent shown alongside.
 * Example: "$500.00 (~₦825,000.00)" or just "$500.00" if currency is USD.
 */
export async function formatWithLocal(
  amountUsd: number,
  currency: string
): Promise<string> {
  const usdStr = formatCurrency(amountUsd, "USD");
  if (currency === "USD") return usdStr;

  const localAmount = await usdToLocal(amountUsd, currency);
  const localStr = formatCurrency(localAmount, currency);
  return `${usdStr} (~${localStr})`;
}
