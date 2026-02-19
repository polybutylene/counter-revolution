"use client";

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cr-showroom-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // quota exceeded or unavailable
    }
  }, []);

  const toggleFavorite = useCallback((stoneId: string) => {
    setFavorites(prev => {
      const next = prev.includes(stoneId)
        ? prev.filter(id => id !== stoneId)
        : [...prev, stoneId];
      persist(next);
      return next;
    });
  }, [persist]);

  const isFavorite = useCallback((stoneId: string) => {
    return favorites.includes(stoneId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    persist([]);
  }, [persist]);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}
