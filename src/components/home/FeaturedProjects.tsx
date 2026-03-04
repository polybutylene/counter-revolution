"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProject {
  _id: string;
  title: string;
  slug: string;
  heroImage?: string;
  materialType?: { name: string };
  serviceType?: string;
  roomType?: string;
  description?: string;
  city?: string;
}

const PLACEHOLDER_PROJECTS: FeaturedProject[] = [
  { _id: "1", title: "Modern Kitchen Renovation", slug: "modern-kitchen", materialType: { name: "Quartz" }, serviceType: "stone", roomType: "kitchen", city: "Panama City" },
  { _id: "2", title: "Coastal Bathroom Vanity", slug: "coastal-bathroom", materialType: { name: "Marble" }, serviceType: "stone", roomType: "bathroom", city: "Panama City Beach" },
  { _id: "3", title: "Herringbone Backsplash", slug: "herringbone-backsplash", materialType: { name: "Porcelain" }, serviceType: "tile", roomType: "kitchen", city: "Lynn Haven" },
  { _id: "4", title: "Elegant Master Bath Tile", slug: "master-bath-tile", materialType: { name: "Marble Mosaic" }, serviceType: "tile", roomType: "bathroom", city: "30A" },
  { _id: "5", title: "Whole Home Interior Paint", slug: "whole-home-paint", materialType: { name: "Interior Paint" }, serviceType: "coating", roomType: "living room", city: "Panama City" },
  { _id: "6", title: "Cabinet Refinishing", slug: "cabinet-refinishing", materialType: { name: "Cabinet Paint" }, serviceType: "coating", roomType: "kitchen", city: "Lynn Haven" },
  { _id: "7", title: "LVP Open Plan Installation", slug: "lvp-open-plan", materialType: { name: "LVP" }, serviceType: "flooring", roomType: "open plan", city: "Panama City Beach" },
  { _id: "8", title: "Garage Epoxy Floor", slug: "garage-epoxy", materialType: { name: "Epoxy" }, serviceType: "flooring", roomType: "garage", city: "Callaway" },
];

const SERVICE_FILTERS = [
  { id: "all", label: "All" },
  { id: "stone", label: "Stone" },
  { id: "tile", label: "Tile" },
  { id: "coating", label: "Coating" },
  { id: "flooring", label: "Flooring" },
];

interface FeaturedProjectsProps {
  projects?: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [filter, setFilter] = useState("all");
  const displayProjects = projects && projects.length > 0 ? projects : PLACEHOLDER_PROJECTS;

  const filtered = useMemo(() => {
    if (filter === "all") return displayProjects;
    return displayProjects.filter((p) => p.serviceType === filter);
  }, [displayProjects, filter]);

  return (
    <section className="bg-warm-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Featured Projects"
          description="See the transformations we've delivered for Bay County homeowners."
        />

        {/* Filter Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2 overflow-x-auto">
            {SERVICE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  filter === f.id
                    ? "bg-navy text-white"
                    : "bg-white text-dark hover:bg-warm-medium"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 4).map((project, i) => (
            <AnimateInView key={project._id} delay={i * 0.1}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-warm-medium">
                  {project.heroImage ? (
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <Gem className="h-12 w-12 opacity-30" />
                    </div>
                  )}
                  {project.materialType && (
                    <Badge variant="gold" className="absolute left-3 top-3">
                      {project.materialType.name}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-semibold text-navy group-hover:text-gold">
                    {project.title}
                  </h3>
                  {project.roomType && (
                    <p className="mt-1 text-xs capitalize text-muted-foreground">
                      {project.roomType} {project.city && `· ${project.city}`}
                    </p>
                  )}
                </div>
              </Link>
            </AnimateInView>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-navy hover:text-gold"
          >
            See All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Gem({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20M12 22L8 9l4-6 4 6z" />
    </svg>
  );
}
