"use client";

import Link from "next/link";
import { ArrowRight, Diamond, Grid3X3, Paintbrush, Layers } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { SERVICE_CARDS } from "@/data/services/config";

const iconMap: Record<string, React.ReactNode> = {
  diamond: <Diamond className="h-5 w-5" />,
  grid: <Grid3X3 className="h-5 w-5" />,
  paintbrush: <Paintbrush className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
};

export function ServiceCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="Four Trades. One Standard."
          description="Every surface in your home, handled by one team you trust."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICE_CARDS.map((service, i) => (
            <AnimateInView key={service.id} delay={i * 0.1}>
              <Link
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-warm-medium bg-white transition-shadow hover:shadow-md"
              >
                {/* Image placeholder area */}
                <div className="relative aspect-[16/9] overflow-hidden bg-navy/5">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-navy/20">
                      {iconMap[service.icon] && (
                        <div className="scale-[4]">{iconMap[service.icon]}</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
                    {iconMap[service.icon]}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold text-navy group-hover:text-gold">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-gold">
                    {service.priceRange}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
