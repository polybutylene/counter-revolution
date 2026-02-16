import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const ContactForm = dynamic(
  () => import("@/components/contact/ContactForm").then((m) => m.ContactForm),
  { ssr: false, loading: () => <div className="h-96 animate-pulse rounded-xl bg-warm-medium" /> }
);
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Quote",
  description: "Request a free countertop estimate or ask a question. Call, email, or fill out our form. Counter Revolution serves all of Bay County, FL.",
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
                Get in Touch
              </h1>
              <p className="mt-3 text-muted-foreground">
                Tell us about your project and we&apos;ll get back to you within 24 hours.
              </p>
              <div className="mt-2">
                <Link
                  href="/estimate"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-dark"
                >
                  Or use our Instant Estimator for a quick ballpark price <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <div className="rounded-xl border border-warm-medium bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-navy">
                  Contact Information
                </h2>
                <ul className="mt-6 space-y-5">
                  <li>
                    <a href="tel:+18500000000" className="flex items-start gap-3 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warm-light text-navy group-hover:bg-gold/10 group-hover:text-gold">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy group-hover:text-gold">(850) 000-0000</p>
                        <p className="text-sm text-muted-foreground">Tap to call</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@counterrevolution.com" className="flex items-start gap-3 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warm-light text-navy group-hover:bg-gold/10 group-hover:text-gold">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy group-hover:text-gold">info@counterrevolution.com</p>
                        <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warm-light text-navy">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Panama City, FL 32401</p>
                      <p className="text-sm text-muted-foreground">Showroom visits by appointment</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warm-light text-navy">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Business Hours</p>
                      <p className="text-sm text-muted-foreground">Mon–Fri: 8:00 AM – 5:00 PM</p>
                      <p className="text-sm text-muted-foreground">Saturday: By appointment</p>
                      <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map */}
              <div className="mt-6 overflow-hidden rounded-xl border border-warm-medium">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110082.27!2d-85.68!3d30.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPanama%20City%2C%20FL!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Counter Revolution location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
