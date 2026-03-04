"use client";

import { useMemo } from "react";
import { getStoneById } from "@/data/showroom/stones";
import { getEdgeProfileById } from "@/data/showroom/edgeProfiles";
import { simpleSizeOptions } from "@/data/showroom/pricing";
import { calculateEstimatePricing, displayPrice } from "@/lib/pricing";
import { STONE_MATERIALS, STONE_ADDONS } from "@/lib/services/stone-pricing";
import type { EstimateFormData, EstimateResult } from "@/data/showroom/types";

export function useEstimate(formData: EstimateFormData) {
  return useMemo(() => calculateEstimate(formData), [formData]);
}

export function calculateEstimate(form: EstimateFormData): EstimateResult | null {
  const stone = getStoneById(form.stoneId);
  if (!stone) return null;

  const material = STONE_MATERIALS[form.stoneId];

  let totalSqFt = 0;
  let totalLinearFt = 0;

  if (form.sizeMode === "simple") {
    const sizeOpt = simpleSizeOptions.find((s) => s.value === form.simpleSize);
    if (!sizeOpt) return null;
    totalSqFt = sizeOpt.sqFt;
    totalLinearFt = sizeOpt.linearFt;
  } else {
    totalSqFt = form.sections.reduce(
      (sum, s) => sum + (s.length * s.width) / 144,
      0
    );
    totalLinearFt = form.sections.reduce(
      (sum, s) => sum + (2 * (s.length + s.width)) / 12,
      0
    );
  }

  if (totalSqFt === 0) return null;

  const wholesaleLow = material
    ? material.wholesaleCostPerSqFt.low
    : stone.pricePerSqFtRange[0] * 0.6;
  const wholesaleHigh = material
    ? material.wholesaleCostPerSqFt.high
    : stone.pricePerSqFtRange[1] * 0.6;
  const laborHoursPerSqFt = material ? material.laborHoursPerSqFt : 0.35;

  const materialCostLow = wholesaleLow * totalSqFt;
  const materialCostHigh = wholesaleHigh * totalSqFt;

  const baseHours = laborHoursPerSqFt * totalSqFt;
  const laborHoursLow = baseHours * 0.9;
  const laborHoursHigh = baseHours * 1.15;

  let addOnsCost = 0;

  const edgeProfile = getEdgeProfileById(form.edgeProfileId);
  let edgeCostRaw = 0;
  if (
    edgeProfile &&
    form.edgeProfileId !== "standard-eased" &&
    form.edgeProfileId !== "eased"
  ) {
    const addon = STONE_ADDONS.edgeProfiles[form.edgeProfileId];
    const costPerLF = addon ? addon.costPerLF : edgeProfile.addonPerLinearFt * 0.6;
    edgeCostRaw = costPerLF * totalLinearFt;
    addOnsCost += edgeCostRaw;
  }

  let sinkCostRaw = 0;
  const sinkCount = form.sinkType === "none" ? 0 : form.sinkCount;
  if (sinkCount > 0 && STONE_ADDONS.sinkCutout[form.sinkType]) {
    sinkCostRaw = STONE_ADDONS.sinkCutout[form.sinkType].cost * sinkCount;
    addOnsCost += sinkCostRaw;
  }

  let cooktopCostRaw = 0;
  if (form.cooktopCutout) {
    cooktopCostRaw = STONE_ADDONS.cooktopCutout.cost;
    addOnsCost += cooktopCostRaw;
  }

  let backsplashCostRaw = 0;
  if (form.backsplashType === "4inch") {
    const lf = form.backsplashLinearFt || totalLinearFt;
    backsplashCostRaw = STONE_ADDONS.backsplash4Inch.costPerLF * lf;
    addOnsCost += backsplashCostRaw;
  } else if (form.backsplashType === "full") {
    const sqFt = (form.backsplashLinearFt || totalLinearFt) * 1.5;
    backsplashCostRaw = STONE_ADDONS.backsplashFull.costPerSqFt * sqFt;
    addOnsCost += backsplashCostRaw;
  }

  let demoCostRaw = 0;
  if (form.includeDemolition) {
    demoCostRaw = STONE_ADDONS.demoRemoval.cost;
    addOnsCost += demoCostRaw;
  }

  const output = calculateEstimatePricing({
    materialCostLow,
    materialCostHigh,
    laborHoursLow,
    laborHoursHigh,
    addOnsCost,
  });

  const materialLineHigh = displayPrice(materialCostHigh + addOnsCost);
  const laborLineHigh = output.customerPrice.high - materialLineHigh;
  const materialLineLow = displayPrice(materialCostLow + addOnsCost);
  const laborLineLow = output.customerPrice.low - materialLineLow;

  return {
    materialCost: [
      displayPrice(materialCostLow),
      displayPrice(materialCostHigh),
    ] as [number, number],
    fabricationCost: [
      Math.max(0, laborLineLow),
      Math.max(0, laborLineHigh),
    ] as [number, number],
    edgeCost: edgeCostRaw > 0 ? displayPrice(edgeCostRaw) : 0,
    sinkCutoutCost: sinkCostRaw > 0 ? displayPrice(sinkCostRaw) : 0,
    cooktopCutoutCost: cooktopCostRaw > 0 ? displayPrice(cooktopCostRaw) : 0,
    backsplashCost: backsplashCostRaw > 0 ? displayPrice(backsplashCostRaw) : 0,
    demolitionCost: demoCostRaw > 0 ? displayPrice(demoCostRaw) : 0,
    totalMin: output.customerPrice.low,
    totalMax: output.customerPrice.high,
  };
}
