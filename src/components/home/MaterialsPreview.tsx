import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MATERIALS = [
  {
    name: "Granite",
    slug: "granite",
    description: "Natural stone with unique patterns. Extremely durable and heat-resistant — perfect for busy kitchens.",
    priceRange: "$40–$80/LF",
    color: "from-amber-800/20 to-stone-600/20",
  },
  {
    name: "Quartz",
    slug: "quartz",
    description: "Engineered stone that's virtually maintenance-free. Consistent patterns with no sealing required.",
    priceRange: "$50–$100/LF",
    color: "from-gray-400/20 to-slate-300/20",
  },
  {
    name: "Marble",
    slug: "marble",
    description: "Timeless elegance with distinctive veining. The luxury choice for bathrooms and statement pieces.",
    priceRange: "$60–$120/LF",
    color: "from-gray-100/40 to-gray-200/30",
  },
  {
    name: "Quartzite",
    slug: "quartzite",
    description: "Natural stone with the look of marble and the durability of granite. The best of both worlds.",
    priceRange: "$55–$110/LF",
    color: "from-stone-300/20 to-neutral-400/20",
  },
];

export function MaterialsPreview() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Materials"
          title="Premium Stone Options"
          description="Every countertop starts with the right stone. We'll help you find yours."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIALS.map((material, i) => (
            <AnimateInView key={material.slug} delay={i * 0.1}>
              <Link
                href={`/materials/${material.slug}`}
                className="group block overflow-hidden rounded-xl border border-warm-medium bg-white p-6 transition-all hover:border-gold hover:shadow-md"
              >
                <div
                  className={cn(
                    "mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br",
                    material.color
                  )}
                >
                  <span className="font-heading text-2xl font-bold text-navy/40">
                    {material.name[0]}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy group-hover:text-gold">
                  {material.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {material.description}
                </p>
                <p className="mt-3 text-sm font-semibold text-gold">
                  Starting at {material.priceRange}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy group-hover:text-gold">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
