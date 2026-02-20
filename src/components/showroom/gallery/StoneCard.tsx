"use client";

import { Heart, Eye, Palette } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StoneImage } from '../shared/StoneImage';
import { cn } from '@/lib/utils';
import type { Stone } from '@/data/showroom/types';

interface StoneCardProps {
  stone: Stone;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
  onVisualize: () => void;
}

const materialBadgeVariant: Record<string, 'default' | 'gold' | 'secondary'> = {
  granite: 'default',
  quartz: 'gold',
  marble: 'secondary',
  quartzite: 'default',
};

export function StoneCard({
  stone,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onVisualize,
}: StoneCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-warm-medium/50 transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-light">
        <StoneImage
          stoneId={stone.id}
          src={stone.images.thumbnail}
          alt={`${stone.name} slab preview`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          size={400}
        />
        {/* Favorite button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={cn(
            'absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-all',
            isFavorite
              ? 'bg-white text-red-500 shadow-md'
              : 'bg-black/30 text-white backdrop-blur-sm hover:bg-white hover:text-red-500'
          )}
          aria-label={isFavorite ? `Remove ${stone.name} from favorites` : `Add ${stone.name} to favorites`}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>
        {/* Tags */}
        {stone.tags.includes('popular') && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold" className="text-xs shadow-sm">Most Popular</Badge>
          </div>
        )}
        {stone.tags.includes('staff-pick') && !stone.tags.includes('popular') && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="text-xs shadow-sm">Staff Pick</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading font-semibold text-navy leading-tight">{stone.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant={materialBadgeVariant[stone.materialType] || 'secondary'} className="text-[11px]">
                {stone.materialType.charAt(0).toUpperCase() + stone.materialType.slice(1)}
              </Badge>
              <span className="text-xs text-dark/50">{stone.priceTier}</span>
            </div>
          </div>
        </div>

        <p className="mt-2 text-sm font-medium text-gold-dark">
          ${stone.pricePerSqFtRange[0]}–${stone.pricePerSqFtRange[1]}/sq ft
          <span className="font-normal text-dark/50"> installed</span>
        </p>

        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={onViewDetails}
          >
            <Eye className="mr-1 h-3.5 w-3.5" />
            Details
          </Button>
          <Button
            variant="gold"
            size="sm"
            className="flex-1 text-xs"
            onClick={onVisualize}
          >
            <Palette className="mr-1 h-3.5 w-3.5" />
            Visualize
          </Button>
        </div>
      </div>
    </div>
  );
}
