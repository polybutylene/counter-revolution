import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { ArrowRight, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Materials Guide",
  description: "Explore granite, quartz, marble, and quartzite countertop materials in Bay County, FL. Compare durability, maintenance, and pricing to find the perfect stone for your project.",
};

const MATERIALS = [
  {
    name: "Granite",
    slug: "granite",
    overview:
      "Natural stone with unique patterns. Extremely durable and heat-resistant — perfect for busy kitchens. Each slab is one-of-a-kind, adding character to your space.",
    priceRange: "$40–$80",
    color: "from-amber-800/20 to-stone-600/20",
  },
  {
    name: "Quartz",
    slug: "quartz",
    overview:
      "Engineered stone that's virtually maintenance-free. Consistent patterns with no sealing required. Ideal for homeowners who want beauty without the upkeep.",
    priceRange: "$50–$100",
    color: "from-gray-400/20 to-slate-300/20",
  },
  {
    name: "Marble",
    slug: "marble",
    overview:
      "Timeless elegance with distinctive veining. The luxury choice for bathrooms and statement pieces. Requires more care but delivers unmatched aesthetic appeal.",
    priceRange: "$60–$120",
    color: "from-gray-100/40 to-gray-200/30",
  },
  {
    name: "Quartzite",
    slug: "quartzite",
    overview:
      "Natural stone with the look of marble and the durability of granite. The best of both worlds for Gulf Coast homes. Beautiful patterns with excellent heat resistance.",
    priceRange: "$55–$110",
    color: "from-stone-300/20 to-neutral-400/20",
  },
];

export default function MaterialsPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Education"
            title="Countertop Materials Guide"
            description="Choosing the right countertop material is one of the most important decisions for your renovation. Learn about granite, quartz, marble, and quartzite — their pros, cons, maintenance needs, and which best fits your Bay County lifestyle."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIALS.map((material, i) => (
              <AnimateInView key={material.slug} delay={i * 0.08}>
                <Link
                  href={`/materials/${material.slug}`}
                  className="group block overflow-hidden rounded-xl border border-warm-medium bg-white transition-all hover:border-gold hover:shadow-md"
                >
                  <div
                    className={cn(
                      "flex h-40 items-center justify-center bg-gradient-to-br",
                      material.color
                    )}
                  >
                    <span className="font-heading text-4xl font-bold text-navy/30">
                      {material.name[0]}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-navy group-hover:text-gold">
                      {material.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {material.overview}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gold">
                      {material.priceRange}/LF
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </AnimateInView>
            ))}
          </div>

          {/* Comparison tool CTA */}
          <AnimateInView delay={0.4}>
            <div className="mt-12 rounded-xl border-2 border-gold bg-gold/5 p-6 sm:p-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy">
                      Can't Decide Between Materials?
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use our side-by-side comparison tool to compare durability, maintenance, price, and Gulf Coast suitability.
                    </p>
                  </div>
                </div>
                <Link
                  href="/materials/compare"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-heading font-semibold text-navy transition-colors hover:bg-gold-dark hover:text-white"
                >
                  Compare Materials <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      <CTABanner
        headline="Ready to Choose Your Stone?"
        description="Schedule a showroom visit or get a free estimate. We'll help you find the perfect material for your Bay County home."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
