"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  Ruler,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Pricing data                                                       */
/* ------------------------------------------------------------------ */

const BACKSPLASH_MATERIALS = [
  {
    id: "matching-granite",
    label: "Matching Granite",
    description: "Same slab as your countertop for a seamless look",
    fourInch: { low: 12, high: 20 },
    fullHeight: { low: 30, high: 50 },
  },
  {
    id: "matching-quartz",
    label: "Matching Quartz",
    description: "Consistent engineered stone, clean and uniform",
    fourInch: { low: 15, high: 25 },
    fullHeight: { low: 35, high: 55 },
  },
  {
    id: "matching-marble",
    label: "Matching Marble",
    description: "Elegant veined marble for a luxury finish",
    fourInch: { low: 18, high: 30 },
    fullHeight: { low: 40, high: 65 },
  },
  {
    id: "matching-quartzite",
    label: "Matching Quartzite",
    description: "Natural stone beauty with exceptional durability",
    fourInch: { low: 16, high: 28 },
    fullHeight: { low: 38, high: 60 },
  },
  {
    id: "not-sure",
    label: "Not Sure Yet",
    description: "We'll help you choose during your consultation",
    fourInch: { low: 12, high: 25 },
    fullHeight: { low: 30, high: 55 },
  },
] as const;

type BacksplashHeight = "4-inch" | "full-height";
type MaterialId = (typeof BACKSPLASH_MATERIALS)[number]["id"];

const OUTLET_PRICING = { low: 25, high: 50 };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BacksplashEstimator() {
  const [step, setStep] = useState(1);
  const [linearFeet, setLinearFeet] = useState(0);
  const [height, setHeight] = useState<BacksplashHeight | "">("");
  const [material, setMaterial] = useState<MaterialId | "">("");
  const [outletCutouts, setOutletCutouts] = useState(2);
  const [windowReturns, setWindowReturns] = useState(0);

  const totalSteps = 3;

  const selectedMaterial = BACKSPLASH_MATERIALS.find((m) => m.id === material);

  const estimate = useMemo(() => {
    if (!linearFeet || !height || !selectedMaterial) return null;

    const rate =
      height === "4-inch"
        ? selectedMaterial.fourInch
        : selectedMaterial.fullHeight;

    const baseLow = linearFeet * rate.low;
    const baseHigh = linearFeet * rate.high;

    const outletLow = outletCutouts * OUTLET_PRICING.low;
    const outletHigh = outletCutouts * OUTLET_PRICING.high;

    const windowAdder = windowReturns * 75;

    return {
      low: Math.round((baseLow + outletLow + windowAdder) / 50) * 50,
      high: Math.round((baseHigh + outletHigh + windowAdder) / 50) * 50,
      breakdown: {
        material: { low: baseLow, high: baseHigh },
        outlets: { low: outletLow, high: outletHigh },
        windowReturns: { low: windowAdder, high: windowAdder },
      },
    };
  }, [linearFeet, height, selectedMaterial, outletCutouts, windowReturns]);

  const canGoNext = (): boolean => {
    switch (step) {
      case 1:
        return linearFeet >= 1 && !!height;
      case 2:
        return !!material;
      default:
        return true;
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      {/* Mini progress */}
      {step < 3 && (
        <div className="mb-6 flex items-center gap-3">
          {["Measurements", "Material", "Estimate"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  i + 1 < step && "bg-success text-white",
                  i + 1 === step && "bg-gold text-navy",
                  i + 1 > step && "bg-warm-medium text-muted-foreground"
                )}
              >
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-xs sm:block",
                  i + 1 <= step
                    ? "font-semibold text-navy"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
              {i < 2 && (
                <div className="hidden h-px w-6 bg-warm-medium sm:block" />
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 1: Measurements */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
                  <Ruler className="h-5 w-5 text-gold" />
                  Backsplash Measurements
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Measure along the wall behind your countertops. A rough
                  estimate works fine.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark">
                  Linear Feet of Backsplash
                </label>
                <p className="text-xs text-muted-foreground">
                  Average kitchen backsplash is 15-30 linear feet.
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <Input
                    type="number"
                    min={1}
                    max={200}
                    value={linearFeet || ""}
                    onChange={(e) => setLinearFeet(Number(e.target.value))}
                    placeholder="20"
                    className="w-28"
                  />
                  <span className="text-sm text-muted-foreground">
                    linear feet
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark">
                  Backsplash Height
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {[
                    {
                      value: "4-inch" as const,
                      label: '4" Standard',
                      desc: "Most common — clean, classic look",
                    },
                    {
                      value: "full-height" as const,
                      label: "Full Height",
                      desc: "Counter to cabinets — dramatic impact",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setHeight(opt.value)}
                      className={cn(
                        "rounded-xl border-2 p-4 text-left transition-all",
                        height === opt.value
                          ? "border-gold bg-gold/5 shadow-sm"
                          : "border-warm-medium hover:border-gold/50"
                      )}
                    >
                      <span className="block text-sm font-semibold text-navy">
                        {opt.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark">
                  Outlet Cutouts
                </label>
                <div className="mt-2 flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setOutletCutouts(n)}
                      className={cn(
                        "flex h-11 w-12 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                        outletCutouts === n
                          ? "border-gold bg-gold/5 text-navy"
                          : "border-warm-medium text-dark hover:border-gold/50"
                      )}
                    >
                      {n === 5 ? "5+" : n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark">
                  Window Returns
                </label>
                <p className="text-xs text-muted-foreground">
                  Side pieces that wrap around windows in the backsplash area.
                </p>
                <div className="mt-2 flex gap-2">
                  {[0, 1, 2].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setWindowReturns(n)}
                      className={cn(
                        "flex h-11 w-14 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                        windowReturns === n
                          ? "border-gold bg-gold/5 text-navy"
                          : "border-warm-medium text-dark hover:border-gold/50"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Material */}
          {step === 2 && (
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
                <Layers className="h-5 w-5 text-gold" />
                Backsplash Material
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Select a material. Matching your countertop gives the most
                seamless look.
              </p>
              <div className="mt-5 space-y-3">
                {BACKSPLASH_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => {
                      setMaterial(mat.id);
                      setStep(3);
                    }}
                    className={cn(
                      "w-full rounded-xl border-2 p-4 text-left transition-all",
                      material === mat.id
                        ? "border-gold bg-gold/5 shadow-sm"
                        : "border-warm-medium hover:border-gold/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-navy">
                        {mat.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        from ${mat.fourInch.low}/LF
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {mat.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && estimate && (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-7 w-7 text-success" />
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold text-navy">
                Your Backsplash Estimate
              </h3>

              <div className="mt-4 rounded-2xl bg-warm-light p-6">
                <p className="text-3xl font-bold text-navy sm:text-4xl">
                  {formatCurrency(estimate.low)} —{" "}
                  {formatCurrency(estimate.high)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {linearFeet} LF &middot;{" "}
                  {height === "4-inch" ? '4" standard' : "Full height"}{" "}
                  &middot;{" "}
                  {selectedMaterial?.label}
                </p>
              </div>

              {/* Breakdown */}
              <div className="mx-auto mt-5 max-w-sm text-left">
                <h4 className="font-heading text-sm font-semibold text-navy">
                  Estimate Breakdown
                </h4>
                <ul className="mt-2 divide-y divide-warm-medium">
                  {[
                    {
                      label: "Material + Fabrication + Install",
                      ...estimate.breakdown.material,
                    },
                    estimate.breakdown.outlets.low > 0 && {
                      label: `Outlet Cutouts (${outletCutouts})`,
                      ...estimate.breakdown.outlets,
                    },
                    estimate.breakdown.windowReturns.low > 0 && {
                      label: `Window Returns (${windowReturns})`,
                      ...estimate.breakdown.windowReturns,
                    },
                  ]
                    .filter(Boolean)
                    .map((item, i) => {
                      const { label, low, high } = item as {
                        label: string;
                        low: number;
                        high: number;
                      };
                      return (
                        <li
                          key={i}
                          className="flex justify-between py-2 text-sm"
                        >
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium text-dark">
                            {formatCurrency(low)}
                            {low !== high && ` — ${formatCurrency(high)}`}
                          </span>
                        </li>
                      );
                    })}
                  <li className="flex justify-between py-2 text-sm font-bold">
                    <span className="text-navy">Total Range</span>
                    <span className="text-navy">
                      {formatCurrency(estimate.low)} —{" "}
                      {formatCurrency(estimate.high)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mx-auto mt-5 flex max-w-sm items-start gap-2 rounded-lg bg-blue-50 p-3 text-left text-xs text-blue-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  This is a ballpark estimate. Final pricing depends on actual
                  measurements, material selection, and job-site conditions. A
                  member of our team will be happy to provide a detailed quote.
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="gold" size="lg" asChild>
                  <Link href="/contact">
                    Get an Exact Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/estimate">Full Countertop Estimator</Link>
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step > 1 && step < 3 && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            type="button"
            variant="gold"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canGoNext()}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      {step === 1 && (
        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="gold"
            onClick={() => setStep(2)}
            disabled={!canGoNext()}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep(1)}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Start Over
          </Button>
        </div>
      )}
    </div>
  );
}
