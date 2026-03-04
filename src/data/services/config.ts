export type ServiceType = "stone" | "tile" | "coating" | "flooring";

export interface FAQ {
  question: string;
  answer: string;
}

export interface EstimatorOption {
  id: string;
  label: string;
  sublabel?: string;
  priceModifier?: string;
  image?: string;
  badge?: string;
  default?: boolean;
}

export interface EstimatorStep {
  id: string;
  title: string;
  type: "card-select" | "counter" | "radio" | "size-select" | "toggle";
  options: EstimatorOption[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  pricePerUnit: string;
  priceTier: "$" | "$$" | "$$$";
  image?: string;
  badge?: string;
  description: string;
  details: Record<string, string>;
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  image?: string;
  products: Product[];
}

export interface ServiceConfig {
  id: ServiceType;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  priceRange: string;
  heroHeadline: string;
  heroSubtitle: string;
  materials: MaterialCategory[];
  estimatorSteps: EstimatorStep[];
  faqs: FAQ[];
}

export interface ServiceCardData {
  id: ServiceType;
  name: string;
  description: string;
  priceRange: string;
  href: string;
  icon: string;
}

export const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: "stone",
    name: "Stone",
    description:
      "Granite, quartz, and marble countertops fabricated and installed.",
    priceRange: "Starting at $38–$120/sq ft installed",
    href: "/services/stone",
    icon: "diamond",
  },
  {
    id: "tile",
    name: "Tile",
    description:
      "Backsplash, shower, and floor tile — expert layout and installation.",
    priceRange: "Starting at $12–$45/sq ft installed",
    href: "/services/tile",
    icon: "grid",
  },
  {
    id: "coating",
    name: "Coating",
    description: "Interior and exterior painting with premium finishes.",
    priceRange: "Starting at $2–$6/sq ft",
    href: "/services/coating",
    icon: "paintbrush",
  },
  {
    id: "flooring",
    name: "Flooring",
    description: "Hardwood, LVP, laminate, and epoxy — installed right.",
    priceRange: "Starting at $6–$18/sq ft installed",
    href: "/services/flooring",
    icon: "layers",
  },
];
