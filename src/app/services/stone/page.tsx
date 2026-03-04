import { Metadata } from "next";
import { stoneServiceConfig } from "@/data/services/stone";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Stone Countertops | Stratum Co. | Panama City, FL",
  description: "Premium granite, quartz, marble & quartzite countertop fabrication and installation in Bay County, FL. Transparent pricing from $38–$120/sq ft installed.",
};

export default function StoneServicePage() {
  return <ServicePageTemplate service={stoneServiceConfig} />;
}
