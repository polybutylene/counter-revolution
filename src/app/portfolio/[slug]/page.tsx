import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/shared/CTABanner";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/shared/StarRating";

interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  materialType: string;
  serviceType: string;
  roomType: string;
  squareFootage?: number;
  edgeProfile?: string;
  city: string;
  completionDate: string;
  description: string;
  gallery: { src: string; alt: string }[];
  customerTestimonial?: { name: string; quote: string; rating: number };
}

const PROJECTS_DATA: Record<string, ProjectData> = {
  "modern-kitchen-transformation": {
    _id: "1",
    title: "Modern Kitchen Transformation",
    slug: "modern-kitchen-transformation",
    materialType: "Granite",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    squareFootage: 42,
    edgeProfile: "Eased edge",
    city: "Panama City",
    completionDate: "January 2024",
    description:
      "This stunning kitchen renovation features premium granite countertops with a contemporary eased edge. The homeowner wanted a durable, low-maintenance surface that could handle daily cooking while elevating the aesthetic. Our team fabricated and installed the countertops with precision, including a custom sink cutout and seamless integration with the new backsplash.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Completed kitchen countertops" },
      { src: "/images/hero-before.jpg", alt: "Kitchen before renovation" },
      { src: "/images/hero-after.jpg", alt: "Countertop detail" },
    ],
    customerTestimonial: {
      name: "Sarah M.",
      quote:
        "Counter Revolution exceeded our expectations. The granite is gorgeous and the installation was flawless. They were professional, on time, and left everything spotless.",
      rating: 5,
    },
  },
  "coastal-bathroom-vanity": {
    _id: "2",
    title: "Coastal Bathroom Vanity",
    slug: "coastal-bathroom-vanity",
    materialType: "Quartz",
    serviceType: "Bathroom Vanities",
    roomType: "Bathroom",
    squareFootage: 18,
    edgeProfile: "Ogee edge",
    city: "Panama City Beach",
    completionDate: "February 2024",
    description:
      "A beautiful quartz vanity top in a soft, coastal-inspired pattern. The homeowner chose quartz for its zero-maintenance lifestyle and consistent look. The ogee edge adds classic elegance to this beach-side bathroom.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Bathroom vanity" },
      { src: "/images/hero-before.jpg", alt: "Bathroom before" },
    ],
    customerTestimonial: {
      name: "Jennifer L.",
      quote: "Love our new quartz vanity! No sealing, easy to clean — perfect for our busy family. The team was a pleasure to work with.",
      rating: 5,
    },
  },
  "outdoor-kitchen-paradise": {
    _id: "3",
    title: "Outdoor Kitchen Paradise",
    slug: "outdoor-kitchen-paradise",
    materialType: "Quartzite",
    serviceType: "Outdoor Kitchens",
    roomType: "Outdoor",
    squareFootage: 55,
    edgeProfile: "Dupont edge",
    city: "Lynn Haven",
    completionDate: "March 2024",
    description:
      "This expansive outdoor kitchen features quartzite countertops chosen for their durability in Florida's climate. The stone handles heat, humidity, and direct sun exposure beautifully. Our team installed the countertops with outdoor-rated materials and proper support for the grill and sink areas.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Outdoor kitchen" },
      { src: "/images/hero-before.jpg", alt: "Outdoor space before" },
      { src: "/images/hero-after.jpg", alt: "Grill area detail" },
    ],
  },
  "elegant-marble-master-bath": {
    _id: "4",
    title: "Elegant Marble Master Bath",
    slug: "elegant-marble-master-bath",
    materialType: "Marble",
    serviceType: "Bathroom Vanities",
    roomType: "Bathroom",
    squareFootage: 24,
    edgeProfile: "Bullnose edge",
    city: "Panama City",
    completionDate: "December 2023",
    description:
      "Timeless Carrara marble brings luxury to this master bathroom. The homeowner wanted a classic, elegant look and was willing to maintain the stone properly. The result is a stunning focal point that elevates the entire space.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Marble vanity" },
      { src: "/images/hero-before.jpg", alt: "Bathroom before" },
    ],
    customerTestimonial: {
      name: "David R.",
      quote: "The marble is absolutely breathtaking. Yes, it requires some care, but it's worth it. Counter Revolution guided us through the whole process.",
      rating: 5,
    },
  },
  "restaurant-bar-installation": {
    _id: "5",
    title: "Restaurant Bar Installation",
    slug: "restaurant-bar-installation",
    materialType: "Quartz",
    serviceType: "Commercial Countertops",
    roomType: "Commercial",
    squareFootage: 85,
    edgeProfile: "Square edge",
    city: "Panama City Beach",
    completionDate: "November 2023",
    description:
      "Commercial-grade quartz countertops for a busy restaurant bar. The non-porous surface resists stains from spills, and the zero-maintenance requirement was a must for the owner. We coordinated with the contractor to install within their tight timeline.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Restaurant bar" },
      { src: "/images/hero-before.jpg", alt: "Bar area before" },
    ],
  },
  "transitional-kitchen-renovation": {
    _id: "6",
    title: "Transitional Kitchen Renovation",
    slug: "transitional-kitchen-renovation",
    materialType: "Granite",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    squareFootage: 38,
    edgeProfile: "Eased edge",
    city: "Callaway",
    completionDate: "April 2024",
    description:
      "A transitional kitchen blending traditional and modern elements. The granite countertops provide warmth and durability, with a color that complements both the cabinets and flooring.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Transitional kitchen" },
      { src: "/images/hero-before.jpg", alt: "Kitchen before" },
    ],
  },
  "coastal-kitchen-refresh": {
    _id: "7",
    title: "Coastal Kitchen Refresh",
    slug: "coastal-kitchen-refresh",
    materialType: "Quartz",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    squareFootage: 45,
    edgeProfile: "Eased edge",
    city: "Panama City Beach",
    completionDate: "May 2024",
    description:
      "Light, airy quartz countertops that capture the coastal vibe. The homeowner wanted a low-maintenance surface that would stay bright and clean with minimal effort.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Coastal kitchen" },
      { src: "/images/hero-before.jpg", alt: "Before renovation" },
    ],
    customerTestimonial: {
      name: "Michelle T.",
      quote: "Our kitchen feels brand new. The quartz is perfect — we don't worry about sealing or staining. Highly recommend!",
      rating: 5,
    },
  },
  "traditional-home-bar": {
    _id: "8",
    title: "Traditional Home Bar",
    slug: "traditional-home-bar",
    materialType: "Marble",
    serviceType: "Kitchen Countertops",
    roomType: "Kitchen",
    squareFootage: 12,
    edgeProfile: "Ogee edge",
    city: "Panama City",
    completionDate: "June 2024",
    description:
      "A elegant marble bar top for a home entertainment space. The marble adds sophistication and stays cool — perfect for serving beverages. The ogee edge complements the traditional cabinetry.",
    gallery: [
      { src: "/images/hero-after.jpg", alt: "Home bar" },
      { src: "/images/hero-before.jpg", alt: "Bar area before" },
    ],
  },
};

const getRelatedProjects = (currentSlug: string): ProjectData[] => {
  const all = Object.values(PROJECTS_DATA).filter((p) => p.slug !== currentSlug);
  return all.slice(0, 3);
};

interface PortfolioProjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const project = PROJECTS_DATA[params.slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.description.slice(0, 155) + "...",
  };
}

export function generateStaticParams() {
  return Object.values(PROJECTS_DATA).map((project) => ({
    slug: project.slug,
  }));
}

export default function PortfolioProjectPage({ params }: PortfolioProjectPageProps) {
  const project = PROJECTS_DATA[params.slug];
  if (!project) notFound();

  const relatedProjects = getRelatedProjects(project.slug);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Hero image placeholder */}
      <section className="bg-warm-light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] overflow-hidden rounded-b-xl bg-gradient-to-br from-warm-medium to-warm-light" />
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="rounded-xl border border-warm-medium bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-navy">
                  Project Details
                </h3>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Material</dt>
                    <dd className="font-medium text-dark">
                      <Badge variant="gold" className="mt-1">
                        {project.materialType}
                      </Badge>
                    </dd>
                  </div>
                  {project.squareFootage && (
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Square Footage
                      </dt>
                      <dd className="font-medium text-dark">
                        {project.squareFootage} sq ft
                      </dd>
                    </div>
                  )}
                  {project.edgeProfile && (
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Edge Profile
                      </dt>
                      <dd className="font-medium text-dark">
                        {project.edgeProfile}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-muted-foreground">Location</dt>
                    <dd className="font-medium text-dark">{project.city}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Completion
                    </dt>
                    <dd className="font-medium text-dark">
                      {project.completionDate}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-2">
              <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {project.description}
              </p>

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-heading text-xl font-semibold text-navy">
                    Gallery
                  </h2>
                  <ImageLightbox
                    images={project.gallery}
                    className="mt-4"
                  />
                </div>
              )}

              {/* Testimonial */}
              {project.customerTestimonial && (
                <div className="mt-12 rounded-xl border border-warm-medium bg-warm-light p-6">
                  <StarRating
                    rating={project.customerTestimonial.rating}
                    size="lg"
                    className="mb-3"
                  />
                  <blockquote className="font-body text-lg italic text-dark">
                    &ldquo;{project.customerTestimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 font-heading font-semibold text-navy">
                    — {project.customerTestimonial.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-semibold text-navy">
                Related Projects
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((related) => (
                  <Link
                    key={related._id}
                    href={`/portfolio/${related.slug}`}
                    className="group block overflow-hidden rounded-xl border border-warm-medium bg-white transition-all hover:border-gold hover:shadow-md"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-warm-medium to-warm-light" />
                    <div className="p-4">
                      <Badge variant="gold" className="mb-2">
                        {related.materialType}
                      </Badge>
                      <h3 className="font-heading font-semibold text-navy group-hover:text-gold">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {related.roomType}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        headline="Inspired? Start Your Project"
        description="Get a free estimate for your Bay County countertop project. We'll help you achieve the look you want."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
