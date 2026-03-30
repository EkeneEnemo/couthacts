/**
 * Posting fee schedule and minimum budget limits.
 *
 * Every mode has:
 * - A minimum budget in USD (ensures CouthActs earns enough to cover
 *   infrastructure costs on every transaction regardless of currency)
 * - A base posting fee + 0.5% of the USD budget
 *
 * The 3.5% escrow fee on top of this means CouthActs minimum revenue
 * per transaction = posting fee + 3.5% of minimum budget.
 */

export const MODE_MINIMUMS_USD: Record<string, number> = {
  TAXI_RIDE: 5,
  LIMOUSINE: 20,
  COURIER_LAST_MILE: 5,
  MOVING: 50,
  FREIGHT_TRUCKING: 100,
  HEAVY_HAUL: 500,
  ARMORED: 200,
  MEDICAL: 100,
  PRIVATE_JET: 1000,
  HELICOPTER: 500,
  COMMERCIAL_AIRLINE: 50,
  AIR_CARGO: 200,
  CARGO_SHIP: 500,
  YACHT_CHARTER: 500,
  FERRY: 20,
  FREIGHT_RAIL: 200,
  HAZMAT: 200,
  OVERSIZED_CARGO: 300,
};

const BASE_FEES: Record<string, number> = {
  TAXI_RIDE: 2.0,
  LIMOUSINE: 3.0,
  COURIER_LAST_MILE: 2.0,
  MOVING: 5.0,
  FREIGHT_TRUCKING: 10.0,
  HEAVY_HAUL: 25.0,
  ARMORED: 15.0,
  MEDICAL: 10.0,
  PRIVATE_JET: 50.0,
  HELICOPTER: 35.0,
  COMMERCIAL_AIRLINE: 15.0,
  AIR_CARGO: 20.0,
  CARGO_SHIP: 30.0,
  YACHT_CHARTER: 40.0,
  FERRY: 5.0,
  FREIGHT_RAIL: 15.0,
  HAZMAT: 20.0,
  OVERSIZED_CARGO: 25.0,
};

/**
 * Get the minimum budget in USD for a given transport mode.
 */
export function getMinimumBudgetUsd(mode: string): number {
  return MODE_MINIMUMS_USD[mode] ?? 10;
}

/**
 * Absolute minimum posting fee in USD.
 * Guarantees profitability after Stripe fees (~$0.45) on every transaction.
 */
const MIN_POSTING_FEE_USD = 2.0;

/**
 * Calculate posting fee based on transport mode and budget.
 * Base fee + 0.5% of budget, with a $2 floor.
 */
export function calculatePostingFee(
  mode: string,
  budgetUsd: number
): number {
  const baseFee = BASE_FEES[mode] ?? 5.0;
  const percentFee = budgetUsd * 0.005;
  const calculated = Math.round((baseFee + percentFee) * 100) / 100;
  return Math.max(calculated, MIN_POSTING_FEE_USD);
}

/**
 * Validate that a budget meets the minimum for the given mode.
 * Returns null if valid, or an error message if below minimum.
 */
export function validateBudget(
  mode: string,
  budgetUsd: number
): string | null {
  const min = getMinimumBudgetUsd(mode);
  if (budgetUsd < min) {
    return `Minimum budget for ${mode.replace(/_/g, " ")} is $${min.toFixed(2)} USD`;
  }
  return null;
}
