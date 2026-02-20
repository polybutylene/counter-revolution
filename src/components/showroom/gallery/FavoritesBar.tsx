"use client";

import { Heart, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoneById } from '@/data/showroom/stones';
import { StoneImage } from '../shared/StoneImage';
import { cn } from '@/lib/utils';

interface FavoritesBarProps {
  favorites: string[];
  onViewStone: (stoneId: string) => void;
  onRemove: (stoneId: string) => void;
  onCompare: () => void;
  className?: string;
}

export function FavoritesBar({ favorites, onViewStone, onRemove, onCompare, className }: FavoritesBarProps) {
  if (favorites.length === 0) return null;

  const favoriteStones = favorites
    .map(id => getStoneById(id))
    .filter(Boolean);

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-40 border-t border-warm-medium bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.08)]',
      'pb-safe',
      className
    )}>
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span className="text-sm font-semibold text-navy">
              {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-2">
              {favoriteStones.map(stone => stone && (
                <div
                  key={stone.id}
                  className="relative shrink-0 group"
                >
                  <button
                    onClick={() => onViewStone(stone.id)}
                    className="flex items-center gap-2 rounded-full border border-warm-medium bg-warm-light px-3 py-1.5 text-xs font-medium text-dark hover:bg-warm-medium transition-colors"
                  >
                    <div className="h-5 w-5 rounded-full overflow-hidden bg-gray-200">
                      <StoneImage
                        stoneId={stone.id}
                        src={stone.images.thumbnail}
                        alt=""
                        className="h-full w-full object-cover"
                        size={40}
                      />
                    </div>
                    {stone.name}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemove(stone.id); }}
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-dark text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${stone.name} from favorites`}
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {favorites.length >= 2 && (
            <Button
              variant="gold"
              size="sm"
              className="shrink-0 hidden sm:flex"
              onClick={onCompare}
            >
              Get Estimate
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
