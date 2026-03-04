import type { ServiceConfig } from "./config";

export const flooringServiceConfig: ServiceConfig = {
  id: "flooring",
  name: "Flooring",
  tagline: "Installed right, every time",
  description: "Hardwood, LVP, laminate, and epoxy — installed right.",
  icon: "layers",
  priceRange: "$6–$18/sq ft installed",
  heroHeadline: "Beautiful Floors, Transparent Pricing",
  heroSubtitle: "Browse options, get an instant estimate, and schedule your free in-home measurement.",
  materials: [
    {
      id: "lvp",
      name: "Luxury Vinyl Plank (LVP)",
      description: "Waterproof, durable, and realistic wood look. The fastest-growing flooring category for good reason — it performs everywhere.",
      priceRange: "$6–$12/sq ft installed",
      products: [
        { id: "lvp-classic-oak", name: "Classic Oak LVP", category: "LVP", priceRange: "$6–$8/sq ft", pricePerUnit: "$6–$8/sq ft installed", priceTier: "$", badge: "Most Popular", description: "Warm oak tones with realistic wood grain texture. Waterproof core makes it ideal for any room.", details: { Thickness: "6mm + 1mm pad", "Wear Layer": "20mil", Width: "7\" wide plank", "Best For": "Whole home, kitchens, bathrooms" } },
        { id: "lvp-hickory", name: "Rustic Hickory LVP", category: "LVP", priceRange: "$7–$10/sq ft", pricePerUnit: "$7–$10/sq ft installed", priceTier: "$$", description: "Rich hickory character with dramatic grain variation. Hand-scraped texture for authentic feel.", details: { Thickness: "7mm + 1.5mm pad", "Wear Layer": "28mil", Width: "7\" wide plank", "Best For": "Living rooms, bedrooms" } },
        { id: "lvp-whitewash", name: "Whitewash Pine LVP", category: "LVP", priceRange: "$8–$12/sq ft", pricePerUnit: "$8–$12/sq ft installed", priceTier: "$$", description: "Light, coastal-inspired whitewash finish. Bright and airy — perfect for Florida homes.", details: { Thickness: "8mm + 1.5mm pad", "Wear Layer": "28mil", Width: "9\" wide plank", "Best For": "Coastal, modern, open plans" } },
      ],
    },
    {
      id: "hardwood",
      name: "Hardwood",
      description: "Timeless natural beauty. Real wood flooring adds warmth, value, and character that no synthetic can match.",
      priceRange: "$10–$18/sq ft installed",
      products: [
        { id: "hw-red-oak", name: "Red Oak Hardwood", category: "Hardwood", priceRange: "$10–$14/sq ft", pricePerUnit: "$10–$14/sq ft installed", priceTier: "$$", badge: "Classic", description: "America's most popular hardwood floor. Warm reddish tones with prominent grain. Takes stain beautifully.", details: { Thickness: "3/4\"", Width: "3-1/4\" to 5\"", Species: "Red Oak", "Best For": "Living rooms, bedrooms, dining" } },
        { id: "hw-white-oak", name: "White Oak Hardwood", category: "Hardwood", priceRange: "$12–$16/sq ft", pricePerUnit: "$12–$16/sq ft installed", priceTier: "$$", badge: "Popular", description: "Slightly cooler tones than red oak with tighter grain. Extremely durable and takes stain perfectly.", details: { Thickness: "3/4\"", Width: "5\" to 7\"", Species: "White Oak", "Best For": "Any room, modern and traditional" } },
        { id: "hw-hickory", name: "Hickory Hardwood", category: "Hardwood", priceRange: "$13–$18/sq ft", pricePerUnit: "$13–$18/sq ft installed", priceTier: "$$$", description: "The hardest domestic hardwood. Dramatic grain variation and natural color contrast. Built to last.", details: { Thickness: "3/4\"", Width: "5\" to 7\"", Species: "Hickory", "Best For": "High-traffic areas, rustic spaces" } },
      ],
    },
    {
      id: "laminate",
      name: "Laminate",
      description: "Budget-friendly with modern designs. Today's laminate looks remarkably realistic and installs fast.",
      priceRange: "$5–$9/sq ft installed",
      products: [
        { id: "lam-gray-oak", name: "Gray Oak Laminate", category: "Laminate", priceRange: "$5–$7/sq ft", pricePerUnit: "$5–$7/sq ft installed", priceTier: "$", description: "Modern gray oak tones at an accessible price point. Scratch-resistant surface holds up to pets and kids.", details: { Thickness: "10mm", "AC Rating": "AC4 (Commercial)", Width: "7\" wide plank", "Best For": "Bedrooms, living rooms, offices" } },
        { id: "lam-walnut", name: "Dark Walnut Laminate", category: "Laminate", priceRange: "$6–$9/sq ft", pricePerUnit: "$6–$9/sq ft installed", priceTier: "$", description: "Rich walnut color with realistic grain embossing. Water-resistant core for moderate moisture areas.", details: { Thickness: "12mm", "AC Rating": "AC5 (Heavy Commercial)", Width: "8\" wide plank", "Best For": "Living rooms, dining, hallways" } },
      ],
    },
    {
      id: "porcelain-tile-floor",
      name: "Porcelain Tile",
      description: "Premium durability for any room. Wood-look, stone-look, and modern formats that last a lifetime.",
      priceRange: "$12–$25/sq ft installed",
      products: [
        { id: "pt-wood-look", name: "Wood Look Porcelain", category: "Porcelain Tile", priceRange: "$14–$22/sq ft", pricePerUnit: "$14–$22/sq ft installed", priceTier: "$$", badge: "Popular", description: "Realistic wood grain on a porcelain body. Zero maintenance, fully waterproof, and won't fade in sunlight.", details: { Size: "8\" x 48\"", Thickness: "10mm", Finish: "Matte Textured", "Best For": "Any room, especially wet areas" } },
        { id: "pt-concrete-look", name: "Concrete Look Porcelain", category: "Porcelain Tile", priceRange: "$16–$25/sq ft", pricePerUnit: "$16–$25/sq ft installed", priceTier: "$$", description: "Industrial-modern concrete aesthetic. Large format for minimal grout lines and maximum visual impact.", details: { Size: "24\" x 24\"", Thickness: "10mm", Finish: "Matte", "Best For": "Modern, industrial, open plans" } },
      ],
    },
    {
      id: "epoxy",
      name: "Epoxy",
      description: "Seamless, industrial-grade floor coating. Perfect for garages, laundry rooms, and commercial spaces.",
      priceRange: "$8–$16/sq ft installed",
      products: [
        { id: "epoxy-solid", name: "Solid Color Epoxy", category: "Epoxy", priceRange: "$8–$12/sq ft", pricePerUnit: "$8–$12/sq ft installed", priceTier: "$$", description: "Clean, seamless floor coating in your choice of color. Chemical resistant and easy to clean.", details: { Thickness: "16–20 mil", Finish: "High Gloss", "Prep Required": "Diamond grinding", "Best For": "Garages, workshops, laundry" } },
        { id: "epoxy-flake", name: "Decorative Flake Epoxy", category: "Epoxy", priceRange: "$10–$14/sq ft", pricePerUnit: "$10–$14/sq ft installed", priceTier: "$$", badge: "Most Popular", description: "Colored flake chips broadcast into wet epoxy for a decorative, slip-resistant finish.", details: { Thickness: "20–30 mil", Finish: "Satin/Semi-Gloss", "Prep Required": "Diamond grinding", "Best For": "Garages, patios, pool decks" } },
        { id: "epoxy-metallic", name: "Metallic Epoxy", category: "Epoxy", priceRange: "$12–$16/sq ft", pricePerUnit: "$12–$16/sq ft installed", priceTier: "$$$", description: "Stunning metallic swirl finish. Each floor is a one-of-a-kind work of art. Ultra-premium look.", details: { Thickness: "20–30 mil", Finish: "High Gloss Metallic", "Prep Required": "Diamond grinding", "Best For": "Showrooms, basements, modern spaces" } },
      ],
    },
  ],
  estimatorSteps: [
    {
      id: "flooring-type",
      title: "Choose your flooring",
      type: "card-select",
      options: [
        { id: "lvp", label: "Luxury Vinyl Plank (LVP)", sublabel: "$6–$12/sq ft installed", priceModifier: "$6-12", badge: "Most Popular" },
        { id: "hardwood", label: "Hardwood", sublabel: "$10–$18/sq ft installed", priceModifier: "$10-18" },
        { id: "laminate", label: "Laminate", sublabel: "$5–$9/sq ft installed", priceModifier: "$5-9" },
        { id: "porcelain-tile", label: "Porcelain Tile", sublabel: "$12–$25/sq ft installed", priceModifier: "$12-25" },
        { id: "epoxy", label: "Epoxy", sublabel: "$8–$16/sq ft installed", priceModifier: "$8-16" },
        { id: "carpet", label: "Carpet", sublabel: "$4–$10/sq ft installed", priceModifier: "$4-10" },
      ],
    },
    {
      id: "area-size",
      title: "How big is the area?",
      type: "size-select",
      options: [
        { id: "small", label: "Small Room", sublabel: "<150 sq ft", priceModifier: "120" },
        { id: "medium", label: "Medium Room", sublabel: "150–300 sq ft", priceModifier: "225", default: true },
        { id: "large", label: "Large Room/Open Plan", sublabel: "300–600 sq ft", priceModifier: "450" },
        { id: "whole-home", label: "Whole Home", sublabel: "600+ sq ft", priceModifier: "900" },
      ],
    },
    {
      id: "subfloor",
      title: "Subfloor condition",
      type: "card-select",
      options: [
        { id: "good", label: "Good Condition", sublabel: "Level, clean — no extra work", default: true },
        { id: "needs-leveling", label: "Needs Leveling", sublabel: "+$1–$2/sq ft", priceModifier: "+$1-2/sq ft" },
        { id: "needs-repair", label: "Needs Repair", sublabel: "+$2–$4/sq ft", priceModifier: "+$2-4/sq ft" },
      ],
    },
    {
      id: "existing-floor",
      title: "Existing floor",
      type: "card-select",
      options: [
        { id: "bare", label: "Bare/New Construction", sublabel: "No removal needed", default: true },
        { id: "remove", label: "Remove Existing Flooring", sublabel: "+$1–$3/sq ft", priceModifier: "+$1-3/sq ft" },
        { id: "install-over", label: "Install Over Existing", sublabel: "When structurally possible" },
      ],
    },
    {
      id: "transitions",
      title: "Transitions & trim",
      type: "card-select",
      options: [
        { id: "standard", label: "Standard Transitions", sublabel: "Included in base price", default: true },
        { id: "upgraded", label: "Upgraded Trim/Quarter Round", sublabel: "+$2–$4/linear ft", priceModifier: "+$2-4/LF" },
        { id: "stairs", label: "Stair Treads", sublabel: "+$50–$100 each", priceModifier: "+$50-100 each" },
      ],
    },
  ],
  faqs: [
    { question: "What's the best flooring for Florida homes?", answer: "LVP (Luxury Vinyl Plank) is our #1 recommendation for Florida. It's 100% waterproof, handles humidity well, won't expand/contract like hardwood, and looks incredibly realistic. For wet areas or outdoor-adjacent rooms, porcelain tile is also excellent." },
    { question: "How long does flooring installation take?", answer: "A single room (150-300 sq ft) typically takes 1 day. A whole-home installation (800-1200 sq ft) usually takes 3-5 days. Tile floors take longer due to mortar and grout curing time. We'll give you an exact timeline with your estimate." },
    { question: "LVP vs. hardwood — which should I choose?", answer: "Hardwood offers unmatched natural beauty and can be refinished multiple times over decades. LVP offers waterproof durability, easier maintenance, and lower cost. In Florida specifically, LVP often outperforms hardwood due to our humidity. Both are excellent choices." },
    { question: "Do I need to be out of the house during installation?", answer: "Not necessarily, but the installation area needs to be cleared of furniture and accessible. For whole-home projects with dust-producing demo work, we recommend staying elsewhere for 1-2 days. For single-room projects, you can absolutely stay home." },
    { question: "Is epoxy flooring only for garages?", answer: "Not at all! While garages are the most common application, we install epoxy in laundry rooms, basements, workshops, pool decks, and even modern living spaces. Metallic epoxy in particular creates a stunning, one-of-a-kind floor for any room." },
    { question: "How do I maintain my new floors?", answer: "We provide specific care instructions for every floor type we install. In general: sweep or vacuum regularly, use manufacturer-recommended cleaners, put felt pads on furniture legs, and keep pet nails trimmed. For hardwood, avoid excess water. For LVP, you can mop freely." },
  ],
};
