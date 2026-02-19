"use client";

import { useState, useMemo, useEffect } from 'react';
import { stones, stoneCollections, filterStones, getStoneById } from '@/data/showroom/stones';
import { StoneCard } from './StoneCard';
import { StoneFilters } from './StoneFilters';
import { StoneDetail } from './StoneDetail';
import { StoneQuiz } from './StoneQuiz';
import { FavoritesBar } from './FavoritesBar';
import { TrustBadges } from '../shared/TrustBadges';
import { useFavorites } from '../hooks/useFavorites';
import { useAnalytics } from '../hooks/useAnalytics';
import type { MaterialType, ColorFamily, PriceTier, RoomType } from '@/data/showroom/types';

interface StoneGalleryProps {
  onVisualize: (stoneId: string) => void;
  onEstimate: (stoneId: string) => void;
  initialStoneId?: string;
}

interface Filters {
  materialType: MaterialType[];
  colorFamily: ColorFamily[];
  priceTier: PriceTier[];
  bestFor: RoomType[];
  search: string;
}

export function StoneGallery({ onVisualize, onEstimate, initialStoneId }: StoneGalleryProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { track } = useAnalytics();

  const [filters, setFilters] = useState<Filters>({
    materialType: [],
    colorFamily: [],
    priceTier: [],
    bestFor: [],
    search: '',
  });

  const [detailStone, setDetailStone] = useState<string | null>(initialStoneId || null);
  const [detailOpen, setDetailOpen] = useState(!!initialStoneId);
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>('Most Popular in Bay County');

  const hasActiveFilters =
    filters.materialType.length > 0 ||
    filters.colorFamily.length > 0 ||
    filters.priceTier.length > 0 ||
    filters.bestFor.length > 0 ||
    filters.search.length > 0;

  const filteredStones = useMemo(() => {
    if (hasActiveFilters) return filterStones(filters);
    if (activeCollection && stoneCollections[activeCollection as keyof typeof stoneCollections]) {
      return stoneCollections[activeCollection as keyof typeof stoneCollections];
    }
    return stones.sort((a, b) => a.popularity - b.popularity);
  }, [filters, hasActiveFilters, activeCollection]);

  useEffect(() => {
    if (hasActiveFilters) setActiveCollection(null);
  }, [hasActiveFilters]);

  const handleViewDetails = (stoneId: string) => {
    setDetailStone(stoneId);
    setDetailOpen(true);
    track('gallery_stone_viewed', { stone_id: stoneId });
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    track('gallery_filter_applied', { filters: newFilters });
  };

  const handleQuizStart = () => {
    setQuizOpen(true);
    track('gallery_quiz_started');
  };

  const stone = detailStone ? getStoneById(detailStone) : null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
          Stone Gallery
        </h2>
        <p className="mt-2 text-dark/70 max-w-xl mx-auto">
          Browse our curated collection of premium granite, quartz, marble, and quartzite.
          Every stone installed by Counter Revolution craftsmen.
        </p>
      </div>

      <TrustBadges className="py-3" />

      {/* Filters */}
      <StoneFilters
        filters={filters}
        onChange={handleFilterChange}
        onQuizStart={handleQuizStart}
        resultCount={filteredStones.length}
      />

      {/* Collection tabs (only when not filtering) */}
      {!hasActiveFilters && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => setActiveCollection(null)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !activeCollection
                ? 'bg-navy text-white'
                : 'bg-warm-light text-dark hover:bg-warm-medium'
            }`}
          >
            All Stones
          </button>
          {Object.keys(stoneCollections).map(name => (
            <button
              key={name}
              onClick={() => setActiveCollection(name)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCollection === name
                  ? 'bg-navy text-white'
                  : 'bg-warm-light text-dark hover:bg-warm-medium'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Stone grid */}
      {filteredStones.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStones.map(stone => (
            <StoneCard
              key={stone.id}
              stone={stone}
              isFavorite={isFavorite(stone.id)}
              onToggleFavorite={() => {
                toggleFavorite(stone.id);
                if (!isFavorite(stone.id)) track('favorite_added', { stone_id: stone.id });
              }}
              onViewDetails={() => handleViewDetails(stone.id)}
              onVisualize={() => onVisualize(stone.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="font-heading font-semibold text-navy text-lg">No stones match your filters</h3>
          <p className="mt-1 text-sm text-dark/60">Try adjusting your search or filters</p>
          <button
            onClick={() => setFilters({ materialType: [], colorFamily: [], priceTier: [], bestFor: [], search: '' })}
            className="mt-4 text-sm font-medium text-gold-dark hover:text-gold"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Stone detail modal */}
      <StoneDetail
        stone={stone || null}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        isFavorite={detailStone ? isFavorite(detailStone) : false}
        onToggleFavorite={() => detailStone && toggleFavorite(detailStone)}
        onVisualize={(id) => { setDetailOpen(false); onVisualize(id); }}
        onEstimate={(id) => { setDetailOpen(false); onEstimate(id); }}
      />

      {/* Quiz modal */}
      <StoneQuiz
        open={quizOpen}
        onOpenChange={setQuizOpen}
        onViewStone={handleViewDetails}
        onVisualize={(id) => { setQuizOpen(false); onVisualize(id); }}
      />

      {/* Favorites bar */}
      <FavoritesBar
        favorites={favorites}
        onViewStone={handleViewDetails}
        onRemove={toggleFavorite}
        onCompare={() => onEstimate(favorites[0])}
      />
    </div>
  );
}
