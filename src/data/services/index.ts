export type { ServiceType, ServiceConfig, MaterialCategory, Product, EstimatorStep, EstimatorOption, FAQ, ServiceCardData } from "./config";
export { SERVICE_CARDS } from "./config";
export { stoneServiceConfig } from "./stone";
export { tileServiceConfig } from "./tile";
export { coatingServiceConfig } from "./coating";
export { flooringServiceConfig } from "./flooring";

import type { ServiceType, ServiceConfig } from "./config";
import { stoneServiceConfig } from "./stone";
import { tileServiceConfig } from "./tile";
import { coatingServiceConfig } from "./coating";
import { flooringServiceConfig } from "./flooring";

export const serviceConfigs: Record<ServiceType, ServiceConfig> = {
  stone: stoneServiceConfig,
  tile: tileServiceConfig,
  coating: coatingServiceConfig,
  flooring: flooringServiceConfig,
};

export function getServiceConfig(id: string): ServiceConfig | undefined {
  return serviceConfigs[id as ServiceType];
}

export const SERVICE_TYPES: ServiceType[] = ["stone", "tile", "coating", "flooring"];
