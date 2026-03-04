import { getInstalledPricePerUnit } from "@/lib/pricing";
import { STONE_MATERIALS } from "./stone-pricing";
import { TILE_MATERIALS } from "./tile-pricing";
import { FLOORING_MATERIALS } from "./flooring-pricing";

/**
 * Get the installed price per sq ft for a stone material, computed from wholesale costs.
 * Falls back to the static pricePerSqFtRange on the Stone object if no pricing data exists.
 */
export function getStoneInstalledPrice(stoneId: string): { low: number; high: number } | null {
  const material = STONE_MATERIALS[stoneId];
  if (!material) return null;
  return getInstalledPricePerUnit(
    material.wholesaleCostPerSqFt.low,
    material.wholesaleCostPerSqFt.high,
    material.laborHoursPerSqFt
  );
}

export function getTileInstalledPrice(tileId: string): { low: number; high: number } | null {
  const material = TILE_MATERIALS[tileId];
  if (!material) return null;
  return getInstalledPricePerUnit(
    material.wholesaleCostPerSqFt.low,
    material.wholesaleCostPerSqFt.high,
    material.laborHoursPerSqFt
  );
}

export function getFlooringInstalledPrice(flooringId: string): { low: number; high: number } | null {
  const material = FLOORING_MATERIALS[flooringId];
  if (!material) return null;
  return getInstalledPricePerUnit(
    material.wholesaleCostPerSqFt.low,
    material.wholesaleCostPerSqFt.high,
    material.laborHoursPerSqFt
  );
}
