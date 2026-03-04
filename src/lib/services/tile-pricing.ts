export const TILE_MATERIALS: Record<
  string,
  {
    name: string;
    type: string;
    wholesaleCostPerSqFt: { low: number; high: number };
    laborHoursPerSqFt: number;
  }
> = {
  "subway-ceramic": {
    name: "Subway Ceramic",
    type: "Ceramic",
    wholesaleCostPerSqFt: { low: 4, high: 8 },
    laborHoursPerSqFt: 0.2,
  },
  "large-format-porcelain": {
    name: "Large Format Porcelain",
    type: "Porcelain",
    wholesaleCostPerSqFt: { low: 6, high: 15 },
    laborHoursPerSqFt: 0.25,
  },
  "natural-stone": {
    name: "Natural Stone",
    type: "Stone",
    wholesaleCostPerSqFt: { low: 10, high: 25 },
    laborHoursPerSqFt: 0.3,
  },
  "mosaic-pattern": {
    name: "Mosaic / Pattern",
    type: "Mosaic",
    wholesaleCostPerSqFt: { low: 8, high: 20 },
    laborHoursPerSqFt: 0.35,
  },
  "penny-round": {
    name: "Penny Round",
    type: "Mosaic",
    wholesaleCostPerSqFt: { low: 7, high: 16 },
    laborHoursPerSqFt: 0.3,
  },
  hexagon: {
    name: "Hexagon",
    type: "Specialty",
    wholesaleCostPerSqFt: { low: 8, high: 18 },
    laborHoursPerSqFt: 0.3,
  },
};

export const TILE_ADDONS = {
  layoutPattern: {
    straight: { label: "Straight/Stack", costPerSqFt: 0 },
    "brick-offset": { label: "Brick/Offset", costPerSqFt: 1 },
    herringbone: { label: "Herringbone", costPerSqFt: 3 },
    diagonal: { label: "Diagonal", costPerSqFt: 2 },
    custom: { label: "Custom Pattern", costPerSqFt: 4 },
  } as Record<string, { label: string; costPerSqFt: number }>,
  demoExisting: { costPerSqFt: { low: 3, high: 6 } },
  groutAndSealant: { costPerSqFt: 1.5 },
};

export const TILE_SIZE_OPTIONS = [
  { id: "small", label: "Small", sublabel: "<30 sq ft", sqFt: 20 },
  { id: "medium", label: "Medium", sublabel: "30–60 sq ft", sqFt: 45 },
  { id: "large", label: "Large", sublabel: "60–100 sq ft", sqFt: 80 },
  { id: "xl", label: "Extra Large", sublabel: "100+ sq ft", sqFt: 120 },
];
