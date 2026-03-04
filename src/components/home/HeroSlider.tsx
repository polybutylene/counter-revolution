"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Shield } from "lucide-react";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";

interface HeroSliderProps {
  beforeImage?: string;
  afterImage?: string;
}

export function HeroSlider({
  beforeImage = "/images/hero-before.png",
  afterImage = "/images/hero-after.png",
}: HeroSliderProps) {
  return (
    <section className="relative bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              See Your Home Transformed
            </h1>
            <p className="mt-2 text-lg font-semibold text-gold sm:text-xl">
              Before You Commit
            </p>
            <p className="mt-4 text-base text-gray-300 sm:text-lg">
              Browse our curated collections, compare options, and get a free
              estimate — all online, no showroom visit needed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="gold" size="xl" asChild>
                <Link href="/services/stone">Explore Our Services</Link>
              </Button>
              <Button variant="outlineGold" size="xl" asChild>
                <Link href="/portfolio">See Our Work</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300 lg:justify-start">
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

          {/* Before/After Slider */}
          <div className="relative">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeAlt="Room before renovation"
              afterAlt="Room after renovation by Stratum Co."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
