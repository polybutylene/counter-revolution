export const PRICING_CONFIG = {
  LABOR_RATE_PER_HOUR: 120,
  SALESMAN_ALLOCATION: 120,
  COMMISSION_RATE: 0.05,
  TARGET_MARGIN: 0.25,
};

export interface EstimateInput {
  materialCostLow: number;
  materialCostHigh: number;
  laborHoursLow: number;
  laborHoursHigh: number;
  addOnsCost?: number;
}

export interface EstimateOutput {
  materialInstalled: { low: number; high: number };
  labor: { low: number; high: number };
  salesmanFee: number;
  commission: { low: number; high: number };
  subtotal: { low: number; high: number };
  customerPrice: { low: number; high: number };
  grossProfit: { low: number; high: number };
}

export function calculateEstimatePricing(input: EstimateInput): EstimateOutput {
  const { LABOR_RATE_PER_HOUR, SALESMAN_ALLOCATION, COMMISSION_RATE, TARGET_MARGIN } =
    PRICING_CONFIG;

  const addOns = input.addOnsCost || 0;

  const laborLow = input.laborHoursLow * LABOR_RATE_PER_HOUR;
  const laborHigh = input.laborHoursHigh * LABOR_RATE_PER_HOUR;

  const mlLow = input.materialCostLow + laborLow + addOns;
  const mlHigh = input.materialCostHigh + laborHigh + addOns;

  const commissionLow = COMMISSION_RATE * (input.materialCostLow + laborLow);
  const commissionHigh = COMMISSION_RATE * (input.materialCostHigh + laborHigh);

  const costLow = mlLow + SALESMAN_ALLOCATION + commissionLow;
  const costHigh = mlHigh + SALESMAN_ALLOCATION + commissionHigh;

  const priceLow = Math.round(costLow / (1 - TARGET_MARGIN));
  const priceHigh = Math.round(costHigh / (1 - TARGET_MARGIN));

  const profitLow = priceLow - costLow;
  const profitHigh = priceHigh - costHigh;

  return {
    materialInstalled: {
      low: Math.round(input.materialCostLow + addOns),
      high: Math.round(input.materialCostHigh + addOns),
    },
    labor: { low: Math.round(laborLow), high: Math.round(laborHigh) },
    salesmanFee: SALESMAN_ALLOCATION,
    commission: { low: Math.round(commissionLow), high: Math.round(commissionHigh) },
    subtotal: { low: Math.round(costLow), high: Math.round(costHigh) },
    customerPrice: { low: priceLow, high: priceHigh },
    grossProfit: { low: Math.round(profitLow), high: Math.round(profitHigh) },
  };
}

/** Mark up a cost amount to the customer price using the target margin */
export function displayPrice(costAmount: number): number {
  return Math.round(costAmount / (1 - PRICING_CONFIG.TARGET_MARGIN));
}

/** Get installed price per unit for showroom card display (excludes per-job fixed costs) */
export function getInstalledPricePerUnit(
  wholesaleCostLow: number,
  wholesaleCostHigh: number,
  laborHoursPerUnit: number
): { low: number; high: number } {
  const laborPerUnit = laborHoursPerUnit * PRICING_CONFIG.LABOR_RATE_PER_HOUR;
  const costLow = wholesaleCostLow + laborPerUnit;
  const costHigh = wholesaleCostHigh + laborPerUnit;
  return {
    low: Math.round(costLow / (1 - PRICING_CONFIG.TARGET_MARGIN)),
    high: Math.round(costHigh / (1 - PRICING_CONFIG.TARGET_MARGIN)),
  };
}

export interface CustomerLineItem {
  label: string;
  low: number;
  high: number;
}

export interface CustomerEstimate {
  title: string;
  lineItems: CustomerLineItem[];
  totalLow: number;
  totalHigh: number;
}

/** Build the customer-facing view from an EstimateOutput + service-specific add-on line items */
export function buildCustomerEstimate(
  output: EstimateOutput,
  title: string,
  addOnLineItems: CustomerLineItem[] = []
): CustomerEstimate {
  const materialLine: CustomerLineItem = {
    label: "Material (installed)",
    low: displayPrice(output.materialInstalled.low),
    high: displayPrice(output.materialInstalled.high),
  };

  const addOnsTotal = addOnLineItems.reduce((s, li) => s + li.low, 0);
  const addOnsTotalHigh = addOnLineItems.reduce((s, li) => s + li.high, 0);

  const laborLine: CustomerLineItem = {
    label: "Labor",
    low: output.customerPrice.low - materialLine.low - addOnsTotal,
    high: output.customerPrice.high - materialLine.high - addOnsTotalHigh,
  };

  const lineItems: CustomerLineItem[] = [materialLine, laborLine, ...addOnLineItems];

  return {
    title,
    lineItems,
    totalLow: output.customerPrice.low,
    totalHigh: output.customerPrice.high,
  };
}
