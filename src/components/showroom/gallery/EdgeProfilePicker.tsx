"use client";

import { cn } from '@/lib/utils';
import { edgeProfiles } from '@/data/showroom/edgeProfiles';

interface EdgeProfilePickerProps {
  selectedId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function EdgeProfilePicker({ selectedId, onChange, className }: EdgeProfilePickerProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-semibold text-navy">Edge Profile</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {edgeProfiles.map(profile => (
          <button
            key={profile.id}
            onClick={() => onChange(profile.id)}
            className={cn(
              'relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all',
              selectedId === profile.id
                ? 'border-navy bg-navy/5'
                : 'border-warm-medium bg-white hover:border-navy/30'
            )}
            aria-label={`${profile.name} edge profile${profile.addonPerLinearFt > 0 ? `, +$${profile.addonPerLinearFt}/ft` : ', included'}`}
          >
            {profile.popular && (
              <span className="absolute -top-1.5 right-2 rounded-full bg-gold px-1.5 py-0.5 text-[9px] font-bold text-navy">
                Popular
              </span>
            )}
            <svg
              viewBox="0 0 40 30"
              className="h-8 w-12"
              aria-hidden="true"
            >
              <path
                d={profile.svgPath}
                fill={selectedId === profile.id ? '#1B3A5C' : '#E8E2D6'}
                stroke={selectedId === profile.id ? '#1B3A5C' : '#9CA3AF'}
                strokeWidth="0.5"
              />
            </svg>
            <span className="text-xs font-medium text-dark">{profile.name}</span>
            <span className="text-[10px] text-dark/50">
              {profile.addonPerLinearFt === 0 ? 'Included' : `+$${profile.addonPerLinearFt}/ft`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
