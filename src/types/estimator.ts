export type ProjectType = "kitchen" | "bathroom" | "outdoor" | "commercial" | "other";

export type MaterialPreference = "granite" | "quartz" | "marble" | "quartzite" | "not-sure";

export type EdgeProfile = "straight" | "beveled" | "bullnose" | "ogee" | "waterfall" | "not-sure";

export type PreferredContact = "call" | "text" | "email";

export type ProjectTimeline = "asap" | "1-3-months" | "3-6-months" | "researching";

export interface EstimatorFormData {
  projectType: ProjectType;
  linearFootage: number;
  sinkCutouts: number;
  cooktopCutouts: number;
  includeBacksplash: boolean;
  backsplashHeight?: "4-inch" | "full";
  includeIsland: boolean;
  islandSize?: "small" | "medium" | "large";
  materialPreference: MaterialPreference;
  edgeProfile: EdgeProfile;
  name: string;
  phone: string;
  email: string;
  preferredContact: PreferredContact;
  timeline: ProjectTimeline;
  notes?: string;
}

export interface EstimatorPricing {
  materials: Record<string, { low: number; high: number }>;
  sinkCutout: { low: number; high: number };
  cooktopCutout: { low: number; high: number };
  edgeProfiles: Record<string, number>;
  backsplash: { fourInch: number; fullHeight: number };
  islandSizes: Record<string, number>;
  removalFlat: { low: number; high: number };
}

export interface EstimateBreakdown {
  materialCost: { low: number; high: number };
  fabrication: { low: number; high: number };
  installation: { low: number; high: number };
  cutouts: { low: number; high: number };
  edgeProfile: { low: number; high: number };
  backsplash: { low: number; high: number };
  island: { low: number; high: number };
}

export interface EstimateResult {
  low: number;
  high: number;
  breakdown: EstimateBreakdown;
}
