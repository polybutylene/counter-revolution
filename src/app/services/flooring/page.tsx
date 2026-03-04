import { Metadata } from "next";
import { flooringServiceConfig } from "@/data/services/flooring";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Flooring Installation | Stratum Co. | Panama City, FL",
  description: "Professional flooring installation — LVP, hardwood, laminate, tile, epoxy. Transparent pricing from $6–$18/sq ft installed. Free estimates.",
};

export default function FlooringServicePage() {
  return <ServicePageTemplate service={flooringServiceConfig} />;
}
