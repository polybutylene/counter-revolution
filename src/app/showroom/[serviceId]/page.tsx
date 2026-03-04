import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceConfig, SERVICE_TYPES } from "@/data/services";
import { ServiceShowroom } from "@/components/showroom/ServiceShowroom";

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
    title: `${service.name} Showroom | Browse & Get Estimates`,
    description: `Browse ${service.name.toLowerCase()} options, compare materials, and get an instant estimate — all online.`,
  };
}

export default function ServiceShowroomRoute({ params }: Props) {
  const service = getServiceConfig(params.serviceId);
  if (!service || params.serviceId === "stone") notFound();
  return <ServiceShowroom service={service} />;
}
