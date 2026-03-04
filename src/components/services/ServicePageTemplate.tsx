"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Badge } from "@/components/ui/badge";
import { CTABanner } from "@/components/shared/CTABanner";
import type { ServiceConfig, Product } from "@/data/services/config";

const CATEGORY_PLACEHOLDER_COLORS = [
  "bg-warm-light",
  "bg-warm-medium",
  "bg-navy/10",
  "bg-gold/15",
  "bg-navy-light/20",
  "bg-gold/10",
] as const;

function getCategoryColor(category: string): string {
  const index = category.charCodeAt(0) % CATEGORY_PLACEHOLDER_COLORS.length;
  return CATEGORY_PLACEHOLDER_COLORS[index];
}

export function ServicePageTemplate({ service }: { service: ServiceConfig }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const topProducts = useMemo(() => {
    const all: Product[] = [];
    for (const cat of service.materials) {
      for (const p of cat.products) {
        all.push(p);
      }
    }
    return all.slice(0, 6);
  }, [service.materials]);

  return (
    <>
      {/* Service Hero */}
      <section className="bg-navy px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            {service.name}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {service.heroHeadline}
          </h1>
          <p className="mt-4 text-lg text-gray-300">{service.heroSubtitle}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button variant="gold" size="lg" asChild>
              <Link href={`/showroom/${service.id}`}>
                Try Our Virtual Showroom
              </Link>
            </Button>
            <Button variant="outlineGold" size="lg" asChild>
              <Link href={`/estimator/${service.id}`}>
                Get Instant Estimate
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" />
              4.8 · 120+ Reviews
            </span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-gold" />
              Free Estimates, Always
            </span>
          </div>
        </div>
      </section>

      {/* Material Cards Section */}
      <section className="bg-warm-light px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AnimateInView>
            <SectionHeading
              label="VIRTUAL SHOWROOM"
              title="Browse Materials"
              align="center"
            />
          </AnimateInView>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topProducts.map((product, i) => (
              <AnimateInView key={product.id} delay={i * 0.05}>
                <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div
                    className={`flex h-32 items-center justify-center ${getCategoryColor(product.category)}`}
                  >
                    <span className="font-heading text-4xl font-bold text-navy/40">
                      {product.category.charAt(0)}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {product.badge && (
                        <Badge variant="gold" className="text-xs">
                          {product.badge}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-navy">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-gold">
                      {product.priceRange}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outlineGold" size="sm" asChild>
                        <Link href={`/showroom/${service.id}`}>Details</Link>
                      </Button>
                      <Button variant="gold" size="sm" asChild>
                        <Link href={`/estimator/${service.id}`}>Estimate</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`/showroom/${service.id}`}
              className="inline-flex items-center gap-2 font-heading font-semibold text-gold transition-colors hover:text-gold-dark"
            >
              View All Materials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <AnimateInView>
            <SectionHeading
              label="FAQ"
              title="Common Questions"
              align="center"
            />
          </AnimateInView>
          <div className="mt-12">
            {service.faqs.map((faq, index) => (
              <AnimateInView key={index} delay={index * 0.05}>
                <div className="border-b border-gray-200 last:border-b-0">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="flex w-full items-center justify-between py-5 text-left font-heading text-lg font-semibold text-navy transition-colors hover:text-navy-light"
                    aria-expanded={openFaqIndex === index}
                  >
                    {faq.question}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold transition-transform duration-200 ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-200 ease-in-out"
                    style={{
                      maxHeight: openFaqIndex === index ? "500px" : "0",
                    }}
                  >
                    <p className="pb-5 text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        headline={`Start Your ${service.name} Project Today`}
        description="Get a free, no-pressure estimate."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/showroom" }}
        phone="(850) 000-0000"
        variant="navy"
      />
    </>
  );
}
