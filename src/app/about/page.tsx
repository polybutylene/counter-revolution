import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Shield, Heart, Ruler, Award, Users, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Counter Revolution — locally owned countertop fabrication and installation serving Bay County, FL. Our story, team, and commitment to quality.",
};

const VALUES = [
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Craftsmanship",
    description: "Every slab is precision-cut using CNC machinery and hand-finished by experienced fabricators.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Transparency",
    description: "No hidden fees, no bait-and-switch. Our Instant Estimator and detailed quotes prove it.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Customer First",
    description: "We treat every home like our own. From first call to final walkthrough, your satisfaction is everything.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Locally Rooted",
    description: "We live and work in Bay County. We're your neighbors, and we take pride in improving our community one home at a time.",
  },
];

const TEAM = [
  { name: "Owner", role: "Founder & Lead Fabricator", bio: "With years of experience in the stone industry, our founder brought Counter Revolution to Bay County with a vision: make premium countertops accessible to every homeowner." },
  { name: "Lead Installer", role: "Installation Specialist", bio: "Our lead installer brings precision and care to every project, ensuring your countertops are perfectly level, seamless, and beautiful." },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            About Counter Revolution
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Locally owned. Quality driven. Proudly serving Bay County and the Emerald Coast.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Our Story" title="Built on a Simple Belief" align="left" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Counter Revolution was born from a straightforward idea: Bay County homeowners
                deserve a countertop company that combines premium craftsmanship with modern
                convenience. No more guessing about prices. No more weeks of waiting for a callback.
                No more settling for less than exceptional.
              </p>
              <p>
                When we acquired Counter Revolution, we saw an opportunity to bring a fresh
                approach to an industry that has been stuck in the past. We invested in digital
                tools like our Instant Estimator and Project Tracker so you can get transparent
                pricing and real-time updates on your project — a first for Bay County.
              </p>
              <p>
                But at our core, we&apos;re still a hands-on fabrication shop. Every countertop
                is cut, polished, and installed by experienced craftspeople who take pride in their
                work. We just believe that great craftsmanship and great customer experience
                shouldn&apos;t be mutually exclusive.
              </p>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="What We Stand For" title="Our Values" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    {value.icon}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Team" title="Meet the People Behind the Stone" />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {TEAM.map((member, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-warm-medium bg-white p-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-light">
                    <Users className="h-10 w-10 text-navy/30" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">{member.name}</h3>
                  <p className="text-sm font-medium text-gold">{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading label="Trust" title="Licensed, Insured & Committed" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: <Shield className="h-8 w-8" />, label: "Fully Licensed" },
              { icon: <Award className="h-8 w-8" />, label: "Fully Insured" },
              { icon: <MapPin className="h-8 w-8" />, label: "Locally Owned" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2 rounded-xl bg-white p-6 shadow-sm">
                <div className="text-navy">{badge.icon}</div>
                <span className="text-sm font-semibold text-navy">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Meet Us in Person"
        description="Visit our showroom to see stone samples, edge profiles, and completed project photos. We'd love to chat about your project."
        primaryCTA={{ label: "Schedule a Visit", href: "/contact" }}
        phone="(850) 000-0000"
        variant="navy"
      />
    </>
  );
}
