"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  PRICING_CONFIG,
  calculateEstimatePricing,
  displayPrice,
  getInstalledPricePerUnit,
} from "@/lib/pricing";
import { STONE_MATERIALS, STONE_ADDONS, STONE_SIZE_OPTIONS } from "@/lib/services/stone-pricing";
import { TILE_MATERIALS, TILE_ADDONS, TILE_SIZE_OPTIONS } from "@/lib/services/tile-pricing";
import { COATING_CONFIG } from "@/lib/services/coating-pricing";
import { FLOORING_MATERIALS, FLOORING_ADDONS, FLOORING_SIZE_OPTIONS } from "@/lib/services/flooring-pricing";
import { cn } from "@/lib/utils";

type ServiceTab = "stone" | "tile" | "coating" | "flooring" | "test";

interface MaterialRow {
  id: string;
  name: string;
  type: string;
  wholesaleLow: number;
  wholesaleHigh: number;
  laborHrsPerSqFt: number;
  laborCostPerSqFt: number;
  costLow: number;
  costHigh: number;
  priceLow: number;
  priceHigh: number;
  marginLow: number;
  marginHigh: number;
}

function buildMaterialRows(
  materials: Record<string, { name: string; type: string; wholesaleCostPerSqFt: { low: number; high: number }; laborHoursPerSqFt: number }>
): MaterialRow[] {
  return Object.entries(materials).map(([id, m]) => {
    const laborCost = m.laborHoursPerSqFt * PRICING_CONFIG.LABOR_RATE_PER_HOUR;
    const costLow = m.wholesaleCostPerSqFt.low + laborCost;
    const costHigh = m.wholesaleCostPerSqFt.high + laborCost;
    const price = getInstalledPricePerUnit(
      m.wholesaleCostPerSqFt.low,
      m.wholesaleCostPerSqFt.high,
      m.laborHoursPerSqFt
    );
    return {
      id,
      name: m.name,
      type: m.type,
      wholesaleLow: m.wholesaleCostPerSqFt.low,
      wholesaleHigh: m.wholesaleCostPerSqFt.high,
      laborHrsPerSqFt: m.laborHoursPerSqFt,
      laborCostPerSqFt: laborCost,
      costLow,
      costHigh,
      priceLow: price.low,
      priceHigh: price.high,
      marginLow: Math.round(((price.low - costLow) / price.low) * 100),
      marginHigh: Math.round(((price.high - costHigh) / price.high) * 100),
    };
  });
}

export default function AdminPricingPage() {
  const [tab, setTab] = useState<ServiceTab>("stone");
  const [showInternal, setShowInternal] = useState(true);

  const [testService, setTestService] = useState("stone");
  const [testMaterial, setTestMaterial] = useState("white-ice-granite");
  const [testSqFt, setTestSqFt] = useState(32);

  const stoneRows = useMemo(() => buildMaterialRows(STONE_MATERIALS), []);
  const tileRows = useMemo(() => buildMaterialRows(TILE_MATERIALS), []);
  const flooringRows = useMemo(() => buildMaterialRows(FLOORING_MATERIALS), []);

  const testEstimate = useMemo(() => {
    let mat: { wholesaleCostPerSqFt: { low: number; high: number }; laborHoursPerSqFt: number } | undefined;
    if (testService === "stone") mat = STONE_MATERIALS[testMaterial];
    else if (testService === "tile") mat = TILE_MATERIALS[testMaterial];
    else if (testService === "flooring") mat = FLOORING_MATERIALS[testMaterial];
    if (!mat) return null;

    const matLow = mat.wholesaleCostPerSqFt.low * testSqFt;
    const matHigh = mat.wholesaleCostPerSqFt.high * testSqFt;
    const baseHrs = mat.laborHoursPerSqFt * testSqFt;

    return calculateEstimatePricing({
      materialCostLow: matLow,
      materialCostHigh: matHigh,
      laborHoursLow: baseHrs * 0.9,
      laborHoursHigh: baseHrs * 1.15,
    });
  }, [testService, testMaterial, testSqFt]);

  const testMaterials = useMemo(() => {
    if (testService === "stone") return Object.entries(STONE_MATERIALS).map(([id, m]) => ({ id, name: m.name }));
    if (testService === "tile") return Object.entries(TILE_MATERIALS).map(([id, m]) => ({ id, name: m.name }));
    if (testService === "flooring") return Object.entries(FLOORING_MATERIALS).map(([id, m]) => ({ id, name: m.name }));
    return [];
  }, [testService]);

  const tabs: { id: ServiceTab; label: string }[] = [
    { id: "stone", label: "Stone" },
    { id: "tile", label: "Tile" },
    { id: "coating", label: "Coating" },
    { id: "flooring", label: "Flooring" },
    { id: "test", label: "Estimate Tester" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-1 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Pricing Dashboard</h1>
            <p className="text-sm text-gray-500">
              Internal view — adjust costs, review margins, test estimates
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInternal(!showInternal)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                showInternal
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-gray-200 bg-white text-gray-700"
              )}
            >
              {showInternal ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {showInternal ? "Internal View" : "Customer View"}
            </button>
          </div>
        </div>
      </div>

      {/* Config Overview */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ConfigCard label="Labor Rate" value={`$${PRICING_CONFIG.LABOR_RATE_PER_HOUR}/hr`} />
          <ConfigCard label="Salesman Fee" value={`$${PRICING_CONFIG.SALESMAN_ALLOCATION}/job`} />
          <ConfigCard label="Commission" value={`${PRICING_CONFIG.COMMISSION_RATE * 100}%`} />
          <ConfigCard label="Target Margin" value={`${PRICING_CONFIG.TARGET_MARGIN * 100}%`} />
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto border-b border-gray-200 pb-px">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "shrink-0 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                tab === t.id
                  ? "border-navy text-navy"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          {tab === "stone" && (
            <MaterialTable rows={stoneRows} service="Stone" showInternal={showInternal} />
          )}
          {tab === "tile" && (
            <MaterialTable rows={tileRows} service="Tile" showInternal={showInternal} />
          )}
          {tab === "coating" && <CoatingTable showInternal={showInternal} />}
          {tab === "flooring" && (
            <MaterialTable rows={flooringRows} service="Flooring" showInternal={showInternal} />
          )}
          {tab === "test" && (
            <div className="max-w-2xl space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">Estimate Tester</h3>
                <p className="text-sm text-gray-500">
                  Run the pricing formula with custom inputs
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service</label>
                    <select
                      value={testService}
                      onChange={(e) => {
                        setTestService(e.target.value);
                        const mats = e.target.value === "stone"
                          ? Object.keys(STONE_MATERIALS)
                          : e.target.value === "tile"
                          ? Object.keys(TILE_MATERIALS)
                          : Object.keys(FLOORING_MATERIALS);
                        setTestMaterial(mats[0]);
                      }}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="stone">Stone</option>
                      <option value="tile">Tile</option>
                      <option value="flooring">Flooring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Material</label>
                    <select
                      value={testMaterial}
                      onChange={(e) => setTestMaterial(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      {testMaterials.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
                    <input
                      type="number"
                      value={testSqFt}
                      onChange={(e) => setTestSqFt(Number(e.target.value) || 1)}
                      min={1}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {testEstimate && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-green-50 p-4">
                        <p className="text-sm font-medium text-green-800">Customer Price</p>
                        <p className="mt-1 text-2xl font-bold text-green-900">
                          {formatCurrency(testEstimate.customerPrice.low)} – {formatCurrency(testEstimate.customerPrice.high)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm font-medium text-blue-800">Gross Profit</p>
                        <p className="mt-1 text-2xl font-bold text-blue-900">
                          {formatCurrency(testEstimate.grossProfit.low)} – {formatCurrency(testEstimate.grossProfit.high)}
                        </p>
                      </div>
                    </div>

                    {showInternal && (
                      <div className="rounded-lg border border-gray-200 p-4">
                        <h4 className="text-sm font-semibold text-gray-700">Internal Breakdown</h4>
                        <div className="mt-3 space-y-2 text-sm">
                          <Row label="Material (wholesale)" low={testEstimate.materialInstalled.low} high={testEstimate.materialInstalled.high} />
                          <Row label="Crew Labor" low={testEstimate.labor.low} high={testEstimate.labor.high} />
                          <Row label="Salesman Fee" low={testEstimate.salesmanFee} high={testEstimate.salesmanFee} />
                          <Row label="Commission (5%)" low={testEstimate.commission.low} high={testEstimate.commission.high} />
                          <div className="border-t border-gray-200 pt-2">
                            <Row label="Cost Subtotal" low={testEstimate.subtotal.low} high={testEstimate.subtotal.high} bold />
                          </div>
                          <div className="border-t border-gray-200 pt-2">
                            <Row label="Customer Price" low={testEstimate.customerPrice.low} high={testEstimate.customerPrice.high} bold />
                          </div>
                          <div className="border-t border-gray-200 pt-2">
                            <Row label="Gross Profit" low={testEstimate.grossProfit.low} high={testEstimate.grossProfit.high} color="text-green-700" />
                          </div>
                          <div className="text-xs text-gray-500">
                            Margin: {Math.round((testEstimate.grossProfit.low / testEstimate.customerPrice.low) * 100)}% – {Math.round((testEstimate.grossProfit.high / testEstimate.customerPrice.high) * 100)}%
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-semibold text-gray-700">Customer-Facing View</h4>
                      <div className="mt-3 space-y-2 text-sm">
                        <Row
                          label="Material (installed)"
                          low={displayPrice(testEstimate.materialInstalled.low)}
                          high={displayPrice(testEstimate.materialInstalled.high)}
                        />
                        <Row
                          label="Labor"
                          low={testEstimate.customerPrice.low - displayPrice(testEstimate.materialInstalled.low)}
                          high={testEstimate.customerPrice.high - displayPrice(testEstimate.materialInstalled.high)}
                        />
                        <div className="border-t border-gray-200 pt-2">
                          <Row label="Total" low={testEstimate.customerPrice.low} high={testEstimate.customerPrice.high} bold />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConfigCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function Row({
  label,
  low,
  high,
  bold,
  color,
}: {
  label: string;
  low: number;
  high: number;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn("text-gray-600", bold && "font-semibold text-gray-900")}>
        {label}
      </span>
      <span className={cn("text-gray-900", bold && "font-semibold", color)}>
        {low === high
          ? formatCurrency(low)
          : `${formatCurrency(low)} – ${formatCurrency(high)}`}
      </span>
    </div>
  );
}

function MaterialTable({
  rows,
  service,
  showInternal,
}: {
  rows: MaterialRow[];
  service: string;
  showInternal: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-3 py-3 text-left font-medium text-gray-500">Material</th>
            <th className="px-3 py-3 text-left font-medium text-gray-500">Type</th>
            {showInternal && (
              <>
                <th className="px-3 py-3 text-right font-medium text-gray-500">Wholesale/sqft</th>
                <th className="px-3 py-3 text-right font-medium text-gray-500">Labor hrs/sqft</th>
                <th className="px-3 py-3 text-right font-medium text-gray-500">Labor $/sqft</th>
                <th className="px-3 py-3 text-right font-medium text-gray-500">Cost/sqft</th>
              </>
            )}
            <th className="px-3 py-3 text-right font-medium text-gray-500">Customer $/sqft</th>
            {showInternal && (
              <th className="px-3 py-3 text-right font-medium text-gray-500">Margin</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-3 py-3 font-medium text-gray-900">{row.name}</td>
              <td className="px-3 py-3 text-gray-500">{row.type}</td>
              {showInternal && (
                <>
                  <td className="px-3 py-3 text-right text-gray-700">
                    ${row.wholesaleLow}–${row.wholesaleHigh}
                  </td>
                  <td className="px-3 py-3 text-right text-gray-700">
                    {row.laborHrsPerSqFt}
                  </td>
                  <td className="px-3 py-3 text-right text-gray-700">
                    ${row.laborCostPerSqFt.toFixed(0)}
                  </td>
                  <td className="px-3 py-3 text-right text-gray-700">
                    ${row.costLow.toFixed(0)}–${row.costHigh.toFixed(0)}
                  </td>
                </>
              )}
              <td className="px-3 py-3 text-right font-semibold text-green-700">
                ${row.priceLow}–${row.priceHigh}
              </td>
              {showInternal && (
                <td className="px-3 py-3 text-right text-blue-700">
                  {row.marginLow}%–{row.marginHigh}%
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CoatingTable({ showInternal }: { showInternal: boolean }) {
  const interiorRows = Object.entries(COATING_CONFIG.interior.roomSizes).map(([id, size]) => {
    const grade = COATING_CONFIG.paintGrade["premium"];
    const gallons = (size.wallSqFt * 2) / grade.coverageSqFt;
    const matCost = gallons * grade.costPerGallon;
    const est = calculateEstimatePricing({
      materialCostLow: matCost * 0.9,
      materialCostHigh: matCost * 1.1,
      laborHoursLow: size.laborHours * 0.9,
      laborHoursHigh: size.laborHours * 1.1,
    });
    return { id, label: size.label, wallSqFt: size.wallSqFt, laborHrs: size.laborHours, matCost, est };
  });

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Interior Rooms (Premium Paint)</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-3 py-3 text-left font-medium text-gray-500">Room Size</th>
                <th className="px-3 py-3 text-right font-medium text-gray-500">Wall Sq Ft</th>
                {showInternal && (
                  <>
                    <th className="px-3 py-3 text-right font-medium text-gray-500">Labor Hrs</th>
                    <th className="px-3 py-3 text-right font-medium text-gray-500">Mat Cost</th>
                    <th className="px-3 py-3 text-right font-medium text-gray-500">Cost Subtotal</th>
                  </>
                )}
                <th className="px-3 py-3 text-right font-medium text-gray-500">Customer Price</th>
                {showInternal && (
                  <th className="px-3 py-3 text-right font-medium text-gray-500">Profit</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {interiorRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 font-medium text-gray-900">{row.label}</td>
                  <td className="px-3 py-3 text-right text-gray-700">{row.wallSqFt}</td>
                  {showInternal && (
                    <>
                      <td className="px-3 py-3 text-right text-gray-700">{row.laborHrs}</td>
                      <td className="px-3 py-3 text-right text-gray-700">{formatCurrency(row.matCost)}</td>
                      <td className="px-3 py-3 text-right text-gray-700">
                        {formatCurrency(row.est.subtotal.low)}–{formatCurrency(row.est.subtotal.high)}
                      </td>
                    </>
                  )}
                  <td className="px-3 py-3 text-right font-semibold text-green-700">
                    {formatCurrency(row.est.customerPrice.low)}–{formatCurrency(row.est.customerPrice.high)}
                  </td>
                  {showInternal && (
                    <td className="px-3 py-3 text-right text-blue-700">
                      {formatCurrency(row.est.grossProfit.low)}–{formatCurrency(row.est.grossProfit.high)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900">Paint Grades</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Object.entries(COATING_CONFIG.paintGrade).map(([id, grade]) => (
            <div key={id} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-900">{grade.label}</p>
              <p className="text-sm text-gray-500">${grade.costPerGallon}/gal</p>
              <p className="text-sm text-gray-500">{grade.coverageSqFt} sq ft/gal</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900">Add-On Multipliers</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-3 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Option</th>
                <th className="px-3 py-3 text-right font-medium text-gray-500">Multiplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(COATING_CONFIG.prepWork).map(([id, opt]) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-gray-500">Prep Work</td>
                  <td className="px-3 py-3 font-medium text-gray-900">{opt.label}</td>
                  <td className="px-3 py-3 text-right text-gray-700">{opt.laborMultiplier}×</td>
                </tr>
              ))}
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3 text-gray-500">Ceilings</td>
                <td className="px-3 py-3 font-medium text-gray-900">Include Ceilings</td>
                <td className="px-3 py-3 text-right text-gray-700">
                  {COATING_CONFIG.interior.ceilingMultiplier}× labor
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
