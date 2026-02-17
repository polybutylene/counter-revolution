"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  Wrench,
  Layers,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Repair categories & pricing                                        */
/* ------------------------------------------------------------------ */

const REPAIR_CATEGORIES = [
  {
    id: "chip-crack",
    label: "Chip & Crack Repair",
    icon: "💎",
    description: "Small chips, hairline cracks, corner chips, edge damage",
    examples: [
      "Small chip filling",
      "Crack repair & stabilization",
      "Corner & edge chip restoration",
      "Hairline crack sealing",
    ],
  },
  {
    id: "surface-restoration",
    label: "Surface Restoration",
    icon: "✨",
    description: "Scratches, stains, burn marks, etching, re-polishing",
    examples: [
      "Scratch removal & buffing",
      "Deep stain removal",
      "Heat/burn mark repair",
      "Etch mark removal",
      "Re-sealing stone surfaces",
    ],
  },
  {
    id: "structural",
    label: "Structural Repair",
    icon: "🔧",
    description: "Seam issues, broken slabs, leveling, sink re-support",
    examples: [
      "Seam re-joining & tightening",
      "Broken slab re-bonding",
      "Support reinforcement",
      "Sink cutout re-support",
      "Leveling & shimming",
    ],
  },
  {
    id: "refinishing",
    label: "Refinishing & Resurfacing",
    icon: "🎨",
    description: "Full resurfacing, color change, epoxy coating, re-laminating",
    examples: [
      "Full countertop resurfacing",
      "Epoxy coating/resurfacing",
      "Re-laminating (laminate tops)",
      "Honing & re-polishing",
    ],
  },
] as const;

type RepairCategoryId = (typeof REPAIR_CATEGORIES)[number]["id"];

const MATERIALS = [
  { id: "granite", label: "Granite", commonRepairs: "Chips, cracks, stain removal, re-sealing, polishing" },
  { id: "quartz", label: "Quartz", commonRepairs: "Chip filling, burn marks, seam repair" },
  { id: "marble", label: "Marble", commonRepairs: "Etch removal, honing, polishing, crack repair" },
  { id: "solid-surface", label: "Solid Surface (Corian)", commonRepairs: "Scratch buffing, burn repair, seamless patching" },
  { id: "laminate", label: "Laminate", commonRepairs: "Delamination, chip repair, seam lifting, resurfacing" },
  { id: "butcher-block", label: "Butcher Block", commonRepairs: "Sanding, re-oiling, stain removal, burn sanding" },
  { id: "concrete", label: "Concrete", commonRepairs: "Crack filling, re-sealing, stain removal, resurfacing" },
  { id: "not-sure", label: "Not Sure / Other", commonRepairs: "We'll identify your material on-site" },
] as const;

type MaterialId = (typeof MATERIALS)[number]["id"];

const DAMAGE_LEVELS = [
  {
    id: "minor",
    label: "Minor",
    description: "Small chip, light scratch, single stain, minor etch",
    icon: "🟢",
  },
  {
    id: "moderate",
    label: "Moderate",
    description: "Multiple chips, visible crack, several stains, seam gap",
    icon: "🟡",
  },
  {
    id: "significant",
    label: "Significant",
    description: "Large crack, structural issue, extensive staining, full resurface needed",
    icon: "🔴",
  },
] as const;

type DamageLevelId = (typeof DAMAGE_LEVELS)[number]["id"];

/*
  Pricing matrix: [repairCategory][damageLevel] → { low, high }
  Based on typical Bay County repair market rates.
*/
const PRICING: Record<
  RepairCategoryId,
  Record<DamageLevelId, { low: number; high: number }>
> = {
  "chip-crack": {
    minor: { low: 150, high: 275 },
    moderate: { low: 275, high: 450 },
    significant: { low: 450, high: 750 },
  },
  "surface-restoration": {
    minor: { low: 175, high: 300 },
    moderate: { low: 300, high: 500 },
    significant: { low: 500, high: 850 },
  },
  structural: {
    minor: { low: 250, high: 400 },
    moderate: { low: 400, high: 650 },
    significant: { low: 650, high: 1200 },
  },
  refinishing: {
    minor: { low: 300, high: 500 },
    moderate: { low: 500, high: 900 },
    significant: { low: 900, high: 1800 },
  },
};

/* Material multipliers — some materials cost more to repair */
const MATERIAL_MULTIPLIERS: Record<MaterialId, number> = {
  granite: 1.0,
  quartz: 1.05,
  marble: 1.15,
  "solid-surface": 0.9,
  laminate: 0.75,
  "butcher-block": 0.85,
  concrete: 1.0,
  "not-sure": 1.0,
};

/* Service call fee */
const SERVICE_CALL = { low: 75, high: 125 };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RepairEstimator() {
  const [step, setStep] = useState(1);
  const [repairCategory, setRepairCategory] = useState<RepairCategoryId | "">("");
  const [material, setMaterial] = useState<MaterialId | "">("");
  const [damageLevel, setDamageLevel] = useState<DamageLevelId | "">("");

  const totalSteps = 4;

  const estimate = useMemo(() => {
    if (!repairCategory || !material || !damageLevel) return null;

    const base = PRICING[repairCategory][damageLevel];
    const multiplier = MATERIAL_MULTIPLIERS[material];

    const repairLow = Math.round(base.low * multiplier);
    const repairHigh = Math.round(base.high * multiplier);

    const totalLow = repairLow + SERVICE_CALL.low;
    const totalHigh = repairHigh + SERVICE_CALL.high;

    return {
      low: Math.round(totalLow / 25) * 25,
      high: Math.round(totalHigh / 25) * 25,
      breakdown: {
        repair: { low: repairLow, high: repairHigh },
        serviceCall: SERVICE_CALL,
      },
    };
  }, [repairCategory, material, damageLevel]);

  const selectedCategory = REPAIR_CATEGORIES.find(
    (c) => c.id === repairCategory
  );
  const selectedMaterial = MATERIALS.find((m) => m.id === material);
  const selectedDamage = DAMAGE_LEVELS.find((d) => d.id === damageLevel);

  return (
    <div className="mx-auto max-w-xl">
      {/* Mini progress */}
      {step < 4 && (
        <div className="mb-6 flex items-center gap-2">
          {["Repair Type", "Material", "Damage", "Estimate"].map(
            (label, i) => (
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
                {i < 3 && (
                  <div className="hidden h-px w-4 bg-warm-medium sm:block" />
                )}
              </div>
            )
          )}
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
          {/* Step 1: Repair Category */}
          {step === 1 && (
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
                <Wrench className="h-5 w-5 text-gold" />
                What Type of Repair?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Select the category that best describes what your countertop
                needs.
              </p>
              <div className="mt-5 space-y-3">
                {REPAIR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setRepairCategory(cat.id);
                      setStep(2);
                    }}
                    className={cn(
                      "w-full rounded-xl border-2 p-4 text-left transition-all",
                      repairCategory === cat.id
                        ? "border-gold bg-gold/5 shadow-sm"
                        : "border-warm-medium hover:border-gold/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div className="flex-1">
                        <span className="font-heading font-semibold text-navy">
                          {cat.label}
                        </span>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {cat.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {cat.examples.slice(0, 3).map((ex) => (
                            <span
                              key={ex}
                              className="rounded-full bg-warm-light px-2.5 py-0.5 text-xs text-dark"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Material */}
          {step === 2 && (
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
                <Layers className="h-5 w-5 text-gold" />
                What Material Is Your Countertop?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Different materials require different repair techniques and
                products.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => {
                      setMaterial(mat.id);
                      setStep(3);
                    }}
                    className={cn(
                      "rounded-xl border-2 p-3 text-left transition-all",
                      material === mat.id
                        ? "border-gold bg-gold/5 shadow-sm"
                        : "border-warm-medium hover:border-gold/50"
                    )}
                  >
                    <span className="font-heading text-sm font-semibold text-navy">
                      {mat.label}
                    </span>
                    <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
                      {mat.commonRepairs}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Damage Level */}
          {step === 3 && (
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
                <AlertTriangle className="h-5 w-5 text-gold" />
                How Extensive Is the Damage?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This helps us estimate the scope of work involved.
              </p>
              <div className="mt-5 space-y-3">
                {DAMAGE_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => {
                      setDamageLevel(lvl.id);
                      setStep(4);
                    }}
                    className={cn(
                      "w-full rounded-xl border-2 p-4 text-left transition-all",
                      damageLevel === lvl.id
                        ? "border-gold bg-gold/5 shadow-sm"
                        : "border-warm-medium hover:border-gold/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{lvl.icon}</span>
                      <div>
                        <span className="font-heading font-semibold text-navy">
                          {lvl.label}
                        </span>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {lvl.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && estimate && (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-7 w-7 text-success" />
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold text-navy">
                Your Repair Estimate
              </h3>

              <div className="mt-4 rounded-2xl bg-warm-light p-6">
                <p className="text-3xl font-bold text-navy sm:text-4xl">
                  {formatCurrency(estimate.low)} —{" "}
                  {formatCurrency(estimate.high)}
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-white px-3 py-0.5 text-xs font-medium text-navy">
                    {selectedCategory?.label}
                  </span>
                  <span className="rounded-full bg-white px-3 py-0.5 text-xs font-medium text-navy">
                    {selectedMaterial?.label}
                  </span>
                  <span className="rounded-full bg-white px-3 py-0.5 text-xs font-medium text-navy">
                    {selectedDamage?.label} damage
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mx-auto mt-5 max-w-sm text-left">
                <h4 className="font-heading text-sm font-semibold text-navy">
                  Estimate Breakdown
                </h4>
                <ul className="mt-2 divide-y divide-warm-medium">
                  <li className="flex justify-between py-2 text-sm">
                    <span className="text-muted-foreground">
                      {selectedCategory?.label}
                    </span>
                    <span className="font-medium text-dark">
                      {formatCurrency(estimate.breakdown.repair.low)} —{" "}
                      {formatCurrency(estimate.breakdown.repair.high)}
                    </span>
                  </li>
                  <li className="flex justify-between py-2 text-sm">
                    <span className="text-muted-foreground">
                      Service Call / Assessment
                    </span>
                    <span className="font-medium text-dark">
                      {formatCurrency(estimate.breakdown.serviceCall.low)} —{" "}
                      {formatCurrency(estimate.breakdown.serviceCall.high)}
                    </span>
                  </li>
                  <li className="flex justify-between py-2 text-sm font-bold">
                    <span className="text-navy">Total Range</span>
                    <span className="text-navy">
                      {formatCurrency(estimate.low)} —{" "}
                      {formatCurrency(estimate.high)}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Savings callout */}
              <div className="mx-auto mt-5 max-w-sm rounded-xl border border-success/20 bg-success/5 p-4 text-left">
                <p className="text-sm font-semibold text-success">
                  Repair vs. Replace — Save Thousands
                </p>
                <p className="mt-1 text-xs text-dark/70">
                  A full countertop replacement typically costs $2,500–$8,000+.
                  Professional repair at{" "}
                  <strong className="text-dark">
                    {formatCurrency(estimate.low)}–
                    {formatCurrency(estimate.high)}
                  </strong>{" "}
                  can restore your countertop to like-new condition at a fraction
                  of the cost.
                </p>
              </div>

              <div className="mx-auto mt-4 flex max-w-sm items-start gap-2 rounded-lg bg-blue-50 p-3 text-left text-xs text-blue-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  This is a ballpark estimate. Actual cost depends on the
                  specific damage, accessibility, and repair technique required.
                  We provide free on-site assessments with exact pricing before
                  any work begins.
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="gold" size="lg" asChild>
                  <Link href="/contact">
                    Schedule Free Assessment{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
      {step > 1 && step < 4 && (
        <div className="mt-6 flex items-center justify-start">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      )}
      {step === 4 && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setStep(1);
              setRepairCategory("");
              setMaterial("");
              setDamageLevel("");
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Start Over
          </Button>
        </div>
      )}
    </div>
  );
}
