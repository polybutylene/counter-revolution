"use client";

import { LayoutGrid, Camera, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShowroomTab } from '@/data/showroom/types';

interface ShowroomNavProps {
  activeTab: ShowroomTab;
  onChange: (tab: ShowroomTab) => void;
}

const tabs: { id: ShowroomTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'gallery', label: 'Stone Gallery', icon: LayoutGrid },
  { id: 'visualizer', label: 'Room Visualizer', icon: Camera },
  { id: 'estimate', label: 'Estimate Builder', icon: Calculator },
];

export function ShowroomNav({ activeTab, onChange }: ShowroomNavProps) {
  return (
    <nav
      className="mx-auto max-w-xl"
      aria-label="Showroom navigation"
    >
      <div className="flex rounded-xl border border-warm-medium bg-white p-1 shadow-sm">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-dark/60 hover:text-dark hover:bg-warm-light'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
