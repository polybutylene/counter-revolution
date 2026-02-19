"use client";

import { Star, Shield, MapPin } from 'lucide-react';

export function TrustBadges({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-dark/70">
        <span className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-gold text-gold" />
          <strong className="text-dark">4.8</strong> · 120+ Reviews
        </span>
        <span className="hidden sm:inline text-warm-medium">|</span>
        <span className="flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-navy" />
          Fabricated & installed by local craftsmen
        </span>
        <span className="hidden sm:inline text-warm-medium">|</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-navy" />
          Free in-home estimates, always
        </span>
      </div>
    </div>
  );
}
