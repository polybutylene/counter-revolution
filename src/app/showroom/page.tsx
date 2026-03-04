import { Metadata } from "next";
import Link from "next/link";
import { Diamond, Grid3X3, Paintbrush, Layers, ArrowRight, Star, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICE_CARDS } from "@/data/services/config";

export const metadata: Metadata = {
  title: "Virtual Showroom | Browse Materials & Get Estimates",
  description:
    "Browse premium countertops, tile, paint colors, and flooring options. Get instant estimates online — no showroom visit needed.",
};

const iconMap: Record<string, React.ReactNode> = {
  diamond: <Diamond className="h-8 w-8" />,
  grid: <Grid3X3 className="h-8 w-8" />,
  paintbrush: <Paintbrush className="h-8 w-8" />,
  layers: <Layers className="h-8 w-8" />,
};

export default function ShowroomHubPage() {
  return (
    <>
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Virtual Showroom
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Browse our curated collections, compare options, and get a free
            estimate — all online, no showroom visit needed.
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
            label="Choose a Category"
            title="What Are You Looking For?"
            description="Select a service to browse materials and get an instant estimate."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICE_CARDS.map((service) => (
              <Link
                key={service.id}
                href={`/showroom/${service.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-warm-medium bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-center bg-navy/5 py-10">
                  <div className="text-navy/30 transition-colors group-hover:text-navy/50">
                    {iconMap[service.icon]}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-gold">
                    {service.name} Showroom
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-gold">
                    {service.priceRange}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                    Browse Collection <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
