"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    _id: "1",
    title: "Modern Kitchen Transformation",
    slug: "modern-kitchen-transformation",
    materialType: "Granite",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    style: "Modern",
    budgetRange: "$5,000–$8,000",
    city: "Panama City",
  },
  {
    _id: "2",
    title: "Coastal Bathroom Vanity",
    slug: "coastal-bathroom-vanity",
    materialType: "Quartz",
    serviceType: "Bathroom Vanities",
    roomType: "Bathroom",
    style: "Coastal",
    budgetRange: "$1,500–$2,500",
    city: "Panama City Beach",
  },
  {
    _id: "3",
    title: "Outdoor Kitchen Paradise",
    slug: "outdoor-kitchen-paradise",
    materialType: "Quartzite",
    serviceType: "Outdoor Kitchens",
    roomType: "Outdoor",
    style: "Transitional",
    budgetRange: "$6,000–$10,000",
    city: "Lynn Haven",
  },
  {
    _id: "4",
    title: "Elegant Marble Master Bath",
    slug: "elegant-marble-master-bath",
    materialType: "Marble",
    serviceType: "Bathroom Vanities",
    roomType: "Bathroom",
    style: "Traditional",
    budgetRange: "$3,000–$5,000",
    city: "Panama City",
  },
  {
    _id: "5",
    title: "Restaurant Bar Installation",
    slug: "restaurant-bar-installation",
    materialType: "Quartz",
    serviceType: "Commercial Countertops",
    roomType: "Commercial",
    style: "Modern",
    budgetRange: "$8,000–$15,000",
    city: "Panama City Beach",
  },
  {
    _id: "6",
    title: "Transitional Kitchen Renovation",
    slug: "transitional-kitchen-renovation",
    materialType: "Granite",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    style: "Transitional",
    budgetRange: "$4,000–$7,000",
    city: "Callaway",
  },
  {
    _id: "7",
    title: "Coastal Kitchen Refresh",
    slug: "coastal-kitchen-refresh",
    materialType: "Quartz",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    style: "Coastal",
    budgetRange: "$5,500–$9,000",
    city: "Panama City Beach",
  },
  {
    _id: "8",
    title: "Traditional Home Bar",
    slug: "traditional-home-bar",
    materialType: "Marble",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    style: "Traditional",
    budgetRange: "$2,500–$4,000",
    city: "Panama City",
  },
];

const MATERIAL_FILTERS = ["All", "Granite", "Quartz", "Marble", "Quartzite"];
const ROOM_FILTERS = ["All", "Kitchen", "Bathroom", "Outdoor", "Commercial"];
const STYLE_FILTERS = ["All", "Modern", "Traditional", "Transitional", "Coastal"];

export default function PortfolioPage() {
  const [materialFilter, setMaterialFilter] = useState("All");
  const [roomFilter, setRoomFilter] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [displayCount, setDisplayCount] = useState(6);

  const filteredProjects = PROJECTS.filter((p) => {
    if (materialFilter !== "All" && p.materialType !== materialFilter)
      return false;
    if (roomFilter !== "All" && p.roomType !== roomFilter) return false;
    if (styleFilter !== "All" && p.style !== styleFilter) return false;
    return true;
  });

  const visibleProjects = filteredProjects.slice(0, displayCount);
  const hasMore = displayCount < filteredProjects.length;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Work"
            title="Portfolio"
            description="Explore our countertop installations across Bay County. From kitchen transformations to outdoor kitchens, see the quality and craftsmanship we deliver."
          />

          {/* Filters */}
          <div className="mt-10 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-dark">Material</p>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMaterialFilter(filter)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                      materialFilter === filter
                        ? "border-gold bg-gold text-navy"
                        : "border-warm-medium bg-white text-dark hover:border-gold/50"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-dark">Room</p>
              <div className="flex flex-wrap gap-2">
                {ROOM_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setRoomFilter(filter)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                      roomFilter === filter
                        ? "border-gold bg-gold text-navy"
                        : "border-warm-medium bg-white text-dark hover:border-gold/50"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-dark">Style</p>
              <div className="flex flex-wrap gap-2">
                {STYLE_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStyleFilter(filter)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                      styleFilter === filter
                        ? "border-gold bg-gold text-navy"
                        : "border-warm-medium bg-white text-dark hover:border-gold/50"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Masonry grid */}
          <div
            className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3"
            style={{ columnFill: "balance" }}
          >
            {visibleProjects.map((project) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug}`}
                className="group mb-6 block break-inside-avoid"
              >
                <div className="overflow-hidden rounded-xl border border-warm-medium bg-white transition-all hover:border-gold hover:shadow-md">
                  <div className="aspect-[4/3] bg-gradient-to-br from-warm-medium to-warm-light" />
                  <div className="p-4">
                    <Badge variant="gold" className="mb-2">
                      {project.materialType}
                    </Badge>
                    <h3 className="font-heading text-lg font-semibold text-navy group-hover:text-gold">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.roomType}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No projects match the selected filters.
            </p>
          )}

          {hasMore && filteredProjects.length > 0 && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setDisplayCount((c) => c + 6)}
                className="rounded-lg border-2 border-gold bg-transparent px-8 py-3 font-heading font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        headline="Ready to Start Your Project?"
        description="Get a free estimate and join our portfolio of satisfied Bay County homeowners."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
