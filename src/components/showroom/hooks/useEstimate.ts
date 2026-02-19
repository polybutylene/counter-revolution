"use client";

import { useMemo } from 'react';
import { getStoneById } from '@/data/showroom/stones';
import { getEdgeProfileById } from '@/data/showroom/edgeProfiles';
import { estimateConfig, simpleSizeOptions, sinkTypes } from '@/data/showroom/pricing';
import type { EstimateFormData, EstimateResult } from '@/data/showroom/types';

export function useEstimate(formData: EstimateFormData) {
  return useMemo(() => calculateEstimate(formData), [formData]);
}

export function calculateEstimate(form: EstimateFormData): EstimateResult | null {
  const stone = getStoneById(form.stoneId);
  if (!stone) return null;

  let totalSqFt = 0;
  let totalLinearFt = 0;

  if (form.sizeMode === 'simple') {
    const sizeOpt = simpleSizeOptions.find(s => s.value === form.simpleSize);
    if (!sizeOpt) return null;
    totalSqFt = sizeOpt.sqFt;
    totalLinearFt = sizeOpt.linearFt;
  } else {
    totalSqFt = form.sections.reduce((sum, s) => sum + (s.length * s.width) / 144, 0);
    totalLinearFt = form.sections.reduce((sum, s) => sum + (2 * (s.length + s.width)) / 12, 0);
  }

  if (totalSqFt === 0) return null;

  const [priceMin, priceMax] = stone.pricePerSqFtRange;
  const materialCost: [number, number] = [
    Math.round(priceMin * totalSqFt),
    Math.round(priceMax * totalSqFt),
  ];

  const fabricationCost: [number, number] = [
    Math.round(estimateConfig.fabricationPerSqFt * totalSqFt * 0.9),
    Math.round(estimateConfig.fabricationPerSqFt * totalSqFt * 1.1),
  ];

  const edgeProfile = getEdgeProfileById(form.edgeProfileId);
  const edgeCost = edgeProfile ? Math.round(edgeProfile.addonPerLinearFt * totalLinearFt) : 0;

  const sinkType = sinkTypes.find(s => s.value === form.sinkType);
  const sinkCount = form.sinkType === 'none' ? 0 : form.sinkCount;
  const sinkCutoutCost = Math.round(
    estimateConfig.sinkCutoutPrice * sinkCount * (sinkType?.multiplier ?? 1)
  );

  const cooktopCutoutCost = form.cooktopCutout ? estimateConfig.cooktopCutoutPrice : 0;

  let backsplashCost = 0;
  if (form.backsplashType === '4inch') {
    backsplashCost = Math.round(estimateConfig.backsplash4InchPerLF * (form.backsplashLinearFt || totalLinearFt));
  } else if (form.backsplashType === 'full') {
    const backsplashSqFt = (form.backsplashLinearFt || totalLinearFt) * 1.5;
    backsplashCost = Math.round(estimateConfig.backsplashFullPerSqFt * backsplashSqFt);
  }

  const demolitionCost = form.includeDemolition
    ? Math.round(estimateConfig.demolitionPerSqFt * totalSqFt)
    : 0;

  const extras = edgeCost + sinkCutoutCost + cooktopCutoutCost + backsplashCost + demolitionCost;
  const totalMin = materialCost[0] + fabricationCost[0] + extras;
  const totalMax = materialCost[1] + fabricationCost[1] + extras;

  return {
    materialCost,
    fabricationCost,
    edgeCost,
    sinkCutoutCost,
    cooktopCutoutCost,
    backsplashCost,
    demolitionCost,
    totalMin,
    totalMax,
  };
}
