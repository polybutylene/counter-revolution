import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Umbrella, Sun } from "lucide-react";
import type { FAQ } from "@/types";
import { cn } from "@/lib/utils";

interface MaterialData {
  name: string;
  headline: string;
  overview: string[];
  prosAndCons: { pros: string[]; cons: string[] };
  maintenance: string;
  priceRange: { low: number; high: number };
  bestFor: string[];
  gulfCoastNote: string;
  faq: FAQ[];
}

const MATERIALS_DATA: Record<string, MaterialData> = {
  granite: {
    name: "Granite",
    headline: "Granite Countertops — Natural Strength & Endless Variety",
    overview: [
      "Granite is a natural igneous rock formed over millions of years. Each slab is unique, with distinctive patterns and color variations that add character to your home. One of the most popular countertop choices in Bay County, granite delivers exceptional durability at a competitive price point.",
      "With proper sealing, granite withstands heat, scratches, and daily wear remarkably well. It's an ideal choice for busy kitchens where you cook frequently, and it holds up beautifully in Florida's humid climate when maintained correctly.",
    ],
    prosAndCons: {
      pros: [
        "Extremely durable — resists chips and scratches",
        "Heat-resistant — hot pans won't damage the surface",
        "Unique natural patterns — no two slabs are alike",
        "Adds real estate value",
        "Excellent for outdoor kitchens (with sealing)",
      ],
      cons: [
        "Requires periodic sealing (annually recommended)",
        "Natural stone can have pits and fissures",
        "Seams may be visible in large installations",
      ],
    },
    maintenance:
      "Granite requires sealing every 1-2 years for optimal stain resistance. Use pH-neutral cleaners — avoid acidic products like vinegar or lemon. Wipe spills promptly, especially oils and wine. With proper care, granite will last a lifetime.",
    priceRange: { low: 40, high: 80 },
    bestFor: [
      "Kitchen countertops",
      "Outdoor kitchens",
      "High-traffic commercial spaces",
      "Statement bathroom vanities",
      "Bar tops",
    ],
    gulfCoastNote:
      "Granite is excellent for Florida homes. The heat and humidity won't affect it when properly sealed. Ideal for outdoor kitchens — just ensure annual sealing and avoid placing grills directly on unsupported overhangs.",
    faq: [
      {
        question: "How often does granite need to be sealed?",
        answer: "We recommend sealing granite every 1-2 years. You can test if resealing is needed by placing a few drops of water on the surface — if it beads, you're good; if it absorbs, it's time to seal.",
      },
      {
        question: "Can I put hot pots directly on granite?",
        answer: "Yes. Granite is highly heat-resistant. You can place hot pots and pans directly on the surface without damage. That said, using trivets extends the life of your sealant.",
      },
      {
        question: "Is granite good for outdoor kitchens in Florida?",
        answer: "Absolutely. Granite is one of the best choices for outdoor kitchens in Bay County. It handles heat, humidity, and sun exposure well when properly sealed. We install many outdoor granite countertops each year.",
      },
    ],
  },
  quartz: {
    name: "Quartz",
    headline: "Quartz Countertops — Zero Maintenance, Maximum Style",
    overview: [
      "Quartz is an engineered stone made from about 90% ground natural quartz and 10% resins and pigments. This composition delivers consistency in color and pattern, while the non-porous surface means no sealing is ever required. It's become one of the most popular choices for modern Bay County homes.",
      "Unlike natural stone, quartz offers uniformity — you know exactly what you're getting. It comes in an enormous range of colors, from classic whites and grays to bold patterns that mimic marble or concrete. Perfect for homeowners who want low maintenance without sacrificing aesthetics.",
    ],
    prosAndCons: {
      pros: [
        "Zero sealing required — completely non-porous",
        "Stain-resistant — wine, oil, and acids won't penetrate",
        "Consistent appearance — predictable patterns",
        "Scratch-resistant — harder than granite",
        "Wide color and style variety",
      ],
      cons: [
        "Not as heat-resistant as granite — use trivets",
        "Can discolor with prolonged UV exposure (avoid direct outdoor sun)",
        "Typically higher price point than granite",
      ],
    },
    maintenance:
      "Quartz is virtually maintenance-free. Wipe with soap and water or a non-abrasive cleaner. No sealing needed. Avoid placing hot pans directly on the surface — use trivets. For outdoor use, choose a covered area to prevent UV discoloration over time.",
    priceRange: { low: 50, high: 100 },
    bestFor: [
      "Kitchen countertops (especially busy families)",
      "Bathroom vanities",
      "Commercial spaces (restaurants, offices)",
      "Modern and transitional designs",
      "Homeowners who want minimal upkeep",
    ],
    gulfCoastNote:
      "Quartz works well in Florida interiors. For outdoor kitchens, we recommend placement under cover — prolonged direct sunlight can cause slight discoloration over many years. Indoors, it's an excellent, low-maintenance choice for our humid climate.",
    faq: [
      {
        question: "Does quartz need to be sealed?",
        answer: "No. Quartz is non-porous and never requires sealing. That's one of its biggest advantages over natural stone — zero maintenance from a sealing standpoint.",
      },
      {
        question: "Can quartz be used outdoors?",
        answer: "Quartz can be used outdoors in covered areas. Prolonged direct UV exposure may cause slight fading over time. For fully exposed outdoor kitchens, we typically recommend granite or quartzite instead.",
      },
      {
        question: "Is quartz more expensive than granite?",
        answer: "Quartz typically runs slightly higher per linear foot than granite, but the lack of sealing costs over the years can offset the initial difference. Plus, many homeowners value the zero-maintenance lifestyle.",
      },
    ],
  },
  marble: {
    name: "Marble",
    headline: "Marble Countertops — Timeless Luxury & Elegance",
    overview: [
      "Marble has been the choice of luxury for centuries. Its distinctive veining and soft, luminous appearance create a timeless elegance that few other materials can match. Each slab tells a geological story, with unique patterns that make your installation one-of-a-kind.",
      "Marble is a calcite-based natural stone, which means it's softer and more porous than granite or quartzite. It requires more care, but for many homeowners and designers, the aesthetic payoff is worth it. Popular in master bathrooms, fireplace surrounds, and as statement kitchen islands.",
    ],
    prosAndCons: {
      pros: [
        "Stunning, unique veining — no two slabs alike",
        "Stays cool — ideal for baking (pastry chefs love it)",
        "Increases home value and prestige",
        "Classic, timeless aesthetic",
        "Can be refinished if scratched or etched",
      ],
      cons: [
        "Softer than granite — more prone to etching and scratching",
        "Porous — requires diligent sealing",
        "Acids (lemon, vinegar, wine) can etch the surface",
        "Higher maintenance than quartz or granite",
      ],
    },
    maintenance:
      "Marble requires regular sealing — we recommend every 6-12 months for high-use areas. Use only pH-neutral cleaners. Avoid acids: lemon, vinegar, wine, and tomato-based products can etch the surface. Use cutting boards and trivets. Many homeowners embrace the natural patina (soft aging) that develops over time.",
    priceRange: { low: 60, high: 120 },
    bestFor: [
      "Master bathroom vanities",
      "Kitchen islands (as an accent)",
      "Fireplace surrounds",
      "Powder rooms",
      "Design-forward clients who accept natural patina",
    ],
    gulfCoastNote:
      "Marble works well in Florida when properly maintained. Humidity itself isn't an issue. The key is consistent sealing and avoiding acidic cleaners. For outdoor use, we generally don't recommend marble — it's better suited to protected indoor spaces.",
    faq: [
      {
        question: "Will marble get etched or stained easily?",
        answer: "Marble can etch when exposed to acids (lemon, vinegar, wine) and can stain if spills sit. With proper sealing and care — wiping spills promptly and using cutting boards — many homeowners enjoy marble for decades. Some embrace the soft patina as part of marble's character.",
      },
      {
        question: "Is marble good for kitchen countertops?",
        answer: "Marble is popular for kitchen islands and pastry stations because it stays cool. For full kitchens, it depends on your lifestyle — if you're diligent about care, it's beautiful. If you want zero upkeep, quartz might be a better fit.",
      },
      {
        question: "Can marble be repaired if it gets damaged?",
        answer: "Yes. Marble can be refinished, polished, and even have etches removed by a professional. It's more forgiving in that sense than some other materials.",
      },
    ],
  },
  quartzite: {
    name: "Quartzite",
    headline: "Quartzite Countertops — Marble Look, Granite Durability",
    overview: [
      "Quartzite is a natural metamorphic rock — not to be confused with engineered quartz. It forms when sandstone is subjected to intense heat and pressure, creating an incredibly hard, durable stone. Many quartzites have beautiful veining similar to marble, but with significantly better resistance to scratching and etching.",
      "It's become a favorite among Bay County homeowners who want the luxurious look of marble without the high maintenance. Quartzite delivers the best of both worlds: stunning natural patterns and colors, plus the durability to stand up to busy kitchens and Florida's climate.",
    ],
    prosAndCons: {
      pros: [
        "Marble-like beauty with granite-like durability",
        "Highly heat-resistant — great for cooking",
        "Resists scratching and etching better than marble",
        "Unique natural patterns",
        "Excellent for outdoor use (with sealing)",
      ],
      cons: [
        "Requires periodic sealing (like granite)",
        "Some softer quartzites may etch — we'll advise",
        "Price point similar to or above granite",
      ],
    },
    maintenance:
      "Quartzite requires sealing every 1-2 years, similar to granite. Use pH-neutral cleaners. While it's more resistant than marble, avoid acidic cleaners and prolonged exposure to acids. Wipe spills promptly. With proper care, quartzite is a long-lasting, low-hassle choice.",
    priceRange: { low: 55, high: 110 },
    bestFor: [
      "Kitchen countertops (full slab or island)",
      "Outdoor kitchens",
      "Bathroom vanities",
      "Fireplace surrounds",
      "Clients wanting marble aesthetics with less maintenance",
    ],
    gulfCoastNote:
      "Quartzite is outstanding for Florida. It handles heat, humidity, and can be used in outdoor kitchens when properly sealed. We highly recommend it for Gulf Coast homes — it's one of our top-selling materials for both indoor and outdoor projects.",
    faq: [
      {
        question: "Is quartzite the same as quartz?",
        answer: "No. Quartzite is 100% natural stone formed in the earth. Quartz (engineered) is man-made from ground quartz and resins. They're completely different materials — quartzite is natural and requires sealing; quartz is engineered and does not.",
      },
      {
        question: "How does quartzite compare to marble?",
        answer: "Quartzite often has similar veining and color options to marble, but it's much harder and more resistant to etching and scratching. If you love the marble look but want something more durable, quartzite is an excellent choice.",
      },
      {
        question: "Can quartzite be used outdoors in Florida?",
        answer: "Yes. Quartzite is one of our top recommendations for outdoor kitchens in Bay County. It handles heat, humidity, and sun exposure well when properly sealed. We install it frequently for outdoor projects.",
      },
    ],
  },
};

interface MaterialPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: MaterialPageProps): Promise<Metadata> {
  const material = MATERIALS_DATA[params.slug];
  if (!material) return {};
  return {
    title: `${material.name} Countertops | Materials Guide`,
    description: material.overview[0].slice(0, 155) + "...",
  };
}

export function generateStaticParams() {
  return Object.keys(MATERIALS_DATA).map((slug) => ({ slug }));
}

export default function MaterialPage({ params }: MaterialPageProps) {
  const material = MATERIALS_DATA[params.slug];
  if (!material) notFound();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {material.headline}
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            {material.overview[0]}
          </p>
          <div className="mt-8">
            <Button variant="gold" size="xl" asChild>
              <Link href="/showroom">Get a Free {material.name} Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Overview" title={`About ${material.name}`} align="left" />
            <div className="mt-6 prose prose-lg max-w-none text-muted-foreground">
              {material.overview.map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Considerations" title="Pros & Cons" />
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="rounded-xl border border-success/20 bg-white p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Pros
                </h3>
                <ul className="mt-4 space-y-2">
                  {material.prosAndCons.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-destructive/20 bg-white p-6">
                <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Cons
                </h3>
                <ul className="mt-4 space-y-2">
                  {material.prosAndCons.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Maintenance */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Care" title="Maintenance" align="left" />
            <div className="mt-6 flex gap-4 rounded-xl border border-warm-medium bg-warm-light p-6">
              <Umbrella className="h-8 w-8 shrink-0 text-gold" />
              <p className="text-muted-foreground">{material.maintenance}</p>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Price Range */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Pricing" title="Price Range" align="left" />
            <p className="mt-4 text-muted-foreground">
              {material.name} typically ranges from{" "}
              <span className="font-semibold text-navy">
                ${material.priceRange.low}–${material.priceRange.high} per linear foot
              </span>{" "}
              installed, depending on slab selection, edge profile, and project complexity. Contact us for a detailed estimate.
            </p>
            <div className="mt-6">
              <Button variant="gold" size="lg" asChild>
                <Link href="/showroom">Get Your Free Estimate</Link>
              </Button>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Best For */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Applications" title="Best For" align="left" />
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {material.bestFor.map((use, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-warm-medium bg-white px-4 py-3"
                >
                  <span className="font-heading font-semibold text-gold">•</span>
                  <span className="text-dark">{use}</span>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </div>
      </section>

      {/* Gulf Coast */}
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <div className="flex gap-4 rounded-xl border border-gold/30 bg-navy-light/30 p-6 sm:p-8">
              <Sun className="h-10 w-10 shrink-0 text-gold" />
              <div>
                <h3 className="font-heading text-xl font-semibold text-white">
                  Gulf Coast Considerations
                </h3>
                <p className="mt-2 text-gray-300">{material.gulfCoastNote}</p>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* FAQ */}
      {material.faq.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading label="FAQ" title={`Common Questions About ${material.name}`} />
            <FAQAccordion faqs={material.faq} className="mt-8" />
          </div>
        </section>
      )}

      <CTABanner
        headline={`Ready for ${material.name} Countertops?`}
        description="Get a free estimate from our team. We'll help you select the perfect slab and edge profile for your Bay County home."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
