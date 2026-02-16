import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  headline: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  phone?: string;
  variant?: "navy" | "gold" | "warm";
  className?: string;
}

export function CTABanner({
  headline,
  description,
  primaryCTA = { label: "Get Your Free Estimate", href: "/estimate" },
  secondaryCTA,
  phone,
  variant = "navy",
  className,
}: CTABannerProps) {
  const bg = {
    navy: "bg-navy text-white",
    gold: "bg-gold text-navy",
    warm: "bg-warm-light text-navy",
  }[variant];

  return (
    <section className={cn("py-16 sm:py-20", bg, className)}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">{headline}</h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-lg",
              variant === "navy" ? "text-gray-300" : "text-dark/70"
            )}
          >
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant={variant === "navy" ? "gold" : "default"}
            size="xl"
            asChild
          >
            <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
          </Button>
          {secondaryCTA && (
            <Button
              variant={variant === "navy" ? "outlineGold" : "outline"}
              size="xl"
              asChild
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
            </Button>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-lg font-semibold",
                variant === "navy" ? "text-gold" : "text-navy"
              )}
            >
              <Phone className="h-5 w-5" />
              {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
