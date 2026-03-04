import type { ServiceConfig } from "./config";

export const stoneServiceConfig: ServiceConfig = {
  id: "stone",
  name: "Stone",
  tagline: "Fabricated and installed by local craftsmen",
  description:
    "Granite, quartz, and marble countertops fabricated and installed.",
  icon: "diamond",
  priceRange: "$38–$120/sq ft installed",
  heroHeadline: "Premium Countertops, Transparent Pricing",
  heroSubtitle:
    "Browse materials, get an instant estimate, and schedule your free in-home measurement.",
  materials: [
    {
      id: "granite",
      name: "Granite",
      description:
        "Natural stone quarried from the earth. Every slab is one of a kind — durable, heat-resistant, and beautiful.",
      priceRange: "$38–$80/sq ft installed",
      products: [
        {
          id: "white-ice-granite",
          name: "White Ice Granite",
          category: "Granite",
          priceRange: "$42–$58/sq ft",
          pricePerUnit: "$42–$58/sq ft installed",
          priceTier: "$$",
          badge: "Most Popular",
          description:
            "A crisp white granite with subtle gray and silver mineral flecks. Clean and bright — our most popular kitchen choice.",
          details: {
            Origin: "Brazil",
            Thickness: "2cm, 3cm",
            Finishes: "Polished, Honed",
            Durability: "4/5",
            Maintenance: "Low",
          },
        },
        {
          id: "alaska-white-granite",
          name: "Alaska White Granite",
          category: "Granite",
          priceRange: "$38–$52/sq ft",
          pricePerUnit: "$38–$52/sq ft installed",
          priceTier: "$$",
          description:
            "Soft white base with gentle gray veining and warm undertones. Versatile and elegant for any kitchen style.",
          details: {
            Origin: "India",
            Thickness: "2cm, 3cm",
            Finishes: "Polished, Honed",
            Durability: "4/5",
            Maintenance: "Low",
          },
        },
        {
          id: "steel-gray-granite",
          name: "Steel Gray Granite",
          category: "Granite",
          priceRange: "$40–$55/sq ft",
          pricePerUnit: "$40–$55/sq ft installed",
          priceTier: "$$",
          description:
            "Sleek, dark granite with a uniform gray color and subtle sparkle. Modern and sophisticated.",
          details: {
            Origin: "India",
            Thickness: "2cm, 3cm",
            Finishes: "Polished, Leathered",
            Durability: "5/5",
            Maintenance: "Low",
          },
        },
      ],
    },
    {
      id: "quartz",
      name: "Quartz",
      description:
        "Engineered stone that combines natural quartz with resin binders. Consistent patterns, zero maintenance, and incredible durability.",
      priceRange: "$45–$120/sq ft installed",
      products: [
        {
          id: "calacatta-quartz",
          name: "Calacatta Quartz",
          category: "Quartz",
          priceRange: "$55–$75/sq ft",
          pricePerUnit: "$55–$75/sq ft installed",
          priceTier: "$$$",
          badge: "Staff Pick",
          description:
            "Marble-inspired quartz with dramatic gray and gold veining on a bright white base. All the elegance, none of the maintenance.",
          details: {
            Thickness: "2cm, 3cm",
            Finishes: "Polished",
            Durability: "5/5",
            Maintenance: "Very Low",
          },
        },
        {
          id: "calacatta-laza-quartz",
          name: "Calacatta Laza Quartz",
          category: "Quartz",
          priceRange: "$85–$120/sq ft",
          pricePerUnit: "$85–$120/sq ft installed",
          priceTier: "$$$",
          description:
            "Ultra-premium quartz with bold, sweeping veins. The pinnacle of engineered stone luxury.",
          details: {
            Thickness: "2cm, 3cm",
            Finishes: "Polished",
            Durability: "5/5",
            Maintenance: "Very Low",
          },
        },
      ],
    },
    {
      id: "marble",
      name: "Marble",
      description:
        "Timeless natural elegance. Marble's unique veining and warm tones make it the choice for those who appreciate true luxury.",
      priceRange: "$45–$80/sq ft installed",
      products: [
        {
          id: "carrara-marble",
          name: "Carrara Marble",
          category: "Marble",
          priceRange: "$45–$62/sq ft",
          pricePerUnit: "$45–$62/sq ft installed",
          priceTier: "$$",
          badge: "Classic",
          description:
            "The world's most iconic marble. Soft gray veining on a white-to-bluish base. Timeless for kitchens and bathrooms.",
          details: {
            Origin: "Italy",
            Thickness: "2cm, 3cm",
            Finishes: "Polished, Honed",
            Durability: "3/5",
            Maintenance: "Medium",
          },
        },
        {
          id: "emperador-marble",
          name: "Emperador Marble",
          category: "Marble",
          priceRange: "$60–$80/sq ft",
          pricePerUnit: "$60–$80/sq ft installed",
          priceTier: "$$$",
          description:
            "Rich brown marble with complex golden and cream veining. Warm, dramatic, and unmistakably luxurious.",
          details: {
            Origin: "Spain",
            Thickness: "2cm, 3cm",
            Finishes: "Polished, Honed",
            Durability: "3/5",
            Maintenance: "Medium",
          },
        },
      ],
    },
    {
      id: "quartzite",
      name: "Quartzite",
      description:
        "Natural stone with marble-like beauty and granite-like strength. The best of both worlds for discerning homeowners.",
      priceRange: "$55–$90/sq ft installed",
      products: [
        {
          id: "taj-mahal-quartzite",
          name: "Taj Mahal Quartzite",
          category: "Quartzite",
          priceRange: "$65–$90/sq ft",
          pricePerUnit: "$65–$90/sq ft installed",
          priceTier: "$$$",
          description:
            "Warm, creamy tones with soft golden veining. Looks like marble but performs like granite.",
          details: {
            Origin: "Brazil",
            Thickness: "3cm",
            Finishes: "Polished, Honed, Leathered",
            Durability: "5/5",
            Maintenance: "Low",
          },
        },
        {
          id: "super-white-quartzite",
          name: "Super White Quartzite",
          category: "Quartzite",
          priceRange: "$55–$75/sq ft",
          pricePerUnit: "$55–$75/sq ft installed",
          priceTier: "$$$",
          description:
            "Cool white with dramatic gray movement. A showstopper that stands up to daily kitchen use.",
          details: {
            Origin: "Brazil",
            Thickness: "3cm",
            Finishes: "Polished, Honed",
            Durability: "4/5",
            Maintenance: "Low",
          },
        },
      ],
    },
  ],
  estimatorSteps: [
    {
      id: "stone-type",
      title: "Choose your stone",
      type: "card-select",
      options: [
        {
          id: "white-ice-granite",
          label: "White Ice Granite",
          sublabel: "$42–$58/sq ft",
          priceModifier: "$42-58",
        },
        {
          id: "alaska-white-granite",
          label: "Alaska White Granite",
          sublabel: "$38–$52/sq ft",
          priceModifier: "$38-52",
        },
        {
          id: "steel-gray-granite",
          label: "Steel Gray Granite",
          sublabel: "$40–$55/sq ft",
          priceModifier: "$40-55",
        },
        {
          id: "calacatta-quartz",
          label: "Calacatta Quartz",
          sublabel: "$55–$75/sq ft",
          priceModifier: "$55-75",
        },
        {
          id: "carrara-marble",
          label: "Carrara Marble",
          sublabel: "$45–$62/sq ft",
          priceModifier: "$45-62",
        },
        {
          id: "midnight-black-granite",
          label: "Midnight Black Granite",
          sublabel: "$42–$58/sq ft",
          priceModifier: "$42-58",
        },
        {
          id: "calacatta-laza-quartz",
          label: "Calacatta Laza Quartz",
          sublabel: "$85–$120/sq ft",
          priceModifier: "$85-120",
        },
        {
          id: "emperador-marble",
          label: "Emperador Marble",
          sublabel: "$60–$80/sq ft",
          priceModifier: "$60-80",
        },
      ],
    },
    {
      id: "counter-size",
      title: "Counter dimensions",
      type: "size-select",
      options: [
        {
          id: "small",
          label: "Small Kitchen",
          sublabel: "<25 sq ft (~20 sq ft)",
          priceModifier: "20",
        },
        {
          id: "medium",
          label: "Medium Kitchen",
          sublabel: "25–40 sq ft (~32 sq ft)",
          priceModifier: "32",
          default: true,
        },
        {
          id: "large",
          label: "Large Kitchen",
          sublabel: "40–60 sq ft (~50 sq ft)",
          priceModifier: "50",
        },
        {
          id: "xl",
          label: "Extra Large Kitchen",
          sublabel: "60+ sq ft (~70 sq ft)",
          priceModifier: "70",
        },
      ],
    },
    {
      id: "edge-profile",
      title: "Edge profile",
      type: "card-select",
      options: [
        {
          id: "eased",
          label: "Standard Eased",
          sublabel: "Included",
          priceModifier: "+$0/ft",
          default: true,
        },
        {
          id: "bullnose",
          label: "Full Bullnose",
          sublabel: "+$12/linear ft",
          priceModifier: "+$12/ft",
          badge: "Popular",
        },
        {
          id: "half-bullnose",
          label: "Half Bullnose",
          sublabel: "+$10/linear ft",
          priceModifier: "+$10/ft",
          badge: "Popular",
        },
        {
          id: "ogee",
          label: "Ogee",
          sublabel: "+$15/linear ft",
          priceModifier: "+$15/ft",
        },
        {
          id: "waterfall",
          label: "Waterfall",
          sublabel: "+$25/linear ft",
          priceModifier: "+$25/ft",
        },
      ],
    },
    {
      id: "sink-cutout",
      title: "Sink cutout",
      type: "card-select",
      options: [
        { id: "none", label: "No Sink Cutout" },
        {
          id: "undermount",
          label: "Undermount",
          sublabel: "$250 per cutout",
          priceModifier: "+$250",
          default: true,
        },
        {
          id: "dropin",
          label: "Drop-in",
          sublabel: "$200 per cutout",
          priceModifier: "+$200",
        },
        {
          id: "farmhouse",
          label: "Farmhouse/Apron",
          sublabel: "$300 per cutout",
          priceModifier: "+$300",
        },
      ],
    },
    {
      id: "backsplash",
      title: "Backsplash",
      type: "card-select",
      options: [
        { id: "none", label: "No Backsplash", default: true },
        {
          id: "4inch",
          label: "4-inch Backsplash",
          sublabel: "$25/linear ft",
          priceModifier: "+$25/LF",
        },
        {
          id: "full",
          label: "Full-height Backsplash",
          sublabel: "$45/sq ft",
          priceModifier: "+$45/sq ft",
        },
      ],
    },
    {
      id: "existing-counters",
      title: "Existing counters",
      type: "card-select",
      options: [
        {
          id: "keep",
          label: "Keeping Existing",
          sublabel: "No demo needed",
          default: true,
        },
        {
          id: "demo",
          label: "We Handle the Demo",
          sublabel: "+$8/sq ft",
          priceModifier: "+$8/sq ft",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How long does countertop installation take?",
      answer:
        "From template to install, most projects take 7-10 business days. The actual installation day is typically 3-5 hours for a standard kitchen. We'll give you a specific timeline during your free estimate.",
    },
    {
      question: "Do I need to remove my old countertops first?",
      answer:
        "We handle everything, including demolition and removal of your existing countertops. Just select 'We Handle the Demo' in the estimator to include this in your quote.",
    },
    {
      question: "What's the difference between granite and quartz?",
      answer:
        "Granite is a natural stone — each slab is unique and requires annual sealing. Quartz is engineered stone — consistent patterns, zero maintenance, and non-porous. Both are extremely durable. Granite offers natural beauty; quartz offers hassle-free consistency.",
    },
    {
      question: "Can I see the actual slab before you cut it?",
      answer:
        "Absolutely. We always recommend a slab visit before fabrication, especially for natural stones like granite and marble where every slab is different. We'll arrange this as part of the process.",
    },
    {
      question: "Do you offer financing?",
      answer:
        "Yes, we offer flexible financing options. Ask about our 12-month interest-free financing during your free estimate consultation.",
    },
    {
      question: "What about the seam — will I see it?",
      answer:
        "Our fabricators are experts at minimizing seam visibility. We strategically place seams in low-traffic areas and color-match the epoxy to your stone. Most of our customers tell us they can't find the seam.",
    },
  ],
};
