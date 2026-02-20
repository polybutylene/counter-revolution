"use client";

import { useState, useEffect, useCallback } from 'react';
import type { ShowroomTab } from '@/data/showroom/types';

const STORAGE_KEY = 'cr-showroom-session';

interface SessionState {
  lastStoneId: string | null;
  lastTab: ShowroomTab;
}

const defaultSession: SessionState = {
  lastStoneId: null,
  lastTab: 'gallery',
};

export function useShowroomSession() {
  const [session, setSession] = useState<SessionState>(defaultSession);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSession({ ...defaultSession, ...JSON.parse(stored) });
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const updateSession = useCallback((updates: Partial<SessionState>) => {
    setSession(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // quota exceeded
      }
      return next;
    });
  }, []);

  const setActiveStone = useCallback((stoneId: string | null) => {
    updateSession({ lastStoneId: stoneId });
  }, [updateSession]);

  const setActiveTab = useCallback((tab: ShowroomTab) => {
    updateSession({ lastTab: tab });
  }, [updateSession]);

  return {
    session,
    setActiveStone,
    setActiveTab,
    updateSession,
  };
}
