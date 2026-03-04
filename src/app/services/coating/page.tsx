import { Metadata } from "next";
import { coatingServiceConfig } from "@/data/services/coating";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Painting & Coating | Stratum Co. | Panama City, FL",
  description: "Premium interior and exterior painting in Bay County, FL. Transparent pricing from $2–$6/sq ft. Cabinet refinishing available. Free estimates.",
};

export default function CoatingServicePage() {
  return <ServicePageTemplate service={coatingServiceConfig} />;
}
