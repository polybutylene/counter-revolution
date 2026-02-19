"use client";

import { useState } from 'react';
import { Plus, Trash2, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { simpleSizeOptions } from '@/data/showroom/pricing';
import { cn } from '@/lib/utils';

interface DimensionInputProps {
  sizeMode: 'simple' | 'detailed';
  simpleSize: string;
  sections: { length: number; width: number }[];
  onSizeModeChange: (mode: 'simple' | 'detailed') => void;
  onSimpleSizeChange: (size: string) => void;
  onSectionsChange: (sections: { length: number; width: number }[]) => void;
}

export function DimensionInput({
  sizeMode,
  simpleSize,
  sections,
  onSizeModeChange,
  onSimpleSizeChange,
  onSectionsChange,
}: DimensionInputProps) {
  const totalSqFt = sizeMode === 'simple'
    ? simpleSizeOptions.find(s => s.value === simpleSize)?.sqFt || 0
    : sections.reduce((sum, s) => sum + (s.length * s.width) / 144, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-navy" />
          <p className="text-sm font-semibold text-navy">Counter Dimensions</p>
        </div>
        <div className="flex rounded-lg border border-warm-medium overflow-hidden">
          <button
            onClick={() => onSizeModeChange('simple')}
            className={cn(
              'px-3 py-1.5 text-xs font-medium transition-colors',
              sizeMode === 'simple'
                ? 'bg-navy text-white'
                : 'bg-white text-dark hover:bg-warm-light'
            )}
          >
            Quick
          </button>
          <button
            onClick={() => onSizeModeChange('detailed')}
            className={cn(
              'px-3 py-1.5 text-xs font-medium transition-colors',
              sizeMode === 'detailed'
                ? 'bg-navy text-white'
                : 'bg-white text-dark hover:bg-warm-light'
            )}
          >
            Detailed
          </button>
        </div>
      </div>

      {sizeMode === 'simple' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {simpleSizeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onSimpleSizeChange(opt.value)}
              className={cn(
                'rounded-lg border-2 p-3 text-left transition-all',
                simpleSize === opt.value
                  ? 'border-navy bg-navy/5'
                  : 'border-warm-medium hover:border-navy/30'
              )}
            >
              <p className="text-sm font-medium text-dark">{opt.label}</p>
              <p className="text-xs text-dark/50 mt-0.5">~{opt.sqFt} sq ft</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-dark/50">Enter dimensions in inches for each section of your countertop.</p>
          {sections.map((section, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs text-dark/60 mb-1">
                  {sections.length > 1 ? `Section ${i + 1} — ` : ''}Length (in)
                </label>
                <input
                  type="number"
                  min={0}
                  value={section.length || ''}
                  onChange={(e) => {
                    const next = [...sections];
                    next[i] = { ...next[i], length: Number(e.target.value) };
                    onSectionsChange(next);
                  }}
                  className="w-full rounded-lg border border-warm-medium bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  placeholder="96"
                />
              </div>
              <span className="pb-3 text-dark/40">×</span>
              <div className="flex-1">
                <label className="block text-xs text-dark/60 mb-1">Width (in)</label>
                <input
                  type="number"
                  min={0}
                  value={section.width || ''}
                  onChange={(e) => {
                    const next = [...sections];
                    next[i] = { ...next[i], width: Number(e.target.value) };
                    onSectionsChange(next);
                  }}
                  className="w-full rounded-lg border border-warm-medium bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  placeholder="25"
                />
              </div>
              {sections.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 h-10 w-10"
                  onClick={() => onSectionsChange(sections.filter((_, j) => j !== i))}
                  aria-label={`Remove section ${i + 1}`}
                >
                  <Trash2 className="h-4 w-4 text-dark/40" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSectionsChange([...sections, { length: 0, width: 0 }])}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Section (L-shape, island, etc.)
          </Button>
        </div>
      )}

      {totalSqFt > 0 && (
        <div className="rounded-lg bg-warm-light px-3 py-2 text-sm">
          <span className="text-dark/60">Estimated area: </span>
          <span className="font-semibold text-navy">{Math.round(totalSqFt)} sq ft</span>
        </div>
      )}
    </div>
  );
}
