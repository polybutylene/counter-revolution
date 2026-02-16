import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapPin } from "lucide-react";
import { AnimateInView } from "@/components/shared/AnimateInView";

const SERVICE_AREAS = [
  { name: "Panama City", slug: "panama-city" },
  { name: "Panama City Beach", slug: "panama-city-beach" },
  { name: "Lynn Haven", slug: "lynn-haven" },
  { name: "Callaway", slug: "callaway" },
  { name: "Springfield", slug: "springfield" },
  { name: "Parker", slug: "parker" },
  { name: "Mexico Beach", slug: "mexico-beach" },
  { name: "30A Corridor", slug: "30a" },
  { name: "Santa Rosa Beach", slug: "santa-rosa-beach" },
];

export function ServiceAreaMap() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Service Area"
          title="Serving All of Bay County & the Emerald Coast"
          description="Professional countertop fabrication and installation throughout Northwest Florida."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Map Embed */}
          <AnimateInView>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-warm-medium bg-warm-light">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220164.5561515891!2d-85.85!3d30.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8894e4b4b4b4b4b5%3A0x0!2sBay%20County%2C%20FL!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Countertop Revolution service area map"
              />
            </div>
          </AnimateInView>

          {/* City Links */}
          <AnimateInView delay={0.1}>
            <div className="flex flex-col justify-center">
              <h3 className="font-heading text-xl font-semibold text-navy">
                Cities We Serve
              </h3>
              <p className="mt-2 text-muted-foreground">
                Click a city to learn about our countertop services in your area.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {SERVICE_AREAS.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/service-area/${area.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-warm-medium bg-white p-3 text-sm font-medium text-dark transition-all hover:border-gold hover:text-navy"
                  >
                    <MapPin className="h-4 w-4 text-gold" />
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
