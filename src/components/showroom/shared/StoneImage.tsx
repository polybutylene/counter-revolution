"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { generateStoneTexture, getStoneBaseColor } from '@/lib/showroom/textureGenerator';

interface StoneImageProps {
  stoneId: string;
  src: string;
  alt: string;
  className?: string;
  size?: number;
  loading?: 'lazy' | 'eager';
}

export function StoneImage({
  stoneId,
  src,
  alt,
  className,
  size = 256,
  loading = 'lazy',
}: StoneImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const tried = useRef(false);

  useEffect(() => {
    if (tried.current) return;
    tried.current = true;

    const img = new window.Image();
    img.onload = () => {
      setImgSrc(src);
      setLoaded(true);
    };
    img.onerror = () => {
      const generated = generateStoneTexture(stoneId, size);
      if (generated) {
        setImgSrc(generated);
      }
      setLoaded(true);
    };
    img.src = src;
  }, [src, stoneId, size]);

  if (!loaded) {
    return (
      <div
        className={cn('animate-pulse', className)}
        style={{ backgroundColor: getStoneBaseColor(stoneId) }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={imgSrc || ''}
      alt={alt}
      className={className}
      loading={loading}
    />
  );
}

/**
 * Hook to get a resolved texture URL for a stone.
 * Attempts to load the real image, falls back to procedurally generated.
 */
export function useStoneTexture(stoneId: string, textureSrc: string, size = 512) {
  const [resolved, setResolved] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!cancelled) setResolved(textureSrc);
    };
    img.onerror = () => {
      if (!cancelled) {
        const generated = generateStoneTexture(stoneId, size);
        setResolved(generated || null);
      }
    };
    img.src = textureSrc;

    return () => { cancelled = true; };
  }, [stoneId, textureSrc, size]);

  return resolved;
}
