"use client";

import { useRef, useEffect, useState } from 'react';
import { generateStoneTexture } from '@/lib/showroom/textureGenerator';
import type { Point } from '@/data/showroom/types';

interface TextureRendererProps {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  polygons: Point[][];
  textureSrc: string | null;
  stoneId: string | null;
  opacity: number;
  textureScale: number;
  rotation: number;
  showOriginal: boolean;
}

export function TextureRenderer({
  imageSrc,
  imageWidth,
  imageHeight,
  polygons,
  textureSrc,
  stoneId,
  opacity,
  textureScale,
  rotation,
  showOriginal,
}: TextureRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const baseLoadedRef = useRef(false);
  const textureImgRef = useRef<HTMLImageElement | null>(null);
  const textureLoadedRef = useRef(false);

  // Track all render params in refs so the paint function always reads fresh values
  const paramsRef = useRef({
    canvasSize, imageWidth, polygons, opacity, textureScale, rotation, showOriginal,
  });
  paramsRef.current = {
    canvasSize, imageWidth, polygons, opacity, textureScale, rotation, showOriginal,
  };

  // Core paint function — always reads from refs, never stale
  function paint() {
    const canvas = canvasRef.current;
    const baseImg = baseImgRef.current;
    if (!canvas || !baseImg || !baseLoadedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { canvasSize: size, imageWidth: imgW, polygons: polys, opacity: op,
      textureScale: tScale, rotation: rot, showOriginal: orig } = paramsRef.current;
    const { width, height } = size;
    if (width === 0 || height === 0) return;

    const scale = width / imgW;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(baseImg, 0, 0, width, height);

    if (orig || !textureImgRef.current || !textureLoadedRef.current || polys.length === 0) return;

    const textureImg = textureImgRef.current;

    polys.forEach(poly => {
      if (poly.length < 3) return;

      ctx.save();

      // Clip to polygon
      ctx.beginPath();
      ctx.moveTo(poly[0].x * scale, poly[0].y * scale);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x * scale, poly[i].y * scale);
      }
      ctx.closePath();
      ctx.clip();

      // Bounding box
      const xs = poly.map(p => p.x * scale);
      const ys = poly.map(p => p.y * scale);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      // Tile size based on texture natural size, scaled
      const tileSize = Math.max(20, textureImg.width * tScale * scale * 0.5);

      // Multiply pass — makes texture adopt the photo's lighting
      ctx.globalAlpha = op;
      ctx.globalCompositeOperation = 'multiply';
      ctx.translate(centerX, centerY);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.translate(-centerX, -centerY);

      const padX = tileSize * 2;
      const padY = tileSize * 2;
      for (let x = minX - padX; x < maxX + padX; x += tileSize) {
        for (let y = minY - padY; y < maxY + padY; y += tileSize) {
          ctx.drawImage(textureImg, x, y, tileSize, tileSize);
        }
      }

      // Soft-light pass — blend natural shadows through texture
      ctx.globalAlpha = op * 0.3;
      ctx.globalCompositeOperation = 'soft-light';
      for (let x = minX - padX; x < maxX + padX; x += tileSize) {
        for (let y = minY - padY; y < maxY + padY; y += tileSize) {
          ctx.drawImage(textureImg, x, y, tileSize, tileSize);
        }
      }

      ctx.restore();
    });

    // Subtle polygon outlines
    polys.forEach(poly => {
      if (poly.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(poly[0].x * scale, poly[0].y * scale);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x * scale, poly[i].y * scale);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(201, 148, 46, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  // Load base image
  useEffect(() => {
    baseLoadedRef.current = false;
    const img = new window.Image();
    img.onload = () => {
      baseImgRef.current = img;
      baseLoadedRef.current = true;
      paint();
    };
    img.src = imageSrc;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  // Load texture — try real file first, fall back to generated
  useEffect(() => {
    textureLoadedRef.current = false;
    textureImgRef.current = null;

    if (!textureSrc && !stoneId) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      textureImgRef.current = img;
      textureLoadedRef.current = true;
      paint();
    };

    img.onerror = () => {
      if (stoneId) {
        const generated = generateStoneTexture(stoneId, 512);
        if (generated) {
          const fallback = new window.Image();
          fallback.onload = () => {
            textureImgRef.current = fallback;
            textureLoadedRef.current = true;
            paint();
          };
          fallback.src = generated;
          return;
        }
      }
      textureLoadedRef.current = false;
    };

    img.src = textureSrc || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textureSrc, stoneId]);

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0 && imageWidth > 0) {
          const aspect = imageHeight / imageWidth;
          setCanvasSize({ width: w, height: w * aspect });
        }
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [imageWidth, imageHeight]);

  // Repaint whenever any visual param changes
  useEffect(() => {
    paint();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize, polygons, opacity, textureScale, rotation, showOriginal]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl border border-warm-medium">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full block"
        aria-label="Visualized countertop with stone texture applied"
      />
      {canvasSize.width === 0 && (
        <div className="flex items-center justify-center py-20 text-dark/40 text-sm">
          Loading visualization...
        </div>
      )}
    </div>
  );
}
