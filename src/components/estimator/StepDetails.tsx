"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface StepDetailsProps {
  linearFootage: number;
  sinkCutouts: number;
  cooktopCutouts: number;
  includeBacksplash: boolean;
  backsplashHeight?: string;
  includeIsland: boolean;
  islandSize?: string;
  onChange: (field: string, value: number | boolean | string) => void;
}

export function StepDetails({
  linearFootage, sinkCutouts, cooktopCutouts,
  includeBacksplash, backsplashHeight,
  includeIsland, islandSize,
  onChange,
}: StepDetailsProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy">
        Tell us about your countertops
      </h2>
      <p className="mt-2 text-muted-foreground">
        Don&apos;t worry about exact measurements — a rough estimate is fine.
      </p>
      <div className="mt-6 space-y-6">
        {/* Linear Footage */}
        <div>
          <label className="block text-sm font-medium text-dark">
            Approximate Linear Footage
          </label>
          <p className="text-xs text-muted-foreground">
            Measure along the wall where countertops go. Average kitchen is 20-35 LF.
          </p>
          <div className="mt-2 flex items-center gap-4">
            <Input
              type="number"
              min={1}
              max={200}
              value={linearFootage || ""}
              onChange={(e) => onChange("linearFootage", Number(e.target.value))}
              placeholder="25"
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">linear feet</span>
          </div>
        </div>

        {/* Sink Cutouts */}
        <div>
          <label className="block text-sm font-medium text-dark">Sink Cutouts</label>
          <div className="mt-2 flex gap-2">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange("sinkCutouts", n)}
                className={cn(
                  "flex h-11 w-14 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                  sinkCutouts === n ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                )}
              >
                {n === 3 ? "3+" : n}
              </button>
            ))}
          </div>
        </div>

        {/* Cooktop Cutouts */}
        <div>
          <label className="block text-sm font-medium text-dark">Cooktop Cutouts</label>
          <div className="mt-2 flex gap-2">
            {[0, 1].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange("cooktopCutouts", n)}
                className={cn(
                  "flex h-11 w-14 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                  cooktopCutouts === n ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Backsplash */}
        <div>
          <label className="block text-sm font-medium text-dark">Include Backsplash?</label>
          <div className="mt-2 flex gap-2">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onChange("includeBacksplash", opt.value)}
                className={cn(
                  "flex h-11 px-6 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                  includeBacksplash === opt.value ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {includeBacksplash && (
            <div className="mt-3 flex gap-2">
              {[
                { value: "4-inch", label: '4" Standard' },
                { value: "full", label: "Full Height" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange("backsplashHeight", opt.value)}
                  className={cn(
                    "flex h-11 px-4 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                    backsplashHeight === opt.value ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Island */}
        <div>
          <label className="block text-sm font-medium text-dark">Include an Island?</label>
          <div className="mt-2 flex gap-2">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onChange("includeIsland", opt.value)}
                className={cn(
                  "flex h-11 px-6 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                  includeIsland === opt.value ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {includeIsland && (
            <div className="mt-3 flex gap-2">
              {[
                { value: "small", label: "Small (~4ft)" },
                { value: "medium", label: "Medium (~6ft)" },
                { value: "large", label: "Large (~8ft+)" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange("islandSize", opt.value)}
                  className={cn(
                    "flex h-11 px-4 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                    islandSize === opt.value ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
