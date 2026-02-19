"use client";

import { stones } from '@/data/showroom/stones';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StonePickerProps {
  selectedStoneId: string | null;
  onSelectStone: (stoneId: string) => void;
  favorites: string[];
  className?: string;
}

export function StonePicker({
  selectedStoneId,
  onSelectStone,
  favorites,
  className,
}: StonePickerProps) {
  const sortedStones = [...stones].sort((a, b) => {
    const aFav = favorites.includes(a.id) ? -1 : 0;
    const bFav = favorites.includes(b.id) ? -1 : 0;
    if (aFav !== bFav) return aFav - bFav;
    return a.popularity - b.popularity;
  });

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-semibold text-navy">Select a Stone</p>
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[60vh] overflow-y-auto pr-1">
        {sortedStones.map(stone => (
          <button
            key={stone.id}
            onClick={() => onSelectStone(stone.id)}
            className={cn(
              'relative flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all',
              selectedStoneId === stone.id
                ? 'border-navy bg-navy/5 ring-1 ring-navy'
                : 'border-warm-medium hover:border-navy/30'
            )}
            aria-label={`Select ${stone.name}`}
            aria-pressed={selectedStoneId === stone.id}
          >
            {favorites.includes(stone.id) && (
              <Heart className="absolute top-1 right-1 h-3 w-3 fill-red-500 text-red-500" />
            )}
            <div className="h-12 w-full overflow-hidden rounded bg-warm-light">
              <img
                src={stone.images.thumbnail}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-[11px] font-medium text-dark leading-tight text-center line-clamp-2">
              {stone.name}
            </span>
            <span className="text-[10px] text-dark/50">
              ${stone.pricePerSqFtRange[0]}–${stone.pricePerSqFtRange[1]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
