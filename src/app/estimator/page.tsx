import { Metadata } from "next";
import Link from "next/link";
import { Diamond, Grid3X3, Paintbrush, Layers, ArrowRight, Star, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICE_CARDS } from "@/data/services/config";

export const metadata: Metadata = {
  title: "Instant Estimator | Stratum Co.",
  description: "Get instant, transparent estimates for countertops, tile, painting, and flooring. No hidden costs, no pressure.",
};

const iconMap: Record<string, React.ReactNode> = {
  diamond: <Diamond className="h-8 w-8" />,
  grid: <Grid3X3 className="h-8 w-8" />,
  paintbrush: <Paintbrush className="h-8 w-8" />,
  layers: <Layers className="h-8 w-8" />,
};

export default function EstimatorHubPage() {
  return (
    <>
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Instant Estimator
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Get a transparent estimate in under 2 minutes. No hidden costs, no surprises.
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
          <SectionHeading
            label="Choose a Service"
            title="What Would You Like to Estimate?"
            description="Select a service to get started with your instant estimate."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICE_CARDS.map((service) => (
              <Link
                key={service.id}
                href={`/estimator/${service.id}`}
                className="group flex flex-col items-center overflow-hidden rounded-xl border border-warm-medium bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white">
                  {iconMap[service.icon]}
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-navy group-hover:text-gold">
                  {service.name} Estimator
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-3 text-sm font-semibold text-gold">
                  {service.priceRange}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                  Start Estimate <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
