import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { ArrowRight, ChefHat, Bath, Sun, Building2, Wrench, Grid3X3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Countertop Services",
  description: "Full-service countertop fabrication and installation in Bay County, FL. Kitchen countertops, bathroom vanities, outdoor kitchens, commercial projects, repair, and backsplash.",
};

const SERVICES = [
  {
    name: "Kitchen Countertops",
    slug: "kitchen-countertops",
    icon: <ChefHat className="h-8 w-8" />,
    description: "The centerpiece of your home. We fabricate and install premium granite, quartz, marble, and quartzite kitchen countertops with precision.",
  },
  {
    name: "Bathroom Vanities",
    slug: "bathroom-vanities",
    icon: <Bath className="h-8 w-8" />,
    description: "Upgrade your bathrooms with custom stone vanity tops. Single sinks, double sinks, and full-slab statement pieces.",
  },
  {
    name: "Outdoor Kitchens",
    slug: "outdoor-kitchens",
    icon: <Sun className="h-8 w-8" />,
    description: "Built to withstand Florida summers. We install durable, weather-resistant countertops for outdoor cooking and entertaining spaces.",
  },
  {
    name: "Commercial Countertops",
    slug: "commercial-countertops",
    icon: <Building2 className="h-8 w-8" />,
    description: "Hotels, restaurants, offices, and retail. High-traffic surfaces that look premium and last. Volume pricing available.",
  },
  {
    name: "Countertop Repair",
    slug: "countertop-repair",
    icon: <Wrench className="h-8 w-8" />,
    description: "Chips, cracks, stains, and seam issues. We restore damaged stone countertops to like-new condition.",
  },
  {
    name: "Backsplash Installation",
    slug: "backsplash-installation",
    icon: <Grid3X3 className="h-8 w-8" />,
    description: "Complete the look with a matching stone backsplash. 4-inch or full-height options to complement your countertops.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Do"
            title="Our Countertop Services"
            description="From fabrication to installation, we provide a complete countertop experience for homeowners, contractors, and businesses throughout Bay County."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <AnimateInView key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-xl border border-warm-medium bg-white p-6 transition-all hover:border-gold hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-warm-light text-navy group-hover:bg-gold/10 group-hover:text-gold">
                    {service.icon}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy group-hover:text-gold">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>
      <CTABanner
        headline="Not Sure Which Service You Need?"
        description="Tell us about your project and we'll guide you to the right solution. Free estimates, always."
        primaryCTA={{ label: "Get a Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
