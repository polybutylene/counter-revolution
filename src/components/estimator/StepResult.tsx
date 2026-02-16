import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, Info } from "lucide-react";
import type { EstimateResult } from "@/types/estimator";

interface StepResultProps {
  result: EstimateResult;
  materialPreference: string;
}

export function StepResult({ result, materialPreference }: StepResultProps) {
  const breakdownItems = [
    { label: "Material + Fabrication + Install", low: result.breakdown.materialCost.low, high: result.breakdown.materialCost.high },
    { label: "Sink & Cooktop Cutouts", low: result.breakdown.cutouts.low, high: result.breakdown.cutouts.high },
    { label: "Edge Profile", low: result.breakdown.edgeProfile.low, high: result.breakdown.edgeProfile.high },
    { label: "Backsplash", low: result.breakdown.backsplash.low, high: result.breakdown.backsplash.high },
    { label: "Island", low: result.breakdown.island.low, high: result.breakdown.island.high },
  ].filter((item) => item.low > 0 || item.high > 0);

  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
        <CheckCircle className="h-8 w-8 text-success" />
      </div>
      <h2 className="mt-4 font-heading text-2xl font-bold text-navy">
        Your Estimated Range
      </h2>
      <div className="mt-4 rounded-2xl bg-warm-light p-8">
        <p className="text-4xl font-bold text-navy sm:text-5xl">
          {formatCurrency(result.low)} — {formatCurrency(result.high)}
        </p>
        <p className="mt-2 text-sm capitalize text-muted-foreground">
          Material: {materialPreference.replace("-", " ")}
        </p>
      </div>

      {/* Breakdown */}
      <div className="mx-auto mt-6 max-w-md text-left">
        <h3 className="font-heading text-sm font-semibold text-navy">Estimate Breakdown</h3>
        <ul className="mt-3 divide-y divide-warm-medium">
          {breakdownItems.map((item, i) => (
            <li key={i} className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-dark">
                {formatCurrency(item.low)} — {formatCurrency(item.high)}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between py-2 text-sm font-bold">
            <span className="text-navy">Total Range</span>
            <span className="text-navy">
              {formatCurrency(result.low)} — {formatCurrency(result.high)}
            </span>
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="mx-auto mt-6 flex max-w-md items-start gap-2 rounded-lg bg-blue-50 p-4 text-left text-xs text-blue-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          This is a ballpark estimate based on the information provided. Your final quote may vary
          based on actual measurements, material selection, and project specifics. A member of our
          team will contact you within 24 hours to discuss your project.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button variant="gold" size="xl" asChild>
          <Link href="/contact">Schedule Your Free In-Home Measurement</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/materials">Browse Materials While You Wait</Link>
        </Button>
      </div>
    </div>
  );
}
