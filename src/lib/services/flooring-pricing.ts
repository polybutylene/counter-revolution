export const FLOORING_MATERIALS: Record<
  string,
  {
    name: string;
    type: string;
    wholesaleCostPerSqFt: { low: number; high: number };
    laborHoursPerSqFt: number;
  }
> = {
  lvp: {
    name: "Luxury Vinyl Plank",
    type: "LVP",
    wholesaleCostPerSqFt: { low: 2.5, high: 6 },
    laborHoursPerSqFt: 0.06,
  },
  hardwood: {
    name: "Hardwood",
    type: "Hardwood",
    wholesaleCostPerSqFt: { low: 5, high: 10 },
    laborHoursPerSqFt: 0.08,
  },
  laminate: {
    name: "Laminate",
    type: "Laminate",
    wholesaleCostPerSqFt: { low: 2, high: 5 },
    laborHoursPerSqFt: 0.05,
  },
  "porcelain-tile": {
    name: "Porcelain Tile",
    type: "Tile",
    wholesaleCostPerSqFt: { low: 6, high: 15 },
    laborHoursPerSqFt: 0.12,
  },
  epoxy: {
    name: "Epoxy",
    type: "Epoxy",
    wholesaleCostPerSqFt: { low: 3, high: 8 },
    laborHoursPerSqFt: 0.08,
  },
  carpet: {
    name: "Carpet",
    type: "Carpet",
    wholesaleCostPerSqFt: { low: 2, high: 5 },
    laborHoursPerSqFt: 0.04,
  },
};

export const FLOORING_ADDONS = {
  subflooring: {
    good: { label: "Good condition", costPerSqFt: 0 },
    "needs-leveling": { label: "Needs leveling", costPerSqFt: { low: 0.75, high: 1.5 } },
    "needs-repair": { label: "Needs repair", costPerSqFt: { low: 1.5, high: 3 } },
  } as Record<string, { label: string; costPerSqFt: number | { low: number; high: number } }>,
  demoExisting: { costPerSqFt: { low: 0.75, high: 2 } },
  transitions: {
    standard: { label: "Standard transitions", costPerLF: 0 },
    upgraded: { label: "Upgraded trim", costPerLF: { low: 1.5, high: 3 } },
  } as Record<string, { label: string; costPerLF: number | { low: number; high: number } }>,
  stairTreads: { costEach: { low: 30, high: 60 } },
};

export const FLOORING_SIZE_OPTIONS = [
  { id: "small", label: "Small Room", sublabel: "<150 sq ft", sqFt: 120 },
  { id: "medium", label: "Medium Room", sublabel: "150–300 sq ft", sqFt: 225 },
  { id: "large", label: "Large/Open Plan", sublabel: "300–600 sq ft", sqFt: 450 },
  { id: "whole-home", label: "Whole Home", sublabel: "600+ sq ft", sqFt: 900 },
];
