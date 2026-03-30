/**
 * Calculate posting fee based on transport mode and budget.
 * Base fee + percentage of budget.
 */
export function calculatePostingFee(
  mode: string,
  budgetUsd: number
): number {
  const BASE_FEES: Record<string, number> = {
    TAXI_RIDE: 1.0,
    LIMOUSINE: 2.0,
    COURIER_LAST_MILE: 1.5,
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
    FERRY: 10.0,
    FREIGHT_RAIL: 15.0,
    HAZMAT: 20.0,
    OVERSIZED_CARGO: 25.0,
  };

  const baseFee = BASE_FEES[mode] ?? 5.0;
  const percentFee = budgetUsd * 0.005; // 0.5% of budget
  return Math.round((baseFee + percentFee) * 100) / 100;
}
