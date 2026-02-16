import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

// Fallback service data when CMS is not connected
const SERVICES_DATA: Record<string, {
  name: string; headline: string; description: string;
  whatsIncluded: string[]; processSteps: { title: string; description: string }[];
  materialRecommendations: string[]; pricing: string;
  faq: { question: string; answer: string }[];
}> = {
  "kitchen-countertops": {
    name: "Kitchen Countertops",
    headline: "Premium Kitchen Countertop Fabrication & Installation",
    description: "Your kitchen is the heart of your home. We fabricate and install custom countertops in granite, quartz, marble, and quartzite that transform your space and increase your home's value.",
    whatsIncluded: [
      "Free in-home digital laser measurement",
      "Material selection guidance (showroom or digital)",
      "Custom fabrication with CNC precision",
      "Professional installation with seam matching",
      "Sink and cooktop cutouts",
      "Edge profiling to your specification",
      "Cleanup and old countertop removal (optional)",
      "1-year installation warranty",
    ],
    processSteps: [
      { title: "Consultation & Measurement", description: "We visit your home, measure with digital laser tools, and discuss material options, edge profiles, and layout details." },
      { title: "Material Selection", description: "Choose your slab at our showroom or review options online. We'll help you pick the perfect stone for your kitchen's style and your lifestyle." },
      { title: "Fabrication", description: "Your countertops are cut and polished to exact specifications using CNC machinery. Every edge and cutout is precision-crafted." },
      { title: "Installation", description: "Our crew installs your new countertops, typically in a single day. We handle plumbing disconnects/reconnects and leave your kitchen spotless." },
    ],
    materialRecommendations: ["Granite — best value, extremely durable", "Quartz — zero maintenance, consistent look", "Quartzite — marble look with granite durability"],
    pricing: "Kitchen countertop projects typically range from $2,500 to $8,000+ depending on material, square footage, edge profile, and number of cutouts. Use our Instant Estimator for a ballpark price in 60 seconds.",
    faq: [
      { question: "How long does kitchen countertop installation take?", answer: "Most kitchen countertop installations are completed in a single day. The full process from measurement to installation is typically 7-10 business days." },
      { question: "Do you remove the old countertops?", answer: "Yes, we offer old countertop removal as part of the project for an additional fee. This includes disconnecting and reconnecting plumbing." },
      { question: "Can I keep my existing sink?", answer: "In most cases, yes. We'll advise during the measurement visit if your current sink is compatible with the new countertop material and layout." },
    ],
  },
  "bathroom-vanities": {
    name: "Bathroom Vanities",
    headline: "Custom Stone Bathroom Vanity Tops",
    description: "Elevate your bathrooms with custom-fabricated stone vanity tops. From powder rooms to master baths, we create surfaces that combine beauty with durability.",
    whatsIncluded: ["Free measurement", "Custom fabrication", "Sink cutout(s)", "Edge profiling", "Professional installation", "Plumbing coordination"],
    processSteps: [
      { title: "Measure & Plan", description: "We measure your vanity cabinet and discuss sink style, faucet placement, and edge preferences." },
      { title: "Select Material", description: "Choose from our full range of granite, quartz, marble, and quartzite options." },
      { title: "Fabricate", description: "Precision cutting and polishing of your vanity top with cutout for your chosen sink." },
      { title: "Install", description: "Quick installation with careful attention to plumbing connections and backsplash alignment." },
    ],
    materialRecommendations: ["Marble — classic elegance for master baths", "Quartz — low maintenance for busy bathrooms", "Granite — durable and affordable"],
    pricing: "Bathroom vanity tops typically range from $800 to $3,000 depending on size, material, and complexity.",
    faq: [
      { question: "What sink styles work with stone vanity tops?", answer: "Undermount sinks are the most popular choice and give a clean, modern look. We also accommodate vessel sinks and drop-in sinks." },
    ],
  },
  "outdoor-kitchens": {
    name: "Outdoor Kitchens",
    headline: "Outdoor Kitchen Countertops Built for Florida",
    description: "Your outdoor kitchen needs stone that can handle Florida's heat, humidity, and occasional storms. We install durable, weather-resistant countertops designed for the Gulf Coast climate.",
    whatsIncluded: ["Weather-resistant material selection", "Outdoor-grade fabrication", "Grill and sink cutouts", "Professional installation", "UV and weather guidance"],
    processSteps: [
      { title: "Site Assessment", description: "We evaluate your outdoor kitchen layout, sun exposure, and coverage to recommend the best materials." },
      { title: "Material Selection", description: "Granite and certain quartzites are ideal for outdoor use. We'll steer you away from materials that can't handle the elements." },
      { title: "Fabrication", description: "Cut and polished with attention to outdoor-specific considerations like drip edges and drainage." },
      { title: "Install", description: "Installed with outdoor-rated adhesives and supports designed for temperature fluctuation." },
    ],
    materialRecommendations: ["Granite — best for outdoor use, handles heat and rain", "Quartzite — beautiful and durable outdoors"],
    pricing: "Outdoor kitchen countertops typically range from $2,000 to $6,000 depending on size and material.",
    faq: [
      { question: "Can quartz be used outdoors?", answer: "We generally don't recommend quartz for outdoor kitchens. UV exposure can cause discoloration over time. Granite and quartzite are better outdoor choices." },
    ],
  },
  "commercial-countertops": {
    name: "Commercial Countertops",
    headline: "Commercial Countertop Solutions",
    description: "From restaurant bars to hotel lobbies, we fabricate and install commercial-grade countertops built for high-traffic environments with premium aesthetics.",
    whatsIncluded: ["Volume pricing", "Project timeline coordination", "Commercial-grade materials", "Multiple location capability", "ADA compliance guidance"],
    processSteps: [
      { title: "Scope & Quote", description: "We review plans, visit the site, and provide a detailed commercial quote with timeline." },
      { title: "Material & Design", description: "Select materials suited for commercial durability. We work with architects and designers." },
      { title: "Fabrication", description: "Large-format fabrication capabilities for commercial-scale projects." },
      { title: "Coordinated Install", description: "We work within your construction schedule for seamless installation." },
    ],
    materialRecommendations: ["Quartz — low maintenance for commercial spaces", "Granite — durable and cost-effective at scale"],
    pricing: "Commercial pricing varies by scope. Contact us for a detailed quote.",
    faq: [
      { question: "Do you offer volume discounts?", answer: "Yes, we offer competitive pricing for multi-unit and large-scale commercial projects. Contact us to discuss your specific needs." },
    ],
  },
  "countertop-repair": {
    name: "Countertop Repair",
    headline: "Professional Countertop Repair & Restoration",
    description: "Chips, cracks, stains, and worn surfaces don't always mean replacement. Our repair services can restore your countertops to like-new condition at a fraction of the cost.",
    whatsIncluded: ["Assessment and diagnosis", "Chip and crack repair", "Stain removal treatment", "Re-polishing and sealing", "Seam repair"],
    processSteps: [
      { title: "Inspect", description: "We assess the damage and determine whether repair, resurfacing, or replacement is the best option." },
      { title: "Quote", description: "Transparent pricing based on the type and extent of damage." },
      { title: "Repair", description: "Professional repair using color-matched epoxy, polishing compounds, and sealing products." },
      { title: "Seal & Protect", description: "Apply professional-grade sealant to protect the repaired area and extend the life of your countertop." },
    ],
    materialRecommendations: [],
    pricing: "Repair services typically range from $200 to $800 depending on the type and extent of damage.",
    faq: [
      { question: "Can a cracked countertop be repaired?", answer: "Many cracks can be repaired with color-matched epoxy. Structural cracks may require section replacement. We'll assess and advise honestly." },
    ],
  },
  "backsplash-installation": {
    name: "Backsplash Installation",
    headline: "Stone Backsplash Installation",
    description: "Complete your countertop project with a matching or contrasting stone backsplash. Choose from 4-inch standard or full-height statement options.",
    whatsIncluded: ["Material matching to countertop", "4-inch or full-height options", "Outlet cutouts", "Professional installation", "Seamless countertop-to-backsplash transition"],
    processSteps: [
      { title: "Design", description: "Choose your backsplash height and material. We'll help coordinate with your countertop selection." },
      { title: "Measure", description: "Precise measurement including outlet locations, window returns, and end caps." },
      { title: "Fabricate", description: "Cut to exact specifications with polished edges and outlet cutouts." },
      { title: "Install", description: "Installed with a seamless transition from countertop to backsplash." },
    ],
    materialRecommendations: ["Same stone as countertop for a seamless look", "Contrasting material for visual interest"],
    pricing: "Backsplash installation typically adds $15-$35 per linear foot depending on height and material.",
    faq: [
      { question: "Should my backsplash match my countertop?", answer: "It depends on the look you want. Matching creates a seamless, high-end feel. Contrasting adds visual interest. We'll show you examples of both." },
    ],
  },
};

interface ServicePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = SERVICES_DATA[params.slug];
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES_DATA[params.slug];
  if (!service) notFound();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="bg-navy py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {service.headline}
          </h1>
          <p className="mt-4 text-lg text-gray-300">{service.description}</p>
          <div className="mt-8">
            <Button variant="gold" size="xl" asChild>
              <Link href="/estimate">Get a Free {service.name} Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Included" title="What You Get" align="left" />
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.whatsIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-dark">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Process" title={`How ${service.name} Works`} />
          <div className="mt-10 space-y-6">
            {service.processSteps.map((step, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <div className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-heading text-lg font-bold text-navy">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy">{step.title}</h3>
                    <p className="mt-1 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Material Recommendations */}
      {service.materialRecommendations.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimateInView>
              <SectionHeading label="Recommended" title="Best Materials for This Project" align="left" />
              <ul className="mt-6 space-y-3">
                {service.materialRecommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-warm-medium bg-white p-4">
                    <span className="font-heading font-semibold text-gold">•</span>
                    <span className="text-dark">{rec}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href="/materials/compare" className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold">
                  Compare Materials Side by Side <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimateInView>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="bg-warm-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <SectionHeading label="Pricing" title="What to Expect" align="left" />
            <p className="mt-4 text-muted-foreground">{service.pricing}</p>
            <div className="mt-6">
              <Button variant="gold" size="lg" asChild>
                <Link href="/estimate">Try the Instant Estimator</Link>
              </Button>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* FAQ */}
      {service.faq.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading label="FAQ" title="Common Questions" />
            <FAQAccordion faqs={service.faq} className="mt-8" />
          </div>
        </section>
      )}

      <CTABanner
        headline={`Ready for New ${service.name}?`}
        description="Get a free estimate from our team. We'll help you choose the perfect stone and edge profile."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
        phone="(850) 000-0000"
      />
    </>
  );
}
