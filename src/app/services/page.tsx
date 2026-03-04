import { Metadata } from "next";
import Link from "next/link";
import { Diamond, Grid3X3, Paintbrush, Layers, ArrowRight, Star, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICE_CARDS } from "@/data/services/config";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Our Services | Stratum Co.",
  description: "Stone countertops, tile, painting, and flooring — all from one trusted team. Transparent pricing, free estimates.",
};

const iconMap: Record<string, React.ReactNode> = {
  diamond: <Diamond className="h-6 w-6" />,
  grid: <Grid3X3 className="h-6 w-6" />,
  paintbrush: <Paintbrush className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Four trades, one standard. Every surface in your home, handled by one team you trust.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" />
              4.8 · 120+ Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-gold" />
              Free Estimates, Always
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICE_CARDS.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group flex gap-4 overflow-hidden rounded-xl border border-warm-medium bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                  {iconMap[service.icon]}
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-lg font-bold text-navy group-hover:text-gold">
                    {service.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gold">
                    {service.priceRange}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Get Started?"
        description="Get a free, no-pressure estimate for any of our services."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/showroom" }}
        phone="(850) 000-0000"
        variant="navy"
      />
    </>
  );
}
