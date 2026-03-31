/**
 * Pure escrow fee calculations — safe for client-side import.
 *
 * Sliding escrow fee scale:
 * Under $500: 8%
 * $500–$5,000: 6%
 * $5,000–$50,000: 4%
 * $50,000–$500,000: 2%
 * Above $500,000: 1% capped at $10,000
 */

export function getEscrowFeePercent(amountUsd: number): number {
  if (amountUsd < 500) return 8;
  if (amountUsd < 5000) return 6;
  if (amountUsd < 50000) return 4;
  if (amountUsd < 500000) return 2;
  return 1;
}

export function calculateEscrowFee(amountUsd: number): number {
  const percent = getEscrowFeePercent(amountUsd);
  const fee = Math.round(amountUsd * percent) / 100;
  // Cap at $10,000 for amounts above $500k
  if (amountUsd >= 500000) return Math.min(fee, 10000);
  return fee;
}
