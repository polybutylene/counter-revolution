"use client";

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeCanvas: HTMLCanvasElement | null;
  afterCanvas: HTMLCanvasElement | null;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeCanvas,
  afterCanvas,
  beforeLabel = 'Original',
  afterLabel = 'With New Stone',
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const beforeSrc = beforeCanvas?.toDataURL() || '';
  const afterSrc = afterCanvas?.toDataURL() || '';

  if (!beforeSrc || !afterSrc) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full cursor-col-resize select-none overflow-hidden rounded-xl border border-warm-medium',
        className
      )}
      onMouseMove={(e) => isDragging && handleMove(e.clientX)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={() => setIsDragging(false)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After (full) */}
      <img src={afterSrc} alt={afterLabel} className="w-full" />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeLabel} className="w-full" />
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-navy shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
            <path d="M4 8H12M4 8L6.5 5.5M4 8L6.5 10.5M12 8L9.5 5.5M12 8L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute bottom-3 right-3 z-10 rounded-full bg-gold/90 px-2.5 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}
