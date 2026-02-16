"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonMaterial {
  id: string;
  name: string;
  durability: number;
  heatResistance: number;
  stainResistance: number;
  scratchResistance: number;
  maintenanceLevel: "Low" | "Medium" | "High";
  sealingRequired: boolean;
  sealingFrequency: string;
  priceRange: { low: number; high: number };
  bestFor: string[];
  gulfCoastSuitability: number;
  gulfCoastNote: string;
  lifespan: number;
}

const COMPARISON_DATA: ComparisonMaterial[] = [
  {
    id: "granite",
    name: "Granite",
    durability: 9,
    heatResistance: 10,
    stainResistance: 7,
    scratchResistance: 8,
    maintenanceLevel: "Medium",
    sealingRequired: true,
    sealingFrequency: "Every 1-2 years",
    priceRange: { low: 40, high: 80 },
    bestFor: ["Kitchens", "Outdoor Kitchens", "High-traffic areas"],
    gulfCoastSuitability: 9,
    gulfCoastNote: "Excellent for Florida. Seal annually for outdoor use.",
    lifespan: 100,
  },
  {
    id: "quartz",
    name: "Quartz",
    durability: 9,
    heatResistance: 6,
    stainResistance: 10,
    scratchResistance: 9,
    maintenanceLevel: "Low",
    sealingRequired: false,
    sealingFrequency: "N/A",
    priceRange: { low: 50, high: 100 },
    bestFor: ["Kitchens", "Bathrooms", "Commercial"],
    gulfCoastSuitability: 8,
    gulfCoastNote: "Great indoors. Avoid direct outdoor sun (UV can discolor).",
    lifespan: 50,
  },
  {
    id: "marble",
    name: "Marble",
    durability: 6,
    heatResistance: 8,
    stainResistance: 5,
    scratchResistance: 5,
    maintenanceLevel: "High",
    sealingRequired: true,
    sealingFrequency: "Every 6-12 months",
    priceRange: { low: 60, high: 120 },
    bestFor: ["Bathrooms", "Islands", "Statement pieces"],
    gulfCoastSuitability: 7,
    gulfCoastNote: "Works indoors. Not recommended for outdoor/uncovered use.",
    lifespan: 100,
  },
  {
    id: "quartzite",
    name: "Quartzite",
    durability: 9,
    heatResistance: 10,
    stainResistance: 8,
    scratchResistance: 9,
    maintenanceLevel: "Medium",
    sealingRequired: true,
    sealingFrequency: "Every 1-2 years",
    priceRange: { low: 55, high: 110 },
    bestFor: ["Kitchens", "Outdoor Kitchens", "Bathrooms"],
    gulfCoastSuitability: 10,
    gulfCoastNote: "Outstanding for Florida. Ideal for indoor and outdoor.",
    lifespan: 100,
  },
];

const RATING_ATTRIBUTES = [
  { key: "durability", label: "Durability" },
  { key: "heatResistance", label: "Heat Resistance" },
  { key: "stainResistance", label: "Stain Resistance" },
  { key: "scratchResistance", label: "Scratch Resistance" },
  { key: "gulfCoastSuitability", label: "Gulf Coast Suitability" },
] as const;

function RatingBar({ value }: { value: number }) {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-warm-medium">
      <div
        className="bg-gold transition-all duration-300"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
  );
}

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(["granite", "quartz"]);

  const toggleMaterial = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev;
        return prev.filter((m) => m !== id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const displayedMaterials = COMPARISON_DATA.filter((m) =>
    selected.includes(m.id)
  );

  // Find winners for each rating attribute
  const getWinners = (key: keyof ComparisonMaterial) => {
    const values = displayedMaterials.map((m) => ({
      id: m.id,
      value: m[key] as number,
    }));
    const max = Math.max(...values.map((v) => v.value));
    return values.filter((v) => v.value === max).map((v) => v.id);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Tool"
            title="Compare Countertop Materials"
            description="Select 2–3 materials to compare side by side. See durability, maintenance, pricing, and Gulf Coast suitability at a glance."
          />

          {/* Material selection */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {COMPARISON_DATA.map((material) => (
              <button
                key={material.id}
                onClick={() => toggleMaterial(material.id)}
                className={cn(
                  "rounded-lg border-2 px-4 py-2 font-heading text-sm font-semibold transition-all",
                  selected.includes(material.id)
                    ? "border-gold bg-gold text-navy"
                    : "border-warm-medium bg-white text-dark hover:border-gold/50"
                )}
              >
                {material.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Select 2–3 materials to compare
          </p>

          {/* Comparison table */}
          {displayedMaterials.length >= 2 && (
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-warm-medium">
                    <th className="pb-4 pr-4 text-left font-heading text-sm font-semibold text-navy">
                      Attribute
                    </th>
                    {displayedMaterials.map((m) => (
                      <th
                        key={m.id}
                        className="pb-4 px-4 text-center font-heading text-base font-semibold text-navy"
                      >
                        {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {RATING_ATTRIBUTES.map(({ key, label }) => {
                    const winners = getWinners(key);
                    return (
                      <tr
                        key={key}
                        className="border-b border-warm-medium last:border-0"
                      >
                        <td className="py-4 pr-4 font-medium text-dark">
                          {label}
                        </td>
                        {displayedMaterials.map((m) => {
                          const value = m[key as keyof ComparisonMaterial] as number;
                          const isWinner = winners.includes(m.id);
                          return (
                            <td key={m.id} className="py-4 px-4">
                              <div className="flex flex-col items-center gap-2">
                                {isWinner && (
                                  <Star className="h-4 w-4 fill-gold text-gold" />
                                )}
                                <div className="w-full max-w-[120px]">
                                  <RatingBar value={value} />
                                </div>
                                <span className="text-muted-foreground">
                                  {value}/10
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Maintenance Level */}
                  <tr className="border-b border-warm-medium">
                    <td className="py-4 pr-4 font-medium text-dark">
                      Maintenance Level
                    </td>
                    {displayedMaterials.map((m) => (
                      <td key={m.id} className="py-4 px-4 text-center">
                        <Badge
                          variant={
                            m.maintenanceLevel === "Low"
                              ? "success"
                              : m.maintenanceLevel === "Medium"
                                ? "gold"
                                : "secondary"
                          }
                        >
                          {m.maintenanceLevel}
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Sealing Required */}
                  <tr className="border-b border-warm-medium">
                    <td className="py-4 pr-4 font-medium text-dark">
                      Sealing Required
                    </td>
                    {displayedMaterials.map((m) => (
                      <td key={m.id} className="py-4 px-4 text-center">
                        {m.sealingRequired ? (
                          <span className="flex items-center justify-center gap-1 text-amber-600">
                            <Check className="h-4 w-4" />
                            {m.sealingFrequency}
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1 text-success">
                            <X className="h-4 w-4" />
                            No
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Price Range */}
                  <tr className="border-b border-warm-medium">
                    <td className="py-4 pr-4 font-medium text-dark">
                      Price Range (per LF)
                    </td>
                    {displayedMaterials.map((m) => (
                      <td key={m.id} className="py-4 px-4 text-center">
                        ${m.priceRange.low}–${m.priceRange.high}
                      </td>
                    ))}
                  </tr>

                  {/* Lifespan */}
                  <tr className="border-b border-warm-medium">
                    <td className="py-4 pr-4 font-medium text-dark">
                      Lifespan (years)
                    </td>
                    {displayedMaterials.map((m) => (
                      <td key={m.id} className="py-4 px-4 text-center">
                        {m.lifespan}+
                      </td>
                    ))}
                  </tr>

                  {/* Best For */}
                  <tr className="border-b border-warm-medium">
                    <td className="py-4 pr-4 font-medium text-dark">
                      Best For
                    </td>
                    {displayedMaterials.map((m) => (
                      <td key={m.id} className="py-4 px-4">
                        <ul className="space-y-1 text-center text-muted-foreground">
                          {m.bestFor.map((use, i) => (
                            <li key={i}>{use}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Gulf Coast Note */}
                  <tr>
                    <td className="py-4 pr-4 font-medium text-dark">
                      Gulf Coast Note
                    </td>
                    {displayedMaterials.map((m) => (
                      <td key={m.id} className="py-4 px-4 text-sm text-muted-foreground">
                        {m.gulfCoastNote}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {displayedMaterials.length < 2 && (
            <p className="mt-12 text-center text-muted-foreground">
              Select at least 2 materials to see the comparison.
            </p>
          )}
        </div>
      </section>

      <CTABanner
        headline="Ready to Choose Your Material?"
        description="Get a free estimate and expert guidance. We'll help you select the perfect stone for your Bay County project."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
