/**
 * Insurance / Protection tiers and fee calculation.
 */

export const INSURANCE_TIERS = [
  {
    key: "NONE",
    label: "No Coverage",
    fee: () => 0,
    description: "I accept full risk. No protection coverage provided.",
    coverage: "$0",
    features: [
      "No damage or loss coverage",
      "No dispute mediation priority",
      "Standard escrow protection only",
    ],
  },
  {
    key: "BASIC",
    label: "Basic Protection",
    fee: () => 15,
    description: "Covers loss or damage up to $500. Standard for everyday jobs.",
    coverage: "Up to $500",
    features: [
      "Loss or damage coverage up to $500",
      "Escrow-backed payment protection",
      "Standard dispute mediation",
      "Photo documentation support",
      "Email support within 48 hours",
    ],
  },
  {
    key: "STANDARD",
    label: "Standard Protection",
    fee: () => 35,
    description: "Covers loss or damage up to $2,500. Recommended for most jobs.",
    coverage: "Up to $2,500",
    features: [
      "Loss or damage coverage up to $2,500",
      "Escrow-backed payment protection",
      "Priority dispute mediation (24-hour SLA)",
      "Photo + GPS documentation",
      "Partial loss coverage (prorated)",
      "Email + chat support within 24 hours",
    ],
  },
  {
    key: "PREMIUM",
    label: "Premium Protection",
    fee: () => 75,
    description: "Covers loss or damage up to $10,000. Ideal for high-value cargo and equipment.",
    coverage: "Up to $10,000",
    features: [
      "Loss or damage coverage up to $10,000",
      "Escrow-backed payment protection",
      "Expedited dispute mediation (12-hour SLA)",
      "Full tracking documentation (GPS + photos + checkpoints)",
      "Delay compensation (up to $500 for late delivery)",
      "Partial and total loss coverage",
      "Dedicated support representative",
      "Multi-currency claim processing",
    ],
  },
  {
    key: "ELITE",
    label: "Elite Protection",
    fee: (budget: number) => Math.max(Math.round(budget * 0.015 * 100) / 100, 150),
    description: "Covers loss or damage up to full declared value. Required for hazmat, oversized, armored, medical, private jet, and yacht charter jobs.",
    coverage: "Full declared value",
    features: [
      "Loss or damage coverage up to full declared value",
      "Escrow-backed payment protection",
      "Immediate dispute escalation (4-hour SLA)",
      "All 9 tracking layers active",
      "Delay compensation (up to $2,500 for late delivery)",
      "Total loss replacement coverage",
      "Dedicated claims manager",
      "IoT condition monitoring included",
      "Regulatory compliance documentation",
      "Priority customer support (phone + chat)",
    ],
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
