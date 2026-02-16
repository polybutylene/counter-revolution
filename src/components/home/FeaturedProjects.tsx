import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface FeaturedProject {
  _id: string;
  title: string;
  slug: string;
  heroImage?: string;
  materialType?: { name: string };
  roomType?: string;
  description?: string;
  city?: string;
}

// Placeholder projects used when CMS isn't connected
const PLACEHOLDER_PROJECTS: FeaturedProject[] = [
  { _id: "1", title: "Modern Kitchen Renovation", slug: "modern-kitchen", materialType: { name: "Quartz" }, roomType: "kitchen", city: "Panama City" },
  { _id: "2", title: "Coastal Bathroom Vanity", slug: "coastal-bathroom", materialType: { name: "Marble" }, roomType: "bathroom", city: "Panama City Beach" },
  { _id: "3", title: "Outdoor Entertainment Kitchen", slug: "outdoor-kitchen", materialType: { name: "Granite" }, roomType: "outdoor", city: "Lynn Haven" },
  { _id: "4", title: "Elegant Master Bath", slug: "elegant-master-bath", materialType: { name: "Quartzite" }, roomType: "bathroom", city: "30A" },
];

interface FeaturedProjectsProps {
  projects?: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const displayProjects = projects && projects.length > 0 ? projects : PLACEHOLDER_PROJECTS;

  return (
    <section className="bg-warm-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Featured Projects"
          description="See the transformations we've delivered for Bay County homeowners."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayProjects.slice(0, 4).map((project, i) => (
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
