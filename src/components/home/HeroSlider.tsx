"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";

interface HeroSliderProps {
  headline?: string;
  subheadline?: string;
  beforeImage?: string;
  afterImage?: string;
}

export function HeroSlider({
  headline = "Bay County's Most Trusted Countertop Experts",
  subheadline = "Granite · Quartz · Marble · Quartzite — Fabricated & Installed by Local Craftsmen",
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
              {headline}
            </h1>
            <p className="mt-4 text-lg text-gray-300 sm:text-xl">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="gold" size="xl" asChild>
                <Link href="/showroom">Get Your Free Estimate</Link>
              </Button>
              <Button variant="outlineGold" size="xl" asChild>
                <Link href="/portfolio">See Our Work</Link>
              </Button>
            </div>
          </div>

          {/* Before/After Slider */}
          <div className="relative">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeAlt="Kitchen before countertop renovation"
              afterAlt="Kitchen after countertop installation by Counter Revolution"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
