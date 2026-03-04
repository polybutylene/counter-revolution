export const COATING_CONFIG = {
  interior: {
    roomSizes: {
      small: { label: "Small (< 120 sq ft)", wallSqFt: 400, laborHours: 3 },
      medium: { label: "Medium (120-200 sq ft)", wallSqFt: 640, laborHours: 4.5 },
      large: { label: "Large (200-350 sq ft)", wallSqFt: 960, laborHours: 6 },
      xl: { label: "Extra Large (350+ sq ft)", wallSqFt: 1200, laborHours: 8 },
    } as Record<string, { label: string; wallSqFt: number; laborHours: number }>,
    ceilingMultiplier: 1.3,
    tallCeilingMultiplier: {
      "9ft": 1.1,
      "10ft": 1.2,
      vaulted: 1.35,
    } as Record<string, number>,
  },
  exterior: {
    homeSizes: {
      small: { label: "< 1,500 sq ft", laborHours: 40, materialCost: { low: 400, high: 700 } },
      medium: { label: "1,500 - 2,500 sq ft", laborHours: 60, materialCost: { low: 600, high: 1000 } },
      large: { label: "2,500 - 3,500 sq ft", laborHours: 80, materialCost: { low: 800, high: 1400 } },
      xl: { label: "3,500+ sq ft", laborHours: 100, materialCost: { low: 1000, high: 1800 } },
    } as Record<string, { label: string; laborHours: number; materialCost: { low: number; high: number } }>,
    storyMultiplier: { "1": 1.0, "2": 1.25, "3": 1.5 } as Record<string, number>,
  },
  cabinets: {
    kitchenSizes: {
      small: { label: "Small (< 15 cabinets)", laborHours: 16, materialCost: { low: 200, high: 350 } },
      medium: { label: "Medium (15-30)", laborHours: 28, materialCost: { low: 350, high: 600 } },
      large: { label: "Large (30+)", laborHours: 40, materialCost: { low: 500, high: 850 } },
    } as Record<string, { label: string; laborHours: number; materialCost: { low: number; high: number } }>,
  },
  paintGrade: {
    builder: { label: "Builder Grade", costPerGallon: 25, coverageSqFt: 350 },
    premium: { label: "Premium", costPerGallon: 45, coverageSqFt: 350 },
    ultra: { label: "Ultra Premium", costPerGallon: 70, coverageSqFt: 350 },
  } as Record<string, { label: string; costPerGallon: number; coverageSqFt: number }>,
  prepWork: {
    minimal: { label: "Minimal", laborMultiplier: 1.0 },
    moderate: { label: "Moderate", laborMultiplier: 1.25 },
    heavy: { label: "Heavy", laborMultiplier: 1.5 },
  } as Record<string, { label: string; laborMultiplier: number }>,
};
