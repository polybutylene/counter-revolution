import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, ChefHat, Bath, Sun, Building2, Wrench, Grid3X3 } from "lucide-react";

const SERVICE_AREAS_SLUGS = [
  "panama-city",
  "panama-city-beach",
  "lynn-haven",
  "callaway",
  "springfield",
  "parker",
  "mexico-beach",
  "30a",
  "santa-rosa-beach",
] as const;

const SERVICES = [
  { name: "Kitchen Countertops", slug: "kitchen-countertops", icon: ChefHat },
  { name: "Bathroom Vanities", slug: "bathroom-vanities", icon: Bath },
  { name: "Outdoor Kitchens", slug: "outdoor-kitchens", icon: Sun },
  { name: "Commercial Countertops", slug: "commercial-countertops", icon: Building2 },
  { name: "Countertop Repair", slug: "countertop-repair", icon: Wrench },
  { name: "Backsplash Installation", slug: "backsplash-installation", icon: Grid3X3 },
];

const PLACEHOLDER_TESTIMONIALS = [
  { _id: "1", name: "Sarah M.", quote: "Counter Revolution transformed our kitchen completely. The quartz countertops are absolutely stunning and the installation was done in just one day.", rating: 5, projectType: "Kitchen Countertops", city: "" },
  { _id: "2", name: "David & Lisa R.", quote: "We shopped around for months and nobody came close to the quality and pricing. Our granite countertops exceeded every expectation.", rating: 5, projectType: "Kitchen Countertops", city: "" },
  { _id: "3", name: "Mike T.", quote: "As a general contractor, I need reliable partners. Counter Revolution delivers on time, every time. Fabrication quality is the best in Bay County.", rating: 5, projectType: "Commercial", city: "" },
];

const SERVICE_AREAS_DATA: Record<
  string,
  {
    cityName: string;
    intro: [string, string];
    mapCenter: { lat: number; lng: number };
  }
> = {
  "panama-city": {
    cityName: "Panama City",
    intro: [
      "Panama City is the vibrant heart of Bay County, home to the historic St. Andrews waterfront, the marina district, and neighborhoods like Millville and Cove. Counter Revolution has been serving Panama City homeowners and businesses with premium granite, quartz, marble, and quartzite fabrication for years.",
      "Whether you're near the downtown Government Center, the Cove neighborhood, or along 23rd Street, we bring our showroom expertise and professional installation directly to your door. Free measurements, transparent pricing, and 7–10 day turnaround make your kitchen or bathroom remodel stress-free.",
    ],
    mapCenter: { lat: 30.1588, lng: -85.6602 },
  },
  "panama-city-beach": {
    cityName: "Panama City Beach",
    intro: [
      "From Front Beach Road to Back Beach Road, Panama City Beach is Florida's premier Gulf Coast destination. We serve homeowners in communities like Laguna Beach, Sunnyside, and the West End, as well as vacation rental properties near Pier Park and Shipwreck Island.",
      "Salt air and humidity are facts of life on the beach. We help PCB residents choose materials that stand up to the elements—granite and quartzite for outdoor kitchens, quartz for low-maintenance interiors. Same great service whether you're remodeling a beach house or a year-round home.",
    ],
    mapCenter: { lat: 30.1766, lng: -85.8055 },
  },
  "lynn-haven": {
    cityName: "Lynn Haven",
    intro: [
      "Lynn Haven offers a tight-knit community feel just minutes from Panama City. With areas like Mosley, Hiland Park, and the expanding North Bay corridor, more families are investing in kitchen and bathroom upgrades that add value and style.",
      "Counter Revolution serves Lynn Haven from our central Bay County location. We're your neighbors—quick to schedule measurements, flexible on material selection, and committed to clean, professional installations. Many of our happiest customers are right here in Lynn Haven.",
    ],
    mapCenter: { lat: 30.2455, lng: -85.6483 },
  },
  callaway: {
    cityName: "Callaway",
    intro: [
      "Callaway sits along Highway 231 and 77, blending suburban convenience with easy access to Tyndall Air Force Base and the broader Bay County area. Neighborhoods like Callaway Bay, Sweet Bay, and the Oak Grove area are home to growing families upgrading their spaces.",
      "We've installed countertops in Callaway homes for years—kitchens, bathrooms, outdoor kitchens, and more. Whether you're near the Callaway Arts and Conference Center or tucked into a quiet cul-de-sac, we bring the same quality service and material selection you'd find at our showroom.",
    ],
    mapCenter: { lat: 30.153, lng: -85.57 },
  },
  springfield: {
    cityName: "Springfield",
    intro: [
      "Springfield is a historic community nestled between Panama City and Lynn Haven, with easy access to both. Residents in Springfield enjoy a small-town feel while staying close to shopping, schools, and the waterfront.",
      "Counter Revolution provides full-service countertop fabrication and installation throughout Springfield. From cozy bungalows to modern builds, we help you choose the right stone—granite, quartz, marble, or quartzite—and install it with precision. Free estimates and friendly, local service.",
    ],
    mapCenter: { lat: 30.1533, lng: -85.6114 },
  },
  parker: {
    cityName: "Parker",
    intro: [
      "Parker sits along the Intracoastal Waterway and Highway 98, offering waterfront living and easy commutes. Neighborhoods near Jinks Elementary, the Parker Basin, and along the canals are full of homeowners investing in their kitchens and baths.",
      "We serve Parker with the same attention to detail and local expertise we bring everywhere in Bay County. Waterfront homes deserve beautiful, durable surfaces—we help you select materials that handle humidity and look stunning for years to come.",
    ],
    mapCenter: { lat: 30.1313, lng: -85.6033 },
  },
  "mexico-beach": {
    cityName: "Mexico Beach",
    intro: [
      "Mexico Beach is the 'Sugar Sands of the Forgotten Coast' — a quiet, charming beach community east of Panama City. Residents and second-home owners here value quality craftsmanship and materials that can handle the Gulf Coast climate.",
      "Counter Revolution extends our service area to Mexico Beach, bringing showroom-quality fabrication and installation to your doorstep. We help you choose stone that stands up to salt air, humidity, and the occasional storm—and we deliver with the same reliability you expect from a local team.",
    ],
    mapCenter: { lat: 29.948, lng: -85.42 },
  },
  "30a": {
    cityName: "30A",
    intro: [
      "Scenic Highway 30A winds through some of Florida's most sought-after beach communities—Seaside, Rosemary Beach, Alys Beach, WaterColor, Dune Allen, Blue Mountain, and more. These distinctive villages blend coastal charm with high-end design.",
      "Counter Revolution serves the entire 30A corridor with premium stone fabrication and installation. Whether you're building a vacation retreat or a forever home, we help you select materials that match the sophistication of your community. Marble, quartzite, and quartz are popular choices here—and we deliver with white-glove service.",
    ],
    mapCenter: { lat: 30.361, lng: -86.211 },
  },
  "santa-rosa-beach": {
    cityName: "Santa Rosa Beach",
    intro: [
      "Santa Rosa Beach anchors the western end of the 30A corridor, with Gulf Place, Eastern Lake, and nearby Inlet Beach offering a mix of beach-town vibes and upscale living. Homeowners here expect exceptional quality and service.",
      "We've installed countertops in Santa Rosa Beach homes for years—kitchens with ocean views, bathrooms in vacation rentals, and outdoor kitchens that entertain. Our team understands the unique design aesthetic of the Emerald Coast and helps you choose stone that complements your home perfectly.",
    ],
    mapCenter: { lat: 30.361, lng: -86.211 },
  },
};

interface ServiceAreaPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const area = SERVICE_AREAS_DATA[params.slug];
  if (!area) return {};
  return {
    title: `Countertop Installation in ${area.cityName}, Florida`,
    description: `${area.intro[0].slice(0, 155)}...`,
  };
}

export function generateStaticParams() {
  return SERVICE_AREAS_SLUGS.map((slug) => ({ slug }));
}

export default function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const area = SERVICE_AREAS_DATA[params.slug];
  if (!area) notFound();

  const testimonialsWithCity = PLACEHOLDER_TESTIMONIALS.map((t) => ({
    ...t,
    city: area.cityName,
  }));

  const mapEmbedUrl = `https://www.google.com/maps?q=${area.mapCenter.lat},${area.mapCenter.lng}&z=12&output=embed`;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Countertop Installation in {area.cityName}, Florida
          </h1>
          <p className="mt-4 text-lg text-gray-300">{area.intro[0]}</p>
          <p className="mt-3 text-lg text-gray-300">{area.intro[1]}</p>
          <div className="mt-8">
            <Button variant="gold" size="xl" asChild>
              <Link href="/showroom">Get Your Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service List */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Services"
            title={`Countertop Services in ${area.cityName}`}
            description="Full-service fabrication and installation for every type of project."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <AnimateInView key={service.slug} delay={i * 0.06}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-warm-medium bg-white p-5 transition-all hover:border-gold hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-warm-light text-navy group-hover:bg-gold/10 group-hover:text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-navy group-hover:text-gold">
                        {service.name}
                      </h3>
                      <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </AnimateInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects in City */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title={`Projects in ${area.cityName}`}
            description="Recent countertop installations we've completed in your area."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <AnimateInView key={i} delay={(i - 1) * 0.1}>
                <Link href="/portfolio">
                  <Card className="overflow-hidden transition-shadow hover:shadow-md">
                    <div className="aspect-[4/3] bg-warm-medium">
                      <div className="flex h-full items-center justify-center">
                        <span className="font-heading text-4xl font-bold text-navy/10">CR</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="text-xs">
                        Kitchen
                      </Badge>
                      <h3 className="mt-2 font-heading font-semibold text-navy">
                        {area.cityName} Kitchen Remodel
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Quartz countertops • Modern design
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Reviews"
            title={`Testimonials from ${area.cityName}`}
            description="What homeowners in your area say about working with us."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonialsWithCity.map((t, i) => (
              <AnimateInView key={t._id} delay={i * 0.08}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <StarRating rating={t.rating} size="md" />
                    <blockquote className="mt-3 text-dark">&ldquo;{t.quote}&rdquo;</blockquote>
                    <p className="mt-4 font-heading font-semibold text-navy">{t.name}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {t.projectType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {t.city}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Find Us"
            title={`Serving ${area.cityName}`}
            description="We travel to your location for free measurements and installation."
          />
          <AnimateInView className="mt-10">
            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-warm-medium">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Counter Revolution service area - ${area.cityName}, FL`}
              />
            </div>
          </AnimateInView>
        </div>
      </section>

      <CTABanner
        headline={`Ready for New Countertops in ${area.cityName}?`}
        description="Get a free estimate. We'll measure, advise, and install with the quality you deserve."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
