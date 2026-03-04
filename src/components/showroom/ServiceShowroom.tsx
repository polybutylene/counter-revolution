"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ServiceConfig } from "@/data/services/config";

interface ServiceShowroomProps {
  service: ServiceConfig;
}

export function ServiceShowroom({ service }: ServiceShowroomProps) {
  return (
    <div className="min-h-screen bg-warm-light">
      {/* Header */}
      <div className="bg-navy py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/showroom"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Showroom
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {service.name} Showroom
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            {service.heroSubtitle}
          </p>
          <p className="mt-2 text-sm font-semibold text-gold">
            {service.priceRange}
          </p>
        </div>
      </div>

      {/* Materials */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="space-y-12">
          {service.materials.map((category) => (
            <section key={category.id}>
              <h2 className="font-heading text-2xl font-bold text-navy">
                {category.name}
              </h2>
              <p className="mt-1 text-muted-foreground">{category.description}</p>
              <p className="mt-1 text-sm font-semibold text-gold">
                {category.priceRange}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-xl border border-warm-medium bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {product.image ? (
                      <div className="aspect-[4/3] overflow-hidden bg-warm-light">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-navy/5 text-navy/20">
                        <span className="text-4xl font-bold">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading font-semibold text-navy">
                          {product.name}
                        </h3>
                        {product.badge && (
                          <span className="shrink-0 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-gold">
                        {product.priceRange}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
