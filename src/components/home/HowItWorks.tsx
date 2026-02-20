import { ClipboardList, Ruler, Gem, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <ClipboardList className="h-8 w-8" />,
    title: "Tell Us About Your Project",
    description: "Call, fill out our form, or walk into our showroom. We'll ask a few questions about your space and goals.",
  },
  {
    icon: <Ruler className="h-8 w-8" />,
    title: "We Measure & Quote",
    description: "Our team comes to you with digital laser measurement technology. You'll get a transparent, detailed quote.",
  },
  {
    icon: <Gem className="h-8 w-8" />,
    title: "Choose Your Stone",
    description: "Visit our showroom or browse online. We'll help you pick the perfect material, color, and edge profile.",
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "We Fabricate & Install",
    description: "We cut, polish, and install your countertops in 7-10 business days. You'll love the transformation.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Process"
          title="How It Works"
          description="From first call to final install, we make countertop replacement simple."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <AnimateInView key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-warm-light text-navy">
                  {step.icon}
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-gold">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="gold" size="lg" asChild>
            <Link href="/showroom">Start Your Project Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
