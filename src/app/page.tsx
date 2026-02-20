import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBar } from "@/components/home/TrustBar";
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
      <HowItWorks />
      <FeaturedProjects />
      <ShowroomWidget />
      <MaterialsPreview />
      <TestimonialsCarousel />
      <ServiceAreaMap />
      <BlogPreview />
      <CTABanner
        headline="Ready to Transform Your Kitchen?"
        description="Get a free estimate from Bay County's most trusted countertop experts. Call us or request a quote online."
        primaryCTA={{ label: "Request Your Free Quote", href: "/showroom" }}
        phone="(850) 000-0000"
        variant="navy"
      />
    </>
  );
}
