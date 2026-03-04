import { Metadata } from "next";
import { tileServiceConfig } from "@/data/services/tile";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Tile Installation | Stratum Co. | Panama City, FL",
  description: "Expert tile installation — backsplash, shower, floor tile. Transparent pricing from $12–$45/sq ft installed. Free estimates in Bay County, FL.",
};

export default function TileServicePage() {
  return <ServicePageTemplate service={tileServiceConfig} />;
}
