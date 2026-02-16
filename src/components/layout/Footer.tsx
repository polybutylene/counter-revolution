import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ExternalLink } from "lucide-react";

const serviceLinks = [
  { label: "Kitchen Countertops", href: "/services/kitchen-countertops" },
  { label: "Bathroom Vanities", href: "/services/bathroom-vanities" },
  { label: "Outdoor Kitchens", href: "/services/outdoor-kitchens" },
  { label: "Commercial Countertops", href: "/services/commercial-countertops" },
  { label: "Countertop Repair", href: "/services/countertop-repair" },
  { label: "Backsplash Installation", href: "/services/backsplash-installation" },
];

const materialLinks = [
  { label: "Granite", href: "/materials/granite" },
  { label: "Quartz", href: "/materials/quartz" },
  { label: "Marble", href: "/materials/marble" },
  { label: "Quartzite", href: "/materials/quartzite" },
  { label: "Compare Materials", href: "/materials/compare" },
];

const serviceAreaLinks = [
  { label: "Panama City", href: "/service-area/panama-city" },
  { label: "Panama City Beach", href: "/service-area/panama-city-beach" },
  { label: "Lynn Haven", href: "/service-area/lynn-haven" },
  { label: "Callaway", href: "/service-area/callaway" },
  { label: "Springfield", href: "/service-area/springfield" },
  { label: "Parker", href: "/service-area/parker" },
  { label: "Mexico Beach", href: "/service-area/mexico-beach" },
  { label: "30A Corridor", href: "/service-area/30a" },
];

export function Footer() {
  return (
    <footer className="border-t border-warm-medium bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Countertop<span className="text-gold"> Revolution</span>
            </h3>
            <p className="mt-3 text-sm text-gray-300">
              Premium countertop fabrication &amp; installation in Bay County, Florida.
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+18500000000"
                  className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  (850) 000-0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@countertoprevolution.com"
                  className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@countertoprevolution.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Panama City, FL 32401</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Mon–Fri 8am–5pm<br />Sat by appointment</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Google Business" className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-gold">
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Services
            </h4>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Materials
            </h4>
            <ul className="mt-4 space-y-2">
              {materialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-2">
              {serviceAreaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges + Copyright */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="rounded-full bg-white/10 px-3 py-1">Licensed &amp; Insured</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Locally Owned</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Bay County, FL</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-200">Privacy Policy</Link>
            <span>&copy; {new Date().getFullYear()} Countertop Revolution. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
