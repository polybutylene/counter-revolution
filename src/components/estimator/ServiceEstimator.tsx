"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Star, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadges } from "@/components/showroom/shared/TrustBadges";
import { formatCurrency } from "@/lib/utils";
import {
  calculateEstimatePricing,
  displayPrice,
  type CustomerLineItem,
} from "@/lib/pricing";
import { TILE_MATERIALS, TILE_ADDONS, TILE_SIZE_OPTIONS } from "@/lib/services/tile-pricing";
import { COATING_CONFIG } from "@/lib/services/coating-pricing";
import { FLOORING_MATERIALS, FLOORING_ADDONS, FLOORING_SIZE_OPTIONS } from "@/lib/services/flooring-pricing";
import type { ServiceConfig, EstimatorStep, EstimatorOption } from "@/data/services/config";
import { cn } from "@/lib/utils";

interface ServiceEstimatorProps {
  service: ServiceConfig;
}

type StepSelections = Record<string, string | number | string[]>;

interface ComputedEstimate {
  totalLow: number;
  totalHigh: number;
  lineItems: CustomerLineItem[];
}

function computeTileEstimate(selections: StepSelections): ComputedEstimate {
  const tileId = (selections["tile-type"] as string) || "subway-ceramic";
  const sizeId = (selections["area-size"] as string) || "medium";
  const patternId = (selections["layout-pattern"] as string) || "straight";
  const surfaceId = (selections["existing-surface"] as string) || "new-bare";

  const material = TILE_MATERIALS[tileId] || TILE_MATERIALS["subway-ceramic"];
  const size = TILE_SIZE_OPTIONS.find((s) => s.id === sizeId) || TILE_SIZE_OPTIONS[1];
  const sqFt = size.sqFt;

  const matCostLow = material.wholesaleCostPerSqFt.low * sqFt;
  const matCostHigh = material.wholesaleCostPerSqFt.high * sqFt;

  const baseHours = material.laborHoursPerSqFt * sqFt;

  let addOnsCost = 0;
  const lineItems: CustomerLineItem[] = [];

  const pattern = TILE_ADDONS.layoutPattern[patternId];
  let patternCost = 0;
  if (pattern && pattern.costPerSqFt > 0) {
    patternCost = pattern.costPerSqFt * sqFt;
    addOnsCost += patternCost;
  }

  let demoCost = 0;
  if (surfaceId === "remove-existing") {
    const avg = (TILE_ADDONS.demoExisting.costPerSqFt.low + TILE_ADDONS.demoExisting.costPerSqFt.high) / 2;
    demoCost = avg * sqFt;
    addOnsCost += demoCost;
  }

  const groutCost = TILE_ADDONS.groutAndSealant.costPerSqFt * sqFt;
  addOnsCost += groutCost;

  const output = calculateEstimatePricing({
    materialCostLow: matCostLow,
    materialCostHigh: matCostHigh,
    laborHoursLow: baseHours * 0.9,
    laborHoursHigh: baseHours * 1.15,
    addOnsCost,
  });

  const matLineLow = displayPrice(matCostLow);
  const matLineHigh = displayPrice(matCostHigh);
  lineItems.push({ label: "Tile Material", low: matLineLow, high: matLineHigh });

  const laborLow = output.customerPrice.low - matLineLow;
  const laborHigh = output.customerPrice.high - matLineHigh;

  let remainLow = laborLow;
  let remainHigh = laborHigh;

  if (patternCost > 0) {
    const pUp = displayPrice(patternCost);
    lineItems.push({ label: "Pattern Upcharge", low: pUp, high: pUp });
    remainLow -= pUp;
    remainHigh -= pUp;
  }
  if (demoCost > 0) {
    const dUp = displayPrice(demoCost);
    lineItems.push({ label: "Demo & Prep", low: dUp, high: dUp });
    remainLow -= dUp;
    remainHigh -= dUp;
  }
  const groutUp = displayPrice(groutCost);
  lineItems.push({ label: "Grout & Sealant", low: groutUp, high: groutUp });
  remainLow -= groutUp;
  remainHigh -= groutUp;

  lineItems.splice(1, 0, {
    label: "Installation Labor",
    low: Math.max(0, remainLow),
    high: Math.max(0, remainHigh),
  });

  return {
    totalLow: output.customerPrice.low,
    totalHigh: output.customerPrice.high,
    lineItems,
  };
}

function computeCoatingEstimate(selections: StepSelections): ComputedEstimate {
  const projectType = (selections["project-type"] as string) || "interior";
  const roomCountStr = (selections["room-details"] as number) || 1;
  const roomCount = typeof roomCountStr === "number" ? roomCountStr : 1;
  const roomSizeId = (selections["room-size"] as string) || "medium";
  const gradeId = (selections["paint-grade"] as string) || "premium";
  const prepId = (selections["prep-work"] as string) || "minimal";
  const toggles = (selections["extras"] as string[]) || [];

  const lineItems: CustomerLineItem[] = [];

  if (projectType === "cabinets") {
    const cabSize = COATING_CONFIG.cabinets.kitchenSizes[roomSizeId] ||
      COATING_CONFIG.cabinets.kitchenSizes["medium"];
    const output = calculateEstimatePricing({
      materialCostLow: cabSize.materialCost.low,
      materialCostHigh: cabSize.materialCost.high,
      laborHoursLow: cabSize.laborHours * 0.9,
      laborHoursHigh: cabSize.laborHours * 1.1,
    });
    lineItems.push({
      label: "Paint & Materials",
      low: displayPrice(cabSize.materialCost.low),
      high: displayPrice(cabSize.materialCost.high),
    });
    lineItems.push({
      label: "Labor",
      low: output.customerPrice.low - displayPrice(cabSize.materialCost.low),
      high: output.customerPrice.high - displayPrice(cabSize.materialCost.high),
    });
    return { totalLow: output.customerPrice.low, totalHigh: output.customerPrice.high, lineItems };
  }

  if (projectType === "exterior-full" || projectType === "exterior-trim") {
    const extSize = COATING_CONFIG.exterior.homeSizes[roomSizeId] ||
      COATING_CONFIG.exterior.homeSizes["medium"];
    const output = calculateEstimatePricing({
      materialCostLow: extSize.materialCost.low,
      materialCostHigh: extSize.materialCost.high,
      laborHoursLow: extSize.laborHours * 0.9,
      laborHoursHigh: extSize.laborHours * 1.1,
    });
    lineItems.push({
      label: "Paint & Materials",
      low: displayPrice(extSize.materialCost.low),
      high: displayPrice(extSize.materialCost.high),
    });
    lineItems.push({
      label: "Labor",
      low: output.customerPrice.low - displayPrice(extSize.materialCost.low),
      high: output.customerPrice.high - displayPrice(extSize.materialCost.high),
    });
    return { totalLow: output.customerPrice.low, totalHigh: output.customerPrice.high, lineItems };
  }

  const roomSize = COATING_CONFIG.interior.roomSizes[roomSizeId] ||
    COATING_CONFIG.interior.roomSizes["medium"];
  const paintGrade = COATING_CONFIG.paintGrade[gradeId] || COATING_CONFIG.paintGrade["premium"];
  const prep = COATING_CONFIG.prepWork[prepId] || COATING_CONFIG.prepWork["minimal"];

  const totalWallSqFt = roomSize.wallSqFt * roomCount;
  const coats = 2;
  const gallonsNeeded = (totalWallSqFt * coats) / paintGrade.coverageSqFt;
  const paintCostLow = gallonsNeeded * paintGrade.costPerGallon * 0.9;
  const paintCostHigh = gallonsNeeded * paintGrade.costPerGallon * 1.1;

  let laborHours = roomSize.laborHours * roomCount * prep.laborMultiplier;

  let ceilingAddOnCost = 0;
  if (toggles.includes("ceilings")) {
    laborHours *= COATING_CONFIG.interior.ceilingMultiplier;
    const ceilingSqFt = (totalWallSqFt / 4) * 0.6;
    ceilingAddOnCost = (ceilingSqFt * coats / paintGrade.coverageSqFt) * paintGrade.costPerGallon;
  }

  let prepAddOnCost = 0;
  if (prepId === "moderate") {
    prepAddOnCost = totalWallSqFt * 0.3;
  } else if (prepId === "heavy") {
    prepAddOnCost = totalWallSqFt * 0.6;
  }

  const addOnsCost = ceilingAddOnCost + prepAddOnCost;

  const output = calculateEstimatePricing({
    materialCostLow: paintCostLow,
    materialCostHigh: paintCostHigh,
    laborHoursLow: laborHours * 0.9,
    laborHoursHigh: laborHours * 1.1,
    addOnsCost,
  });

  const matLineLow = displayPrice(paintCostLow);
  const matLineHigh = displayPrice(paintCostHigh);
  lineItems.push({ label: "Paint & Materials", low: matLineLow, high: matLineHigh });

  let remainLow = output.customerPrice.low - matLineLow;
  let remainHigh = output.customerPrice.high - matLineHigh;

  if (prepAddOnCost > 0) {
    const pUp = displayPrice(prepAddOnCost);
    lineItems.push({ label: "Prep Work", low: pUp, high: pUp });
    remainLow -= pUp;
    remainHigh -= pUp;
  }
  if (ceilingAddOnCost > 0) {
    const cUp = displayPrice(ceilingAddOnCost);
    lineItems.push({ label: "Ceiling Upcharge", low: cUp, high: cUp });
    remainLow -= cUp;
    remainHigh -= cUp;
  }

  lineItems.splice(1, 0, {
    label: "Labor",
    low: Math.max(0, remainLow),
    high: Math.max(0, remainHigh),
  });

  return { totalLow: output.customerPrice.low, totalHigh: output.customerPrice.high, lineItems };
}

function computeFlooringEstimate(selections: StepSelections): ComputedEstimate {
  const floorId = (selections["flooring-type"] as string) || "lvp";
  const sizeId = (selections["area-size"] as string) || "medium";
  const subfloorId = (selections["subfloor"] as string) || "good";
  const existingId = (selections["existing-floor"] as string) || "bare";
  const transitionId = (selections["transitions"] as string) || "standard";

  const material = FLOORING_MATERIALS[floorId] || FLOORING_MATERIALS["lvp"];
  const size = FLOORING_SIZE_OPTIONS.find((s) => s.id === sizeId) || FLOORING_SIZE_OPTIONS[1];
  const sqFt = size.sqFt;

  const matCostLow = material.wholesaleCostPerSqFt.low * sqFt;
  const matCostHigh = material.wholesaleCostPerSqFt.high * sqFt;
  const baseHours = material.laborHoursPerSqFt * sqFt;

  let addOnsCost = 0;
  const lineItems: CustomerLineItem[] = [];

  let subfloorCost = 0;
  const subfloorOpt = FLOORING_ADDONS.subflooring[subfloorId];
  if (subfloorOpt) {
    const cpf = subfloorOpt.costPerSqFt;
    if (typeof cpf === "object") {
      subfloorCost = ((cpf.low + cpf.high) / 2) * sqFt;
    } else {
      subfloorCost = cpf * sqFt;
    }
    addOnsCost += subfloorCost;
  }

  let demoCost = 0;
  if (existingId === "remove") {
    const d = FLOORING_ADDONS.demoExisting.costPerSqFt;
    demoCost = ((d.low + d.high) / 2) * sqFt;
    addOnsCost += demoCost;
  }

  let transitionCost = 0;
  const transOpt = FLOORING_ADDONS.transitions[transitionId];
  if (transOpt) {
    const cpf = transOpt.costPerLF;
    if (typeof cpf === "object") {
      const estimatedLF = Math.sqrt(sqFt) * 2;
      transitionCost = ((cpf.low + cpf.high) / 2) * estimatedLF;
    }
    addOnsCost += transitionCost;
  }

  const output = calculateEstimatePricing({
    materialCostLow: matCostLow,
    materialCostHigh: matCostHigh,
    laborHoursLow: baseHours * 0.9,
    laborHoursHigh: baseHours * 1.15,
    addOnsCost,
  });

  const matLineLow = displayPrice(matCostLow);
  const matLineHigh = displayPrice(matCostHigh);
  lineItems.push({ label: "Flooring Material (installed)", low: matLineLow, high: matLineHigh });

  let remainLow = output.customerPrice.low - matLineLow;
  let remainHigh = output.customerPrice.high - matLineHigh;

  if (subfloorCost > 0) {
    const sUp = displayPrice(subfloorCost);
    lineItems.push({ label: "Subfloor Prep", low: sUp, high: sUp });
    remainLow -= sUp;
    remainHigh -= sUp;
  }
  if (demoCost > 0) {
    const dUp = displayPrice(demoCost);
    lineItems.push({ label: "Demo & Removal", low: dUp, high: dUp });
    remainLow -= dUp;
    remainHigh -= dUp;
  }
  if (transitionCost > 0) {
    const tUp = displayPrice(transitionCost);
    lineItems.push({ label: "Transitions & Trim", low: tUp, high: tUp });
    remainLow -= tUp;
    remainHigh -= tUp;
  }

  if (remainLow > 0 || remainHigh > 0) {
    lineItems.splice(1, 0, {
      label: "Installation Labor",
      low: Math.max(0, remainLow),
      high: Math.max(0, remainHigh),
    });
  }

  return { totalLow: output.customerPrice.low, totalHigh: output.customerPrice.high, lineItems };
}

function computeEstimate(
  service: ServiceConfig,
  selections: StepSelections
): ComputedEstimate {
  switch (service.id) {
    case "tile":
      return computeTileEstimate(selections);
    case "coating":
      return computeCoatingEstimate(selections);
    case "flooring":
      return computeFlooringEstimate(selections);
    default:
      return { totalLow: 0, totalHigh: 0, lineItems: [] };
  }
}

export function ServiceEstimator({ service }: ServiceEstimatorProps) {
  const [selections, setSelections] = useState<StepSelections>(() => {
    const init: StepSelections = {};
    for (const step of service.estimatorSteps) {
      const defaultOpt = step.options.find((o) => o.default);
      if (step.type === "counter") {
        init[step.id] = 1;
      } else if (step.type === "toggle") {
        init[step.id] = [];
      } else if (defaultOpt) {
        init[step.id] = defaultOpt.id;
      } else if (step.options[0]) {
        init[step.id] = step.options[0].id;
      }
    }
    return init;
  });

  const updateSelection = (stepId: string, value: string | number | string[]) => {
    setSelections((prev) => ({ ...prev, [stepId]: value }));
  };

  const toggleOption = (stepId: string, optionId: string) => {
    setSelections((prev) => {
      const current = (prev[stepId] as string[]) || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [stepId]: next };
    });
  };

  const estimate = useMemo(
    () => computeEstimate(service, selections),
    [service, selections]
  );

  return (
    <div className="min-h-screen bg-warm-light">
      {/* Header */}
      <div className="bg-navy py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href="/estimator"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Estimator
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {service.name} Estimator
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">{service.heroSubtitle}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" />
              4.8 · 120+ Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-gold" />
              Free Estimates, Always
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Steps */}
          <div className="space-y-6">
            {service.estimatorSteps.map((step) => (
              <StepRenderer
                key={step.id}
                step={step}
                value={selections[step.id]}
                onSelect={(v) => updateSelection(step.id, v)}
                onToggle={(id) => toggleOption(step.id, id)}
              />
            ))}
          </div>

          {/* Sticky estimate summary */}
          <div className="lg:sticky lg:top-20 self-start space-y-4">
            <div className="rounded-xl border border-warm-medium bg-white overflow-hidden">
              <div className="bg-navy p-4 text-center">
                <p className="text-sm text-white/70">Your estimated project cost</p>
                <p className="font-heading text-3xl font-bold text-white mt-1">
                  {formatCurrency(estimate.totalLow)} – {formatCurrency(estimate.totalHigh)}
                </p>
                <p className="text-sm text-gold mt-1">{service.name}</p>
              </div>

              {estimate.lineItems.length > 0 && (
                <div className="p-4 space-y-1 divide-y divide-warm-light">
                  {estimate.lineItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-1.5 text-sm"
                    >
                      <span className="text-dark/70">{item.label}</span>
                      <span className="font-medium text-dark">
                        {item.low === item.high
                          ? formatCurrency(item.low)
                          : `${formatCurrency(item.low)} – ${formatCurrency(item.high)}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-warm-medium bg-warm-light/50 p-4">
                <div className="flex items-start gap-2 text-xs text-dark/60">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <p>
                    This is an estimate to help you plan. Your final quote is based on
                    an in-home measurement and is always free. Actual costs may vary based
                    on layout complexity, material availability, and specific selections.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="gold" size="lg" asChild>
                <Link href="/contact">Schedule Free In-Home Estimate</Link>
              </Button>
              <Button variant="outlineGold" size="lg" asChild>
                <Link href={`/services/${service.id}`}>
                  Learn More About {service.name}
                </Link>
              </Button>
            </div>

            <TrustBadges className="pt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepRendererProps {
  step: EstimatorStep;
  value: string | number | string[] | undefined;
  onSelect: (v: string | number) => void;
  onToggle: (id: string) => void;
}

function StepRenderer({ step, value, onSelect, onToggle }: StepRendererProps) {
  return (
    <div className="rounded-xl border border-warm-medium bg-white p-6 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-navy">
        {step.title}
      </h3>
      <div className="mt-4">
        {step.type === "card-select" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {step.options.map((opt) => (
              <CardOption
                key={opt.id}
                option={opt}
                selected={value === opt.id}
                onSelect={() => onSelect(opt.id)}
              />
            ))}
          </div>
        )}
        {step.type === "size-select" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {step.options.map((opt) => (
              <CardOption
                key={opt.id}
                option={opt}
                selected={value === opt.id}
                onSelect={() => onSelect(opt.id)}
              />
            ))}
          </div>
        )}
        {step.type === "radio" && (
          <div className="space-y-2">
            {step.options.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors",
                  value === opt.id
                    ? "border-navy bg-navy/5"
                    : "border-warm-medium hover:border-navy/30"
                )}
              >
                <input
                  type="radio"
                  name={step.id}
                  checked={value === opt.id}
                  onChange={() => onSelect(opt.id)}
                  className="h-4 w-4 text-navy"
                />
                <div>
                  <span className="font-medium text-navy">{opt.label}</span>
                  {opt.sublabel && (
                    <p className="text-sm text-muted-foreground">
                      {opt.sublabel}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
        {step.type === "counter" && (
          <div className="flex flex-wrap gap-3">
            {step.options.map((opt) => {
              const numVal = parseInt(opt.priceModifier || "1", 10);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelect(numVal)}
                  className={cn(
                    "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors",
                    value === numVal
                      ? "border-navy bg-navy text-white"
                      : "border-warm-medium hover:border-navy/30"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
        {step.type === "toggle" && (
          <div className="space-y-2">
            {step.options.map((opt) => {
              const selected =
                Array.isArray(value) && value.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onToggle(opt.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border-2 p-3 text-left transition-colors",
                    selected
                      ? "border-navy bg-navy/5"
                      : "border-warm-medium hover:border-navy/30"
                  )}
                >
                  <div>
                    <span className="font-medium text-navy">{opt.label}</span>
                    {opt.sublabel && (
                      <p className="text-sm text-muted-foreground">
                        {opt.sublabel}
                      </p>
                    )}
                  </div>
                  <div
                    className={cn(
                      "h-5 w-5 rounded border-2",
                      selected
                        ? "border-navy bg-navy"
                        : "border-warm-medium"
                    )}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CardOption({
  option,
  selected,
  onSelect,
}: {
  option: EstimatorOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col rounded-lg border-2 p-4 text-left transition-colors",
        selected
          ? "border-navy bg-navy/5"
          : "border-warm-medium hover:border-navy/30"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-navy">{option.label}</span>
        {option.badge && (
          <Badge variant="gold" className="text-xs">
            {option.badge}
          </Badge>
        )}
      </div>
      {option.sublabel && (
        <p className="mt-1 text-sm text-muted-foreground">{option.sublabel}</p>
      )}
    </button>
  );
}
