"use client";

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { DimensionInput } from './DimensionInput';
import { OptionsSelector } from './OptionsSelector';
import { EstimateSummary } from './EstimateSummary';
import { EstimateActions } from './EstimateActions';
import { EdgeProfilePicker } from '../gallery/EdgeProfilePicker';
import { TrustBadges } from '../shared/TrustBadges';
import { useAnalytics } from '../hooks/useAnalytics';
import { calculateEstimate } from '../hooks/useEstimate';
import { stones, getStoneById } from '@/data/showroom/stones';
import { getEdgeProfileById } from '@/data/showroom/edgeProfiles';
import { StoneImage } from '../shared/StoneImage';
import { cn } from '@/lib/utils';
import type { EstimateFormData } from '@/data/showroom/types';

interface EstimateBuilderProps {
  initialStoneId?: string;
  hasVisualization?: boolean;
}

export function EstimateBuilder({ initialStoneId, hasVisualization = false }: EstimateBuilderProps) {
  const { track } = useAnalytics();
  const [tracked, setTracked] = useState(false);

  const [form, setForm] = useState<EstimateFormData>({
    stoneId: initialStoneId || stones[0].id,
    edgeProfileId: 'standard-eased',
    sizeMode: 'simple',
    simpleSize: 'medium',
    sections: [{ length: 96, width: 25 }],
    sinkType: 'undermount',
    sinkCount: 1,
    cooktopCutout: false,
    backsplashType: 'none',
    backsplashLinearFt: 0,
    includeDemolition: true,
  });

  if (!tracked) {
    track('estimate_started');
    setTracked(true);
  }

  const result = useMemo(() => calculateEstimate(form), [form]);
  const selectedStone = getStoneById(form.stoneId);
  const selectedEdge = getEdgeProfileById(form.edgeProfileId);

  const update = (partial: Partial<EstimateFormData>) => setForm(prev => ({ ...prev, ...partial }));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
          Estimate Builder
        </h2>
        <p className="mt-2 text-dark/70 max-w-xl mx-auto">
          Get a ballpark cost for your project. No surprises — just a clear range to help you plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Configuration */}
        <div className="space-y-6">
          {/* Stone selection */}
          <div className="rounded-xl border border-warm-medium bg-white p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-navy" />
              <p className="text-sm font-semibold text-navy">Choose Your Stone</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {stones.map(stone => (
                <button
                  key={stone.id}
                  onClick={() => update({ stoneId: stone.id })}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border-2 p-2 text-left transition-all',
                    form.stoneId === stone.id
                      ? 'border-navy bg-navy/5'
                      : 'border-warm-medium hover:border-navy/30'
                  )}
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-warm-light">
                    <StoneImage stoneId={stone.id} src={stone.images.thumbnail} alt="" className="h-full w-full object-cover" size={80} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-dark truncate">{stone.name}</p>
                    <p className="text-[10px] text-dark/50">
                      ${stone.pricePerSqFtRange[0]}–${stone.pricePerSqFtRange[1]}/ft²
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="rounded-xl border border-warm-medium bg-white p-4">
            <DimensionInput
              sizeMode={form.sizeMode}
              simpleSize={form.simpleSize}
              sections={form.sections}
              onSizeModeChange={(mode) => update({ sizeMode: mode })}
              onSimpleSizeChange={(size) => update({ simpleSize: size })}
              onSectionsChange={(sections) => update({ sections })}
            />
          </div>

          {/* Edge profile */}
          <div className="rounded-xl border border-warm-medium bg-white p-4">
            <EdgeProfilePicker
              selectedId={form.edgeProfileId}
              onChange={(id) => update({ edgeProfileId: id })}
            />
          </div>

          {/* Options */}
          <div className="rounded-xl border border-warm-medium bg-white p-4">
            <OptionsSelector
              sinkType={form.sinkType}
              sinkCount={form.sinkCount}
              cooktopCutout={form.cooktopCutout}
              backsplashType={form.backsplashType}
              backsplashLinearFt={form.backsplashLinearFt}
              includeDemolition={form.includeDemolition}
              onSinkTypeChange={(t) => update({ sinkType: t })}
              onSinkCountChange={(c) => update({ sinkCount: c })}
              onCooktopChange={(v) => update({ cooktopCutout: v })}
              onBacksplashTypeChange={(t) => update({ backsplashType: t })}
              onBacksplashLinearFtChange={(f) => update({ backsplashLinearFt: f })}
              onDemolitionChange={(v) => update({ includeDemolition: v })}
            />
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          {result && selectedStone ? (
            <>
              <EstimateSummary
                result={result}
                stoneName={selectedStone.name}
              />
              <EstimateActions
                result={result}
                stoneName={selectedStone.name}
                edgeProfileName={selectedEdge?.name || 'Standard Eased'}
                hasVisualization={hasVisualization}
              />
            </>
          ) : (
            <div className="rounded-xl border border-warm-medium bg-white p-8 text-center">
              <Calculator className="mx-auto h-10 w-10 text-dark/20" />
              <p className="mt-3 text-sm text-dark/50">
                Select a stone and enter dimensions to see your estimate
              </p>
            </div>
          )}

          <TrustBadges className="pt-2" />
        </div>
      </div>
    </div>
  );
}
