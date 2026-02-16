import type { EstimatorFormData, EstimateResult, EstimateBreakdown } from "@/types/estimator";

// Default pricing — overridden by CMS siteSettings.estimatorPricing when available
const DEFAULT_PRICING = {
  materials: {
    granite: { low: 40, high: 80 },
    quartz: { low: 50, high: 100 },
    marble: { low: 60, high: 120 },
    quartzite: { low: 55, high: 110 },
    "not-sure": { low: 45, high: 95 },
  } as Record<string, { low: number; high: number }>,
  sinkCutout: { low: 150, high: 250 },
  cooktopCutout: { low: 200, high: 300 },
  edgeProfiles: {
    straight: 0,
    beveled: 5,
    bullnose: 8,
    ogee: 12,
    waterfall: 15,
    "not-sure": 0,
  } as Record<string, number>,
  backsplash: { fourInch: 15, fullHeight: 35 },
  islandSizes: {
    small: 6,
    medium: 10,
    large: 14,
  } as Record<string, number>,
  removalFlat: { low: 300, high: 500 },
};

export function calculateEstimate(
  formData: EstimatorFormData,
  pricingOverrides?: Partial<typeof DEFAULT_PRICING>
): EstimateResult {
  const pricing = { ...DEFAULT_PRICING, ...pricingOverrides };

  const materialKey = formData.materialPreference;
  const materialPricing = pricing.materials[materialKey] || pricing.materials["not-sure"];

  let totalLF = formData.linearFootage;

  // Island adds to linear footage
  if (formData.includeIsland && formData.islandSize) {
    totalLF += pricing.islandSizes[formData.islandSize] || 0;
  }

  // Base material cost (covers material + fabrication + basic install)
  const materialCost = {
    low: totalLF * materialPricing.low,
    high: totalLF * materialPricing.high,
  };

  // Fabrication is included in per-LF pricing (~30% of total)
  const fabrication = {
    low: Math.round(materialCost.low * 0.3),
    high: Math.round(materialCost.high * 0.3),
  };

  // Installation is included in per-LF pricing (~25% of total)
  const installation = {
    low: Math.round(materialCost.low * 0.25),
    high: Math.round(materialCost.high * 0.25),
  };

  // Cutouts
  const sinkCost = formData.sinkCutouts * pricing.sinkCutout.low;
  const sinkCostHigh = formData.sinkCutouts * pricing.sinkCutout.high;
  const cooktopCost = formData.cooktopCutouts * pricing.cooktopCutout.low;
  const cooktopCostHigh = formData.cooktopCutouts * pricing.cooktopCutout.high;
  const cutouts = {
    low: sinkCost + cooktopCost,
    high: sinkCostHigh + cooktopCostHigh,
  };

  // Edge profile adder
  const edgeAdder = pricing.edgeProfiles[formData.edgeProfile] || 0;
  const edgeProfileCost = {
    low: totalLF * edgeAdder,
    high: totalLF * edgeAdder,
  };

  // Backsplash
  let backsplashCost = { low: 0, high: 0 };
  if (formData.includeBacksplash && formData.backsplashHeight) {
    const bsRate =
      formData.backsplashHeight === "full"
        ? pricing.backsplash.fullHeight
        : pricing.backsplash.fourInch;
    backsplashCost = {
      low: formData.linearFootage * bsRate,
      high: formData.linearFootage * bsRate,
    };
  }

  // Island (already added to LF, but show as separate line)
  let islandCost = { low: 0, high: 0 };
  if (formData.includeIsland && formData.islandSize) {
    const islandLF = pricing.islandSizes[formData.islandSize] || 0;
    islandCost = {
      low: islandLF * materialPricing.low,
      high: islandLF * materialPricing.high,
    };
  }

  const breakdown: EstimateBreakdown = {
    materialCost,
    fabrication,
    installation,
    cutouts,
    edgeProfile: edgeProfileCost,
    backsplash: backsplashCost,
    island: islandCost,
  };

  const totalLow =
    materialCost.low + cutouts.low + edgeProfileCost.low + backsplashCost.low;
  const totalHigh =
    materialCost.high + cutouts.high + edgeProfileCost.high + backsplashCost.high;

  return {
    low: Math.round(totalLow / 100) * 100,
    high: Math.round(totalHigh / 100) * 100,
    breakdown,
  };
}
