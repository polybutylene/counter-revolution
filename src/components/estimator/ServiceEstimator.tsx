"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadges } from "@/components/showroom/shared/TrustBadges";
import { formatCurrency } from "@/lib/utils";
import type { ServiceConfig, EstimatorStep, EstimatorOption } from "@/data/services/config";
import { cn } from "@/lib/utils";

interface ServiceEstimatorProps {
  service: ServiceConfig;
}

type StepSelections = Record<string, string | number | string[]>;

/** Parse price modifier like "$6-12" or "225" into min/max values */
function parsePriceModifier(mod: string | undefined): { min: number; max: number } | null {
  if (!mod) return null;
  const m = mod.trim();
  if (/^\d+$/.test(m)) {
    const n = parseInt(m, 10);
    return { min: n, max: n };
  }
  const rangeMatch = m.match(/\$?([\d.]+)\s*[-–]\s*\$?([\d.]+)/);
  if (rangeMatch) {
    return { min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
  }
  const singleMatch = m.match(/\$?([\d.]+)/);
  if (singleMatch) return { min: parseFloat(singleMatch[1]), max: parseFloat(singleMatch[1]) };
  return null;
}

/** Parse add-on like "+30%" or "+$2-4/LF" */
function parseAddOn(mod: string | undefined): { pct?: number; perSqFt?: [number, number]; perLf?: [number, number] } | null {
  if (!mod) return null;
  const m = mod.trim();
  const pctMatch = m.match(/\+(\d+)%?/);
  if (pctMatch) return { pct: parseInt(pctMatch[1], 10) };
  const sqftMatch = m.match(/\+\$?([\d.]+)\s*[-–]\s*\$?([\d.]+)\/sq\s*ft/i);
  if (sqftMatch) return { perSqFt: [parseFloat(sqftMatch[1]), parseFloat(sqftMatch[2])] };
  const lfMatch = m.match(/\+\$?([\d.]+)\s*[-–]\s*\$?([\d.]+)\/L?F/i);
  if (lfMatch) return { perLf: [parseFloat(lfMatch[1]), parseFloat(lfMatch[2])] };
  return null;
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

  const estimate = useMemo(() => {
    let sqFt = 150;
    let roomCount = 1;
    let pricePerSqFtMin = 5;
    let pricePerSqFtMax = 15;
    let addOnMin = 0;
    let addOnMax = 0;

    for (const step of service.estimatorSteps) {
      const val = selections[step.id];
      if (val === undefined || val === null) continue;

      if (step.type === "size-select") {
        const parsed = parsePriceModifier(
          step.options.find((o) => o.id === val)?.priceModifier
        );
        if (parsed) sqFt = (parsed.min + parsed.max) / 2;
      } else if (step.type === "counter" && typeof val === "number") {
        roomCount = val;
      } else if (step.type === "card-select" && typeof val === "string") {
        const opt = step.options.find((o) => o.id === val);
        const mod = opt?.priceModifier;
        if (mod && !mod.startsWith("+")) {
          const parsed = parsePriceModifier(mod);
          if (parsed && parsed.max < 100) {
            pricePerSqFtMin = parsed.min;
            pricePerSqFtMax = parsed.max;
          }
        }
        const addOn = parseAddOn(mod);
        if (addOn?.perSqFt) {
          const totalSqFt = sqFt * roomCount;
          addOnMin += addOn.perSqFt[0] * totalSqFt;
          addOnMax += addOn.perSqFt[1] * totalSqFt;
        }
      } else if (step.type === "toggle" && Array.isArray(val)) {
        for (const id of val) {
          const opt = step.options.find((o) => o.id === id);
          const addOn = parseAddOn(opt?.priceModifier);
          if (addOn?.pct) {
            const totalSqFt = sqFt * roomCount;
            const base = ((pricePerSqFtMin + pricePerSqFtMax) / 2) * totalSqFt;
            addOnMin += (base * addOn.pct) / 100;
            addOnMax += (base * addOn.pct) / 100;
          }
        }
      }
    }

    const totalSqFt = sqFt * roomCount;
    const baseMin = pricePerSqFtMin * totalSqFt;
    const baseMax = pricePerSqFtMax * totalSqFt;
    return {
      min: Math.round(baseMin + addOnMin),
      max: Math.round(baseMax + addOnMax),
    };
  }, [service.estimatorSteps, selections]);

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
          <p className="mt-2 text-sm font-semibold text-gold">{service.priceRange}</p>
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

      {/* Estimator form + summary */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="space-y-8">
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

        {/* Estimate summary */}
        <div className="mt-10 rounded-xl border border-warm-medium bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-navy" />
            <h2 className="font-heading text-xl font-bold text-navy">Your Estimate</h2>
          </div>
          <p className="mt-4 text-3xl font-bold text-gold">
            {formatCurrency(estimate.min)} – {formatCurrency(estimate.max)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a ballpark range based on your selections. Get an exact quote with our free
            in-home estimate.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="gold" size="lg" asChild>
              <Link href="/showroom">Schedule Free In-Home Estimate</Link>
            </Button>
            <Button variant="outlineGold" size="lg" asChild>
              <Link href={`/services/${service.id}`}>Learn More About {service.name}</Link>
            </Button>
          </div>
        </div>

        <TrustBadges className="mt-8" />
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
      <h3 className="font-heading text-lg font-semibold text-navy">{step.title}</h3>
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
                  value === opt.id ? "border-navy bg-navy/5" : "border-warm-medium hover:border-navy/30"
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
                    <p className="text-sm text-muted-foreground">{opt.sublabel}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
        {step.type === "counter" && (
          <div className="flex flex-wrap gap-3">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelect(parseInt(opt.priceModifier || "1", 10))}
                className={cn(
                  "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors",
                  value === parseInt(opt.priceModifier || "1", 10)
                    ? "border-navy bg-navy text-white"
                    : "border-warm-medium hover:border-navy/30"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
        {step.type === "toggle" && (
          <div className="space-y-2">
            {step.options.map((opt) => {
              const selected = Array.isArray(value) && value.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onToggle(opt.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border-2 p-3 text-left transition-colors",
                    selected ? "border-navy bg-navy/5" : "border-warm-medium hover:border-navy/30"
                  )}
                >
                  <div>
                    <span className="font-medium text-navy">{opt.label}</span>
                    {opt.sublabel && (
                      <p className="text-sm text-muted-foreground">{opt.sublabel}</p>
                    )}
                  </div>
                  <div
                    className={cn(
                      "h-5 w-5 rounded border-2",
                      selected ? "border-navy bg-navy" : "border-warm-medium"
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
        selected ? "border-navy bg-navy/5" : "border-warm-medium hover:border-navy/30"
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
