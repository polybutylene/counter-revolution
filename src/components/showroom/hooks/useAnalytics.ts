"use client";

import { useCallback } from 'react';

type ShowroomEvent =
  | 'showroom_entered'
  | 'gallery_stone_viewed'
  | 'gallery_filter_applied'
  | 'gallery_quiz_started'
  | 'gallery_quiz_completed'
  | 'visualizer_photo_uploaded'
  | 'visualizer_surface_drawn'
  | 'visualizer_stone_applied'
  | 'visualizer_stone_swapped'
  | 'visualizer_before_after_used'
  | 'visualizer_saved'
  | 'visualizer_shared'
  | 'estimate_started'
  | 'estimate_completed'
  | 'estimate_saved'
  | 'estimate_shared'
  | 'contact_form_opened'
  | 'contact_form_submitted'
  | 'favorite_added'
  | 'session_stones_compared';

export function useAnalytics() {
  const track = useCallback((event: ShowroomEvent, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as { gtag: (...args: unknown[]) => void }).gtag('event', event, {
        event_category: 'showroom',
        ...data,
      });
    }
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event,
        ...data,
      });
    }
  }, []);

  return { track };
}
