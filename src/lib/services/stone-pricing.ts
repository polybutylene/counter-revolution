export const STONE_MATERIALS: Record<
  string,
  {
    name: string;
    type: string;
    wholesaleCostPerSqFt: { low: number; high: number };
    laborHoursPerSqFt: number;
  }
> = {
  "white-ice-granite": {
    name: "White Ice Granite",
    type: "Granite",
    wholesaleCostPerSqFt: { low: 25, high: 38 },
    laborHoursPerSqFt: 0.35,
  },
  "alaska-white-granite": {
    name: "Alaska White Granite",
    type: "Granite",
    wholesaleCostPerSqFt: { low: 22, high: 34 },
    laborHoursPerSqFt: 0.35,
  },
  "steel-gray-granite": {
    name: "Steel Gray Granite",
    type: "Granite",
    wholesaleCostPerSqFt: { low: 24, high: 36 },
    laborHoursPerSqFt: 0.35,
  },
  "calacatta-quartz": {
    name: "Calacatta Quartz",
    type: "Quartz",
    wholesaleCostPerSqFt: { low: 35, high: 50 },
    laborHoursPerSqFt: 0.3,
  },
  "carrara-marble": {
    name: "Carrara Marble",
    type: "Marble",
    wholesaleCostPerSqFt: { low: 28, high: 42 },
    laborHoursPerSqFt: 0.4,
  },
  "midnight-black-granite": {
    name: "Midnight Black Granite",
    type: "Granite",
    wholesaleCostPerSqFt: { low: 25, high: 38 },
    laborHoursPerSqFt: 0.35,
  },
  "calacatta-laza-quartz": {
    name: "Calacatta Laza Quartz",
    type: "Quartz",
    wholesaleCostPerSqFt: { low: 55, high: 80 },
    laborHoursPerSqFt: 0.3,
  },
  "emperador-marble": {
    name: "Emperador Marble",
    type: "Marble",
    wholesaleCostPerSqFt: { low: 38, high: 55 },
    laborHoursPerSqFt: 0.4,
  },
};

export const STONE_ADDONS = {
  edgeProfiles: {
    "full-bullnose": { label: "Full Bullnose", costPerLF: 8 },
    bullnose: { label: "Full Bullnose", costPerLF: 8 },
    "half-bullnose": { label: "Half Bullnose", costPerLF: 6 },
    ogee: { label: "Ogee", costPerLF: 10 },
    waterfall: { label: "Waterfall", costPerLF: 18 },
  } as Record<string, { label: string; costPerLF: number }>,
  sinkCutout: {
    undermount: { label: "Undermount", cost: 150 },
    dropin: { label: "Drop-in", cost: 100 },
    farmhouse: { label: "Farmhouse/Apron", cost: 200 },
  } as Record<string, { label: string; cost: number }>,
  cooktopCutout: { cost: 180 },
  backsplash4Inch: { costPerLF: 15 },
  backsplashFull: { costPerSqFt: 30 },
  demoRemoval: { cost: 150 },
};

export const STONE_SIZE_OPTIONS = [
  { id: "small", label: "Small Kitchen", sublabel: "<25 sq ft", sqFt: 20, linearFt: 15 },
  { id: "medium", label: "Medium Kitchen", sublabel: "25–40 sq ft", sqFt: 32, linearFt: 22 },
  { id: "large", label: "Large Kitchen", sublabel: "40–60 sq ft", sqFt: 50, linearFt: 30 },
  { id: "xl", label: "Extra Large", sublabel: "60+ sq ft", sqFt: 70, linearFt: 38 },
  { id: "bath-small", label: "Bath Vanity (Small)", sublabel: "~8 sq ft", sqFt: 8, linearFt: 6 },
  { id: "bath-double", label: "Bath Vanity (Double)", sublabel: "~15 sq ft", sqFt: 15, linearFt: 10 },
];
