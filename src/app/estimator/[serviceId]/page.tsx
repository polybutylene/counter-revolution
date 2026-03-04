import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceConfig, SERVICE_TYPES } from "@/data/services";
import { ServiceEstimator } from "@/components/estimator/ServiceEstimator";

interface Props {
  params: { serviceId: string };
}

export function generateStaticParams() {
  return SERVICE_TYPES.filter((s) => s !== "stone").map((serviceId) => ({ serviceId }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceConfig(params.serviceId);
  if (!service) return {};
  return {
    title: `${service.name} Estimator | Stratum Co.`,
    description: `Get an instant ${service.name.toLowerCase()} estimate. Transparent pricing, no hidden costs.`,
  };
}

export default function ServiceEstimatorRoute({ params }: Props) {
  const service = getServiceConfig(params.serviceId);
  if (!service || params.serviceId === "stone") notFound();
  return <ServiceEstimator service={service} />;
}
