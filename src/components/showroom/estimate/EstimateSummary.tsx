"use client";

import { formatCurrency } from '@/lib/utils';
import { Info } from 'lucide-react';
import type { EstimateResult } from '@/data/showroom/types';

interface EstimateSummaryProps {
  result: EstimateResult;
  stoneName: string;
}

function LineItem({ label, amount, range }: { label: string; amount?: number; range?: [number, number] }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-dark/70">{label}</span>
      <span className="font-medium text-dark">
        {range
          ? `${formatCurrency(range[0])} – ${formatCurrency(range[1])}`
          : amount !== undefined && amount > 0
            ? formatCurrency(amount)
            : '—'}
      </span>
    </div>
  );
}

export function EstimateSummary({ result, stoneName }: EstimateSummaryProps) {
  return (
    <div className="rounded-xl border border-warm-medium bg-white overflow-hidden">
      <div className="bg-navy p-4 text-center">
        <p className="text-sm text-white/70">Your estimated project cost</p>
        <p className="font-heading text-3xl font-bold text-white mt-1">
          {formatCurrency(result.totalMin)} – {formatCurrency(result.totalMax)}
        </p>
        <p className="text-sm text-gold mt-1">{stoneName}</p>
      </div>

      <div className="p-4 space-y-1 divide-y divide-warm-light">
        <LineItem label="Material (installed)" range={result.materialCost} />
        <LineItem label="Fabrication" range={result.fabricationCost} />
        {result.edgeCost > 0 && <LineItem label="Edge Profile Upgrade" amount={result.edgeCost} />}
        {result.sinkCutoutCost > 0 && <LineItem label="Sink Cutout(s)" amount={result.sinkCutoutCost} />}
        {result.cooktopCutoutCost > 0 && <LineItem label="Cooktop Cutout" amount={result.cooktopCutoutCost} />}
        {result.backsplashCost > 0 && <LineItem label="Backsplash" amount={result.backsplashCost} />}
        {result.demolitionCost > 0 && <LineItem label="Demo & Removal" amount={result.demolitionCost} />}
      </div>

      <div className="border-t border-warm-medium bg-warm-light/50 p-4">
        <div className="flex items-start gap-2 text-xs text-dark/60">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <p>
            This is an estimate to help you plan. Your final quote is based on an in-home
            measurement and is always free. Actual costs may vary based on layout complexity,
            material availability, and specific slab selection.
          </p>
        </div>
      </div>
    </div>
  );
}
