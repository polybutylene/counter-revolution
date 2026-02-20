"use client";

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShowroomNav } from './ShowroomNav';
import { StoneGallery } from './gallery/StoneGallery';
import { RoomVisualizer } from './visualizer/RoomVisualizer';
import { EstimateBuilder } from './estimate/EstimateBuilder';
import { useShowroomSession } from './hooks/useShowroomSession';
import { useAnalytics } from './hooks/useAnalytics';
import type { ShowroomTab } from '@/data/showroom/types';

const VALID_TABS: ShowroomTab[] = ['gallery', 'visualizer', 'estimate'];

export function ShowroomPage() {
  const { session, setActiveTab, setActiveStone } = useShowroomSession();
  const { track } = useAnalytics();
  const searchParams = useSearchParams();

  const initialTab = (() => {
    const param = searchParams.get('tab') as ShowroomTab | null;
    if (param && VALID_TABS.includes(param)) return param;
    return session.lastTab || 'gallery';
  })();

  const [activeTab, setTab] = useState<ShowroomTab>(initialTab);
  const [selectedStoneId, setSelectedStoneId] = useState<string | null>(session.lastStoneId);
  const [hasVisualization, setHasVisualization] = useState(false);

  useEffect(() => {
    track('showroom_entered');
  }, [track]);

  const handleTabChange = useCallback((tab: ShowroomTab) => {
    setTab(tab);
    setActiveTab(tab);
  }, [setActiveTab]);

  const handleVisualize = useCallback((stoneId: string) => {
    setSelectedStoneId(stoneId);
    setActiveStone(stoneId);
    setTab('visualizer');
    setActiveTab('visualizer');
  }, [setActiveStone, setActiveTab]);

  const handleEstimate = useCallback((stoneId: string) => {
    setSelectedStoneId(stoneId);
    setActiveStone(stoneId);
    setTab('estimate');
    setActiveTab('estimate');
  }, [setActiveStone, setActiveTab]);

  const handleGetEstimateFromVisualizer = useCallback((stoneId: string) => {
    setSelectedStoneId(stoneId);
    setHasVisualization(true);
    setTab('estimate');
    setActiveTab('estimate');
  }, [setActiveTab]);

  return (
    <div className="min-h-screen bg-warm-light">
      {/* Header */}
      <div className="bg-navy py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Virtual Showroom
          </h1>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">
            Browse premium stones, see them in your space, and get an instant estimate —
            all without leaving home.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-30 bg-warm-light/95 backdrop-blur-sm border-b border-warm-medium py-3 px-4">
        <ShowroomNav activeTab={activeTab} onChange={handleTabChange} />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {activeTab === 'gallery' && (
          <StoneGallery
            onVisualize={handleVisualize}
            onEstimate={handleEstimate}
            initialStoneId={selectedStoneId || undefined}
          />
        )}
        {activeTab === 'visualizer' && (
          <RoomVisualizer
            initialStoneId={selectedStoneId || undefined}
            onGetEstimate={handleGetEstimateFromVisualizer}
          />
        )}
        {activeTab === 'estimate' && (
          <EstimateBuilder
            initialStoneId={selectedStoneId || undefined}
            hasVisualization={hasVisualization}
          />
        )}
      </div>
    </div>
  );
}
