"use client";

import { useState } from 'react';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MaterialType, ColorFamily, PriceTier, RoomType } from '@/data/showroom/types';

interface Filters {
  materialType: MaterialType[];
  colorFamily: ColorFamily[];
  priceTier: PriceTier[];
  bestFor: RoomType[];
  search: string;
}

interface StoneFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onQuizStart: () => void;
  resultCount: number;
}

const materialOptions: { value: MaterialType; label: string }[] = [
  { value: 'granite', label: 'Granite' },
  { value: 'quartz', label: 'Quartz' },
  { value: 'marble', label: 'Marble' },
  { value: 'quartzite', label: 'Quartzite' },
];

const colorOptions: { value: ColorFamily; label: string; swatch: string }[] = [
  { value: 'white', label: 'White', swatch: 'bg-white border border-gray-200' },
  { value: 'gray', label: 'Gray', swatch: 'bg-gray-400' },
  { value: 'black', label: 'Black', swatch: 'bg-gray-900' },
  { value: 'brown', label: 'Brown', swatch: 'bg-amber-800' },
  { value: 'blue', label: 'Blue', swatch: 'bg-blue-600' },
  { value: 'green', label: 'Green', swatch: 'bg-emerald-700' },
  { value: 'gold', label: 'Gold', swatch: 'bg-amber-500' },
];

const priceOptions: { value: PriceTier; label: string }[] = [
  { value: '$$', label: '$$ Good' },
  { value: '$$$', label: '$$$ Better' },
  { value: '$$$$', label: '$$$$ Best' },
];

const roomOptions: { value: RoomType; label: string }[] = [
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'outdoor', label: 'Outdoor' },
];

function toggleInArray<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

export function StoneFilters({ filters, onChange, onQuizStart, resultCount }: StoneFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters =
    filters.materialType.length > 0 ||
    filters.colorFamily.length > 0 ||
    filters.priceTier.length > 0 ||
    filters.bestFor.length > 0;

  const clearFilters = () =>
    onChange({ materialType: [], colorFamily: [], priceTier: [], bestFor: [], search: filters.search });

  return (
    <div className="space-y-3">
      {/* Search + toggle row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark/40" />
          <input
            type="text"
            value={filters.search}
            onChange={e => onChange({ ...filters, search: e.target.value })}
            placeholder="Search stones..."
            className="w-full rounded-lg border border-warm-medium bg-white pl-10 pr-4 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            aria-label="Search stones"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={expanded ? 'default' : 'outline'}
          size="default"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0"
          aria-expanded={expanded}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
              {filters.materialType.length + filters.colorFamily.length + filters.priceTier.length + filters.bestFor.length}
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          size="default"
          onClick={onQuizStart}
          className="shrink-0 hidden sm:flex"
        >
          <Sparkles className="mr-2 h-4 w-4 text-gold" />
          Help Me Choose
        </Button>
      </div>

      {/* Mobile quiz button */}
      <Button
        variant="ghost"
        size="default"
        onClick={onQuizStart}
        className="w-full sm:hidden border border-gold/30 text-gold-dark"
      >
        <Sparkles className="mr-2 h-4 w-4 text-gold" />
        Not sure what you want? Take our quiz
      </Button>

      {/* Expanded filter panel */}
      {expanded && (
        <div className="rounded-xl border border-warm-medium bg-white p-4 space-y-4">
          {/* Material type */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark/50">Material</p>
            <div className="flex flex-wrap gap-2">
              {materialOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...filters, materialType: toggleInArray(filters.materialType, opt.value) })}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    filters.materialType.includes(opt.value)
                      ? 'bg-navy text-white'
                      : 'bg-warm-light text-dark hover:bg-warm-medium'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color family */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark/50">Color</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...filters, colorFamily: toggleInArray(filters.colorFamily, opt.value) })}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    filters.colorFamily.includes(opt.value)
                      ? 'bg-navy text-white'
                      : 'bg-warm-light text-dark hover:bg-warm-medium'
                  )}
                >
                  <span className={cn('h-3 w-3 rounded-full', opt.swatch)} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price tier */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark/50">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {priceOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...filters, priceTier: toggleInArray(filters.priceTier, opt.value) })}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    filters.priceTier.includes(opt.value)
                      ? 'bg-navy text-white'
                      : 'bg-warm-light text-dark hover:bg-warm-medium'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Best for */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark/50">Best For</p>
            <div className="flex flex-wrap gap-2">
              {roomOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...filters, bestFor: toggleInArray(filters.bestFor, opt.value) })}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    filters.bestFor.includes(opt.value)
                      ? 'bg-navy text-white'
                      : 'bg-warm-light text-dark hover:bg-warm-medium'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-warm-medium pt-3">
            <p className="text-sm text-dark/60">{resultCount} stone{resultCount !== 1 ? 's' : ''} found</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-navy hover:text-navy-light"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
