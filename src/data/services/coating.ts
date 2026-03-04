import type { ServiceConfig } from "./config";

export const coatingServiceConfig: ServiceConfig = {
  id: "coating",
  name: "Coating",
  tagline: "Premium painting with flawless finishes",
  description: "Interior and exterior painting with premium finishes.",
  icon: "paintbrush",
  priceRange: "$2–$6/sq ft",
  heroHeadline: "Premium Painting, Transparent Pricing",
  heroSubtitle: "Browse finishes, get an instant estimate, and schedule your free in-home color consultation.",
  materials: [
    {
      id: "interior-wall",
      name: "Interior Wall Paint",
      description: "Transform any room with our premium interior wall paints. Full spectrum of colors, from classic whites to bold accent hues.",
      priceRange: "$2–$6/sq ft",
      products: [
        { id: "classic-white", name: "Classic White", category: "Interior Wall", priceRange: "$2–$3.50/sq ft", pricePerUnit: "$2–$3.50/sq ft", priceTier: "$", badge: "Most Popular", description: "Clean, bright white that works in any room. Our most-requested color for ceilings and trim.", details: { Finish: "Eggshell", Coverage: "350–400 sq ft/gal", "Dry Time": "1 hour", "Best For": "Living rooms, bedrooms" } },
        { id: "warm-greige", name: "Warm Greige", category: "Interior Wall", priceRange: "$2.50–$4/sq ft", pricePerUnit: "$2.50–$4/sq ft", priceTier: "$", description: "The perfect blend of gray and beige. Warm, inviting, and pairs with everything.", details: { Finish: "Eggshell", Coverage: "350–400 sq ft/gal", "Dry Time": "1 hour", "Best For": "Living rooms, hallways" } },
        { id: "navy-accent", name: "Navy Accent", category: "Interior Wall", priceRange: "$3–$4.50/sq ft", pricePerUnit: "$3–$4.50/sq ft", priceTier: "$$", description: "Deep, dramatic navy for accent walls and statement rooms. Rich depth and sophistication.", details: { Finish: "Satin", Coverage: "300–350 sq ft/gal", "Dry Time": "1 hour", "Best For": "Accent walls, dens" } },
      ],
    },
    {
      id: "exterior",
      name: "Exterior Paint",
      description: "Weather-resistant exterior coatings built to withstand Florida's sun, rain, and humidity.",
      priceRange: "$3–$6/sq ft",
      products: [
        { id: "exterior-flat", name: "Exterior Flat", category: "Exterior", priceRange: "$3–$4.50/sq ft", pricePerUnit: "$3–$4.50/sq ft", priceTier: "$", description: "Low-sheen exterior paint that hides imperfections. Great for stucco and siding.", details: { Finish: "Flat", "UV Resistance": "High", "Mildew Resistant": "Yes", "Best For": "Siding, stucco" } },
        { id: "exterior-satin", name: "Exterior Satin", category: "Exterior", priceRange: "$3.50–$5.50/sq ft", pricePerUnit: "$3.50–$5.50/sq ft", priceTier: "$$", badge: "Popular", description: "Subtle sheen that resists dirt and mildew. Easy to clean and long-lasting.", details: { Finish: "Satin", "UV Resistance": "High", "Mildew Resistant": "Yes", "Best For": "Siding, trim, doors" } },
        { id: "exterior-semi-gloss", name: "Exterior Semi-Gloss", category: "Exterior", priceRange: "$4–$6/sq ft", pricePerUnit: "$4–$6/sq ft", priceTier: "$$", description: "High durability semi-gloss for trim, shutters, and doors. Stands up to heavy weather.", details: { Finish: "Semi-Gloss", "UV Resistance": "Very High", "Mildew Resistant": "Yes", "Best For": "Trim, shutters, doors" } },
      ],
    },
    {
      id: "cabinet",
      name: "Cabinet Paint",
      description: "Specialized cabinet refinishing with factory-smooth finishes. Transform your kitchen without replacing cabinets.",
      priceRange: "$75–$150/door",
      products: [
        { id: "cabinet-white", name: "Bright White Cabinet", category: "Cabinet", priceRange: "$75–$120/door", pricePerUnit: "$75–$120/door", priceTier: "$$", badge: "Most Popular", description: "Crisp white cabinet finish that brightens any kitchen. Includes proper prep, primer, and topcoat.", details: { Finish: "Semi-Gloss", Coats: "2 primer + 2 topcoat", Method: "Spray applied", "Dry Time": "24 hours" } },
        { id: "cabinet-charcoal", name: "Charcoal Cabinet", category: "Cabinet", priceRange: "$85–$130/door", pricePerUnit: "$85–$130/door", priceTier: "$$", description: "Rich, deep charcoal for a modern kitchen look. Dramatic contrast with light countertops.", details: { Finish: "Semi-Gloss", Coats: "2 primer + 2 topcoat", Method: "Spray applied", "Dry Time": "24 hours" } },
        { id: "cabinet-sage", name: "Sage Green Cabinet", category: "Cabinet", priceRange: "$90–$140/door", pricePerUnit: "$90–$140/door", priceTier: "$$", description: "On-trend sage green for a fresh, organic feel. Pairs beautifully with brass hardware.", details: { Finish: "Satin", Coats: "2 primer + 2 topcoat", Method: "Spray applied", "Dry Time": "24 hours" } },
      ],
    },
    {
      id: "specialty",
      name: "Specialty Finishes",
      description: "Limewash, venetian plaster, and textured finishes for a truly custom look.",
      priceRange: "$6–$15/sq ft",
      products: [
        { id: "limewash", name: "Limewash", category: "Specialty", priceRange: "$6–$10/sq ft", pricePerUnit: "$6–$10/sq ft", priceTier: "$$", description: "Old-world European finish with beautiful depth and variation. Each wall is unique.", details: { Finish: "Matte/Natural", Coats: "2–3 layers", Method: "Brush applied", "Best For": "Accent walls, fireplaces" } },
        { id: "venetian-plaster", name: "Venetian Plaster", category: "Specialty", priceRange: "$10–$15/sq ft", pricePerUnit: "$10–$15/sq ft", priceTier: "$$$", description: "Smooth, polished plaster with subtle depth. A luxurious alternative to standard paint.", details: { Finish: "Polished/Satin", Coats: "3–5 layers", Method: "Trowel applied", "Best For": "Feature walls, powder rooms" } },
      ],
    },
  ],
  estimatorSteps: [
    {
      id: "project-type",
      title: "What type of painting project?",
      type: "card-select",
      options: [
        { id: "interior", label: "Interior Rooms", sublabel: "Walls, ceilings, trim", default: true },
        { id: "exterior-full", label: "Exterior (Full House)", sublabel: "Complete exterior repaint" },
        { id: "exterior-trim", label: "Exterior (Trim/Accent)", sublabel: "Trim, shutters, doors" },
        { id: "cabinets", label: "Cabinet Refinishing", sublabel: "Kitchen or bathroom cabinets" },
      ],
    },
    {
      id: "room-details",
      title: "Room / Area details",
      type: "counter",
      options: [
        { id: "rooms-1", label: "1 Room", priceModifier: "1" },
        { id: "rooms-2", label: "2 Rooms", priceModifier: "2" },
        { id: "rooms-3", label: "3 Rooms", priceModifier: "3" },
        { id: "rooms-4", label: "4 Rooms", priceModifier: "4" },
        { id: "rooms-5", label: "5+ Rooms", priceModifier: "5" },
      ],
    },
    {
      id: "room-size",
      title: "Average room size",
      type: "size-select",
      options: [
        { id: "small", label: "Small", sublabel: "<120 sq ft wall area", priceModifier: "120" },
        { id: "medium", label: "Medium", sublabel: "120–200 sq ft", priceModifier: "160", default: true },
        { id: "large", label: "Large", sublabel: "200–350 sq ft", priceModifier: "275" },
        { id: "xl", label: "Extra Large", sublabel: "350+ sq ft", priceModifier: "400" },
      ],
    },
    {
      id: "paint-grade",
      title: "Paint grade",
      type: "card-select",
      options: [
        { id: "builder", label: "Builder Grade", sublabel: "$1.50–$2.50/sq ft", priceModifier: "$1.50-2.50" },
        { id: "premium", label: "Premium", sublabel: "$2.50–$4/sq ft", priceModifier: "$2.50-4", badge: "Recommended", default: true },
        { id: "ultra", label: "Ultra Premium", sublabel: "$4–$6/sq ft", priceModifier: "$4-6" },
      ],
    },
    {
      id: "prep-work",
      title: "Prep work needed",
      type: "card-select",
      options: [
        { id: "minimal", label: "Minimal", sublabel: "Clean walls, light sanding", default: true },
        { id: "moderate", label: "Moderate", sublabel: "Patching, priming, some repair", priceModifier: "+$0.50-1/sq ft" },
        { id: "heavy", label: "Heavy", sublabel: "Wallpaper removal, extensive repair, texture", priceModifier: "+$1-2/sq ft" },
      ],
    },
    {
      id: "extras",
      title: "Additional options",
      type: "toggle",
      options: [
        { id: "ceilings", label: "Include Ceilings", sublabel: "+30% of wall cost", priceModifier: "+30%" },
        { id: "trim", label: "Include Trim/Baseboards", sublabel: "+$2–$4/linear ft", priceModifier: "+$2-4/LF" },
      ],
    },
  ],
  faqs: [
    { question: "How long does it take to paint a room?", answer: "A single average-sized room typically takes 1 day including prep, priming (if needed), and two coats. A full interior (3-5 rooms) usually takes 3-5 days. We work efficiently without cutting corners on prep or quality." },
    { question: "Do I need to move my furniture?", answer: "We handle all furniture moving and protection. We cover floors, furniture, and fixtures with drop cloths and plastic. Everything goes back exactly where it was when we're done." },
    { question: "What paint brands do you use?", answer: "We primarily use Sherwin-Williams and Benjamin Moore products. For our Premium tier, we use their mid-range lines (like SuperPaint or Regal Select). For Ultra Premium, we use their top-tier lines (Emerald or Aura). We're happy to use any brand you prefer." },
    { question: "Should I paint or replace my kitchen cabinets?", answer: "If your cabinets are structurally sound with good bones, refinishing is dramatically more affordable — typically 40-60% less than replacement. Our spray-applied cabinet finish creates a factory-smooth result that looks like new cabinetry." },
    { question: "How do I choose the right paint color?", answer: "We offer free color consultations. We bring large color samples to your home so you can see how colors look in your actual lighting. We also recommend testing 2-3 colors with sample pots on the wall before committing." },
    { question: "What about Florida humidity — will exterior paint last?", answer: "We use premium, mildew-resistant exterior paints specifically formulated for coastal and subtropical climates. With proper prep and premium paint, you should expect 7-10 years of life on an exterior paint job in our area." },
  ],
};
