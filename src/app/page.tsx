import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBar } from "@/components/home/TrustBar";
import { ServiceCards } from "@/components/home/ServiceCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { MaterialsPreview } from "@/components/home/MaterialsPreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { ServiceAreaMap } from "@/components/home/ServiceAreaMap";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTABanner } from "@/components/shared/CTABanner";
import { ShowroomWidget } from "@/components/showroom/ShowroomWidget";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <ServiceCards />
      <HowItWorks />
      <FeaturedProjects />
      <ShowroomWidget />
      <MaterialsPreview />
      <TestimonialsCarousel />
      <ServiceAreaMap />
      <BlogPreview />
      <CTABanner
        headline="Ready to Transform Your Home?"
        description="Get a free, no-pressure estimate for any of our services."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/showroom" }}
        phone="(850) 000-0000"
        variant="navy"
      />
    </>
  );
}
