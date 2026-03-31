/**
 * Insurance tiers and fee calculation.
 */

export const INSURANCE_TIERS = [
  {
    key: "NONE",
    label: "No Coverage",
    fee: () => 0,
    description: "I accept full risk. No protection coverage provided.",
    coverage: "$0",
  },
  {
    key: "BASIC",
    label: "Basic Protection",
    fee: () => 15,
    description: "Covers loss or damage up to $500. Standard for everyday jobs.",
    coverage: "Up to $500",
  },
  {
    key: "STANDARD",
    label: "Standard Protection",
    fee: () => 35,
    description: "Covers loss or damage up to $2,500. Recommended for most jobs.",
    coverage: "Up to $2,500",
  },
  {
    key: "PREMIUM",
    label: "Premium Protection",
    fee: () => 75,
    description: "Covers loss or damage up to $10,000. Ideal for high-value cargo and equipment.",
    coverage: "Up to $10,000",
  },
  {
    key: "ELITE",
    label: "Elite Protection",
    fee: (budget: number) => Math.max(Math.round(budget * 0.015 * 100) / 100, 150),
    description: "Covers loss or damage up to full declared value. Required for hazmat, oversized, armored, medical, private jet, and yacht charter jobs.",
    coverage: "Full declared value",
  },
];

// Modes that REQUIRE Elite Protection minimum
export const ELITE_REQUIRED_MODES = [
  "HAZMAT",
  "OVERSIZED_CARGO",
  "HEAVY_HAUL",
  "ARMORED",
  "MEDICAL",
  "PRIVATE_JET",
  "YACHT_CHARTER",
];

export function getInsuranceFee(tier: string, budgetUsd: number): number {
  const t = INSURANCE_TIERS.find((t) => t.key === tier);
  return t ? t.fee(budgetUsd) : 0;
}

export function getMinimumInsuranceTier(mode: string): string {
  return ELITE_REQUIRED_MODES.includes(mode) ? "ELITE" : "NONE";
}

export function getAvailableTiers(mode: string) {
  if (ELITE_REQUIRED_MODES.includes(mode)) {
    return INSURANCE_TIERS.filter((t) => t.key === "ELITE");
  }
  return INSURANCE_TIERS;
}
