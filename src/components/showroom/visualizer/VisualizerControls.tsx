"use client";

import { RotateCw, ZoomIn, Eye } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface VisualizerControlsProps {
  opacity: number;
  onOpacityChange: (value: number) => void;
  textureScale: number;
  onTextureScaleChange: (value: number) => void;
  rotation: number;
  onRotationChange: (value: number) => void;
  showOriginal: boolean;
  onToggleOriginal: () => void;
  className?: string;
}

function ControlSlider({
  label,
  icon: Icon,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  icon: typeof RotateCw;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-dark/70">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        <span className="text-xs text-dark/50">{Math.round(value * 100)}%</span>
      </div>
      <Slider.Root
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="relative flex h-5 w-full touch-none items-center"
        aria-label={label}
      >
        <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-warm-medium">
          <Slider.Range className="absolute h-full rounded-full bg-navy" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-navy bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-navy/30" />
      </Slider.Root>
    </div>
  );
}

export function VisualizerControls({
  opacity,
  onOpacityChange,
  textureScale,
  onTextureScaleChange,
  rotation,
  onRotationChange,
  showOriginal,
  onToggleOriginal,
  className,
}: VisualizerControlsProps) {
  return (
    <div className={cn('space-y-4 rounded-xl border border-warm-medium bg-white p-4', className)}>
      <p className="text-sm font-semibold text-navy">Adjust Texture</p>

      <ControlSlider
        label="Opacity"
        icon={Eye}
        value={opacity}
        onChange={onOpacityChange}
        min={0.1}
        max={1}
        step={0.05}
      />

      <ControlSlider
        label="Scale"
        icon={ZoomIn}
        value={textureScale}
        onChange={onTextureScaleChange}
        min={0.2}
        max={3}
        step={0.1}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-medium text-dark/70">
            <RotateCw className="h-3.5 w-3.5" />
            Rotation
          </span>
          <span className="text-xs text-dark/50">{rotation}°</span>
        </div>
        <Slider.Root
          value={[rotation]}
          onValueChange={([v]) => onRotationChange(v)}
          min={0}
          max={360}
          step={15}
          className="relative flex h-5 w-full touch-none items-center"
          aria-label="Texture rotation"
        >
          <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-warm-medium">
            <Slider.Range className="absolute h-full rounded-full bg-navy" />
          </Slider.Track>
          <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-navy bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-navy/30" />
        </Slider.Root>
      </div>

      <button
        onClick={onToggleOriginal}
        className={cn(
          'w-full rounded-lg border-2 py-2.5 text-sm font-medium transition-colors',
          showOriginal
            ? 'border-navy bg-navy text-white'
            : 'border-warm-medium text-dark hover:border-navy/30'
        )}
      >
        {showOriginal ? 'Show With Stone' : 'Show Original Photo'}
      </button>
    </div>
  );
}
