"use client";

import { cn } from '@/lib/utils';
import { sinkTypes, backsplashTypes } from '@/data/showroom/pricing';

interface OptionsSelectorProps {
  sinkType: string;
  sinkCount: number;
  cooktopCutout: boolean;
  backsplashType: string;
  backsplashLinearFt: number;
  includeDemolition: boolean;
  onSinkTypeChange: (type: string) => void;
  onSinkCountChange: (count: number) => void;
  onCooktopChange: (value: boolean) => void;
  onBacksplashTypeChange: (type: string) => void;
  onBacksplashLinearFtChange: (ft: number) => void;
  onDemolitionChange: (value: boolean) => void;
}

function ToggleButton({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg border-2 p-3 text-left transition-all w-full',
        active ? 'border-navy bg-navy/5' : 'border-warm-medium hover:border-navy/30'
      )}
    >
      <p className="text-sm font-medium text-dark">{label}</p>
      {description && <p className="text-xs text-dark/50 mt-0.5">{description}</p>}
    </button>
  );
}

export function OptionsSelector({
  sinkType,
  sinkCount,
  cooktopCutout,
  backsplashType,
  backsplashLinearFt,
  includeDemolition,
  onSinkTypeChange,
  onSinkCountChange,
  onCooktopChange,
  onBacksplashTypeChange,
  onBacksplashLinearFtChange,
  onDemolitionChange,
}: OptionsSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Sink cutouts */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">Sink Cutout</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sinkTypes.map(opt => (
            <ToggleButton
              key={opt.value}
              label={opt.label}
              active={sinkType === opt.value}
              onClick={() => onSinkTypeChange(opt.value)}
            />
          ))}
        </div>
        {sinkType !== 'none' && (
          <div className="flex items-center gap-3">
            <label className="text-sm text-dark/70">How many sinks?</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSinkCountChange(Math.max(1, sinkCount - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-warm-medium text-dark hover:bg-warm-light"
                aria-label="Decrease sink count"
              >
                −
              </button>
              <span className="w-8 text-center font-medium text-dark">{sinkCount}</span>
              <button
                onClick={() => onSinkCountChange(Math.min(4, sinkCount + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-warm-medium text-dark hover:bg-warm-light"
                aria-label="Increase sink count"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cooktop cutout */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">Cooktop Cutout</p>
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton
            label="No Cutout"
            active={!cooktopCutout}
            onClick={() => onCooktopChange(false)}
          />
          <ToggleButton
            label="Yes, Cooktop Cutout"
            description="+$300"
            active={cooktopCutout}
            onClick={() => onCooktopChange(true)}
          />
        </div>
      </div>

      {/* Backsplash */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">Backsplash</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {backsplashTypes.map(opt => (
            <ToggleButton
              key={opt.value}
              label={opt.label}
              active={backsplashType === opt.value}
              onClick={() => onBacksplashTypeChange(opt.value)}
            />
          ))}
        </div>
        {backsplashType !== 'none' && (
          <div className="flex items-center gap-3">
            <label htmlFor="bs-linear-ft" className="text-sm text-dark/70 shrink-0">
              Linear feet:
            </label>
            <input
              id="bs-linear-ft"
              type="number"
              min={0}
              value={backsplashLinearFt || ''}
              onChange={(e) => onBacksplashLinearFtChange(Number(e.target.value))}
              className="w-24 rounded-lg border border-warm-medium bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              placeholder="20"
            />
            <span className="text-xs text-dark/50">Leave blank to auto-estimate</span>
          </div>
        )}
      </div>

      {/* Demolition */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-navy">Existing Counter Removal</p>
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton
            label="No Demolition"
            description="Keeping existing counters"
            active={!includeDemolition}
            onClick={() => onDemolitionChange(false)}
          />
          <ToggleButton
            label="Remove Old Counters"
            description="We handle the demo"
            active={includeDemolition}
            onClick={() => onDemolitionChange(true)}
          />
        </div>
      </div>
    </div>
  );
}
