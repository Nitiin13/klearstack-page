export type ModelType = "single" | "multi";

export type DocType =
  | "Bank Cheques"
  | "Bank Documents"
  | "ID Cards"
  | "KYC Documents"
  | "Invoice"
  | "Bill of Lading"
  | "Packing List"
  | "Purchase Order"
  | "Contract"
  | "P&L Statements"
  | "Cashflow Statements";

export type Tier = "tier1" | "tier2" | "tier3";

export const DOC_TYPES: { name: DocType; tier: Tier }[] = [
  { name: "Bank Cheques", tier: "tier1" },
  { name: "Bank Documents", tier: "tier1" },
  { name: "ID Cards", tier: "tier1" },
  { name: "KYC Documents", tier: "tier1" },
  { name: "Invoice", tier: "tier2" },
  { name: "Bill of Lading", tier: "tier2" },
  { name: "Packing List", tier: "tier2" },
  { name: "Purchase Order", tier: "tier2" },
  { name: "Contract", tier: "tier3" },
  { name: "P&L Statements", tier: "tier3" },
  { name: "Cashflow Statements", tier: "tier3" },
];

export const TIER_MAP: Record<string, Tier> = DOC_TYPES.reduce(
  (acc, curr) => {
    acc[curr.name] = curr.tier;
    return acc;
  },
  {} as Record<string, Tier>
);

type PricingRow = {
  fixed: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
};

export const PRICING: Record<string, PricingRow> = {
  "tier1|single": { fixed: 25000, r1: 0.07, r2: 0.06, r3: 0.05, r4: 0.04, r5: 0.03 },
  "tier1|multi": { fixed: 18000, r1: 0.05, r2: 0.04, r3: 0.03, r4: 0.02, r5: 0.01 },
  "tier2|single": { fixed: 36000, r1: 0.09, r2: 0.08, r3: 0.07, r4: 0.05, r5: 0.04 },
  "tier2|multi": { fixed: 27000, r1: 0.07, r2: 0.06, r3: 0.05, r4: 0.04, r5: 0.03 },
  "tier3|single": { fixed: 54000, r1: 0.15, r2: 0.14, r3: 0.13, r4: 0.12, r5: 0.11 },
};

export interface RoiResultReady {
  state: "Ready";
  resourcesNeeded: number;
  monthlyManualCost: number;
  annualCost: number;
  monthlyCost: number;
  netMonthlySavings: number;
  annualSavings: number;
  equivalentResources: number;
  paybackMonths: number;
}

export interface RoiResultNotReady {
  state: "Tier 3 supports Single only" | "Complete all inputs";
}

export type RoiResult = RoiResultReady | RoiResultNotReady;

export function calcRoi(
  docType: string,
  model: ModelType,
  volume: number,
  salary: number
): RoiResult {
  const tier = TIER_MAP[docType];

  if (tier === "tier3" && model === "multi") {
    return { state: "Tier 3 supports Single only" };
  }

  if (!docType || !model || isNaN(volume) || volume <= 0 || isNaN(salary) || salary <= 0) {
    return { state: "Complete all inputs" };
  }

  const key = `${tier}|${model}`;
  const row = PRICING[key];

  if (!row) {
    return { state: "Complete all inputs" };
  }

  const resourcesNeeded = volume / 30000;
  const monthlyManualCost = resourcesNeeded * salary;

  const band = (hi: number, lo: number) => Math.max(Math.min(volume, hi) - lo, 0);

  const annualCost =
    row.fixed +
    band(120_000, 36_000) * row.r1 +
    band(300_000, 120_000) * row.r2 +
    band(500_000, 300_000) * row.r3 +
    band(1_000_000, 500_000) * row.r4 +
    Math.max(volume - 1_000_000, 0) * row.r5;

  const monthlyCost = annualCost / 12;
  const netMonthlySavings = monthlyManualCost - monthlyCost;
  const annualSavings = netMonthlySavings * 12;
  const equivalentResources = Math.ceil(resourcesNeeded);
  const paybackMonths =
    monthlyManualCost > 0
      ? Math.round((monthlyCost / monthlyManualCost) * 10) / 10
      : 0;

  return {
    state: "Ready",
    resourcesNeeded,
    monthlyManualCost,
    annualCost,
    monthlyCost,
    netMonthlySavings,
    annualSavings,
    equivalentResources,
    paybackMonths,
  };
}
